import { MessageFlags } from 'discord-api-types/v10';
import { API } from '@discordjs/core';
import { UtilityCollections } from '../../Utility/utilityConstants.js';
import { localize } from '../../Utility/localizeResponses.js';
import { logError } from '../../Utility/loggingModule.js';


// *******************************
//  Exports

/**
 * Handles & Runs Context Commands
 * @param {import('discord-api-types/v10').APIContextMenuInteraction} interaction 
 * @param {API} api 
 * 
 * @returns {Boolean|'INVALID_COMMAND'|'COOLDOWN_ACTIVE'|'ERROR_GENERIC'} True if Command found, or custom error otherwise
 */
export async function handleContextCommand(interaction, api) {
    const Command = UtilityCollections.ContextCommands.get(interaction.data.name);

    // If no Command found, return
    if ( !Command ) { 
        await api.interactions.reply(interaction.id, interaction.token, {
            flags: MessageFlags.Ephemeral,
            content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_GENERIC', timeLeft.toFixed(1))
        });
        return 'INVALID_COMMAND';
    }


    // Since `user` and `member` fields can be missing depending on the context the Interaction was invoked in - do a check here for ease
    /** @type {import('discord-api-types/v10').APIUser} */
    let interactionUser;
    
    if ( interaction.user == undefined ) { interactionUser = interaction.member.user; }
    else { interactionUser = interaction.user; }


    // Cooldown Checks
    // Set initial values
    const Now = Date.now();
    const CooldownStartTimestamp = UtilityCollections.ContextCooldowns.get(`${interaction.data.name}_${interactionUser.id}`);
    const CooldownAmount = ( Command.cooldown || 3 ) * 1000;

    // If an active Cooldown exists, show error. Otherwise, continue with executing Command
    if ( CooldownStartTimestamp != undefined ) {
        const ExpirationTime = CooldownStartTimestamp + CooldownAmount;

        if ( Now < ExpirationTime ) {
            let timeLeft = ( ExpirationTime - Now ) / 1000; // How much time is left of cooldown, in seconds

            // MINUTES
            if ( timeLeft >= 60 && timeLeft < 3600 ) {
                timeLeft = timeLeft / 60; // For UX
                await api.interactions.reply(interaction.id, interaction.token, {
                    flags: MessageFlags.Ephemeral,
                    content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_COOLDOWN_MINUTES', timeLeft.toFixed(1))
                });
                return 'COOLDOWN_ACTIVE';
            }
            // HOURS
            else if ( timeLeft >= 3600 && timeLeft < 86400 ) {
                timeLeft = timeLeft / 3600; // For UX
                await api.interactions.reply(interaction.id, interaction.token, {
                    flags: MessageFlags.Ephemeral,
                    content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_COOLDOWN_HOURS', timeLeft.toFixed(1))
                });
                return 'COOLDOWN_ACTIVE';
            }
            // DAYS
            else if ( timeLeft >= 86400 && timeLeft < 2.628e+6 ) {
                timeLeft = timeLeft / 86400; // For UX
                await api.interactions.reply(interaction.id, interaction.token, {
                    flags: MessageFlags.Ephemeral,
                    content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_COOLDOWN_DAYS', timeLeft.toFixed(1))
                });
                return 'COOLDOWN_ACTIVE';
            }
            // MONTHS
            else if ( timeLeft >= 2.628e+6 ) {
                timeLeft = timeLeft / 2.628e+6; // For UX
                await api.interactions.reply(interaction.id, interaction.token, {
                    flags: MessageFlags.Ephemeral,
                    content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_COOLDOWN_MONTHS', timeLeft.toFixed(1))
                });
                return 'COOLDOWN_ACTIVE';
            }
            // SECONDS
            else {
                await api.interactions.reply(interaction.id, interaction.token, {
                    flags: MessageFlags.Ephemeral,
                    content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_COOLDOWN_SECONDS', timeLeft.toFixed(1))
                });
                return 'COOLDOWN_ACTIVE';
            }
        }
    }
    else {
        // Create new Cooldown
        UtilityCollections.ContextCooldowns.set(`${interaction.data.name}_${interactionUser.id}`, Now);
        setTimeout(() => UtilityCollections.ContextCooldowns.delete(`${interaction.data.name}_${interactionUser.id}`), CooldownAmount);
    }


    // Attempt to execute Command
    try { await Command.executeCommand(interaction, api, interactionUser); }
    catch (err) {
        await logError(err, api);
        await api.interactions.reply(interaction.id, interaction.token, {
            flags: MessageFlags.Ephemeral,
            content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_GENERIC')
        });
    }

    return;
}
