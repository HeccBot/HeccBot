const { ButtonInteraction } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { LogError } = require("../../../BotModules/LoggingModule");

module.exports = {
    // Button's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "menu-delete-confirm",

    // Button's Description
    Description: `Confirms & deletes a Role Menu`,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 10,



    /**
     * Executes the Button
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction)
    {
        await interaction.deferUpdate();

        // Grab Menu's Message ID & Message object
        const MenuMessageId = interaction.customId.split("_").pop();
        const MenuMessageObject = await interaction.channel.messages.fetch({ message: MenuMessageId, limit: 1 });


        // Attempt deletion
        await MenuMessageObject.delete()
        .then(async deletedMessage => {
            await interaction.editReply({ components: [], content: `${localize(interaction.locale, 'DELETE_ROLE_MENU_COMMAND_SUCCESS')}` });
        })
        .catch(async err => {
            await LogError(err);
            await interaction.editReply({ components: [], content: `${localize(interaction.locale, 'DELETE_ROLE_MENU_COMMAND_ERROR_GENERIC')}` });
        });

        return;
    }
}
