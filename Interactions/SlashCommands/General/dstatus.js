const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, PermissionFlagsBits, ApplicationCommandOptionType, TextChannel, ThreadChannel, ForumChannel, ChannelType } = require("discord.js");
const fs = require('node:fs');
const { localize } = require("../../../BotModules/LocalizationModule.js");
const { DiscordClient, fetchDisplayName } = require("../../../constants.js");
//const { OutageFeedModel } = require("../../../Mongoose/Models.js");
const { LogDebug, LogToUserInteraction } = require("../../../BotModules/LoggingModule.js");
const { AVATAR_DISOUTAGE_FEED } = require("../../../Resources/Hyperlinks.js");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "dstatus",

    // Command's Description
    Description: `Toggles receiving Discord Outage updates in this Server`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Toggles receiving Discord Outage updates in this Server`,
        'en-US': `Toggles receiving Discord Outage updates in this Server`
    },

    // Command's Category
    Category: "GENERAL",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 30,

    // Cooldowns for specific subcommands and/or subcommand-groups
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandCooldown: {
        "subscribe": 30,
        "unsubscribe": 30
    },

    // Scope of Command's usage
    //     One of the following: DM, GUILD, ALL
    Scope: "GUILD",

    // Scope of specific Subcommands Usage
    //     One of the following: DM, GUILD, ALL
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandScope: {
        "subscribe": "GUILD",
        "unsubscribe": "GUILD"
    },



    /**
     * Returns data needed for registering Slash Command onto Discord's API
     * @returns {ChatInputApplicationCommandData}
     */
    registerData()
    {
        /** @type {ChatInputApplicationCommandData} */
        const Data = {};

        Data.name = this.Name;
        Data.description = this.Description;
        Data.descriptionLocalizations = this.LocalisedDescriptions;
        Data.type = ApplicationCommandType.ChatInput;
        Data.dmPermission = false;
        Data.defaultMemberPermissions = PermissionFlagsBits.ManageGuild;
        Data.options = [
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "subscribe",
                description: "Subscribe to receiving Discord Outage updates in this Server",
                descriptionLocalizations: {
                    'en-GB': `Subscribe to receiving Discord Outage updates in this Server`,
                    'en-US': `Subscribe to receiving Discord Outage updates in this Server`
                },
                options: [
                    {
                        type: ApplicationCommandOptionType.Channel,
                        name: "channel",
                        description: "Channel to receive Discord Outage updates in",
                        descriptionLocalizations: {
                            'en-GB': `Channel to receive Discord Outage updates in`,
                            'en-US': `Channel to receive Discord Outage updates in`
                        },
                        channel_types: [ ChannelType.GuildText, ChannelType.PublicThread ], // Public Threads only allowed because Forum Channels
                        required: true
                    }
                ]
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "unsubscribe",
                description: "Disable receiving Discord Outage updates in this Server",
                descriptionLocalizations: {
                    'en-GB': `Disable receiving Discord Outage updates in this Server`,
                    'en-US': `Disable receiving Discord Outage updates in this Server`
                },
            }
        ]

        return Data;
    },



    /**
     * Executes the Slash Command
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction)
    {
        // Grab Subcommand used
        const SubcommandName = interaction.options.getSubcommand(true);

        switch (SubcommandName)
        {
            case "subscribe":
                await subscribeToFeed(interaction);
                break;

            case "unsubscribe":
                await disableFeed(interaction);
                break;
        }

        return;
    },



    /**
     * Handles given Autocomplete Interactions for any Options in this Slash CMD that uses it
     * @param {AutocompleteInteraction} interaction 
     */
    async autocomplete(interaction)
    {
        //.
    }
}





/**
 * Subscribes the specified Channel to the Discord Outage Feed
 * @param {ChatInputCommandInteraction} interaction 
 */
async function subscribeToFeed(interaction)
{
    await interaction.deferReply({ ephemeral: true });

    // Grab Channel
    /** @type {TextChannel|ThreadChannel} */
    const InputChannel = interaction.options.getChannel("channel", true);

    // If Thread, ensure inside of Forum or Text Channels, not Media or Announcements
    if ( InputChannel instanceof ThreadChannel && !(InputChannel.parent instanceof ForumChannel || InputChannel.parent instanceof TextChannel) )
    {
        await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_THREAD_INVALID') });
        return;
    }

    // Ensure not Private Thread
    if ( InputChannel.type === ChannelType.PrivateThread )
    {
        await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_PRIVATE_THREAD') });
        return;
    }

    // Ensure HeccBot has perms to create webhooks
    const BotChannelPermissions = InputChannel.permissionsFor(DiscordClient.user.id);
    if ( !BotChannelPermissions.has(PermissionFlagsBits.ViewChannel) || !BotChannelPermissions.has(PermissionFlagsBits.ManageWebhooks) )
    {
        await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_MISSING_PERMISSIONS') });
        return;
    }

    // Ensure not already subscribed
    // ********* JSON VERSION OF CODE
    const OutageFeedJson = require('../../../JsonFiles/Hidden/StatusSubscriptions.json');
    if ( !OutageFeedJson[`${interaction.guildId}`] || !OutageFeedJson[`${interaction.guildId}`]["DISCORD_FEED_WEBHOOK_ID"] )
    {
        // Create Webhook & subscribe to Feed
        let feedWebhook;
        let threadId = null;

        if ( InputChannel instanceof TextChannel )
        {
            feedWebhook = await InputChannel.createWebhook({
                name: `Dis-Outage Feed`,
                avatar: AVATAR_DISOUTAGE_FEED,
                reason: localize(interaction.guildLocale, 'DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS_AUDIT_LOG', fetchDisplayName(interaction.user, true))
            })
            .catch(async err => {
                await LogToUserInteraction(interaction, null, err);
                return;
            });
        }
        else
        {
            feedWebhook = await InputChannel.parent.createWebhook({
                name: `Dis-Outage Feed`,
                avatar: AVATAR_DISOUTAGE_FEED,
                reason: localize(interaction.guildLocale, 'DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS_AUDIT_LOG', fetchDisplayName(interaction.user, true))
            })
            .catch(async err => {
                await LogToUserInteraction(interaction, null, err);
                return;
            });
            threadId = InputChannel.id;
        }

        // Save to JSON
        OutageFeedJson[`${interaction.guildId}`] = { "DISCORD_FEED_WEBHOOK_ID": feedWebhook.id, "DISCORD_FEED_THREAD_ID": threadId };

        fs.writeFile('./JsonFiles/Hidden/StatusSubscriptions.json', JSON.stringify(OutageFeedJson, null, 4), async (err) => {
            if ( err ) { await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_SUBSCRIPTION_GENERIC') }); return; }
        });

        // ACK to User
        await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS', `<#${InputChannel.id}>`) });
        return;
    }
    else
    {
        await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_ALREADY_SUBSCRIBED', `</dstatus unsubscribe:${interaction.commandId}>`) });
        return;
    }



    // ********* PLACEHOLDER FOR WHEN I HAVE THE MONEY TO PAY FOR A FLUFFING DATABASE BECAUSE HOLY FLUFF DIGITALOCEAN ISN'T THE CHEAPEST WHEN IT COMES TO DATABASES
    /* let checkDb = await OutageFeedModel.exists({ serverId: interaction.guildId });
    if ( checkDb == null )
    {
        // Create Webhook & subscribe to Feed
        let feedWebhook;
        let threadId = null;

        if ( InputChannel instanceof TextChannel )
        {
            feedWebhook = await InputChannel.createWebhook({
                name: `Dis-Outage Feed`,
                avatar: AVATAR_DISOUTAGE_FEED,
                reason: localize(interaction.guildLocale, 'DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS_AUDIT_LOG', fetchDisplayName(interaction.user, true))
            })
            .catch(async err => {
                await LogToUserInteraction(interaction, null, err);
                return;
            });
        }
        else
        {
            feedWebhook = await InputChannel.parent.createWebhook({
                name: `Dis-Outage Feed`,
                avatar: AVATAR_DISOUTAGE_FEED,
                reason: localize(interaction.guildLocale, 'DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS_AUDIT_LOG', fetchDisplayName(interaction.user, true))
            })
            .catch(async err => {
                await LogToUserInteraction(interaction, null, err);
                return;
            });
            threadId = InputChannel.id;
        }

        // Save to DB
        await OutageFeedModel.create({ serverId: interaction.guildId, webhookId: feedWebhook.id, threadId: threadId })
        .then(async createdDocument => {
            // ACK to User
            await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS', `<#${InputChannel.id}>`) });
            return;
        })
        .catch(async err => {
            await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_SUBSCRIPTION_GENERIC') });
            return;
        });
    }
    else
    {
        await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_ALREADY_SUBSCRIBED', `</dstatus unsubscribe:${interaction.commandId}>`) });
        return;
    } */
}





