import { ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, ApplicationCommandOptionType, PermissionFlagsBits } from 'discord-api-types/v10';
import { API, MessageFlags } from '@discordjs/core';
import * as Canvas from '@napi-rs/canvas';
import { request } from 'undici';
import { localize } from '../../../Utility/localizeResponses.js';
import { logError } from '../../../Utility/loggingModule.js';
import { getInteractionContext } from '../../../Utility/utilityMethods.js';
import { DISCORD_APP_USER_ID } from '../../../config.js';


export const SlashCommand = {
    /** Command's Name, in fulllowercase (can include hyphens)
     * @type {String}
     */
    name: "jail",

    /** Command's Description
     * @type {String}
     */
    description: "Send someone to jail!",

    /** Command's Localised Descriptions
     * @type {import('discord-api-types/v10').LocalizationMap}
     */
    localizedDescriptions: {
        'en-GB': 'Send someone to jail!',
        'en-US': 'Send someone to jail!'
    },

    /** Command's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 5,

    /**
     * Cooldowns for specific Subcommands
     */
    // Where "exampleName" is either the Subcommand's Name, or a combo of both Subcommand Group Name and Subcommand Name
    //  For ease in handling cooldowns, this should also include the root Command name as a prefix
    // In either "rootCommandName_subcommandName" or "rootCommandName_groupName_subcommandName" formats
    subcommandCooldown: {
        "exampleName": 3
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
        CommandData.integration_types = [ ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall ];
        // Contexts - 0 for GUILD, 1 for BOT_DM (DMs with the App), 2 for PRIVATE_CHANNEL (DMs/GDMs that don't include the App).
        //  MUST include at least one. PRIVATE_CHANNEL can only be used if integration_types includes USER_INSTALL
        CommandData.contexts = [ InteractionContextType.Guild, InteractionContextType.PrivateChannel ];
        // Options
        CommandData.options = [
            {
                type: ApplicationCommandOptionType.User,
                name: "target",
                description: "The user to throw in jail",
                description_localizations: {
                    'en-GB': "The user to throw in jail",
                    'en-US': "The user to throw in jail"
                },
                required: true
            },
            {
                type: ApplicationCommandOptionType.String,
                name: "reason",
                description: "An optional custom reason to be added onto the end of the displayed message",
                description_localizations: {
                    'en-GB': "An optional custom reason to be added onto the end of the displayed message",
                    'en-US': "An optional custom reason to be added onto the end of the displayed message"
                },
                required: false,
                max_length: 500
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
        // Grab context this was used in
        const TriggeringCommandContext = getInteractionContext(interaction);


        // Check for permissions to be able to attach the Jailed User image
        let appPermissions = BigInt(interaction.app_permissions);
        
        // Guild Context
        if ( (TriggeringCommandContext === 'GUILD_CONTEXT') && !((appPermissions & PermissionFlagsBits.AttachFiles) == PermissionFlagsBits.AttachFiles) ) {
            await api.interactions.reply(interaction.id, interaction.token, {
                flags: MessageFlags.Ephemeral,
                content: localize(interaction.locale, 'JAIL_COMMAND_ERROR_MISSING_ATTACH_FILES_PERMISSION_GUILD')
            });
            return;
        }

        // User Context
        if ( (TriggeringCommandContext === 'USER_CONTEXT') && !((appPermissions & PermissionFlagsBits.AttachFiles) == PermissionFlagsBits.AttachFiles) ) {
            await api.interactions.reply(interaction.id, interaction.token, {
                flags: MessageFlags.Ephemeral,
                content: localize(interaction.locale, 'JAIL_COMMAND_ERROR_MISSING_ATTACH_FILES_PERMISSION_USER')
            });
            return;
        }

        
        const InputTarget = interaction.data.options.find(option => option.name === "target");
        const InputReason = interaction.data.options.find(option => option.name === "reason");

        // Prevent usage on self
        if ( InputTarget.value === interactionUser.id ) {
            await api.interactions.reply(interaction.id, interaction.token, {
                flags: MessageFlags.Ephemeral,
                content: localize(interaction.locale, 'JAIL_COMMAND_ERROR_CANNOT_JAIL_SELF')
            });
            return;
        }

        // Now defer just in case
        await api.interactions.defer(interaction.id, interaction.token);


        // Create Canvas
        const JailCanvas = Canvas.createCanvas(180, 135);
        const JailCanvasContext = JailCanvas.getContext('2d');

        // Grab Target's profile picture using undici for better performance
        // Check for member server profile picture
        if ( interaction.data.resolved.members?.[InputTarget.value] != null && interaction.data.resolved.members?.[InputTarget.value].avatar != null ) {
            const { body } = await request(`https://cdn.discordapp.com/guilds/${interaction.guild_id}/users/${InputTarget.value}/avatars/${interaction.data.resolved.members?.[InputTarget.value].avatar}.png?size=128`);
            const MemberAvatar = await Canvas.loadImage(await body.arrayBuffer());
            JailCanvasContext.drawImage(MemberAvatar, 26, 3, 128, 128);
        }
        // or use User profile picture if Member not available
        else if ( interaction.data.resolved.users?.[InputTarget.value] != null && interaction.data.resolved.users?.[InputTarget.value].avatar != null ) {
            const { body } = await request(`https://cdn.discordapp.com/avatars/${InputTarget.value}/${interaction.data.resolved.users?.[InputTarget.value].avatar}.png?size=128`);
            const UserAvatar = await Canvas.loadImage(await body.arrayBuffer());
            JailCanvasContext.drawImage(UserAvatar, 26, 3, 128, 128);
        }
        // or I guess the default profile picture if the User doesn't even have that set????
        else if ( interaction.data.resolved.users?.[InputTarget.value] != null && interaction.data.resolved.users?.[InputTarget.value].avatar == null ) {
            const { body } = await request(`https://cdn.discordapp.com/embed/avatars/${(InputTarget.value >> 22) % 6}.png?size=128`);
            const DefaultAvatar = await Canvas.loadImage(await body.arrayBuffer());
            JailCanvasContext.drawImage(DefaultAvatar, 26, 3, 128, 128);
        }

        // Add in Cellbars image, to be overlaid on top of the Profile Picture
        const CallbarsImage = await Canvas.loadImage('./Assets/Images/Cellbars.png');
        JailCanvasContext.drawImage(CallbarsImage, 0, 0, JailCanvas.width, JailCanvas.height);


        // Grab display names
        let senderDisplayName = "";
        let targetDisplayName = "";

        if ( interaction.data.resolved.members?.[InputTarget.value] != null && interaction.data.resolved.members?.[InputTarget.value].nick != null ) { targetDisplayName = interaction.data.resolved.members?.[InputTarget.value].nick; }
        else if ( interaction.data.resolved.users?.[InputTarget.value] != null && interaction.data.resolved.users?.[InputTarget.value].global_name != null ) { targetDisplayName = interaction.data.resolved.users?.[InputTarget.value].global_name; }
        else if ( interaction.data.resolved.users?.[InputTarget.value] != null ) { targetDisplayName = interaction.data.resolved.users?.[InputTarget.value].username; }

        if ( interaction.member != undefined && interaction.member.nick != null ) { senderDisplayName = interaction.member.nick; }
        else if ( interaction.member != undefined && interaction.member.nick == null && interaction.member.user.global_name != null ) { senderDisplayName = interaction.member.user.global_name; }
        else if ( interaction.member != undefined && interaction.member.nick == null && interaction.member.user.global_name == null ) { senderDisplayName = interaction.member.user.username; }
        else if ( interaction.user != undefined && interaction.user.global_name != null ) { senderDisplayName = interaction.user.global_name; }
        else if ( interaction.user != undefined ) { senderDisplayName = interaction.user.username; }


        // Ack!
        await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
            files: [{
                contentType: 'image/png',
                data: await JailCanvas.encode('png'),
                name: `jailed-user-${InputTarget.value}.png`
            }],
            content: `${localize('en-GB', 'JAIL_COMMAND_RESPONSE', targetDisplayName, senderDisplayName)}${InputReason != undefined ? ` ${InputReason.value}` : ''}`,
            attachments: [{
                id: 0,
                filename: `jailed-user-${InputTarget.value}.png`,
                description: `The profile picture of @${interaction.data.resolved.users?.[InputTarget.value].username}, displayed behind prison cell bars, to simulate that user being placed in jail.`
            }],
            allowed_mentions: { parse: [] }
        })
        .catch(async (err) => {
            await logError(err, api);
            await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, { content: localize('en-GB', 'SLASH_COMMAND_ERROR_GENERIC') })
        });

        return;
    }
}
