import { API } from '@discordjs/core';
import { UtilityCollections } from '../../Utility/utilityConstants.js';
import { logError } from '../../Utility/loggingModule.js';
import { localize } from '../../Utility/localizeResponses.js';


// *******************************
//  Exports

/**
 * Handles & Runs Autocompletes
 * @param {import('discord-api-types/v10').APIApplicationCommandAutocompleteInteraction} interaction 
 * @param {API} api 
 * 
 * @returns {Boolean|'INVALID_COMMAND'|'COOLDOWN_ACTIVE'|'ERROR_GENERIC'} True if Interaction found, or custom error otherwise
 */
export async function handleAutocomplete(interaction, api) {
    const Command = UtilityCollections.SlashCommands.get(interaction.data.name);

    // If no Command found, return
    if ( !Command ) { 
        await api.interactions.createAutocompleteResponse(interaction.id, interaction.token, {
            choices: [{ name: localize(interaction.locale, 'AUTOCOMPLETE_ERROR_GENERIC'), value: `INVALID_COMMAND_OPTION` }]
        });
        return 'INVALID_COMMAND';
    }


    // Since `user` and `member` fields can be missing depending on the context the Interaction was invoked in - do a check here for ease
    /** @type {import('discord-api-types/v10').APIUser} */
    let interactionUser;
    
    if ( interaction.user == undefined ) { interactionUser = interaction.member.user; }
    else { interactionUser = interaction.user; }


    // Attempt to execute interaction
    try { await Command.handleAutoComplete(interaction, api, interactionUser); }
    catch (err) {
        await logError(err, api);
        await api.interactions.createAutocompleteResponse(interaction.id, interaction.token, {
            choices: [{ name: localize(interaction.locale, 'AUTOCOMPLETE_ERROR_GENERIC'), value: `AUTOCOMPLETE_ERROR` }]
        });
    }

    return;
}
