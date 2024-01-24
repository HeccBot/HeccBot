const { ApplicationCommandType, ApplicationCommandData, ContextMenuCommandInteraction } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { DiscordClient } = require("../../../constants");

module.exports = {
    // Command's Name
    //     Can use sentence casing and spaces
    Name: "Headpat User",

    // Command's Description
    Description: `Gives a User a headpat`,

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
        Data.dmPermission = false;

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
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_SELF_USER_HEADPAT`, interaction.member.displayName);
        }
        // @user (this bot)
        else if ( PersonOption.id === DiscordClient.user.id )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_HECCBOT_HEADPAT`, interaction.member.displayName);
        }
        // @user (MeeYuck)
        else if ( PersonOption.id === '159985870458322944' )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_MEE6_HEADPAT`, interaction.member.displayName, `<@159985870458322944>`);
        }
        // @user (literally any bot that isn't this one)
        else if ( PersonOption.user.bot )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_OTHER_BOTS_HEADPAT`, interaction.member.displayName, `${PersonOption.displayName}`);
        }
        // @user (literally any other User that doesn't meet the above)
        else
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_OTHER_USER_HEADPAT`, interaction.member.displayName, `${PersonOption.displayName}`);
        }


        // Send Message
        await interaction.reply({ allowedMentions: { parse: [] }, content: displayMessage });
        return;
    }
}
