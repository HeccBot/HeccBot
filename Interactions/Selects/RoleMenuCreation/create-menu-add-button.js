const { StringSelectMenuInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");

module.exports = {
    // Select's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "create-menu-add-button",

    // Select's Description
    Description: `Handles setting the colour of Button for the new Role Button`,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 3,



    /**
     * Executes the Select
     * @param {StringSelectMenuInteraction} interaction 
     */
    async execute(interaction)
    {
        // Grab Role ID & Button Type
        const RoleID = interaction.customId.split("_").pop();
        const ButtonType = interaction.values.shift();

        // Modal for grabbing Button Label/Emoji
        const MenuButtonModal = new ModalBuilder().setCustomId(`create-menu-button-text_${RoleID}_${ButtonType}`).setTitle(localize(interaction.locale, 'ROLE_MENU_SET_BUTTON_LABEL')).addComponents([
            new ActionRowBuilder().addComponents([ new TextInputBuilder().setCustomId("label").setLabel(localize(interaction.locale, 'ROLE_MENU_BUTTON_LABEL')).setMaxLength(80).setStyle(TextInputStyle.Short).setRequired(false) ]),
            new ActionRowBuilder().addComponents([ new TextInputBuilder().setCustomId("emoji").setLabel(localize(interaction.locale, 'ROLE_MENU_BUTTON_EMOJI')).setMaxLength(200).setPlaceholder("<:grass_block:601353406577246208>, ✨").setStyle(TextInputStyle.Short).setRequired(false) ]),
        ]);

        await interaction.showModal(MenuButtonModal);
        return;
    }
}
