const { RoleSelectMenuInteraction, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { Collections } = require("../../../constants");
const { localize } = require("../../../BotModules/LocalizationModule");
const { IMAGE_BUTTON_COLORS } = require("../../../Resources/Hyperlinks");

module.exports = {
    // Select's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "configure-menu-add-role",

    // Select's Description
    Description: `Handles adding a Role to a Role Menu during configuration`,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 3,



    /**
     * Executes the Select
     * @param {RoleSelectMenuInteraction} interaction 
     */
    async execute(interaction)
    {
        // Grab Role
        const InputRole = interaction.roles.first();

        // Validate Role hasn't already been added to this menu
        const RoleDataCache = Collections.RoleMenuConfiguration.get(interaction.guildId).roles;
        let isRoleAdded = RoleDataCache.find(roleObj => roleObj.id === InputRole.id);
        if ( isRoleAdded != undefined )
        {
            await interaction.update({ content: `${localize(interaction.locale, 'ROLE_MENU_ROLE_ADD_INSTRUCTIONS')}\n\n:warning: ${localize(interaction.locale, 'ROLE_MENU_ERROR_ROLE_ALREADY_ON_MENU', `<@&${InputRole.id}>`)}` });
            return;
        }

        // Validate Role is LOWER than Bot's own highest Role
        let botMember = interaction.guild.members.me;
        let roleCompare = interaction.guild.roles.comparePositions(InputRole.id, botMember.roles.highest.id);
        if ( roleCompare >= 0 )
        {
            await interaction.update({ content: `${localize(interaction.locale, 'ROLE_MENU_ROLE_ADD_INSTRUCTIONS')}\n\n:warning: ${localize(interaction.locale, 'ROLE_MENU_ERROR_ROLE_TOO_HIGH', `<@&${InputRole.id}>`, `<@&${botMember.roles.highest.id}>`)}` });
            return;
        }

        // Select for setting the *type* of Button for the Menu
        const ButtonTypeSelect = new ActionRowBuilder().addComponents([
            new StringSelectMenuBuilder().setCustomId(`configure-menu-add-button_${InputRole.id}`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'ROLE_MENU_SELECT_BUTTON_COLOR')).setOptions([
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_BUTTON_BLURPLE')).setValue("blurple"),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_BUTTON_GREEN')).setValue("green"),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_BUTTON_GREY')).setValue("grey"),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_BUTTON_RED')).setValue("red")
            ])
        ]);

        // Update Message for next step - selecting Button Type to use
        await interaction.update({ components: [ButtonTypeSelect], content: localize(interaction.locale, 'ROLE_MENU_BUTTON_SET_INSTRUCTIONS', `<@&${InputRole.id}>`, IMAGE_BUTTON_COLORS) });
        return;
    }
}
