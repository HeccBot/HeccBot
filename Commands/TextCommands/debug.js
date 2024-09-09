import { MessageReferenceType } from 'discord-api-types/v10';
import { API } from '@discordjs/core';
import { debugMode } from '../../Utility/utilityConstants.js';


export const TextCommand = {
    /** Command's Name, in fulllowercase (can include hyphens)
     * @type {String}
     */
    name: "debug",

    /** Aliases of the Command's Name (ie: alt names for the Command)
     * @type {Array<String>}
     */
    alias: [],

    /** Command's Description
     * @type {String}
     */
    description: "Toggles Debug Mode for this App",

    /** Command's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 3,

    /** Are Arguments required?
     * @type {Boolean}
     */
    argumentsRequired: false,

    /** Minimum number of Arguments required
     * NOTE: Requires "argumentsRequired" to be true if setting to an non-zero integer
     * NOTE 2: Set to 0 for no minimum requirement
     * @type {Number}
     */
    minimumArguments: 0,

    /** Maximum number of Arguments allowed
     * NOTE: Does NOT require "argumentsRequired" to be true
     * NOTE 2: Set to 0 for no maximum limit
     * NOTE 3: Should be MORE then minimumArguments if set to a non-zero integer
     * @type {Number}
     */
    maximumArguments: 0,

    /** Minimum required Permission level to be able to use this Command.
     * @type {'APP_DEVELOPER'|'EVERYONE'}
     */
    minimumPermission: 'APP_DEVELOPER',

    /** Runs the Command
     * @param {import('discord-api-types/v10').GatewayMessageCreateDispatchData} message 
     * @param {API} api
     * @param {Array<String>} commandArguments
     */
    async executeCommand(message, api, commandArguments) {
        
        // Toggle Debug Mode
        if ( debugMode ) {
            debugMode = false;

            await api.channels.createMessage(message.channel_id, {
                allowed_mentions: { replied_user: false, parse: [] },
                message_reference: { type: MessageReferenceType.Default, guild_id: message.guild_id, channel_id: message.channel_id, message_id: message.id },
                content: "Successfully turned **off** Debug Mode."
            });
        }
        else {
            debugMode = true;

            await api.channels.createMessage(message.channel_id, {
                allowed_mentions: { replied_user: false, parse: [] },
                message_reference: { type: MessageReferenceType.Default, guild_id: message.guild_id, channel_id: message.channel_id, message_id: message.id },
                content: "Successfully turned **on** Debug Mode."
            });
        }

        return;
    }
}
