import { APIMessageComponentSelectMenuInteraction } from 'discord-api-types/v10';
import { API, MessageFlags } from '@discordjs/core';


module.exports = {
    /** The Select's name - set as the START of the Button's Custom ID, with extra data being separated with a "_" AFTER the name
     * @example "selectName_extraData"
     * @type {String}
     */
    name: "selectName",

    /** Select's Description, mostly for reminding me what it does!
     * @type {String}
     */
    description: "Select's Description",

    /** Select's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 3,

    /** Runs the Select
     * @param {APIMessageComponentSelectMenuInteraction} interaction 
     * @param {API} api
     * @param {APIUser} interactionUser 
     */
    async executeSelect(interaction, api, interactionUser) {
        await api.interactions.reply(interaction.id, interaction.token, { flags: MessageFlags.Ephemeral, content: "This Select Menu has not yet been implemented yet!" });

        return;
    }
}
