const { StringSelectMenuInteraction, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");

module.exports = {
    // Select's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "help-pages",

    // Select's Description
    Description: `Handles showing the specified Help Page in the Help Command`,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 5,



    /**
     * Executes the Select
     * @param {StringSelectMenuInteraction} interaction 
     */
    async execute(interaction)
    {
        // Just so we can get rid of the link buttons from initial page
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
        ]);
        const HelpRow = new ActionRowBuilder().addComponents(HelpSelect);

        // Grab selected page and display its...page
        const SelectedPage = interaction.values.shift();

        switch (SelectedPage)
        {
            case "action-commands":
                await interaction.update({ content: localize(interaction.locale, 'HELP_COMMAND_ACTIONS_PAGE'), components: [HelpRow] });
                break;
                
            case "role-menu":
                await interaction.update({ content: localize(interaction.locale, 'HELP_COMMAND_ROLE_MENU_PAGE'), components: [HelpRow] });
                break;

            case "discord-feed":
                await interaction.update({ content: localize(interaction.locale, 'HELP_COMMAND_DISCORD_FEED_PAGE'), components: [HelpRow] });
                break;

            case "lock-emoji":
                await interaction.update({ content: localize(interaction.locale, 'HELP_COMMAND_LOCK_EMOJI_PAGE'), components: [HelpRow] });
                break;

            case "info-commands":
                await interaction.update({ content: localize(interaction.locale, 'HELP_COMMAND_INFORMATIONAL_COMMANDS_PAGE'), components: [HelpRow] });
                break;

            case "public-stages":
                await interaction.update({ content: localize(interaction.locale, 'HELP_COMMAND_PUBLIC_STAGES_PAGE'), components: [HelpRow] });
                break;

            case "heccbot-commands":
                await interaction.update({ content: localize(interaction.locale, 'HELP_COMMAND_HECCBOT_COMMAND_PAGE'), components: [HelpRow] });
                break;

            case "misc-commands":
                await interaction.update({ content: localize(interaction.locale, 'HELP_COMMAND_MISC_COMMANDS_PAGE'), components: [HelpRow] });
                break;

            case "permissions":
                await interaction.update({ content: localize(interaction.locale, 'HELP_COMMAND_PERMISSIONS_PAGE'), components: [HelpRow] });
                break;

            case "context-commands":
                await interaction.update({ content: localize(interaction.locale, 'HELP_COMMAND_CONTEXT_COMMANDS_PAGE'), components: [HelpRow] });
                break;

            default:
                await interaction.update({ content: localize(interaction.locale, 'SELECT_MENU_ERROR_GENERIC') });
                break;
        }

        return;
    }
}
