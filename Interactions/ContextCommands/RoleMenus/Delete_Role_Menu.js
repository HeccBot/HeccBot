const { ApplicationCommandType, ApplicationCommandData, ContextMenuCommandInteraction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { DiscordClient } = require("../../../constants");
const { localize } = require("../../../BotModules/LocalizationModule");

// Role Menu Types
const RoleMenuTypes = [ "TOGGLE", "SWAP", "SINGLE" ];

module.exports = {
    // Command's Name
    //     Can use sentence casing and spaces
    Name: "Delete Role Menu",

    // Command's Description
    Description: `Deletes an existing Role Menu`,

    // Command's Category
    Category: "MANAGEMENT",

    // Context Command Type
    //     One of either ApplicationCommandType.Message, ApplicationCommandType.User
    CommandType: ApplicationCommandType.Message,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 10,

    // Scope of Command's usage
    //     One of the following: DM, GUILD, ALL
    Scope: "GUILD",



    /**
     * Returns data needed for registering Context Command onto Discord's API
     * @returns {ApplicationCommandData}
     */
    registerData()
    {
        /** @type {ApplicationCommandData} */
        const Data = {};

        Data.name = this.Name;
        Data.description = "";
        Data.type = this.CommandType;
        Data.integration_types = [ 0 ]; // 0 for GUILD_INSTALL, 1 for USER_INSTALL, can include both but must have at least one of them included
        Data.contexts = [ 0 ]; // 0 for GUILD, 1 for BOT_DM (DMs with the Bot), 2 for PRIVATE_CHANNEL (DMs/GDMs that don't include Bot). Must include at least one, PRIVATE_CHANNEL can only be used if integrationTypes includes USER_INSTALL
        Data.default_member_permissions = String(PermissionFlagsBits.ManageRoles);

        return Data;
    },



    /**
     * Executes the Context Command
     * @param {ContextMenuCommandInteraction} interaction 
     */
    async execute(interaction)
    {
        // Check Message *is* a Role Menu with this Bot
        const SourceMessage = interaction.options.getMessage('message', true);
        const SourceMenuType = SourceMessage.embeds.shift()?.footer?.text.split(": ").pop();

        if ( SourceMessage.author.id !== DiscordClient.user.id )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'EDIT_ROLE_MENU_COMMAND_ERROR_MESSAGE_INVALID') });
            return;
        }

        if ( SourceMenuType == undefined || !RoleMenuTypes.includes(SourceMenuType) )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'EDIT_ROLE_MENU_COMMAND_ERROR_MESSAGE_INVALID') });
            return;
        }


        // Construct Confirmation Buttons
        const ConfirmationButtonRow = new ActionRowBuilder().addComponents([
            new ButtonBuilder().setCustomId(`menu-delete-confirm_${SourceMessage.id}`).setLabel(localize(interaction.locale, 'DELETE')).setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId(`menu-delete-cancel`).setLabel(localize(interaction.locale, 'CANCEL')).setStyle(ButtonStyle.Secondary)
        ]);

        await interaction.reply({ ephemeral: true, components: [ConfirmationButtonRow], content: localize(interaction.locale, 'DELETE_ROLE_MENU_COMMAND_VALIDATION') });
        return;
    }
}
