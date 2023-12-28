const { PermissionFlagsBits, Message, DMChannel, Collection } = require("discord.js");
const { DiscordClient, Collections } = require("../../constants.js");
const Config = require("../../config.js");
const { LogError, LogToUserText } = require("../LoggingModule.js");
const { localize } = require("../LocalizationModule.js");

module.exports = {
    /**
     * Checks for a Text Command in a sent Message, and runs it if true
     * @param {Message} message Source Message that triggered this
     * @returns {Promise<Boolean|*>} False if not a Command
     */
    async Main(message)
    {
        // Check for Prefix (including @mention of the Bot itself)
        const EscapePrefix = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const PrefixRegex = new RegExp(`^(<@!?${DiscordClient.user.id}>|${EscapePrefix(Config.PREFIX)})\\s*`);

        if ( !PrefixRegex.test(message.content) )
        {
            // No prefix found, thus not an attempt to use a Text Command
            return false;
        }
        else
        {
            // Slice off Prefix and assemble command
            const [, MatchedPrefix] = message.content.match(PrefixRegex);
            const Arguments = message.content.slice(MatchedPrefix.length).trim().split(/ +/);
            const CommandName = Arguments.shift().toLowerCase();
            const Command = Collections.TextCommands.get(CommandName) || Collections.TextCommands.find(cmd => cmd.Alias && cmd.Alias.includes(CommandName));

            if ( !Command ) { return null; }

            // DM Usage
            if ( Command.Scope === 'DM' && !(message.channel instanceof DMChannel) )
            {
                await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: "Sorry, but that Command can only be used in DMs with me." });
                return null;
            }

            // Guild Usage
            if ( Command.Scope === 'GUILD' && (message.channel instanceof DMChannel) )
            {
                await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: "Sorry, but that Command can only be used in Servers, not in DMs with me." });
                return null;
            }


            // Command Permission Checks
            if ( Command.PermissionLevel )
            {
                switch ( Command.PermissionLevel )
                {
                    case "DEVELOPER":
                        // Bot's Dev
                        if ( message.author.id !== Config.BotDevID )
                        {
                            await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: "Sorry, but that Command can only be used by my developer!" });
                            return null;
                        }
                        break;

                    case "SERVER_OWNER":
                        // Bot's Dev, and Server Owners
                        if ( message.author.id !== Config.BotDevID && message.author.id !== message.guild.ownerId )
                        {
                            await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: "Sorry, but that Command can only be used by the Owner of this Server!" });
                            return null;
                        }
                        break;

                    case "ADMIN":
                        // Bot's Dev, Server Owners, and those with "ADMIN" Permission
                        if ( message.author.id !== Config.BotDevID && message.author.id !== message.guild.ownerId && !message.member.permissions.has(PermissionFlagsBits.Administrator) )
                        {
                            await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: "Sorry, but that Command can only be used by the Owner of this Server, and those with the \"ADMINISTRATOR\" Permission." });
                            return null;
                        }
                        break;

                    case "MODERATOR":
                        // Bot's Dev, Server Owners, those with "ADMIN" Permission, and Server Moderators
                        if ( message.author.id !== Config.BotDevID && message.author.id !== message.guild.ownerId && !message.member.permissions.has(PermissionFlagsBits.Administrator) && !message.member.permissions.has(PermissionFlagsBits.BanMembers) && !message.member.permissions.has(PermissionFlagsBits.KickMembers) && !message.member.permissions.has(PermissionFlagsBits.ManageChannels) && !message.member.permissions.has(PermissionFlagsBits.ManageGuild) && !message.member.permissions.has(PermissionFlagsBits.ManageMessages) && !message.member.permissions.has(PermissionFlagsBits.ManageRoles) && !message.member.permissions.has(PermissionFlagsBits.ManageThreads) && !message.member.permissions.has(PermissionFlagsBits.ModerateMembers) )
                        {
                            await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: "Sorry, but that Command can only be used by this Server's Moderators, those with the \"ADMINISTRATOR\" Permission, and this Server's Owner." });
                            return null;
                        }
                        break;

                    case "EVERYONE":
                    default:
                        break;
                }
            }



            // Command Argument Checks
            // Required Arguments Check
            if ( Command.ArgumentsRequired && ( !Arguments.length || Arguments.length === 0 ) )
            {
                await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: "Sorry, but this Command requires arguments to be included in its usage.\n" });
                return null;
            }

            // Minimum Arguments Check
            if ( Command.ArgumentsRequired && Arguments.length < Command.MinimumArguments )
            {
                let minArgErrMsg = `Sorry, but this Command requires a **minimum** of ${Command.MinimumArguments} arguments, while you only included ${Arguments.length} arguments.`;
                await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: minArgErrMsg });
                return null;
            }

            // Maximum Arguments Check
            if ( Arguments.length > Command.MaximumArguments )
            {
                let maxArgErrMsg = `Sorry, but this Command requires a **maximum** of ${Command.MaximumArguments} arguments, while you included ${Arguments.length} arguments.`;
                await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: maxArgErrMsg });
                return null;
            }



            // Cooldown Checks
            if ( !Collections.TextCooldowns.has(Command.Name) )
            {
                // No active cooldown, start a new one
                Collections.TextCooldowns.set(Command.Name, new Collection());
            }

            // Set initial values
            const Now = Date.now();
            /** @type {Collection} */
            const Timestamps = Collections.TextCooldowns.get(Command.Name);
            const CooldownAmount = ( Command.Cooldown || 3 ) * 1000;

            // Cooldown
            if ( Timestamps.has(message.author.id) )
            {
                // Cooldown hit, tell User to cool off a little
                const ExpirationTime = Timestamps.get(message.author.id) + CooldownAmount;

                if ( Now < ExpirationTime )
                {
                    let timeLeft = ( ExpirationTime - Now ) / 1000; // How much time is left of cooldown, in seconds

                    // MINUTES
                    if ( timeLeft >= 60 && timeLeft < 3600 )
                    {
                        timeLeft = timeLeft / 60; // For UX
                        await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: localize('en-GB', 'TEXT_COMMAND_ERROR_COOLDOWN_MINUTES', timeLeft.toFixed(1)) });
                        return null;
                    }
                    // HOURS
                    else if ( timeLeft >= 3600 && timeLeft < 86400 )
                    {
                        timeLeft = timeLeft / 3600; // For UX
                        await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: localize('en-GB', 'TEXT_COMMAND_ERROR_COOLDOWN_HOURS', timeLeft.toFixed(1)) });
                        return null;
                    }
                    // DAYS
                    else if ( timeLeft >= 86400 && timeLeft < 2.628e+6 )
                    {
                        timeLeft = timeLeft / 86400; // For UX
                        await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: localize('en-GB', 'TEXT_COMMAND_ERROR_COOLDOWN_DAYS', timeLeft.toFixed(1)) });
                        return null;
                    }
                    // MONTHS
                    else if ( timeLeft >= 2.628e+6 )
                    {
                        timeLeft = timeLeft / 2.628e+6; // For UX
                        await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: localize('en-GB', 'TEXT_COMMAND_ERROR_COOLDOWN_MONTHS', timeLeft.toFixed(1)) });
                        return null;
                    }
                    // SECONDS
                    else
                    {
                        await message.reply({ allowedMentions: { parse: [], repliedUser: false }, content: localize('en-GB', 'TEXT_COMMAND_ERROR_COOLDOWN_SECONDS', timeLeft.toFixed(1)) });
                        return null;
                    }
                }
            }
            else
            {
                Timestamps.set(message.author.id, Now);
                setTimeout(() => Timestamps.delete(message.author.id), CooldownAmount);
            }



            // Attempt to run Command
            try { await Command.execute(message, Arguments); }
            catch (err)
            {
                await LogError(err);
                await LogToUserText(message, null, err);
            }

            return;
        }
    }
}
