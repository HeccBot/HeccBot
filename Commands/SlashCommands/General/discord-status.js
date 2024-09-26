import { ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, ApplicationCommandOptionType, ChannelType, PermissionFlagsBits } from 'discord-api-types/v10';
import { API, MessageFlags } from '@discordjs/core';
import { DISCORD_APP_USER_ID } from '../../../config.js';
import { localize } from '../../../Utility/localizeResponses.js';
import { OutageFeedModel } from '../../../Mongoose/Modals.js';
import { DiscordOutageFeedAvatar } from '../../../Assets/Hyperlinks.js';
import { resolveImage } from '../../../Utility/handleImages.js';


export const SlashCommand = {
    /** Command's Name, in fulllowercase (can include hyphens)
     * @type {String}
     */
    name: "discord-status",

    /** Command's Description
     * @type {String}
     */
    description: "Toggles receiving Discord status/outage updates in this Server",

    /** Command's Localised Descriptions
     * @type {import('discord-api-types/v10').LocalizationMap}
     */
    localizedDescriptions: {
        'en-GB': 'Toggles receiving Discord status/outage updates in this Server',
        'en-US': 'Toggles receiving Discord status/outage updates in this Server'
    },

    /** Command's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 30,

    /**
     * Cooldowns for specific Subcommands
     */
    // Where "exampleName" is either the Subcommand's Name, or a combo of both Subcommand Group Name and Subcommand Name
    //  For ease in handling cooldowns, this should also include the root Command name as a prefix
    // In either "rootCommandName_subcommandName" or "rootCommandName_groupName_subcommandName" formats
    subcommandCooldown: {
        "subscribe": 30,
        "unsubscribe": 30
    },
    

    /** Get the Command's data in a format able to be registered with via Discord's API
     * @returns {import('discord-api-types/v10').RESTPostAPIApplicationCommandsJSONBody}
     */
    getRegisterData() {
        /** @type {import('discord-api-types/v10').RESTPostAPIApplicationCommandsJSONBody} */
        const CommandData = {};

        CommandData.name = this.name;
        CommandData.description = this.description;
        CommandData.description_localizations = this.localizedDescriptions;
        CommandData.type = ApplicationCommandType.ChatInput;
        // Integration Types - 0 for GUILD_INSTALL, 1 for USER_INSTALL.
        //  MUST include at least one. 
        CommandData.integration_types = [ ApplicationIntegrationType.GuildInstall ];
        // Contexts - 0 for GUILD, 1 for BOT_DM (DMs with the App), 2 for PRIVATE_CHANNEL (DMs/GDMs that don't include the App).
        //  MUST include at least one. PRIVATE_CHANNEL can only be used if integration_types includes USER_INSTALL
        CommandData.contexts = [ InteractionContextType.Guild ];
        CommandData.options = [
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "subscribe",
                description: "Subscribe to receiving Discord status updates in this Channel",
                description_localizations: {
                    'en-GB': "Subscribe to receiving Discord status updates in this Channel",
                    'en-US': "Subscribe to receiving Discord status updates in this Channel"
                }
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "unsubscribe",
                description: "Disable receiving Discord status updates in this Channel",
                description_localizations: {
                    'en-GB': "Disable receiving Discord status updates in this Channel",
                    'en-US': "Disable receiving Discord status updates in this Channel"
                }
            }
        ];

        return CommandData;
    },

    /** Handles given Autocomplete Interactions, should this Command use Autocomplete Options
     * @param {import('discord-api-types/v10').APIApplicationCommandAutocompleteInteraction} interaction 
     * @param {API} api
     * @param {import('discord-api-types/v10').APIUser} interactionUser 
     */
    async handleAutoComplete(interaction, api, interactionUser) {
        await api.interactions.createAutocompleteResponse(interaction.id, interaction.token, { choices: [ {name: "Not implemented yet!", value: "NOT_IMPLEMENTED"} ] });

        return;
    },

    /** Runs the Command
     * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
     * @param {API} api
     * @param {import('discord-api-types/v10').APIUser} interactionUser 
     * @param {String} usedCommandName 
     */
    async executeCommand(interaction, api, interactionUser, usedCommandName) {
        // Grab subcommand used and execute correct method
        const InputSubcommand = interaction.data.options.find(option => option.type === ApplicationCommandOptionType.Subcommand);

        switch (InputSubcommand.name) {
            case "subscribe":
                await subscribeToFeed(interaction, api, interactionUser);
                break;

            case "unsubscribe":
                await disableFeed(interaction, api, interactionUser);
                break;
        }

        return;
    }
}





/**
 * Subscribes the Server to the Discord outage feed
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {API} api
 * @param {import('discord-api-types/v10').APIUser} interactionUser 
 */
