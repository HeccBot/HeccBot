const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Colors } = require("discord.js");
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
    Category: "GENERAL",

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
        Data.descriptionLocalizations = this.LocalisedDescriptions;
        Data.type = ApplicationCommandType.ChatInput;
        Data.dmPermission = true;

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
        const SupportButton = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'HELP_COMMAND_INDEX_BUTTON_SUPPORT_SERVER')).setURL("https://discord.gg/vyvCGC6R2E");
        const InviteButton = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'HELP_COMMAND_INDEX_BUTTON_INVITE_BOT')).setURL("https://discord.com/api/oauth2/authorize?client_id=784058687412633601&permissions=274878221312&scope=applications.commands%20bot");
        const HelpRows = [
            new ActionRowBuilder().addComponents([ ChangelogButton, SupportButton, InviteButton ]),
            new ActionRowBuilder().addComponents([ GithubButton, PrivacyButton, TermsButton ])
        ];


        // Construct Embed
        const HelpEmbed = new EmbedBuilder().setColor(Colors.Aqua)
        .setAuthor({ name: DiscordClient.user.username, iconURL: DiscordClient.user.displayAvatarURL({ extension: 'png' }) })
        .setDescription(`${localize(interaction.locale, 'HECCBOT_DESCRIPTION_LONG')}\n\n${localize(interaction.locale, 'HELP_COMMAND_INDEX_MORE_INFORMATION')}`);

        // ACK!
        await interaction.reply({ embeds: [HelpEmbed], components: HelpRows });
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
