const { ChatInputCommandInteraction, ApplicationCommandOptionType, DMChannel, Collection } = require("discord.js");
const { Collections } = require("../../constants.js");
const { localize } = require("../LocalizationModule.js");

module.exports = {
    /**
     * Handles and runs received Slash Commands
     * @param {ChatInputCommandInteraction} interaction 
     */
    async Main(interaction)
    {
        const SlashCommand = Collections.SlashCommands.get(interaction.commandName);

        if ( !SlashCommand )
        {
            // Couldn't find the file for this Slash Command
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_GENERIC')}` });
            return;
        }

        // Checks for SubCommand or SubCommand-Groups, so that they can have their own Cooldowns
        const SubcommandCheck = interaction.options.data.find(cmd => cmd.type === ApplicationCommandOptionType.Subcommand);
        const SubcommandGroupCheck = interaction.options.data.find(cmd => cmd.type === ApplicationCommandOptionType.SubcommandGroup);
        if ( SubcommandGroupCheck != undefined ) { return await this.SubcommandGroup(interaction, SlashCommand); }
        if ( SubcommandCheck != undefined ) { return await this.Subcommand(interaction, SlashCommand); }

        // DM Check
        if ( SlashCommand.Scope === 'DM' && !(interaction.channel instanceof DMChannel) )
        {
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_GUILDS_UNSUPPORTED')}` });
            return;
        }

        // Guild Check
        if ( SlashCommand.Scope === 'GUILD' && (interaction.channel instanceof DMChannel) )
        {
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_DMS_UNSUPPORTED')}` });
            return;
        }



        // Slash Command Cooldowns
        if ( !Collections.SlashCooldowns.has(SlashCommand.Name) )
        {
            // No active Cooldowns found, create new one
            Collections.SlashCooldowns.set(SlashCommand.Name, new Collection());
        }

        // Set initial values
        const Now = Date.now();
        /** @type {Collection} */
        const Timestamps = Collections.SlashCooldowns.get(SlashCommand.Name);
        const CooldownAmount = ( SlashCommand.Cooldown || 3 ) * 1000;

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
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_MINUTES', timeLeft.toFixed(1)) });
                    return;
                }
                // HOURS
                else if ( timeLeft >= 3600 && timeLeft < 86400 )
                {
                    timeLeft = timeLeft / 3600; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_HOURS', timeLeft.toFixed(1)) });
                    return;
                }
                // DAYS
                else if ( timeLeft >= 86400 && timeLeft < 2.628e+6 )
                {
                    timeLeft = timeLeft / 86400; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_DAYS', timeLeft.toFixed(1)) });
                    return;
                }
                // MONTHS
                else if ( timeLeft >= 2.628e+6 )
                {
                    timeLeft = timeLeft / 2.628e+6; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_MONTHS', timeLeft.toFixed(1)) });
                    return;
                }
                // SECONDS
                else
                {
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_SECONDS', timeLeft.toFixed(1)) });
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
        try { await SlashCommand.execute(interaction); }
        catch (err)
        {
            //console.error(err);
            if ( interaction.deferred )
            {
                await interaction.editReply({ content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_GENERIC')}` });
            }
            else
            {
                await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_GENERIC')}` });
            }
        }

        return;
    },



    /**
     * Handles and runs received Slash Commands, when a Subcommand is used
     * @param {ChatInputCommandInteraction} interaction 
     * @param {*} SlashCommand File with Slash Command's data
     */
    async Subcommand(interaction, SlashCommand)
    { 
        // Grab data
        const SubcommandName = interaction.options.getSubcommand();
        const CombinedName = `${interaction.commandName}_${SubcommandName}`;

        // DM Check
        if ( SlashCommand.SubcommandScope[SubcommandName] === 'DM' && !(interaction.channel instanceof DMChannel) )
        {
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_GUILDS_UNSUPPORTED')}` });
            return;
        }
 
        // Guild Check
        if ( SlashCommand.SubcommandScope[SubcommandName] === 'GUILD' && (interaction.channel instanceof DMChannel) )
        {
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_DMS_UNSUPPORTED')}` });
            return;
        }
 
 
 
        // Slash Command Cooldowns
        if ( !Collections.SlashCooldowns.has(CombinedName) )
        {
            // No active Cooldowns found, create new one
            Collections.SlashCooldowns.set(CombinedName, new Collection());
        }
 
        // Set initial values
        const Now = Date.now();
        /** @type {Collection} */
        const Timestamps = Collections.SlashCooldowns.get(CombinedName);
        const CooldownAmount = ( SlashCommand.SubcommandCooldown[SubcommandName] || 3 ) * 1000;
 
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
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_MINUTES', timeLeft.toFixed(1)) });
                    return;
                }
                // HOURS
                else if ( timeLeft >= 3600 && timeLeft < 86400 )
                {
                    timeLeft = timeLeft / 3600; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_HOURS', timeLeft.toFixed(1)) });
                    return;
                }
                // DAYS
                else if ( timeLeft >= 86400 && timeLeft < 2.628e+6 )
                {
                    timeLeft = timeLeft / 86400; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_DAYS', timeLeft.toFixed(1)) });
                    return;
                }
                // MONTHS
                else if ( timeLeft >= 2.628e+6 )
                {
                    timeLeft = timeLeft / 2.628e+6; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_MONTHS', timeLeft.toFixed(1)) });
                    return;
                }
                // SECONDS
                else
                {
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_SECONDS', timeLeft.toFixed(1)) });
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
        try { await SlashCommand.execute(interaction); }
        catch (err)
        {
            //console.error(err);
            if ( interaction.deferred )
            {
                await interaction.editReply({ content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_GENERIC')}` });
            }
            else
            {
                await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_GENERIC')}` });
            }
        }
 
        return;
    },



    /**
     * Handles and runs received Slash Commands, when a Subcommand Group is used
     * @param {ChatInputCommandInteraction} interaction 
     * @param {*} SlashCommand File with Slash Command's data
     */
    async SubcommandGroup(interaction, SlashCommand)
    { 
        // Grab data
        const SubcommandGroupName = interaction.options.getSubcommandGroup();
        const SubcommandName = interaction.options.getSubcommand();
        const CombinedSubcommandName = `${SubcommandGroupName}_${SubcommandName}`;
        const CombinedName = `${interaction.commandName}_${SubcommandGroupName}_${SubcommandName}`;

        // DM Check
        if ( SlashCommand.SubcommandScope[CombinedSubcommandName] === 'DM' && !(interaction.channel instanceof DMChannel) )
        {
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_GUILDS_UNSUPPORTED')}` });
            return;
        }
 
        // Guild Check
        if ( SlashCommand.SubcommandScope[CombinedSubcommandName] === 'GUILD' && (interaction.channel instanceof DMChannel) )
        {
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_DMS_UNSUPPORTED')}` });
            return;
        }
 
 
 
        // Slash Command Cooldowns
        if ( !Collections.SlashCooldowns.has(CombinedName) )
        {
            // No active Cooldowns found, create new one
            Collections.SlashCooldowns.set(CombinedName, new Collection());
        }
 
        // Set initial values
        const Now = Date.now();
        /** @type {Collection} */
        const Timestamps = Collections.SlashCooldowns.get(CombinedName);
        const CooldownAmount = ( SlashCommand.SubcommandCooldown[CombinedSubcommandName] || 3 ) * 1000;
 
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
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_MINUTES', timeLeft.toFixed(1)) });
                    return;
                }
                // HOURS
                else if ( timeLeft >= 3600 && timeLeft < 86400 )
                {
                    timeLeft = timeLeft / 3600; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_HOURS', timeLeft.toFixed(1)) });
                    return;
                }
                // DAYS
                else if ( timeLeft >= 86400 && timeLeft < 2.628e+6 )
                {
                    timeLeft = timeLeft / 86400; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_DAYS', timeLeft.toFixed(1)) });
                    return;
                }
                // MONTHS
                else if ( timeLeft >= 2.628e+6 )
                {
                    timeLeft = timeLeft / 2.628e+6; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_MONTHS', timeLeft.toFixed(1)) });
                    return;
                }
                // SECONDS
                else
                {
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SLASH_COMMAND_ERROR_COOLDOWN_SECONDS', timeLeft.toFixed(1)) });
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
        try { await SlashCommand.execute(interaction); }
        catch (err)
        {
            //console.error(err);
            if ( interaction.deferred )
            {
                await interaction.editReply({ content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_GENERIC')}` });
            }
            else
            {
                await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'SLASH_COMMAND_ERROR_GENERIC')}` });
            }
        }
 
        return;
    }
}
