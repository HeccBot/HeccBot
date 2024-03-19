const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { HECCBOT_SUPPORT_SERVER_INVITE } = require("../../../Resources/Hyperlinks");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "support",

    // Command's Description
    Description: `Brings up a link to join HeccBot's Support Server with`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Brings up a link to join HeccBot's Support Server with`,
        'en-US': `Brings up a link to join HeccBot's Support Server with`
    },

    // Command's Category
    Category: "HECCBOT",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 10,

    // Cooldowns for specific subcommands and/or subcommand-groups
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandCooldown: {
        "example": 3
    },

    // Scope of Command's usage
    //     One of the following: DM, GUILD, ALL
    Scope: "GUILD",

    // Scope of specific Subcommands Usage
    //     One of the following: DM, GUILD, ALL
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandScope: {
        "example": "GUILD"
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
        Data.description_localizations = this.LocalisedDescriptions;
        Data.type = ApplicationCommandType.ChatInput;
        Data.integration_types = [ 0, 1 ]; // 0 for GUILD_INSTALL, 1 for USER_INSTALL, can include both but must have at least one of them included
        Data.contexts = [ 0, 2 ]; // 0 for GUILD, 1 for BOT_DM (DMs with the Bot), 2 for PRIVATE_CHANNEL (DMs/GDMs that don't include Bot). Must include at least one, PRIVATE_CHANNEL can only be used if integrationTypes includes USER_INSTALL

        return Data;
    },



    /**
     * Executes the Slash Command
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction)
    {
        // Put link into Link Button
        const SupportActionRow = new ActionRowBuilder().addComponents([
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'SUPPORT_COMMAND_BUTTON_LABEL')).setURL(HECCBOT_SUPPORT_SERVER_INVITE)
        ]);

        // ACK
        await interaction.reply({ ephemeral: true, components: [SupportActionRow], content: localize(interaction.locale, 'SUPPORT_COMMAND_RESPONSE') });

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
