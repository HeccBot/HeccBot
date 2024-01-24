const { ButtonInteraction, Collection } = require("discord.js");
const { Collections } = require("../../constants.js");
const { localize } = require("../LocalizationModule.js");
const { LogError, LogToUserInteraction } = require("../LoggingModule.js");

module.exports = {
    /**
     * Handles and runs received Buttons
     * @param {ButtonInteraction} interaction 
     */
    async Main(interaction)
    {
        // Grab first part of Custom ID
        const ButtonCustomId = interaction.customId.split("_").shift();
        const Button = Collections.Buttons.get(ButtonCustomId)

        if ( !Button )
        {
            // Couldn't find the file for this Button
            await interaction.reply({ ephemeral: true, content: `${localize(interaction.locale, 'BUTTON_ERROR_GENERIC')}` });
            return;
        }



        // Button Cooldowns
        if ( !Collections.ButtonCooldowns.has(ButtonCustomId) )
        {
            // No active Cooldowns found, create new one
            Collections.ButtonCooldowns.set(ButtonCustomId, new Collection());
        }

        // Set initial values
        const Now = Date.now();
        /** @type {Collection} */
        const Timestamps = Collections.ButtonCooldowns.get(ButtonCustomId);
        const CooldownAmount = ( Button.Cooldown || 3 ) * 1000;

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
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'BUTTON_ERROR_COOLDOWN_MINUTES', timeLeft.toFixed(1)) });
                    return;
                }
                // HOURS
                else if ( timeLeft >= 3600 && timeLeft < 86400 )
                {
                    timeLeft = timeLeft / 3600; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'BUTTON_ERROR_COOLDOWN_HOURS', timeLeft.toFixed(1)) });
                    return;
                }
                // DAYS
                else if ( timeLeft >= 86400 && timeLeft < 2.628e+6 )
                {
                    timeLeft = timeLeft / 86400; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'BUTTON_ERROR_COOLDOWN_DAYS', timeLeft.toFixed(1)) });
                    return;
                }
                // MONTHS
                else if ( timeLeft >= 2.628e+6 )
                {
                    timeLeft = timeLeft / 2.628e+6; // For UX
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'BUTTON_ERROR_COOLDOWN_MONTHS', timeLeft.toFixed(1)) });
                    return;
                }
                // SECONDS
                else
                {
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'BUTTON_ERROR_COOLDOWN_SECONDS', timeLeft.toFixed(1)) });
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



        // Attempt to process Button
        try { await Button.execute(interaction); }
        catch (err)
        {
            await LogError(err);
            await LogToUserInteraction(interaction, null, err);
        }

        return;
    }
}
