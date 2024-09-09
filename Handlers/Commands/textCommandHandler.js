import { API } from '@discordjs/core';
import { APP_DEVELOPER_USER_ID, DISCORD_APP_USER_ID, TEXT_COMMAND_PREFIX } from '../../config.js';
import { UtilityCollections } from '../../Utility/utilityConstants.js';
import { logError } from '../../Utility/loggingModule.js';


/**
 * Handles escaping Prefix Regex
 * @param {String} str
 */
function escapePrefix(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


// *******************************
//  Exports

/**
 * Handles & Runs Text-based Commands in Messages, if a Command is found
 * @param {import('discord-api-types/v10').GatewayMessageCreateDispatchData} message 
 * @param {API} api 
 * 
 * @returns {Boolean|'NOT_A_COMMAND'|'INVALID_COMMAND'|'INVALID_SCOPE'|'INVALID_PERMISSION'|'INVALID_ARGUMENTS'|'COOLDOWN_ACTIVE'|'ERROR_GENERIC'} True if Command found, or custom error otherwise
 */
export async function handleTextCommand(message, api) {
    // Check for Prefix (including use of @mention as a Prefix)
    const PrefixRegex = new RegExp(`^(<@!?${DISCORD_APP_USER_ID}>|${escapePrefix(TEXT_COMMAND_PREFIX)})\\s*`);

    // No prefix found, thus not an attempt to use a Text Command
    if ( !PrefixRegex.test(message.content) ) { return 'NOT_A_COMMAND'; }

    // Slice off Prefix & assemble Command
    const [, MatchedPrefix] = message.content.match(PrefixRegex);
    const Arguments = message.content.slice(MatchedPrefix.length).trim().split(/ +/);
    const CommandName = Arguments.shift().toLowerCase();
    const Command = UtilityCollections.TextCommands.get(CommandName) || UtilityCollections.TextCommands.find(cmd => cmd.alias && cmd.alias.includes(CommandName));

    // If no Command found, return
    if ( !Command ) { return 'INVALID_COMMAND'; }


    // Command Permission Requirement Checks
    switch ( Command.minimumPermission ) {
        case 'DEVELOPER':
            if ( message.author.id !== APP_DEVELOPER_USER_ID ) {
                await api.channels.createMessage(message.channel_id, {
                    allowed_mentions: { parse: [], replied_user: false },
                    content: `Sorry, but that Command can only be used by my developer!`
                });
                return 'INVALID_PERMISSION';
            }
            break;

        case 'EVERYONE':
        default:
            break;
    }


    // Command Argument Checks
    //  Requires Arguments Check
    if ( Command.argumentsRequired && (!Arguments.length || Arguments.length === 0) ) {
        await api.channels.createMessage(message.channel_id, {
            allowed_mentions: { parse: [], replied_user: false },
            content: `Sorry, but this Command requires arguments to be included in its usage.`
        });
        return 'INVALID_ARGUMENTS';
    }

    // Minimum Argument count Check
    if ( Command.argumentsRequired && Arguments.length < Command.minimumArguments ) {
        await api.channels.createMessage(message.channel_id, {
            allowed_mentions: { parse: [], replied_user: false },
            content: `Sorry, this Command requires a **minimum** of ${Command.minimumArguments} arguments. You only provided ${Arguments.length} arguments.`
        });
        return 'INVALID_ARGUMENTS';
    }

    // Maximum Argument count Check
    if ( Arguments.length > Command.maximumArguments ) {
        await api.channels.createMessage(message.channel_id, {
            allowed_mentions: { parse: [], replied_user: false },
            content: `Sorry, this Command does not support more than ${Command.maximumArguments} arguments in its Command usage. You included ${Arguments.length} arguments.`
        });
        return 'INVALID_ARGUMENTS';
    }


    // Cooldown Checks
    // Set initial values
    const Now = Date.now();
    const CooldownStartTimestamp = UtilityCollections.TextCooldowns.get(`${Command.name}_${message.author.id}`);
    const CooldownAmount = ( Command.cooldown || 3 ) * 1000;

    // If an active Cooldown exists, show error. Otherwise, continue with executing Command
    if ( CooldownStartTimestamp != undefined ) {
        const ExpirationTime = CooldownStartTimestamp + CooldownAmount;

        if ( Now < ExpirationTime ) {
            let timeLeft = ( ExpirationTime - Now ) / 1000; // How much time is left of cooldown, in seconds

            // MINUTES
            if ( timeLeft >= 60 && timeLeft < 3600 ) {
                timeLeft = timeLeft / 60; // For UX
                await api.channels.createMessage(message.channel_id, {
                    allowed_mentions: { parse: [], replied_user: false },
                    content: `Please wait ${timeLeft.toFixed(1)} more minutes before using this Command again.`
                });
                return 'COOLDOWN_ACTIVE';
            }
            // HOURS
            else if ( timeLeft >= 3600 && timeLeft < 86400 ) {
                timeLeft = timeLeft / 3600; // For UX
                await api.channels.createMessage(message.channel_id, {
                    allowed_mentions: { parse: [], replied_user: false },
                    content: `Please wait ${timeLeft.toFixed(1)} more hours before using this Command again.`
                });
                return 'COOLDOWN_ACTIVE';
            }
            // DAYS
            else if ( timeLeft >= 86400 && timeLeft < 2.628e+6 ) {
                timeLeft = timeLeft / 86400; // For UX
                await api.channels.createMessage(message.channel_id, {
                    allowed_mentions: { parse: [], replied_user: false },
                    content: `Please wait ${timeLeft.toFixed(1)} more days before using this Command again.`
                });
                return 'COOLDOWN_ACTIVE';
            }
            // MONTHS
            else if ( timeLeft >= 2.628e+6 ) {
                timeLeft = timeLeft / 2.628e+6; // For UX
                await api.channels.createMessage(message.channel_id, {
                    allowed_mentions: { parse: [], replied_user: false },
                    content: `Please wait ${timeLeft.toFixed(1)} more months before using this Command again.`
                });
                return 'COOLDOWN_ACTIVE';
            }
            // SECONDS
            else {
                await api.channels.createMessage(message.channel_id, {
                    allowed_mentions: { parse: [], replied_user: false },
                    content: `Please wait ${timeLeft.toFixed(1)} more seconds before using this Command again.`
                });
                return 'COOLDOWN_ACTIVE';
            }
        }
    }
    else {
        // Create new Cooldown
        UtilityCollections.TextCooldowns.set(`${Command.name}_${message.author.id}`, Now);
        setTimeout(() => UtilityCollections.TextCooldowns.delete(`${Command.name}_${message.author.id}`), CooldownAmount);
    }


    // Attempt to execute Command
    try { await Command.executeCommand(message, api, Arguments); }
    catch (err) {
        await logError(err, api);
        await api.channels.createMessage(message.channel_id, {
            allowed_mentions: { parse: [], replied_user: false },
            content: `An error occurred while trying to process that Command...`
        });
    }

    return;
}
