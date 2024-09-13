import { API, MessageFlags } from '@discordjs/core';
import { localize } from '../../../Utility/localizeResponses.js';
import { DISCORD_APP_USER_ID } from '../../../config.js';


export const Button = {
    /** The Button's name - set as the START of the Button's Custom ID, with extra data being separated with a "_" AFTER the name
     * @example "buttonName_extraData"
     * @type {String}
     */
    name: "return-action",

    /** Button's Description, mostly for reminding me what it does!
     * @type {String}
     */
    description: "Returns an Action to the original User who triggered it",

    /** Button's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 5,

    /** Runs the Button
     * @param {import('discord-api-types/v10').APIMessageComponentButtonInteraction} interaction 
     * @param {API} api
     * @param {import('discord-api-types/v10').APIUser} interactionUser 
     */
    async executeButton(interaction, api, interactionUser) {
        // Parse params out of Custom ID
        const CustomParams = interaction.data.custom_id.split("_");
        const ActionName = CustomParams[1].toUpperCase();
        const OriginalTriggeringUserId = CustomParams[2];
        const OriginalTargetUserId = CustomParams[3];


        // Ensure User pressing Button isn't the one who originally sent the Action
        if ( (interaction.member?.user?.id === OriginalTriggeringUserId) || (interaction.user?.id === OriginalTriggeringUserId) ) {
            await api.interactions.reply(interaction.id, interaction.token, {
                flags: MessageFlags.Ephemeral,
                content: localize(interaction.locale, 'ACTION_ERROR_CANNOT_RETURN_TO_SENDER')
            });
            return;
        }

        // Ensure User *is* the original target of the Action
        if ( (interaction.member?.user?.id !== OriginalTargetUserId) && (interaction.user?.id !== OriginalTargetUserId) ) {
            await api.interactions.reply(interaction.id, interaction.token, {
                flags: MessageFlags.Ephemeral,
                content: localize(interaction.locale, 'ACTION_ERROR_RETURN_NOT_TARGETED_AT_SELF')
            });
            return;
        }


        // Grab display names
        let originalTriggeringUserName = interaction.message.interaction_metadata?.user.global_name != null ? interaction.message.interaction_metadata?.user.global_name : interaction.message.interaction_metadata?.user.username;
        let originalTargetUserName = interaction.member != undefined && interaction.member?.nick != null ? interaction.member.nick
            : interaction.member != undefined && interaction.member?.nick == null && interaction.member?.user.global_name != null ? interaction.member.user.global_name
            : interaction.member != undefined && interaction.member?.nick == null && interaction.member?.user.global_name == null ? interaction.member.user.username
            : interaction.member == undefined && interaction.user?.global_name != null ? interaction.user.global_name
            : interaction.user.username;

        
        // Construct display message
        let displayMessage = localize('en-GB', `ACTION_RETURN_${ActionName}`, originalTargetUserName, originalTriggeringUserName);


        // ACK while also removing the Button from the original message
        await api.interactions.updateMessage(interaction.id, interaction.token, {
            components: []
        })
        .then(async () => {
            await api.interactions.followUp(DISCORD_APP_USER_ID, interaction.token, {
                allowed_mentions: { parse: [] },
                content: displayMessage
            });
        });

        return;
    }
}
