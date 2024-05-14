const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, ApplicationCommandOptionType } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "dice",

    // Command's Description
    Description: `Roll some dice to get a random number`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Roll some dice to get a random number`,
        'en-US': `Roll some dice to get a random number`
    },

    // Command's Category
    Category: "GENERAL",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 5,

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
        Data.integration_types = [ 0, 1 ]; // 0 for GUILD_INSTALL, 1 for USER_INSTALL, can include both but must have at least one of them included
        Data.contexts = [ 0, 2 ]; // 0 for GUILD, 1 for BOT_DM (DMs with the Bot), 2 for PRIVATE_CHANNEL (DMs/GDMs that don't include Bot). Must include at least one, PRIVATE_CHANNEL can only be used if integrationTypes includes USER_INSTALL
        Data.options = [
            {
                type: ApplicationCommandOptionType.String,
                name: "type",
                description: "Type of Die to roll",
                description_localizations: {
                    'en-GB': "Type of Die to roll",
                    'en-US': "Type of Die to roll"
                },
                required: true,
                choices: [
                    { name: "D4 (1 - 4)", value: "D4" },
                    { name: "D6 (1 - 6)", value: "D6" },
                    { name: "D10 (1 - 10)", value: "D10" },
                    { name: "D12 (1 - 12)", value: "D12" },
                    { name: "D20 (1 - 20)", value: "D20" },
                    { name: "D100 (1 - 100)", value: "D100" },
                ]
            },
            {
                type: ApplicationCommandOptionType.Integer,
                name: "amount",
                description: "Amount of Dice to roll",
                description_localizations: {
                    'en-GB': "Amount of Dice to roll",
                    'en-US': "Amount of Dice to roll"
                },
                required: true,
                min_value: 1,
                max_value: 10
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
        // Grab inputs
        const InputDieType = interaction.options.getString("type", true);
        const InputAmount = interaction.options.getInteger("amount", true);

        // Convert Die Type into Integer
        let maxValue = Number(InputDieType.slice(1));

        // Roll 1 Die
        if ( InputAmount === 1 )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'DICE_COMMAND_SINGLE_ROLL', InputDieType, rollDie(maxValue)) });
        }
        else
        {
            let rolledResults = [];
            for (let i = 0; i < InputAmount; i++)
            {
                rolledResults.push(`${rollDie(maxValue)}`);
            }

            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'DICE_COMMAND_MULTIPLE_ROLLS', InputAmount, InputDieType, rolledResults.join(", ")) });
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





/**
 * Rolls a die (picks a random number between 1 and maxNumber)
 * @param {Number} maxNumber The highest number to pick a range of
 */
function rollDie(maxNumber)
{
    return Math.floor(( Math.random() * maxNumber ) + 1);
}
