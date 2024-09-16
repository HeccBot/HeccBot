import { ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, ApplicationCommandOptionType } from 'discord-api-types/v10';
import { API, MessageFlags } from '@discordjs/core';
import { localize } from '../../../Utility/localizeResponses.js';


/**
 * Rolls a die (picks a random number between 1 and maxNumber)
 * @param {Number} maxNumber The highest number to pick a range of
 */
function rollDie(maxNumber)
{
    return Math.floor(( Math.random() * maxNumber ) + 1);
}


export const SlashCommand = {
    /** Command's Name, in fulllowercase (can include hyphens)
     * @type {String}
     */
    name: "dice",

    /** Command's Description
     * @type {String}
     */
    description: "Roll some dice to get a random number",

    /** Command's Localised Descriptions
     * @type {import('discord-api-types/v10').LocalizationMap}
     */
    localizedDescriptions: {
        'en-GB': 'Roll some dice to get a random number',
        'en-US': 'Roll some dice to get a random number'
    },

    /** Command's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 5,

    /**
     * Cooldowns for specific Subcommands
     */
    // Where "exampleName" is either the Subcommand's Name, or a combo of both Subcommand Group Name and Subcommand Name
    //  For ease in handling cooldowns, this should also include the root Command name as a prefix
    // In either "rootCommandName_subcommandName" or "rootCommandName_groupName_subcommandName" formats
    subcommandCooldown: {
        "exampleName": 3
    },
    

    /** Get the Command's data in a format able to be registered with via Discord's API
     * @returns {import('discord-api-types/v10').RESTPostAPIApplicationCommandsJSONBody}
     */
    getRegisterData() {
        /** @type {import('discord-api-types/v10').RESTPostAPIApplicationCommandsJSONBody} */
        const CommandData = {};

        CommandData.name = this.name;
        CommandData.description = this.description;
        CommandData.description_localizations = this.localizedDescriptions;
        CommandData.type = ApplicationCommandType.ChatInput;
        // Integration Types - 0 for GUILD_INSTALL, 1 for USER_INSTALL.
        //  MUST include at least one. 
        CommandData.integration_types = [ ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall ];
        // Contexts - 0 for GUILD, 1 for BOT_DM (DMs with the App), 2 for PRIVATE_CHANNEL (DMs/GDMs that don't include the App).
        //  MUST include at least one. PRIVATE_CHANNEL can only be used if integration_types includes USER_INSTALL
        CommandData.contexts = [ InteractionContextType.Guild, InteractionContextType.PrivateChannel ];
        // Options
        CommandData.options = [
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

        return CommandData;
    },

    /** Handles given Autocomplete Interactions, should this Command use Autocomplete Options
     * @param {import('discord-api-types/v10').APIApplicationCommandAutocompleteInteraction} interaction 
     * @param {API} api
     * @param {import('discord-api-types/v10').APIUser} interactionUser 
     */
    async handleAutoComplete(interaction, api, interactionUser) {
        await api.interactions.createAutocompleteResponse(interaction.id, interaction.token, { choices: [ {name: "Not implemented yet!", value: "NOT_IMPLEMENTED"} ] });

        return;
    },

    /** Runs the Command
     * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
     * @param {API} api
     * @param {import('discord-api-types/v10').APIUser} interactionUser 
     * @param {String} usedCommandName 
     */
    async executeCommand(interaction, api, interactionUser, usedCommandName) {
        // Grab inputs
        const InputDieType = interaction.data.options.find(option => option.name === "type");
        const InputAmount = interaction.data.options.find(option => option.name === "amount");

        // Convert Die type into integer for ease
        let maxValue = Number(InputDieType.value.slice(1));

        // Roll a single die
        if ( InputAmount.value === 1 ) {
            await api.interactions.reply(interaction.id, interaction.token, {
                flags: MessageFlags.Ephemeral,
                content: localize(interaction.locale, 'DICE_COMMAND_SINGLE_ROLL', InputDieType.value, rollDie(maxValue))
            });
        }
        else {
            let rolledResults = [];
            for ( let i = 0; i < InputAmount.value; i++ ) {
                rolledResults.push(`${rollDie(maxValue)}`);
            }

            await api.interactions.reply(interaction.id, interaction.token, {
                flags: MessageFlags.Ephemeral,
                content: localize(interaction.locale, 'DICE_COMMAND_MULTIPLE_ROLLS', InputAmount.value, InputDieType.value, rolledResults.join(', '))
            });
        }

        return;
    }
}
