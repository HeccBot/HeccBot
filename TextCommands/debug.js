const { Message } = require("discord.js");
const { DiscordClient, fetchDisplayName } = require("../constants.js");
const { LogDebug } = require("../BotModules/LoggingModule.js");

module.exports = {
    // Command's Name
    //     Use camelCase or full lowercase
    Name: "debug",

    // Command's Description
    Description: `Toggles Debug Mode for the Bot.`,

    // Command's Category
    Category: "DEVELOPMENT",

    // Alias(es) of Command, if any
    Alias: [],

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 10,

    // Scope of Command's usage
    //     One of the following: DM, GUILD
    Scope: "GUILD",

    // Are arguments required?
    ArgumentsRequired: false,

    // Minimum amount of Arguments required
    //     REQUIRES "ArgumentsRequired" TO BE TRUE IF TO BE SET AS AN INTEGER
    MinimumArguments: null,

    // Maximum amount of Arguments allowed
    //     Does NOT require "ArgumentsRequired" to be true, but should be more than Minimum if set
    MaximumArguments: null,

    // Command Permission Level
    //     One of the following: DEVELOPER, SERVER_OWNER, ADMIN, MODERATOR, EVERYONE
    PermissionLevel: "DEVELOPER",



    /**
     * Executes the Text Command
     * @param {Message} message Origin Message that triggered this Command
     * @param {?Array<String>} arguments Given arguments, can be empty!
     */
    async execute(message, arguments)
    {
        if ( DiscordClient.DebugMode ) { DiscordClient.DebugMode = false; }
        else { DiscordClient.DebugMode = true; }

        // ACK
        await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: `Successfully toggled my Debug Mode to ${DiscordClient.DebugMode}` });
        await LogDebug(`${fetchDisplayName(message.author)} toggled Debug Mode to ${DiscordClient.DebugMode}`);

        return;
    }
}
