const { TextChannel, CommandInteraction, MessageComponentInteraction, ModalSubmitInteraction, Message } = require("discord.js");
const { ErrorLogGuildID, ErrorLogChannelID } = require("../config");
const { DiscordClient } = require("../constants");
const { localize } = require("./LocalizationModule");



module.exports = {
    /**
     * Info log
     * @param {String} message 
     */
    async LogInfo(message)
    {
        // Log to console
        console.log(`[INFO] ${message}`);

        // If DEBUG mode is enabled, log to Zebby's logging Channel
        if ( DiscordClient.DebugMode )
        {
            const LogGuild = await DiscordClient.guilds.fetch(ErrorLogGuildID);
            const LogChannel = await LogGuild.channels.fetch(ErrorLogChannelID);
            if ( LogChannel instanceof TextChannel )
            {
                await LogChannel.send({
                    allowedMentions: { parse: [] },
                    content: `**[INFO]**\n\`\`\`${message.slice(0, 1999)}\`\`\``
                })
                .catch(console.error);
            }
        }

        return;
    },


    /**
     * Warning log
     * @param {?String} message 
     * @param {?Error} warning
     */
    async LogWarn(message, warning)
    {
        if ( message != null )
        {
            // Log to console
            console.warn(`[WARN] ${message}`);

            // If DEBUG mode is enabled, log to Zebby's logging Channel
            if ( DiscordClient.DebugMode )
            {
                const LogGuild = await DiscordClient.guilds.fetch(ErrorLogGuildID);
                const LogChannel = await LogGuild.channels.fetch(ErrorLogChannelID);
                if ( LogChannel instanceof TextChannel )
                {
                    await LogChannel.send({
                        allowedMentions: { parse: [] },
                        content: `**[WARN]**\n\`\`\`${message.slice(0, 1999)}\`\`\``
                    })
                    .catch(console.error);
                }
            }
        }

        if ( warning != null )
        {
            // Log to console
            console.warn(warning);

            // If DEBUG mode is enabled, log to Zebby's logging Channel
            if ( DiscordClient.DebugMode )
            {
                const LogGuild = await DiscordClient.guilds.fetch(ErrorLogGuildID);
                const LogChannel = await LogGuild.channels.fetch(ErrorLogChannelID);
                if ( LogChannel instanceof TextChannel )
                {
                    await LogChannel.send({
                        allowedMentions: { parse: [] },
                        content: `**[WARN]**\n\`\`\`${warning}\`\`\``.slice(0, 1999)
                    })
                    .catch(console.error);
                }
            }
        }

        return;
    },


    /**
     * Error log
     * @param {Error} error
     */
    async LogError(error)
    {
        // Log to console
        console.error(error);

        // If DEBUG mode is enabled, log to Zebby's logging Channel
        if ( DiscordClient.DebugMode )
        {
            const LogGuild = await DiscordClient.guilds.fetch(ErrorLogGuildID);
            const LogChannel = await LogGuild.channels.fetch(ErrorLogChannelID);
            if ( LogChannel instanceof TextChannel )
            {
                await LogChannel.send({
                    allowedMentions: { parse: [] },
                    content: `**[ERROR]**\n\`\`\`${error.name}: ${error.message}\n\n${error.stack}\`\`\``.slice(0, 1999)
                })
                .catch(console.error);
            }
        }

        return;
    },


    /**
     * Debug log
     * @param {String|Error} message 
     */
    async LogDebug(message)
    {
        // ONLY log if Debug Mode is enabled
        if ( DiscordClient.DebugMode )
        {
            // Log to console
            console.debug(`[DEBUG] ${message}`);

            const LogGuild = await DiscordClient.guilds.fetch(ErrorLogGuildID);
            const LogChannel = await LogGuild.channels.fetch(ErrorLogChannelID);
            if ( LogChannel instanceof TextChannel )
            {
                await LogChannel.send({
                    allowedMentions: { parse: [] },
                    content: `**[DEBUG]**\n\`\`\`${message}\`\`\``.slice(0, 1999)
                })
                .catch(console.error);
            }
        }

        return;
    },


    /**
     * Log to User (INTERACTIONS)
     * @param {CommandInteraction|MessageComponentInteraction|ModalSubmitInteraction} interaction
     * @param {?String} message Required if no Error is given
     * @param {?Error} error Required if no Message is given
     */
    async LogToUserInteraction(interaction, message, error)
    {
        // Just in case
        if ( message == null && error == null ) { console.error(`[ERROR] Failed to provide one of either 'message' or 'error' params when calling LogToUser(<Interaction>)`); return; }

        // No raw Error provided
        if ( error == null )
        {
            // ACK to User
            if ( interaction.deferred ) { await interaction.followUp({ ephemeral: true, content: message }); }
            else { await interaction.reply({ ephemeral: true, content: message }); }
        }
        // Raw Error was provided
        else
        {
            // ACK to User
            if ( interaction.deferred ) { await interaction.followUp({ ephemeral: true, content: localize(interaction.locale, 'ERROR_WITH_PREVIEW', `${error.name}: ${error.message}`) }); }
            else { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ERROR_WITH_PREVIEW', `${error.name}: ${error.message}`) }); }
        }

        return;
    },


    /**
     * Log to User (TEXT MESSAGES)
     * @param {Message} userMessage Discord Message Object
     * @param {?String} logMessage Required if no Error is given
     * @param {?Error} error Required if no Message is given
     */
    async LogToUserText(userMessage, logMessage, error)
    {
        // Just in case
        if ( logMessage == null && error == null ) { console.error(`[ERROR] Failed to provide one of either 'logMessage' or 'error' params when calling LogToUser(<Message>)`); return; }

        // No raw Error provided
        if ( error == null )
        {
            // ACK to User
            await userMessage.reply({ allowedMentions: { parse: [], repliedUser: false }, content: logMessage });
        }
        // Raw Error was provided
        else
        {
            // ACK to User
            await userMessage.reply({ allowedMentions: { parse: [], repliedUser: false }, content: localize('en-GB', 'ERROR_WITH_PREVIEW', `${error.name}: ${error.message}`) });
        }

        return;
    }
}
