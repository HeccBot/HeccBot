import { ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, ApplicationCommandOptionType } from 'discord-api-types/v10';
import { API, MessageFlags } from '@discordjs/core';
import { handleActionSlashCommand } from '../../../Modules/ActionModule.js';
import { localize } from '../../../Utility/localizeResponses.js';
import { logError } from '../../../Utility/loggingModule.js';


export const SlashCommand = {
    /** Command's Name, in fulllowercase (can include hyphens)
     * @type {String}
     */
    name: "boop",

    /** Command's Description
     * @type {String}
     */
    description: "Give someone a boop!",

    /** Command's Localised Descriptions
     * @type {import('discord-api-types/v10').LocalizationMap}
     */
    localizedDescriptions: {
        'en-GB': 'Give someone a boop!',
        'en-US': 'Give someone a boop!'
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
                type: ApplicationCommandOptionType.Mentionable,
                name: "target",
                description: "The target you want to boop",
                description_localizations: {
                    'en-GB': "The target you want to boop",
                    'en-US': "The target you want to boop"
                },
                required: true
            },
            {
                type: ApplicationCommandOptionType.Boolean,
                name: "include-gif",
                description: "Should a random GIF be displayed? (default: false)",
                description_localizations: {
                    'en-GB': "Should a random GIF be displayed? (default: false)",
                    'en-US': "Should a random GIF be displayed? (default: false)"
                },
                required: false
            },
            {
                type: ApplicationCommandOptionType.Boolean,
                name: "allow-return",
                description: "Should the \"Return Boop\" button be included? (default: true)",
                description_localizations: {
                    'en-GB': "Should the \"Return Boop\" button be included? (default: true)",
                    'en-US': "Should the \"Return Boop\" button be included? (default: true)"
                },
                required: false
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
        try {
            await handleActionSlashCommand(interaction, api, usedCommandName);
        }
        catch (err) {
            await api.interactions.reply(interaction.id, interaction.token, {
                flags: MessageFlags.Ephemeral,
                content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_GENERIC')
            });
            await logError(err, api);
        }

        return;
    }
}
