const { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, GuildMember, Role } = require("discord.js");
const { localize } = require("./LocalizationModule");
const { DiscordClient } = require("../constants");


// REGEXS
const EveryoneMentionRegEx = new RegExp(/@(everyone|here)/g);
const RoleMentionRegEx = new RegExp(/<@&(\d{17,20})>/g);


/**
 * Checks for [at]Everyone and [at]Here Mentions in a string
 * 
 * @param {String} string
 * @param {Boolean} [slice] True if wanting to return the string result instead of only testing the RegEx
 * 
 * @returns {Boolean|String}
 */
function TestForEveryoneMention(string, slice)
{
    if ( !slice )
    {
        return EveryoneMentionRegEx.test(string);
    }
    else
    {
        const testString = EveryoneMentionRegEx.test(string);

        if ( !testString )
        {
            return false;
        }
        else
        {
            const matchedString = string.replace('@', '');
            return matchedString;
        }
    }
}



/**
 * Check for [at]Role Mentions
 * 
 * @param {String} string 
 * @param {Boolean} [slice] True if wanting to return the string result instead of just testing the RegEx
 * 
 * @returns {Boolean|String} 
 */
function TestForRoleMention(string, slice)
{  
   if ( !slice )
   {
       return RoleMentionRegEx.test(string);
   }
   else
   {
       const testString = RoleMentionRegEx.test(string);
       
       if ( !testString )
       {
           return false;
       }
       else
       {
           let matchedString = string.replace('<@&', '');
           matchedString = matchedString.replace('>', '');
           return matchedString;
       }
   }
}



