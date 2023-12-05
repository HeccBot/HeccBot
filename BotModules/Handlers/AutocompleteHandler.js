const { AutocompleteInteraction } = require("discord.js");
const { Collections } = require("../../constants.js");
const { localize } = require("../LocalizationModule.js");
const { LogToUser, LogError } = require("../LoggingModule.js");

module.exports = {
    /**
     * Handles and runs received Autocomplete Interactions
     * @param {AutocompleteInteraction} interaction 
     */
    async Main(interaction)
    {
        // Find Slash Command with matching name
        const SlashCommand = Collections.SlashCommands.get(interaction.commandName);
        if ( !SlashCommand ) { await interaction.respond([{name: `${localize(interaction.locale, 'AUTOCOMPLETE_ERROR_GENERIC')}`, value: "ERROR_FAILED"}]); return; }

        // Pass to Command's Autocomplete Method
        try { await SlashCommand.autocomplete(interaction); }
        catch(err)
        {
            await LogError(err);
            await interaction.respond([{name: `${localize(interaction.locale, 'AUTOCOMPLETE_ERROR_GENERIC')}`, value: "ERROR_FAILED"}]);
        }

        return;
    }
}