async function subscribeToFeed(interaction, api, interactionUser) {
    await api.interactions.defer(interaction.id, interaction.token, { flags: MessageFlags.Ephemeral });

    // Ensure Channel this was used in is a supported Channel type (ie: Text or Public Thread)
    if ( interaction.channel.type != ChannelType.GuildText && interaction.channel.type !== ChannelType.PublicThread ) {
        await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, { content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_INVALID_CHANNEL_TYPE') }, '@original');
        return;
    }

    // Ensure App has perms to create Webhooks in this Channel
    const AppChannelPermissions = BigInt(interaction.app_permissions);
    // VIEW_CHANNEL
    if ( ((AppChannelPermissions & PermissionFlagsBits.ViewChannel) == PermissionFlagsBits.ViewChannel) === false ) {
        await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, { content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_MISSING_PERMISSION_VIEW_CHANNEL') }, '@original');
        return;
    }
    // MANAGE_WEBHOOKS
    if ( ((AppChannelPermissions & PermissionFlagsBits.ManageWebhooks) == PermissionFlagsBits.ManageWebhooks) === false ) {
        await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, { content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_MISSING_PERMISSION_MANAGE_WEBHOOKS') }, '@original');
        return;
    }


    // Grab highest display name for User so we can display it in Audit Log entries
    let userDisplayName = interaction.member?.nick != null ? interaction.member.nick
        : interaction.member?.nick == null && interaction.member?.user.global_name != null ? interaction.member.user.global_name
        : interaction.member.user.username;


    // Validate if already subscribed, AND IF NOT, subscribe!
    let checkDb = await OutageFeedModel.exists();
    if ( checkDb == null ) {
        // Not already subscribed!
        // Create webhook
        let feedWebhook;
        let threadId = null;

        if ( interaction.channel.type === ChannelType.GuildText ) {
            feedWebhook = await api.channels.createWebhook(interaction.channel.id, {
                name: 'Dis-Outage Feed',
                avatar: await resolveImage(DiscordOutageFeedAvatar)
            }, {
                reason: localize(interaction.guild_locale, 'DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS_AUDIT_LOG', userDisplayName)
            })
            .catch(async err => {
                await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
                    content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_SUBSCRIPTION_GENERIC')
                });
                return;
            });
        }
        else {
            feedWebhook = await api.channels.createWebhook(interaction.channel.parent_id, {
                name: 'Dis-Outage Feed',
                avatar: await resolveImage(DiscordOutageFeedAvatar)
            }, {
                reason: localize(interaction.guild_locale, 'DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS_AUDIT_LOG', userDisplayName)
            })
            .catch(async err => {
                await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
                    content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_SUBSCRIPTION_GENERIC')
                });
                return;
            });

            threadId = interaction.channel.id;
        }


        // Save to DB
        await OutageFeedModel.create({
            server_id: interaction.guild_id,
            webhook_id: feedWebhook.id,
            thread_id: threadId
        })
        .then(async createdDocument => {
            // ACK
            await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
                content: localize(interaction.locale, 'DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS', `<#${interaction.channel.id}>`)
            }, '@original');
            return;
        })
        .catch(async err => {
            await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
                content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_SUBSCRIPTION_GENERIC')
            });
            return;
        });
    }
    else {
        // Already subscribed!
        await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
            content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_ALREADY_SUBSCRIBED', `</discord-status unsubscribe:${interaction.data.id}>`)
        });
    }

    return;
}





/**
 * Removes the Server from the Discord outage feed
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {API} api
 * @param {import('discord-api-types/v10').APIUser} interactionUser 
 */
async function disableFeed(interaction, api, interactionUser) {
    // See if Server is actually subscribed to the feed
    if ( await OutageFeedModel.exists({ server_id: interaction.guild_id }) == null ) {
        await api.interactions.reply(interaction.id, interaction.token, {
            content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_NOT_CURRENTLY_SUBSCRIBED')
        });
        return;
    }

    // Defer
    await api.interactions.defer(interaction.id, interaction.token, { flags: MessageFlags.Ephemeral });

    // Grab highest display name for User so we can display it in Audit Log entries
    let userDisplayName = interaction.member?.nick != null ? interaction.member.nick
        : interaction.member?.nick == null && interaction.member?.user.global_name != null ? interaction.member.user.global_name
        : interaction.member.user.username;


    // Disable the feed!
    // First, remove Webhook if possible
    let feedDbEntry = await OutageFeedModel.findOne({ server_id: interaction.guild_id });
    let webhookDeletionMessage = null;

    try {
        await api.webhooks.delete(feedDbEntry.webhook_id, { reason: localize(interaction.guild_locale, 'DSTATUS_COMMAND_UNSUBSCRIPTION_SUCCESS_AUDIT_LOG', userDisplayName) });
    }
    catch (err) {
        console.debug(err);
        webhookDeletionMessage = `:warning: ${localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_WEBHOOK_DELETION_FAILED')}`;
    }


    // Now delete from DB
    await feedDbEntry.deleteOne()
    .then(async () => {
        await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
            content: localize(interaction.locale, 'DSTATUS_COMMAND_UNSUBSCRIPTION_SUCCESS', `${webhookDeletionMessage != null ? `\n\n${webhookDeletionMessage}` : ''}`)
        });
        return;
    })
    .catch(async () => {
        await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
            content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_UNSUBSCRIPTION_GENERIC')
        });
        return;
    });

    return;
}
