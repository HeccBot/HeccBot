const { ModalSubmitInteraction, ModalMessageModalSubmitInteraction } = require("discord.js");
const { Collections } = require("../../constants.js");
const { localize } = require("../LocalizationModule.js");

module.exports = {
    /**
     * Handles and runs received Modals
     * @param {ModalSubmitInteraction|ModalMessageModalSubmitInteraction} interaction 
     */
    async Main(interaction)
    {
        // Grab first part of Custom ID
        const ModalCustomId = interaction.customId.split("_").shift();
        const Modal = Collections.Modals.get(ModalCustomId)

        if ( !Modal )
        {
            // Couldn't find the file for this Modal
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'MODAL_ERROR_GENERIC')}` });
            return;
        }


        // Attempt to process Modal
        try { await Modal.execute(interaction); }
        catch (err)
        {
            //console.error(err);
            if ( interaction.deferred )
            {
                await interaction.editReply({ content: `${localize(interaction.locale, 'MODAL_ERROR_GENERIC')}` });
            }
            else
            {
                await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'MODAL_ERROR_GENERIC')}` });
            }
        }

        return;
    }
}
