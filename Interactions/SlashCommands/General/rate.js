const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, ApplicationCommandOptionType } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { fetchDisplayName } = require("../../../constants");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "rate",

    // Command's Description
    Description: `Give a User or Server a public rating!`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Give a User or Server a public rating!`,
        'en-US': `Give a User or Server a public rating!`
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
        "user": 10,
        "server": 10
    },

    // Scope of Command's usage
    //     One of the following: DM, GUILD, ALL
    Scope: "GUILD",

    // Scope of specific Subcommands Usage
    //     One of the following: DM, GUILD, ALL
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandScope: {
        "user": "GUILD",
        "server": "GUILD"
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
                type: ApplicationCommandOptionType.Subcommand,
                name: "user",
                description: "Give another User a public rating",
                description_localizations: {
                    'en-GB': "Give another User a public rating",
                    'en-US': "Give another User a public rating"
                },
                options: [
                    {
                        type: ApplicationCommandOptionType.User,
                        name: "user",
                        description: "User you want to rate",
                        description_localizations: {
                            'en-GB': "User you want to rate",
                            'en-US': "User you want to rate"
                        },
                        required: true
                    },
                    {
                        type: ApplicationCommandOptionType.Integer,
                        name: "rating",
                        description: "Rating you want to give (out of 100)",
                        description_localizations: {
                            'en-GB': "Rating you want to give (out of 100)",
                            'en-US': "Rating you want to give (out of 100)"
                        },
                        required: true,
                        min_value: 0,
                        max_value: 100
                    }
                ]
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "server",
                description: "Give this Server a public rating",
                description_localizations: {
                    'en-GB': "Give this Server a public rating",
                    'en-US': "Give this Server a public rating"
                },
                options: [
                    {
                        type: ApplicationCommandOptionType.Integer,
                        name: "rating",
                        description: "Rating you want to give (out of 100)",
                        description_localizations: {
                            'en-GB': "Rating you want to give (out of 100)",
                            'en-US': "Rating you want to give (out of 100)"
                        },
                        required: true,
                        min_value: 0,
                        max_value: 100
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
        // Grab Rating input (which is in both Subcommands)
        const InputRating = interaction.options.getInteger("rating", true);
        const InputSubcommand = interaction.options.getSubcommand(true);

        
        // USER subcommand
        if ( InputSubcommand === "user" )
        {
            // Grab User Input
            const InputMember = interaction.options.getMember("user");

            // Ensure User is member of Server
            if ( !InputMember || InputMember == null ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'RATE_COMMAND_ERROR_USER_NOT_IN_SERVER') }); return; }

            // Ensure not rating self
            if ( InputMember.id === interaction.user.id ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'RATE_COMMAND_ERROR_CANNOT_RATE_SELF') }); return; }

            // Output!
            await interaction.reply({ allowedMentions: { parse: [] }, content: localize(interaction.guildLocale, 'RATE_COMMAND_USER_SUCCESS', fetchDisplayName(interaction.member), fetchDisplayName(InputMember), InputRating) });
            return;
        }
        // SERVER subcommand
        else if ( InputSubcommand === "server" )
        {
            // Ensure not rating Servers User owns
            if ( interaction.user.id === interaction.guild?.ownerId ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'RATE_COMMAND_ERROR_CANNOT_RATE_OWN_SERVER') }); return; }

            // Output!
            await interaction.reply({ allowedMentions: { parse: [] }, content: localize(interaction.guildLocale, 'RATE_COMMAND_SERVER_SUCCESS', fetchDisplayName(interaction.member), interaction.guild.name, InputRating) });
            return;
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
