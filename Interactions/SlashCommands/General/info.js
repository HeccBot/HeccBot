const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, ApplicationCommandOptionType } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule.js");
const { fetchServerInfo, fetchInviteInfo, fetchUserInfo, fetchRoleInfo, fetchChannelInfo } = require("../../../BotModules/Commands/InfoCmdModule.js");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "info",

    // Command's Description
    Description: `Shows information about this Server, a User, Role, Channel, or Server Invite.`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Shows information about this Server, a User, Role, Channel, or Server Invite.`,
        'en-US': `Shows information about this Server, a User, Role, Channel, or Server Invite.`
    },

    // Command's Category
    Category: "GENERAL",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 30,

    // Cooldowns for specific subcommands and/or subcommand-groups
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandCooldown: {
        "server": 30,
        "invite": 60,
        "user": 30,
        "role": 20,
        "channel": 20
    },

    // Scope of Command's usage
    //     One of the following: DM, GUILD, ALL
    Scope: "GUILD",

    // Scope of specific Subcommands Usage
    //     One of the following: DM, GUILD, ALL
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandScope: {
        "server": "GUILD",
        "invite": "GUILD",
        "user": "GUILD",
        "role": "GUILD",
        "channel": "GUILD",
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
                name: "server",
                description: "Display information about this Server",
                description_localizations: {
                    'en-GB': `Display information about this Server`,
                    'en-US': `Display information about this Server`
                },
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "user",
                description: "Display information about either yourself, or another User",
                description_localizations: {
                    'en-GB': `Display information about either yourself, or another User`,
                    'en-US': `Display information about either yourself, or another User`
                },
                options: [
                    {
                        type: ApplicationCommandOptionType.User,
                        name: "user",
                        description: "User to display information about",
                        description_localizations: {
                            'en-GB': `User to display information about`,
                            'en-US': `User to display information about`
                        },
                        required: false
                    }
                ]
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "invite",
                description: "Display information about a given Discord Server Invite",
                description_localizations: {
                    'en-GB': `Display information about a given Discord Server Invite`,
                    'en-US': `Display information about a given Discord Server Invite`
                },
                options: [
                    {
                        type: ApplicationCommandOptionType.String,
                        name: "code",
                        description: "The Discord Invite Code or Link",
                        description_localizations: {
                            'en-GB': `The Discord Invite Code or Link`,
                            'en-US': `The Discord Invite Code or Link`
                        },
                        max_length: 150,
                        required: true
                    }
                ]
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "role",
                description: "Display information about a Role from this Server",
                description_localizations: {
                    'en-GB': `Display information about a Role from this Server`,
                    'en-US': `Display information about a Role from this Server`
                },
                options: [
                    {
                        type: ApplicationCommandOptionType.Role,
                        name: "role",
                        description: "Role to display information about",
                        description_localizations: {
                            'en-GB': `Role to display information about`,
                            'en-US': `Role to display information about`
                        },
                        required: true
                    }
                ]
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "channel",
                description: "Display information about either this Channel, or a specified Channel",
                description_localizations: {
                    'en-GB': `Display information about either this Channel, or a specified Channel`,
                    'en-US': `Display information about either this Channel, or a specified Channel`
                },
                options: [
                    {
                        type: ApplicationCommandOptionType.Channel,
                        name: "channel",
                        description: "Channel to display information about",
                        description_localizations: {
                            'en-GB': `Channel to display information about`,
                            'en-US': `Channel to display information about`
                        },
                        required: false
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
        // Just in case a Discord API Outage breaks things
        if ( !interaction.guild.available )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ERROR_COMMAND_OUTAGE') });
            return;
        }

        // Grab Subcommand and run based off that
        const SubcommandName = interaction.options.getSubcommand(true);

        switch (SubcommandName)
        {
            case "server":
                await fetchServerInfo(interaction);
                break;

            case "user":
                await fetchUserInfo(interaction);
                break;

            case "invite":
                await fetchInviteInfo(interaction);
                break;

            case "role":
                await fetchRoleInfo(interaction);
                break;

            case "channel":
                await fetchChannelInfo(interaction);
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
