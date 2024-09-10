import { ButtonStyle, MessageFlags } from 'discord-api-types/v10';
import { API } from '@discordjs/core';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from '@discordjs/builders';
import * as ActionGifs from '../Assets/ActionGifLinks.json' with { type: 'json' };
import { localize } from '../Utility/localizeResponses.js';
import { getHighestName, getInteractionContext } from '../Utility/utilityMethods.js';
import { DISCORD_APP_USER_ID } from '../config.js';

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
    // Grab input options
    const InputTarget = interaction.data.options.find(option => option.name === "target");
    const InputIncludeGif = interaction.data.options.find(option => option.name === "include-gif");
    const InputAllowReturn = interaction.data.options.find(option => option.name === "allow-return");
    // Just for ease
    const InteractionTriggeringContext = getInteractionContext(interaction);
    const InteractionTriggeringUserId = InteractionTriggeringContext === 'GUILD_CONTEXT' ? interaction.member.user.id : interaction.user.id;
    const InteractionTriggeringUserDisplayName = InteractionTriggeringContext === 'GUILD_CONTEXT' ? getHighestName(interaction.member) : getHighestName(interaction.user);



    // Create "Return Action" button just in case
    const ReturnActionRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`return-action_${interaction.data.name}_${InteractionTriggeringUserId}_${InputTarget.value}`)
            .setStyle(ButtonStyle.Primary)
            .setLabel(localize('en-GB', `ACTION_RETURN_BUTTON_LABEL_${interaction.data.name.toUpperCase()}`))
    );


    // To know if button shouldn't be included - such as when set to FALSE in InputAllowReturn, when InputIncludeGif is TRUE, or when the target is *not* of a User
    let displayButton = false;
    // Override for GIF-less responses - such as when target is a Role, as to prevent accidental Role Pings should the `allow_mentions` field break.
    //   Also, prevents Server Modmins from freaking out even though the Role wasn't actually pinged, just mentioned, since it'll be in an embed NOT in the content field.
    let forceDisplayEmbed = false;
    // For assembling the displayed message content
    let displayMessage = "";


    // atEveryone
    if ( InputTarget.value === interaction.guild_id ) {
        displayMessage = localize('en-GB', `ACTION_COMMAND_EVERYONE_${interaction.data.name.toUpperCase()}`, InteractionTriggeringUserDisplayName);
    }
    // atRole
    else if ( interaction.data.resolved?.roles != undefined ) {
        forceDisplayEmbed = true;
        displayMessage = localize('en-GB', `ACTION_COMMAND_ROLE_${interaction.data.name.toUpperCase()}`, InteractionTriggeringUserDisplayName, `<@&${InputTarget.value}>`);
    }
    // atUser (used on self)
    else if ( InputTarget.value === InteractionTriggeringUserId ) {
        displayMessage = localize('en-GB', `ACTION_COMMAND_SELF_USER_${interaction.data.name.toUpperCase()}`, InteractionTriggeringUserDisplayName);
    }
    // atUser (used on this app)
    else if ( InputTarget.value === DISCORD_APP_USER_ID ) {
        displayMessage = localize('en-GB', `ACTION_COMMAND_TWILITE_${interaction.data.name.toUpperCase()}`, InteractionTriggeringUserDisplayName);
    }
    // atUser (used on the yucky Mee6 app)
    else if ( InputTarget.value === '159985870458322944' ) {
        displayMessage = localize('en-GB', `ACTION_COMMAND_MEE6_${interaction.data.name.toUpperCase()}`, InteractionTriggeringUserDisplayName, `<@159985870458322944>`);
    }
    // atUser (used on any app that isn't TwiLite or Mee6)
    else if ( interaction.data.resolved.users[InputTarget.value]?.bot === true ) {
        displayMessage = localize('en-GB', `ACTION_COMMAND_OTHER_APPS_${interaction.data.name.toUpperCase()}`, InteractionTriggeringUserDisplayName, `<@${InputTarget.value}>`);
    }
    // atUser (used on any human User)
    else {
        // Just so their highest display name can be gained
        let targetDisplayName = "";
        if ( interaction.data.resolved.members != undefined && interaction.data.resolved.members[InputTarget.value].nick != null ) { targetDisplayName = interaction.data.resolved.members[InputTarget.value].nick; }
        else { targetDisplayName = getHighestName(interaction.data.resolved.users[InputTarget.value]); }

        // Allow Return Action button to display
        displayButton = true;

        displayMessage = localize('en-GB', `ACTION_COMMAND_OTHER_USER_${interaction.data.name.toUpperCase()}`, InteractionTriggeringUserDisplayName, targetDisplayName);
    }


    // Hide Return Action button if requested by the User
    if ( InputAllowReturn?.value === false ) { displayButton = false; }
    // Also hide Return Action button if this is an Action Command that does not support it
    if ( ButtonlessActions.includes(interaction.data.name) ) { displayButton = false; }


    // GIF was requested to be included
    //   Also ignores the Button
    if ( InputIncludeGif?.value === true ) {
        const GifEmbed = new EmbedBuilder()
            .setDescription(displayMessage)
            .setImage(ActionGifs[interaction.data.name][Math.floor(( Math.random() * ActionGifs[interaction.data.name].length ) + 0)])
            .setColor(interaction.data.resolved.roles != undefined ? interaction.data.resolved.roles[InputTarget.value].color : null);

        await api.interactions.reply(interaction.id, interaction.token, {
            allowed_mentions: { parse: [], users: ['159985870458322944'] },
            embeds: [GifEmbed]
        });
        
        return;
    }
    // GIF was NOT requested to be included
    else {
        // Embed was force-enabled for response
        if ( forceDisplayEmbed ) {
            const ActionEmbed = new EmbedBuilder()
                .setDescription(displayMessage)
                .setColor(interaction.data.resolved.roles != undefined ? interaction.data.resolved.roles[InputTarget.value].color : null);
            
            await api.interactions.reply(interaction.id, interaction.token, {
                allowed_mentions: { parse: [], users: ['159985870458322944'] },
                embeds: [ActionEmbed]
            });
        }
        else {
            // Check for button inclusion
            if ( displayButton ) {
                await api.interactions.reply(interaction.id, interaction.token, {
                    allowed_mentions: { parse: [], users: ['159985870458322944'] },
                    content: displayMessage,
                    components: [ReturnActionRow]
                });

                // Auto-remove button after around 5 minutes, to keep chats clean & to prevent returns to old command usages
                setTimeout(async () => {
                    await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, { components: [] }, '@original');
                    return;
                }, 60_000);
            }
            else {
                await api.interactions.reply(interaction.id, interaction.token, {
                    allowed_mentions: { parse: [], users: ['159985870458322944'] },
                    content: displayMessage
                });
            }
        }
    }

    return;
}
