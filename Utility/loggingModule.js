import { API } from "@discordjs/core";
import { LOG_WEBHOOK_ID, LOG_WEBHOOK_TOKEN } from "../config.js";
import { debugMode } from "./utilityConstants.js";


/**
 * Logs INFO messages
 * @param {String} message Custom string to send to Debug logs. Max 2000 characters.
 * @param {API} api 
 */
export async function logInfo(message, api)
{
    // Log to console first
    console.log(`[INFO] ${message}`);

    // If DEBUG mode is enabled, log to private logging Channel
    if ( debugMode ) {
        await api.webhooks.execute(LOG_WEBHOOK_ID, LOG_WEBHOOK_TOKEN, {
            allowed_mentions: { parse: [] },
            content: `## INFO\n\`\`\`${message.slice(0, 1990)}\`\`\``
        })
        .catch(console.error);
    }

    return;
}





/**
 * Logs WARNINGS
 * @param {?String} message Custom string to send to Debug logs. Max 2000 characters.
 * @param {?Error} warning
 * @param {API} api 
 */
export async function logWarn(message, warning, api)
{
    if ( message != null ) {
        // Log to console first
        console.warn(`[WARN] ${message}`);

        // If DEBUG mode is enabled, log to private logging Channel
        if ( debugMode ) {
            await api.webhooks.execute(LOG_WEBHOOK_ID, LOG_WEBHOOK_TOKEN, {
                allowed_mentions: { parse: [] },
                content: `## WARN\n\`\`\`${message.slice(0, 2000)}\`\`\``
            })
            .catch(console.error);
        }
    }

    if ( warning != null ) {
        // Log to console first
        console.warn(warning);

        // If DEBUG mode is enabled, log to private logging Channel
        if ( debugMode ) {
            await api.webhooks.execute(LOG_WEBHOOK_ID, LOG_WEBHOOK_TOKEN, {
                allowed_mentions: { parse: [] },
                content: `## WARN\n\`\`\`${warning}\`\`\``.slice(0, 1990)
            })
            .catch(console.error);
        }
    }

    return;
}





/**
 * Logs ERRORS
 * @param {Error} error
 * @param {API} api 
 */
export async function logError(error, api)
{
    // Log to console first
    console.error(error);

    // If DEBUG mode is enabled, log to private logging Channel
    if ( debugMode ) {
        await api.webhooks.execute(LOG_WEBHOOK_ID, LOG_WEBHOOK_TOKEN, {
            allowed_mentions: { parse: [] },
            content: `## ERROR\n\`\`\`${error.name}: ${error.message}\n\n${error.stack}\`\`\``.slice(0, 1990)
        })
        .catch(console.error);
    }

    return;
}





/**
 * Logs DEBUG messages
 * @param {String|Error} message Error object OR a custom string to send to Debug logs. Max 2000 characters for custom string.
 * @param {API} api 
 */
export async function logDebug(message, api)
{
    // Log to console first
    console.debug(`[DEBUG] ${message}`);

    // If DEBUG mode is enabled, log to private logging Channel
    if ( debugMode ) {
        await api.webhooks.execute(LOG_WEBHOOK_ID, LOG_WEBHOOK_TOKEN, {
            allowed_mentions: { parse: [] },
            content: `## DEBUG\n\`\`\`${message}\`\`\``.slice(0, 1990)
        })
        .catch(console.error);
    }

    return;
}
