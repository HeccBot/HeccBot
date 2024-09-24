import { MessageFlags } from 'discord-api-types/v10';
import { API } from '@discordjs/core';
import { UtilityCollections } from '../../Utility/utilityConstants.js';
import { logError } from '../../Utility/loggingModule.js';
import { localize } from '../../Utility/localizeResponses.js';


// *******************************
//  Exports

/**
 * Handles & Runs Buttons
 * @param {import('discord-api-types/v10').APIModalSubmitInteraction} interaction 
 * @param {API} api 
 * 
 * @returns {Boolean|'INVALID'|'COOLDOWN_ACTIVE'|'ERROR_GENERIC'} True if Interaction found, or custom error otherwise
 */
export async function handleModal(interaction, api) {
    // Grab modal's name from Custom ID
    const ModalName = interaction.data.custom_id.split("_").shift();
    const Modal = UtilityCollections.Modals.get(ModalName);

    // If no Modal found, return
    if ( !Modal ) { 
        await api.interactions.reply(interaction.id, interaction.token, {
            flags: MessageFlags.Ephemeral,
            content: localize(interaction.locale, 'MODAL_ERROR_GENERIC', timeLeft.toFixed(1))
        });
        return 'INVALID';
    }


    // Since `user` and `member` fields can be missing depending on the context the Interaction was invoked in - do a check here for ease
    /** @type {import('discord-api-types/v10').APIUser} */
    let interactionUser;
    
    if ( interaction.user == undefined ) { interactionUser = interaction.member.user; }
    else { interactionUser = interaction.user; }


    // Attempt to execute Interaction
    try { await Modal.executeModal(interaction, api, interactionUser); }
    catch (err) {
        await logError(err, api);
        await api.interactions.reply(interaction.id, interaction.token, {
            flags: MessageFlags.Ephemeral,
            content: localize(interaction.locale, 'MODAL_ERROR_GENERIC')
        });
    }

    return;
}
