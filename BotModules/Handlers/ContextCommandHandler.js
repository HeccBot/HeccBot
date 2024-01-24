const { ContextMenuCommandInteraction, DMChannel, Collection } = require("discord.js");
const { Collections } = require("../../constants.js");
const { localize } = require("../LocalizationModule.js");
const { LogError, LogToUserInteraction } = require("../LoggingModule.js");

module.exports = {
    /**
     * Handles and runs received Context Commands
     * @param {ContextMenuCommandInteraction} interaction 
     */
    async Main(interaction)
    {
        // Catch for spaces in Context Command Names
        if ( interaction.commandName.includes(" ") )
        {
            interaction.commandName = interaction.commandName.split("_").join(" ");
        }

        const ContextCommand = Collections.ContextCommands.get(interaction.commandName);

        if ( !ContextCommand )
        {
            // Couldn't find the file for this Context Command
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_GENERIC')}` });
            return;
        }

        // DM Check
        if ( ContextCommand.Scope === 'DM' && !(interaction.channel instanceof DMChannel) )
        {
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_GUILDS_UNSUPPORTED')}` });
            return;
        }

        // Guild Check
        if ( ContextCommand.Scope === 'GUILD' && (interaction.channel instanceof DMChannel) )
        {
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_DMS_UNSUPPORTED')}` });
            return;
        }



        // Context Command Cooldowns
        if ( !Collections.ContextCooldowns.has(ContextCommand.Name) )
        {
            // No active Cooldowns found, create new one
            Collections.ContextCooldowns.set(ContextCommand.Name, new Collection());
        }

        // Set initial values
        const Now = Date.now();
        /** @type {Collection} */
        const Timestamps = Collections.ContextCooldowns.get(ContextCommand.Name);
        const CooldownAmount = ( ContextCommand.Cooldown || 3 ) * 1000;

        // Cooldown
        if ( Timestamps.has(interaction.user.id) )
        {
            // Cooldown hit, tell User to cool off a little bit
            const ExpirationTime = Timestamps.get(interaction.user.id) + CooldownAmount;

            if ( Now < ExpirationTime )
            {
                let timeLeft = ( ExpirationTime - Now ) / 1000; // How much time is left of cooldown, in seconds

                // MINUTES
                if ( timeLeft >= 60 && timeLeft < 3600 )
                {
                    timeLeft = timeLeft / 60; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_COOLDOWN_MINUTES', timeLeft.toFixed(1)) });
                    return;
                }
                // HOURS
                else if ( timeLeft >= 3600 && timeLeft < 86400 )
                {
                    timeLeft = timeLeft / 3600; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_COOLDOWN_HOURS', timeLeft.toFixed(1)) });
                    return;
                }
                // DAYS
                else if ( timeLeft >= 86400 && timeLeft < 2.628e+6 )
                {
                    timeLeft = timeLeft / 86400; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_COOLDOWN_DAYS', timeLeft.toFixed(1)) });
                    return;
                }
                // MONTHS
                else if ( timeLeft >= 2.628e+6 )
                {
                    timeLeft = timeLeft / 2.628e+6; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_COOLDOWN_MONTHS', timeLeft.toFixed(1)) });
                    return;
                }
                // SECONDS
                else
                {
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_COOLDOWN_SECONDS', timeLeft.toFixed(1)) });
                    return;
                }
            }
        }
        else
        {
            // Create new cooldown
            Timestamps.set(interaction.user.id, Now);
            setTimeout(() => Timestamps.delete(interaction.user.id), CooldownAmount);
        }



        // Attempt to run Command
        try { await ContextCommand.execute(interaction); }
        catch (err)
        {
            await LogError(err);
            await LogToUserInteraction(interaction, null, err);
        }

        return;
    }
}
