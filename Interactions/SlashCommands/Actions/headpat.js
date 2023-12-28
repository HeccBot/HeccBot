const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, ApplicationCommandOptionType } = require("discord.js");
const { SlashAction } = require("../../../BotModules/ActionModule.js");
const { LogDebug, LogToUserInteraction } = require("../../../BotModules/LoggingModule.js");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "headpat",

    // Command's Description
    Description: `Comfort someone with a gentle headpat`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Comfort someone with a gentle headpat`,
        'en-US': `Comfort someone with a gentle headpat`
    },

    // Command's Category
    Category: "ACTION",

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
        Data.descriptionLocalizations = this.LocalisedDescriptions;
        Data.type = ApplicationCommandType.ChatInput;
        Data.dmPermission = false;
        Data.options = [
            {
                type: ApplicationCommandOptionType.Mentionable,
                name: "person",
                description: "Person you want to headpat",
                descriptionLocalizations: {
                    'en-GB': `Person you want to headpat`,
                    'en-US': `Person you want to headpat`
                },
                required: true
            },
            {
                type: ApplicationCommandOptionType.Boolean,
                name: "gif",
                description: "Should a random GIF be displayed? (default: false)",
                descriptionLocalizations: {
                    'en-GB': `Should a random GIF be displayed? (default: false)`,
                    'en-US': `Should a random GIF be displayed? (default: false)`
                },
                required: false
            },
            {
                type: ApplicationCommandOptionType.Boolean,
                name: "button",
                description: "Should the \"Return Headpat\" Button be included? (default: true)",
                descriptionLocalizations: {
                    'en-GB': `Should the \"Return Headpat\" Button be included? (default: true)`,
                    'en-US': `Should the \"Return Headpat\" Button be included? (default: true)`
                },
                required: false
            },
            {
                type: ApplicationCommandOptionType.String,
                name: "reason",
                description: "A custom message to be added onto the end of the default message",
                descriptionLocalizations: {
                    'en-GB': `A custom message to be added onto the end of the default message`,
                    'en-US': `A custom message to be added onto the end of the default message`
                },
                max_length: 500,
                required: false
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
        try {
            await SlashAction(interaction);
        }
        catch (err) {
            await LogDebug(err);
            await LogToUserInteraction(interaction, null, err);
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