module.exports = {
    /**
     * Handles Action Slash Commands
     * @param {ChatInputCommandInteraction} interaction 
     */
    async SlashAction(interaction)
    {
        // Grab data
        //const PersonOption = interaction.options.getMentionable("person", true);
        const PersonOption = interaction.options.getUser("person", true);
        const GifOptionRaw = interaction.options.get("gif");
        const GifOption = GifOptionRaw == null ? undefined : GifOptionRaw.value;
        //const ButtonOptionRaw = interaction.options.get("button");
        //const ButtonOption = ButtonOptionRaw == null ? undefined : ButtonOptionRaw.value;
        const ReasonOptionRaw = interaction.options.get("reason");
        const ReasonOption = ReasonOptionRaw == null ? undefined : ReasonOptionRaw.value;

        const ActionGifs = require("../JsonFiles/Hidden/ActionGifLinks.json");


        // Create "Return Action" Button
        /* const ReturnActionRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`return-action_${interaction.commandName}_${interaction.user.id}_${PersonOption.id}`).setStyle(ButtonStyle.Primary).setLabel(localize(interaction.guildLocale, `ACTION_RETURN_BUTTON_LABEL_${interaction.commandName.toUpperCase()}`))
        ); */

        // To know is the Button shouldn't be included - such as when told not to, when a GIF is requested, or when the Mention is *not* of a User or Member.
        let displayButton = false;
        // Override for GIF-less responses, if a Role Mention is used, as to prevent accidental Role Pings!
        let forceDisplayEmbed = false;
        // For assembling the displayed Message
        let displayMessage = "";



        // Assemble the message!
        // @everyone and @here
        /* if ( (PersonOption instanceof Role) && (PersonOption.id === PersonOption.guild.id) )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_EVERYONE_${interaction.commandName.toUpperCase()}`, interaction.user.displayName);
        }
        // @role
        else if ( (PersonOption instanceof Role) && (PersonOption.id !== PersonOption.guild.id) )
        {
            forceDisplayEmbed = true;
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_ROLE_${interaction.commandName.toUpperCase()}`, interaction.user.displayName, `<@&${PersonOption.id}>`);
        }
        // @user (self)
        else if ( (PersonOption instanceof GuildMember) && (PersonOption.id === interaction.user.id) )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_SELF_USER_${interaction.commandName.toUpperCase()}`, interaction.user.displayName);
        }
        // @user (this bot)
        else if ( (PersonOption instanceof GuildMember) && (PersonOption.id === DiscordClient.user.id) )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_HECCBOT_${interaction.commandName.toUpperCase()}`, interaction.user.displayName);
        }
        // @user (MeeYuck)
        else if ( (PersonOption instanceof GuildMember) && (PersonOption.id === '159985870458322944') )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_MEE6_${interaction.commandName.toUpperCase()}`, interaction.user.displayName, `<@159985870458322944>`);
        }
        // @user (literally any bot that isn't HeccBot or MeeYuck)
        else if ( (PersonOption instanceof GuildMember) && PersonOption.user.bot )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_OTHER_BOTS_${interaction.commandName.toUpperCase()}`, interaction.user.displayName, `${PersonOption.displayName}`);
        }
        // @user (literally any other User that doesn't meet the above)
        else
        {
            displayButton = true;
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_OTHER_USER_${interaction.commandName.toUpperCase()}`, interaction.user.displayName, `${PersonOption.displayName}`);
        } */


        // @user (self)
        if ( PersonOption.id === interaction.user.id )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_SELF_USER_${interaction.commandName.toUpperCase()}`, interaction.user.displayName);
        }
        // @user (this bot)
        else if ( PersonOption.id === DiscordClient.user.id )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_HECCBOT_${interaction.commandName.toUpperCase()}`, interaction.user.displayName);
        }
        // @user (MeeYuck)
        else if ( PersonOption.id === '159985870458322944' )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_MEE6_${interaction.commandName.toUpperCase()}`, interaction.user.displayName, `<@159985870458322944>`);
        }
        // @user (literally any bot that isn't HeccBot or MeeYuck)
        else if ( PersonOption.bot )
        {
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_OTHER_BOTS_${interaction.commandName.toUpperCase()}`, interaction.user.displayName, `${PersonOption.displayName}`);
        }
        // @user (literally any other User that doesn't meet the above)
        else
        {
            displayButton = true;
            displayMessage = localize(interaction.guildLocale, `ACTION_COMMAND_OTHER_USER_${interaction.commandName.toUpperCase()}`, interaction.user.displayName, `${PersonOption.displayName}`);
        }


        // If custom message is given, check for stray @mentions!
        if ( ReasonOption )
        {
            if ( TestForEveryoneMention(ReasonOption) ) { forceDisplayEmbed = true; }
            if ( TestForRoleMention(ReasonOption) ) { forceDisplayEmbed = true; }
            displayMessage += ` ${ReasonOption}`;
        }

        // Hide Return Action Button if requested
        //if ( ButtonOption === false ) { displayButton = false; }
        displayButton = false; // ALWAYS disable this button for now, until full support for User Apps is added to DJS



        // GIF was requested
        if ( GifOption )
        {
            const ActionEmbed = new EmbedBuilder().setDescription(displayMessage)
            .setImage(ActionGifs[`${interaction.commandName}`][Math.floor(( Math.random() * ActionGifs[`${interaction.commandName}`].length ) + 0)])
            .setColor(PersonOption instanceof Role ? PersonOption.hexColor : PersonOption instanceof GuildMember ? PersonOption.displayHexColor : 'Random');

            await interaction.reply({ allowedMentions: { parse: [], users: ['159985870458322944'] }, embeds: [ActionEmbed] });
            delete ActionEmbed;
            return;
        }
        // GIF was NOT requested
        else
        {
            if ( forceDisplayEmbed )
            {
                const ActionEmbed = new EmbedBuilder().setDescription(displayMessage)
                .setColor(PersonOption instanceof Role ? PersonOption.hexColor : PersonOption instanceof GuildMember ? PersonOption.displayHexColor : 'Random');
                await interaction.reply({ allowedMentions: { parse: [], users: ['159985870458322944'] }, embeds: [ActionEmbed] });
                delete ActionEmbed;
                return;
            }
            else
            {
                if ( displayButton )
                {
                    await interaction.reply({ allowedMentions: { parse: [], users: ['159985870458322944'] }, components: [ReturnActionRow], content: displayMessage });
                
                    // Auto remove button after around 5 minutes, to keep chats clean
                    setTimeout(async () => {
                        return await interaction.editReply({ components: [] });
                    }, 60000);
                }
                else
                {
                    await interaction.reply({ allowedMentions: { parse: [], users: ['159985870458322944'] }, content: displayMessage });
                }
            }
        }

        return;
    }
}
