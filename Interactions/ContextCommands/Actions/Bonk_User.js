const { ApplicationCommandType, ApplicationCommandData, ContextMenuCommandInteraction } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { DiscordClient } = require("../../../constants");

module.exports = {
    // Command's Name
    //     Can use sentence casing and spaces
    Name: "Bonk User",

    // Command's Description
    Description: `Bonk a naughty User`,

    // Command's Category
    Category: "ACTION",

    // Context Command Type
    //     One of either ApplicationCommandType.Message, ApplicationCommandType.User
    CommandType: ApplicationCommandType.User,

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

        return Data;
    },



    /**
     * Executes the Context Command
     * @param {ContextMenuCommandInteraction} interaction 
     */
    async execute(interaction)
    {
        // Grab Data
        const PersonOption = interaction.options.getMember("user");
        let displayMessage = "";

        // Assemble message
        // @user (self)
        if ( PersonOption.id === interaction.user.id )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_SELF_USER_BONK`, interaction.member.displayName);
        }
        // @user (this bot)
        else if ( PersonOption.id === DiscordClient.user.id )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_HECCBOT_BONK`, interaction.member.displayName);
        }
        // @user (MeeYuck)
        else if ( PersonOption.id === '159985870458322944' )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_MEE6_BONK`, interaction.member.displayName, `<@159985870458322944>`);
        }
        // @user (literally any bot that isn't this one)
        else if ( PersonOption.user.bot )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_OTHER_BOTS_BONK`, interaction.member.displayName, `${PersonOption.displayName}`);
        }
        // @user (literally any other User that doesn't meet the above)
        else
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_OTHER_USER_BONK`, interaction.member.displayName, `${PersonOption.displayName}`);
        }


        // Send Message
        await interaction.reply({ allowedMentions: { parse: [] }, content: displayMessage });
        return;
    }
}
