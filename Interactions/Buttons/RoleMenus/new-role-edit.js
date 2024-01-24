const { interaction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { Collections } = require("../../../constants");
const { localize } = require("../../../BotModules/LocalizationModule");

module.exports = {
    // Button's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "new-role-edit",

    // Button's Description
    Description: `Edits a Role Button on a Role Menu during Menu creation`,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 3,



    /**
     * Executes the Button
     * @param {interaction} interaction 
     */
    async execute(interaction)
    {
        // Grab cache & Role ID
        const RoleDataCache = Collections.RoleMenuCreation.get(interaction.guildId).roles;
        const RoleID = interaction.customId.split("_").pop();
        let currentLabel = null;
        let currentEmoji = null;

        // Grab current Label/Emoji
        for ( let i = 0; i <= RoleDataCache.length - 1; i++ )
        {
            if ( RoleDataCache[i].id === RoleID )
            {
                currentLabel = RoleDataCache[i].label;
                currentEmoji = RoleDataCache[i].emoji;
                break;
            }
        }

        // Construct & Display Modal for editing Button Label/Emoji
        const EditButtonModal = new ModalBuilder().setCustomId(`create-menu-edit-button_${RoleID}`).setTitle(`${localize(interaction.locale, 'ROLE_MENU_EDIT_BUTTON_LABEL')}`).addComponents([
            new ActionRowBuilder().addComponents([ new TextInputBuilder().setCustomId(`label`).setLabel(`${localize(interaction.locale, 'ROLE_MENU_BUTTON_LABEL')}`).setMaxLength(80).setStyle(TextInputStyle.Short).setRequired(false).setValue(currentLabel != null ? currentLabel : "") ]),
            new ActionRowBuilder().addComponents([ new TextInputBuilder().setCustomId(`emoji`).setLabel(`${localize(interaction.locale, 'ROLE_MENU_BUTTON_EMOJI')}`).setMaxLength(200).setPlaceholder(`<:grass_block:601353406577246208>, ✨`).setStyle(TextInputStyle.Short).setRequired(false).setValue(currentEmoji != null ? currentEmoji : "") ])
        ]);

        await interaction.showModal(EditButtonModal);
        return;
    }
}
