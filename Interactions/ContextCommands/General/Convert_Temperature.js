const { ApplicationCommandType, ApplicationCommandData, MessageContextMenuCommandInteraction } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");

// REGEXS
const TemperatureRegex = new RegExp(/(?<amount>-?\d+(?:\.\d*)?)[^\S\n]*(?<degrees>°|'|deg(?:rees?)?|in)?[^\S\n]*(?<unit>c(?:(?=el[cs]ius\b|entigrades?\b|\b))|f(?:(?=ahrenheit\b|\b))|k(?:(?=elvins?\b|\b)))/gi);
const CelsiusRegex = new RegExp(/(?<amount>-?\d+(?:\.\d*)?)[^\S\n]*(?<degrees>°|'|deg(?:rees?)?|in)?[^\S\n]*(?<unit>c(?:(?=el[cs]ius\b|entigrades?\b|\b)))/gi);
const FahernheitRegex = new RegExp(/(?<amount>-?\d+(?:\.\d*)?)[^\S\n]*(?<degrees>°|'|deg(?:rees?)?|in)?[^\S\n]*(?<unit>f(?:(?=ahrenheit\b|\b)))/gi);
const KelvinRegex = new RegExp(/(?<amount>-?\d+(?:\.\d*)?)[^\S\n]*(?<degrees>°|'|deg(?:rees?)?|in)?[^\S\n]*(?<unit>k(?:(?=elvins?\b|\b)))/gi);


/**
 * Converts given temperature
 * @param {String} originalTemperature 
 * @param {String} locale Locale from Context Command
 * @returns {String}
 */
function convertTemperature(originalTemperature, locale)
{
    // Grab original scale
    let originalScale = "";
    if ( CelsiusRegex.test(originalTemperature) ) { originalScale = "c"; }
    else if ( FahernheitRegex.test(originalTemperature) ) { originalScale = "f"; }
    else if ( KelvinRegex.test(originalTemperature) ) { originalScale = "k"; }

    // Grab original numerical value of Temperature
    let originalValue = originalTemperature.match(new RegExp(/[0-9.\-]/gi));
    originalValue = originalValue.join('');
    originalValue = parseInt(originalValue);


    // CONVERT! :D
    if ( originalScale === "c" )
    {
        const CToF = ( originalValue * 9/5 ) + 32;
        const CToK = originalValue + 273.15;
        // Check for invalid Temperature
        if ( CToK < 0 ) { return localize(locale, 'TEMPERATURE_COMMAND_ERROR_INVALID_TEMPERATURE', `${originalValue}`, 'C'); }
        // Return converted temperatures
        //return `${originalValue}C is about ${CToF.toFixed(0)}F or ${CToK.toFixed(0)}K`;
        return localize(locale, 'TEMPERATURE_COMMAND_CONVERTED', `${originalValue}`, 'C', `${CToF.toFixed(0)}`, 'F', `${CToK.toFixed(0)}`, 'K');
    }
    else if ( originalScale === "f" )
    {
        const FToC = ( originalValue - 32 ) * 5/9;
        const FToK = ( originalValue - 32 ) * 5/9 + 273.15;
        // Check for invalid Temperature
        if ( FToK < 0 ) { return localize(locale, 'TEMPERATURE_COMMAND_ERROR_INVALID_TEMPERATURE', `${originalValue}`, 'F'); }
        // Return converted temperatures
        return localize(locale, 'TEMPERATURE_COMMAND_CONVERTED', `${originalValue}`, 'F', `${FToC.toFixed(0)}`, 'C', `${FToK.toFixed(0)}`, 'K');
    }
    else if ( originalScale === "k" )
    {
        const KToC = originalValue - 273.15;
        const KToF = ( originalValue - 273.15 ) * 9/5 + 32;
        // Check for invalid Temperature
        if ( originalValue < 0 ) { return localize(locale, 'TEMPERATURE_COMMAND_ERROR_INVALID_TEMPERATURE', `${originalValue}`, 'K'); }
        // Return converted temperatures
        return localize(locale, 'TEMPERATURE_COMMAND_CONVERTED', `${originalValue}`, 'K', `${KToC.toFixed(0)}`, 'C', `${KToF.toFixed(0)}`, 'F');
    }
}

module.exports = {
    // Command's Name
    //     Can use sentence casing and spaces
    Name: "Convert Temperature",

    // Command's Description
    Description: `Convert temperatures detected within sent Messages`,

    // Command's Category
    Category: "GENERAL",

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

        return Data;
    },



    /**
     * Executes the Context Command
     * @param {MessageContextMenuCommandInteraction} interaction 
     */
    async execute(interaction)
    {
        // Grab Source Message
        const SourceMessage = interaction.options.getMessage('message');

        // Error checks
        if ( SourceMessage.author.bot || SourceMessage.system || SourceMessage.author.system ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_SYSTEM_AND_BOT_MESSAGES_UNSUPPORTED') }); return; }
        if ( !SourceMessage.content || SourceMessage.content == '' ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'CONTEXT_COMMAND_ERROR_MISSING_CONTENT') }); return; }


        // Check there are actually temperatures in the Message
        const MatchedTemperatures = SourceMessage.content.match(TemperatureRegex);

        // No Temperatures found
        if ( !MatchedTemperatures || MatchedTemperatures == null ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'TEMPERATURE_COMMAND_ERROR_TEMPERATURE_NOT_FOUND') }); return; }
        // More than 10 results
        else if ( MatchedTemperatures.length > 10 ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'TEMPERATURE_COMMAND_ERROR_EXCEEDED_TEMPERATURE_LIMIT') }); return; }
        // One single result
        else if ( MatchedTemperatures.length === 1 )
        {
            const ConvertedResult = convertTemperature(MatchedTemperatures.shift(), interaction.locale);
            await interaction.reply({ ephemeral: true, content: `[${localize(interaction.locale, 'JUMP_TO_SOURCE_MESSAGE')}](<${SourceMessage.url}>)\n${localize(interaction.locale, 'TEMPERATURE_COMMAND_SUCCESS_SINGLAR')}\n\n• ${ConvertedResult}` });
            return;
        }
        // Between 2 and 10 results (inclusive)
        else
        {
            // Defer, just in case
            await interaction.deferReply({ ephemeral: true });

            // Loop through results, converting each one
            let convertedResults = [];
            MatchedTemperatures.forEach(item => {
                let tempResult = convertTemperature(item, interaction.locale);
                // Yes, I still have no idea what causes this error, so I'm keeping this from the v5 versions!
                while ( !tempResult || tempResult == undefined || tempResult == null ) { tempResult = convertTemperature(item, interaction.locale); }
                convertedResults.push(`• ${tempResult}`);
            });

            // Send Results
            await interaction.editReply({ ephemeral: true, content: `[${localize(interaction.locale, 'JUMP_TO_SOURCE_MESSAGE')}](<${SourceMessage.url}>)\n${localize(interaction.locale, 'TEMPERATURE_COMMAND_SUCCESS_MULTIPLE')}\n\n${convertedResults.join(`\n`)}` });
            return;
        }
    }
}
