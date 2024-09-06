import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import { GatewayIntentBits, Client } from '@discordjs/core';
import { Collection } from '@discordjs/collection';
import { DISCORD_TOKEN } from '../config.js';


// REST Manager
const DiscordRest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

/** Required Intents */
const RequestedIntents = GatewayIntentBits.Guilds | GatewayIntentBits.GuildIntegrations | GatewayIntentBits.GuildMessages | GatewayIntentBits.GuildVoiceStates;

/** WebSocket Manager for interacting with Discord API. */
const DiscordGateway = new WebSocketManager({
    token: DISCORD_TOKEN,
    intents: RequestedIntents,
    rest: DiscordRest,
});

DiscordGateway.connect();

// *******************************
//  Exports

/** Client for Discord's API events & stuff */
export const DiscordClient = new Client({ rest: DiscordRest, gateway: DiscordGateway });

/** Utility & Command/Interaction Collections */
export const UtilityCollections = {
    /** Holds all Text-based Commands, mapped by Command Name
     * @type {Collection<String, *>} */
    TextCommands: new Collection(),
    
    /** Holds all Slash Commands, mapped by Command Name
     * @type {Collection<String, *>} */
    SlashCommands: new Collection(),
    
    /** Holds all Context Commands, mapped by Command Name
     * @type {Collection<String, *>} */
    ContextCommands: new Collection(),
    
    /** Holds all Button Interactions, mapped by Button Custom ID
     * @type {Collection<String, *>} */
    Buttons: new Collection(),

    /** Holds all Select Menu Interactions, mapped by Select Custom ID
     * @type {Collection<String, *>} */
    Selects: new Collection(),

    /** Holds all Modal Interactions, mapped by Modal Custom ID
     * @type {Collection<String, *>} */
    Modals: new Collection(),

    /** Holds all Cooldowns for Text-based Commands, mapped by "commandName_userID"
     * @type {Collection<String, Number>} 
     */
    TextCooldowns: new Collection(),

    /** Holds all Cooldowns for Slash Commands, mapped by "commandName_userID"
     * @type {Collection<String, Number>} 
     */
    SlashCooldowns: new Collection(),

    /** Holds all Cooldowns for Context Commands, mapped by "commandName_userID"
     * @type {Collection<String, Number>} 
     */
    ContextCooldowns: new Collection(),

    /** Holds all Cooldowns for Button Interactions, mapped by "buttonName_userID"
     * @type {Collection<String, Number>} 
     */
    ButtonCooldowns: new Collection(),

    /** Holds all Cooldowns for Select Menu Interactions, mapped by "selectName_userID"
     * @type {Collection<String, Number>}
     */
    SelectCooldowns: new Collection()
};

/** Should Debug Mode be enabled or not? If enabled, logs all errors/etc to a private Discord Channel
 * @type {Boolean}
 * @default False
 */
export let debugMode = false;
