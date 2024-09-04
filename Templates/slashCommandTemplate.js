import { LocalizationMap, RESTPostAPIApplicationCommandsJSONBody, APIChatInputApplicationCommandInteraction, APIApplicationCommandAutocompleteInteraction, ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, APIUser } from 'discord-api-types/v10';
import { API, MessageFlags } from '@discordjs/core';


module.exports = {
    /** Command's Name, in fulllowercase (can include hyphens)
     * @type {String}
     */
    name: "command-name",

    /** Command's Description
     * @type {String}
     */
    description: "Command Description",

    /** Command's Localised Descriptions
     * @type {LocalizationMap}
     */
    localizedDescriptions: {
        'en-GB': 'British Description',
        'en-US': 'American Description'
    },

    /** Command's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 3,

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
     * @returns {RESTPostAPIApplicationCommandsJSONBody}
     */
    getRegisterData() {
        /** @type {RESTPostAPIApplicationCommandsJSONBody} */
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

        return CommandData;
    },

    /** Handles given Autocomplete Interactions, should this Command use Autocomplete Options
     * @param {APIApplicationCommandAutocompleteInteraction} interaction 
     * @param {API} api
     * @param {APIUser} interactionUser 
     */
    async handleAutoComplete(interaction, api, interactionUser) {
        await api.interactions.createAutocompleteResponse(interaction.id, interaction.token, { choices: [ {name: "Not implemented yet!", value: "NOT_IMPLEMENTED"} ] });

        return;
    },

    /** Runs the Command
     * @param {APIChatInputApplicationCommandInteraction} interaction 
     * @param {API} api
     * @param {APIUser} interactionUser 
     * @param {String} usedCommandName 
     */
    async executeCommand(interaction, api, interactionUser, usedCommandName) {
        await api.interactions.reply(interaction.id, interaction.token, { flags: MessageFlags.Ephemeral, content: "This Command has not yet been implemented yet!" });

        return;
    }
}
