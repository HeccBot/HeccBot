const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Colors, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { DiscordClient } = require("../../../constants");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "help",

    // Command's Description
    Description: `Shows more information about HeccBot and its official links.`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Shows more information about HeccBot and its official links.`,
        'en-US': `Shows more information about HeccBot and its official links.`
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
        // Construct Buttons
        const ChangelogButton = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'HELP_COMMAND_INDEX_BUTTON_CHANGELOG')).setURL("https://github.com/HeccBot/HeccBot/releases");
        const PrivacyButton = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'HELP_COMMAND_INDEX_BUTTON_PRIVACY')).setURL("https://github.com/HeccBot/HeccBot/blob/main/PRIVACY_POLICY.md");
        const TermsButton = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'HELP_COMMAND_INDEX_BUTTON_TERMS')).setURL("https://github.com/HeccBot/HeccBot/blob/main/TERMS_OF_SERVICE.md");
        const GithubButton = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'HELP_COMMAND_INDEX_BUTTON_GITHUB')).setURL("https://github.com/HeccBot/HeccBot/");
        const SupportButton = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'HELP_COMMAND_INDEX_BUTTON_SUPPORT_SERVER')).setURL("https://discord.gg/4bFgUyWUMY");
        const InviteButton = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'HELP_COMMAND_INDEX_BUTTON_INVITE_BOT')).setURL("https://discord.com/api/oauth2/authorize?client_id=784058687412633601");

        // Construct Select
        const HelpSelect = new StringSelectMenuBuilder().setCustomId("help-pages").setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'HELP_COMMAND_MENU_PLACEHOLDER')).addOptions([
            new StringSelectMenuOptionBuilder().setValue("action-commands").setLabel(localize(interaction.locale, 'HELP_COMMAND_MENU_ACTION_COMMANDS')),
            new StringSelectMenuOptionBuilder().setValue("role-menu").setLabel(localize(interaction.locale, 'HELP_COMMAND_MENU_ROLE_MENU')),
            new StringSelectMenuOptionBuilder().setValue("discord-feed").setLabel(localize(interaction.locale, 'HELP_COMMAND_MENU_DISCORD_OUTAGE_FEED')),
            new StringSelectMenuOptionBuilder().setValue("lock-emoji").setLabel(localize(interaction.locale, 'HELP_COMMAND_MENU_LOCK_EMOJI')),
            new StringSelectMenuOptionBuilder().setValue("info-commands").setLabel(localize(interaction.locale, 'HELP_COMMAND_MENU_INFORMATIONAL_COMMANDS')),
            new StringSelectMenuOptionBuilder().setValue("public-stages").setLabel(localize(interaction.locale, 'HELP_COMMAND_MENU_PUBLIC_STAGES')),
            new StringSelectMenuOptionBuilder().setValue("heccbot-commands").setLabel(localize(interaction.locale, 'HELP_COMMAND_MENU_HECCBOT_COMMANDS')),
            new StringSelectMenuOptionBuilder().setValue("misc-commands").setLabel(localize(interaction.locale, 'HELP_COMMAND_MENU_MISC_COMMANDS')),
            new StringSelectMenuOptionBuilder().setValue("permissions").setLabel(localize(interaction.locale, 'HELP_COMMAND_MENU_PERMISSIONS')),
            new StringSelectMenuOptionBuilder().setValue("context-commands").setLabel(localize(interaction.locale, 'HELP_COMMAND_MENU_CONTEXT_COMMANDS')),
            new StringSelectMenuOptionBuilder().setValue("user-apps").setLabel(localize(interaction.locale, 'HELP_COMMAND_MENU_USER_APPS')),
        ]);

        // Slap into Rows
        const HelpRows = [
            new ActionRowBuilder().addComponents([ ChangelogButton, SupportButton, InviteButton ]),
            new ActionRowBuilder().addComponents([ GithubButton, PrivacyButton, TermsButton ]),
            new ActionRowBuilder().addComponents(HelpSelect)
        ];


        // ACK!
        await interaction.reply({ ephemeral: true, components: HelpRows, content: `${localize(interaction.locale, 'HECCBOT_DESCRIPTION_LONG')}\n\n${localize(interaction.locale, 'HELP_COMMAND_INDEX_MORE_INFORMATION')}` });
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
