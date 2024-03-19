const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, ApplicationCommandOptionType } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "temperature",

    // Command's Description
    Description: `Convert a given temperature between degrees C, F, and K`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Convert a given temperature between degrees C, F, and K`,
        'en-US': `Convert a given temperature between degrees F, C, and K`
    },

    // Command's Category
    Category: "GENERAL",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 10,

    // Cooldowns for specific subcommands and/or subcommand-groups
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandCooldown: {
        "example": 3
    },

    // Scope of Command's usage
    //     One of the following: DM, GUILD, ALL
    Scope: "GUILD",

    // Scope of specific Subcommands Usage
    //     One of the following: DM, GUILD, ALL
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandScope: {
        "example": "GUILD"
    },



    /**
     * Returns data needed for registering Slash Command onto Discord's API
     * @returns {ChatInputApplicationCommandData}
     */
    registerData()
    {
        /** @type {ChatInputApplicationCommandData} */
        const Data = {};

        Data.name = this.Name;
        Data.description = this.Description;
        Data.description_localizations = this.LocalisedDescriptions;
        Data.type = ApplicationCommandType.ChatInput;
        Data.integration_types = [ 0 ]; // 0 for GUILD_INSTALL, 1 for USER_INSTALL, can include both but must have at least one of them included
        Data.contexts = [ 0 ]; // 0 for GUILD, 1 for BOT_DM (DMs with the Bot), 2 for PRIVATE_CHANNEL (DMs/GDMs that don't include Bot). Must include at least one, PRIVATE_CHANNEL can only be used if integrationTypes includes USER_INSTALL
        Data.options = [
            {
                type: ApplicationCommandOptionType.Integer,
                name: "value",
                description: "The temperature value you want to convert",
                descriptionLocalizations: {
                    'en-GB': `The temperature value you want to convert`,
                    'en-US': `The temperature value you want to convert`
                },
                min_value: -460,
                max_value: 1000,
                required: true
            },
            {
                type: ApplicationCommandOptionType.String,
                name: "scale",
                description: "The temperature scale of the original value",
                descriptionLocalizations: {
                    'en-GB': `The temperature scale of the original value`,
                    'en-US': `The temperature scale of the original value`
                },
                required: true,
                choices: [
                    { 
                        name: "Celsius",
                        nameLocalizations: {
                            'en-GB': `Celsius`,
                            'en-US': `Celsius`
                        },
                        value: "c"
                    },
                    { 
                        name: "Fahernheit",
                        nameLocalizations: {
                            'en-GB': `Fahernheit`,
                            'en-US': `Fahernheit`
                        },
                        value: "f"
                    },
                    { 
                        name: "Kelvin",
                        nameLocalizations: {
                            'en-GB': `Kelvin`,
                            'en-US': `Kelvin`
                        },
                        value: "k"
                    }
                ]
            }
        ];

        return Data;
    },



    /**
     * Executes the Slash Command
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction)
    {
        // Grab values
        const InputValue = interaction.options.getInteger("value", true);
        const InputScale = interaction.options.getString("scale", true);


        // Convert
        switch (InputScale)
        {
            // C TO F/K
            case "c":
                const CToF = (InputValue * 9/5) + 32;
                const CToK = InputValue + 273.15;
                if ( CToK < 0 ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'TEMPERATURE_COMMAND_ERROR_INVALID_TEMPERATURE', `${InputValue}`, 'C') }); return; }
                await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'TEMPERATURE_COMMAND_CONVERTED', `${InputValue}`, 'C', `${CToF.toFixed(0)}`, 'F', `${CToK.toFixed(0)}`, 'K') });
                break;

            // F TO C/K
            case "f":
                const FToC = (InputValue - 32) * 5/9;
                const FToK = (InputValue - 32) * 5/9 + 273.15;
                if ( FToK < 0 ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'TEMPERATURE_COMMAND_ERROR_INVALID_TEMPERATURE', `${InputValue}`, 'F') }); return; }
                await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'TEMPERATURE_COMMAND_CONVERTED', `${InputValue}`, 'F', `${FToC.toFixed(0)}`, 'C', `${FToK.toFixed(0)}`, 'K') });
                break;

            // K TO C/F
            case "k":
                const KToC = InputValue - 273.15;
                const KToF = (InputValue - 273.15) * 9/5 + 32;
                if ( InputValue < 0 ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'TEMPERATURE_COMMAND_ERROR_INVALID_TEMPERATURE', `${InputValue}`, 'K') }); return; }
                await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'TEMPERATURE_COMMAND_CONVERTED', `${InputValue}`, 'K', `${KToC.toFixed(0)}`, 'C', `${KToF.toFixed(0)}`, 'F') });
                break;

            default:
                await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ERROR_GENERIC') });
                break;
        }

        return;
    },



    /**
     * Handles given Autocomplete Interactions for any Options in this Slash CMD that uses it
     * @param {AutocompleteInteraction} interaction 
     */
    async autocomplete(interaction)
    {
        //.
    }
}
