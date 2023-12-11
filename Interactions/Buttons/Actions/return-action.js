const { ButtonInteraction } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule.js");

module.exports = {
    // Button's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "return-action",

    // Button's Description
    Description: `Returns an Action`,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 5,



    /**
     * Executes the Button
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction)
    {
        // Parse params out of Custom ID
        const CustomParams = interaction.customId.split("_");
        const ActionName = CustomParams[1].toUpperCase();
        const OriginalUserId = CustomParams[2];
        const OriginalTargetId = CustomParams[3];

        // Ensure User who pressed Button isn't the one who sent the Action originally
        if ( interaction.user.id === OriginalUserId )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ACTION_ERROR_CANNOT_RETURN_TO_SENDER') });
            return;
        }

        // Also ensure User who pressed Button is the original Target User for the Action
        if ( interaction.user.id !== OriginalTargetId )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ACTION_ERROR_RETURN_NOT_TARGETED_AT_SELF') });
            return;
        }

        // Fetch Members, to use their Display Names
        const OriginalMember = await interaction.guild.members.fetch(OriginalUserId)
        .catch(async err => { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ACTION_ERROR_RETURN_CANNOT_FETCH_ORIGINAL_SENDER') }); return; });
        const OriginalTarget = await interaction.guild.members.fetch(OriginalTargetId)
        .catch(async err => { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ACTION_ERROR_RETURN_CANNOT_FETCH_TARGET') }); return; });

        // Construct Message
        let displayMessage = localize(interaction.guildLocale, `ACTION_RETURN_${ActionName}`, `${OriginalTarget.displayName}`, `${OriginalMember.displayName}`);

        // Remove Button from original Message
        await interaction.update({ components: [] })
        .then(async () => {
            // Send "Return Action" Message
            interaction.followUp({ allowedMentions: { parse: [] }, content: displayMessage });
        });

        return;
    }
}
