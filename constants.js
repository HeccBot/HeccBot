const { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder, StringSelectMenuInteraction, ButtonBuilder, User, GuildMember, StringSelectMenuBuilder } = require("discord.js");
const { StatuspageUpdates } = require("statuspage.js");
const { DiscordStatusPageID } = require("./config.js");
const { VoiceConnection, AudioPlayer } = require("@discordjs/voice");

module.exports =
{
    // Discord Client representing the Bot/App
    DiscordClient: new Client({
        intents: [
            GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildVoiceStates
        ],
        partials: [ Partials.Message ]
    }),
    // StatusPage Client
    DiscordStatusClient: new StatuspageUpdates(DiscordStatusPageID, 10000),


    // Collections that are used in many locations
    Collections: {
        TextCommands: new Collection(),
        SlashCommands: new Collection(),
        ContextCommands: new Collection(),
        Buttons: new Collection(),
        Selects: new Collection(),
        Modals: new Collection(),

        TextCooldowns: new Collection(),
        SlashCooldowns: new Collection(),
        ContextCooldowns: new Collection(),
        ButtonCooldowns: new Collection(),
        SelectCooldowns: new Collection(),

        /** @type {Collection<String, {type: String, embed: EmbedBuilder, roles: Array<{id: String, style: String, emoji: ?String, label: ?String}>, buttons: Array<ButtonBuilder>, interaction: ?StringSelectMenuInteraction, timeout: NodeJS.Timeout}>} */
        RoleMenuCreation: new Collection(),
        /** @type {Collection<String, {type: String, originMessageId: String, embed: EmbedBuilder, roles: Array<{id: String, style: String, emoji: ?String, label: ?String}>, buttons: Array<ButtonBuilder>, interaction: ?StringSelectMenuInteraction, timeout: NodeJS.Timeout}>} */
        RoleMenuConfiguration: new Collection(),

        /** @type {Collection<String, {type: String, embed: EmbedBuilder, choices: Array<{name: String, label: ?String, emoji: ?String}>, select: StringSelectMenuBuilder, buttons: Array<ButtonBuilder>, interaction: ?StringSelectMenuInteraction, timeout: NodeJS.Timeout}>} */
        PollCreation: new Collection(),

        /** Contains Message IDs for each Incident, mapped by Webhook IDs, all mapped by Incident IDs
         * @type {Collection<String, Collection<String, String>} */
        DiscordStatusUpdates: new Collection(),

        /** Holds the cache for the Karaoke Music Player, mapped by Guild IDs
         * @type {Collection<String, {connection: VoiceConnection, player: AudioPlayer}}
         */
        KaraokeCache: new Collection()
    },


    /**
     * Checks the Tag/Discrim of the given User object, to see if they're on the new Username system or not
     * @param {User} user User object to check
     * 
     * @returns {Boolean} True if on the new Username system
     */
    checkPomelo(user)
    {
        if ( user.discriminator === "0" ) { return true; }
        else { return false; }
    },


    /**
     * Fetches the highest-level Display Name for the provided User or Member
     * @param {User|GuildMember} userMember User or Member object
     * @param {Boolean?} skipNicknames Set to True to skip Server Nicknames
     * 
     * @returns {String} The Username, Display Name or Nickname of the User/Member Object - whichever's highest
     */
    fetchDisplayName(userMember, skipNicknames)
    {
        let highestName = "";
        let isPomelo = false;
        if ( (userMember instanceof GuildMember) && userMember.user.discriminator === "0" ) { isPomelo = true; }
        if ( (userMember instanceof User) && userMember.discriminator === "0" ) { isPomelo = true; }

        // Usernames
        highestName = userMember instanceof GuildMember ? `@${userMember.user.username}${isPomelo ? "" : `#${userMember.user.discriminator}`}`
            : `@${userMember.username}${isPomelo ? "" : `#${userMember.discriminator}`}`;
        
        // Display Names
        if ( (userMember instanceof User) && (userMember.globalName != null) ) { highestName = userMember.globalName; }
        if ( (userMember instanceof GuildMember) && (userMember.user.globalName != null) ) { highestName = userMember.user.globalName; }

        // Server Nicknames
        if ( !skipNicknames && (userMember instanceof GuildMember) && (userMember.nickname != null) ) { highestName = userMember.nickname; }

        return highestName;
    }
}
