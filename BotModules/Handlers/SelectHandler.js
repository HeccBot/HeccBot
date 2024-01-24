const { StringSelectMenuInteraction, RoleSelectMenuInteraction, ChannelSelectMenuInteraction, UserSelectMenuInteraction, MentionableSelectMenuInteraction, Collection } = require("discord.js");
const { Collections } = require("../../constants.js");
const { localize } = require("../LocalizationModule.js");
const { LogError, LogToUserInteraction } = require("../LoggingModule.js");

module.exports = {
    /**
     * Handles and runs received Selects
     * @param {StringSelectMenuInteraction|RoleSelectMenuInteraction|ChannelSelectMenuInteraction|UserSelectMenuInteraction|MentionableSelectMenuInteraction} interaction 
     */
    async Main(interaction)
    {
        // Grab first part of Custom ID
        const SelectCustomId = interaction.customId.split("_").shift();
        const Select = Collections.Selects.get(SelectCustomId)

        if ( !Select )
        {
            // Couldn't find the file for this Select
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'SELECT_MENU_ERROR_GENERIC')}` });
            return;
        }



        // Select Cooldowns
        if ( !Collections.SelectCooldowns.has(SelectCustomId) )
        {
            // No active Cooldowns found, create new one
            Collections.SelectCooldowns.set(SelectCustomId, new Collection());
        }

        // Set initial values
        const Now = Date.now();
        /** @type {Collection} */
        const Timestamps = Collections.SelectCooldowns.get(SelectCustomId);
        const CooldownAmount = ( Select.Cooldown || 3 ) * 1000;

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
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SELECT_MENU_ERROR_COOLDOWN_MINUTES', timeLeft.toFixed(1)) });
                    return;
                }
                // HOURS
                else if ( timeLeft >= 3600 && timeLeft < 86400 )
                {
                    timeLeft = timeLeft / 3600; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SELECT_MENU_ERROR_COOLDOWN_HOURS', timeLeft.toFixed(1)) });
                    return;
                }
                // DAYS
                else if ( timeLeft >= 86400 && timeLeft < 2.628e+6 )
                {
                    timeLeft = timeLeft / 86400; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SELECT_MENU_ERROR_COOLDOWN_DAYS', timeLeft.toFixed(1)) });
                    return;
                }
                // MONTHS
                else if ( timeLeft >= 2.628e+6 )
                {
                    timeLeft = timeLeft / 2.628e+6; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SELECT_MENU_ERROR_COOLDOWN_MONTHS', timeLeft.toFixed(1)) });
                    return;
                }
                // SECONDS
                else
                {
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SELECT_MENU_ERROR_COOLDOWN_SECONDS', timeLeft.toFixed(1)) });
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



        // Attempt to process Select
        try { await Select.execute(interaction); }
        catch (err)
        {
            await LogError(err);
            await LogToUserInteraction(interaction, null, err);
        }

        return;
    }
}
