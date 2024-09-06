import { MessageFlags } from 'discord-api-types/v10';
import { API } from '@discordjs/core';

/** Actions excluding from including the Return Action Button */
const ButtonlessActions = [ "jail", "yeet", "cookie" ];

// REGEXS
const MentionEveryoneRegex = new RegExp(/@(everyone|here)/g);
const MentionRoleRegex = new RegExp(/<@&(\d{17,20})>/g);


/**
 * Tests for the Everyone/Here Mentions in a string. Optionally returns the result if slice is True
 * @param {String} string
 * @param {Boolean} [slice] True if wanting to return the matching sub-string instead of the result of the RegEx test
 * 
 * @returns {Boolean|String}
 */
function TestForEveryoneMention(string, slice) {
    if ( !slice ) {
        return MentionEveryoneRegex.test(string);
    }
    else {
        let testString = MentionEveryoneRegex.test(string);
        if ( !testString ) {
            return false;
        }
        else {
            return string.replace('@', '');
        }
    }
}


/**
 * Tests for Role Mentions in a string. Optionally returns the result if slice is True
 * @param {String} string
 * @param {Boolean} [slice] True if wanting to return the matching sub-string instead of the result of the RegEx test
 * 
 * @returns {Boolean|String}
 */
function TestForRoleMention(string, slice) {
    if ( !slice ) {
        return MentionRoleRegex.test(string);
    }
    else {
        let testString = MentionRoleRegex.test(string);
        if ( !testString ) {
            return false;
        }
        else {
            return string.replace('<@&', '').replace('>', '');
        }
    }
}




// *******
// EXPORTS

/**
 * Handles all Action Slash Commands (except /jail)
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction
 * @param {API} api
 * @param {String} commandName
 */
export async function handleActionSlashCommand(interaction, api, commandName) {
    // Grab inputted data from Slash Command
    console.log(interaction.data);
    //const TargetOption = interaction.data.options?.find("target").value;
    await api.interactions.reply(interaction.id, interaction.token, { flags: MessageFlags.Ephemeral, content: `Test` });

    return;
}