/**
 * Disables the DIscord Outage Feed for the Server
 * @param {ChatInputCommandInteraction} interaction 
 */
async function disableFeed(interaction)
{
    // See if Server actually is subscribed right now
    const OutageFeedJson = require('../../../JsonFiles/Hidden/StatusSubscriptions.json');
    if ( !OutageFeedJson[`${interaction.guildId}`] || !OutageFeedJson[`${interaction.guildId}`]["DISCORD_FEED_WEBHOOK_ID"] )
    {
        await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_NOT_CURRENTLY_SUBSCRIBED') });
        return;
    }

    /* if ( await OutageFeedModel.exists({ serverId: interaction.guildId }) == null )
    {
        await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_NOT_CURRENTLY_SUBSCRIBED') });
        return;
    } */

    await interaction.deferReply({ ephemeral: true });

    // Disable the feed!
    // First, remove Webhook if possible
    //let feedDbEntry = await OutageFeedModel.findOne({ serverId: interaction.guildId });
    let feedDbEntry = OutageFeedJson[`${interaction.guildId}`]["DISCORD_FEED_WEBHOOK_ID"];
    let webhookDeletionMessage = null;

    try {
        await DiscordClient.deleteWebhook(feedDbEntry /* .webhookId */, { reason: localize(interaction.guildLocale, 'DSTATUS_COMMAND_UNSUBSCRIPTION_SUCCESS_AUDIT_LOG', fetchDisplayName(interaction.user, true)) });
    }
    catch (err) {
        await LogDebug(err);
        webhookDeletionMessage = `:warning: ${localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_WEBHOOK_DELETION_FAILED')}`;
    }

    // Delete from DB
    // ********* JSON VERSION OF CODE
    delete OutageFeedJson[`${interaction.guildId}`];

    fs.writeFile('./JsonFiles/Hidden/StatusSubscriptions.json', JSON.stringify(OutageFeedJson, null, 4), async (err) => {
        if ( err ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_UNSUBSCRIPTION_GENERIC') }); return; }
    });


    // ACK to User
    await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_UNSUBSCRIPTION_SUCCESS', `${webhookDeletionMessage != null ? `\n\n${webhookDeletionMessage}` : ""}`) });
    return;


    // ********* PLACEHOLDER FOR WHEN I HAVE THE MONEY TO PAY FOR A FLUFFING DATABASE BECAUSE HOLY FLUFF DIGITALOCEAN ISN'T THE CHEAPEST WHEN IT COMES TO DATABASES
    /* await feedDbEntry.deleteOne()
    .then(async () => {
        await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_UNSUBSCRIPTION_SUCCESS', `${webhookDeletionMessage != null ? `\n\n${webhookDeletionMessage}` : ""}`) });
        return;
    })
    .catch(async (err) => {
        await interaction.editReply({ content: localize(interaction.locale, 'DSTATUS_COMMAND_ERROR_UNSUBSCRIPTION_GENERIC') });
        return;
    }); */

    return;
}
