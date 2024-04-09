const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, PermissionFlagsBits, ApplicationCommandOptionType, ChannelType, PermissionsBitField } = require("discord.js");
const { DiscordClient, fetchDisplayName } = require("../../../constants");
const { localize } = require("../../../BotModules/LocalizationModule");
const { LogToUserInteraction } = require("../../../BotModules/LoggingModule");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "heccbot",

    // Command's Description
    Description: `Subscribe this Server to HeccBot's Announcement Feed`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Subscribe this Server to HeccBot's Announcement Feed`,
        'en-US': `Subscribe this Server to HeccBot's Announcement Feed`
    },

    // Command's Category
    Category: "HECCBOT",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 30,

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
        Data.default_member_permissions = new PermissionsBitField(PermissionFlagsBits.ManageWebhooks).bitfield.toString();
        Data.options = [
            {
                type: ApplicationCommandOptionType.SubcommandGroup,
                name: "news",
                description: "Manage the subscription to HeccBot's News Feed",
                description_localizations: {
                    'en-GB': `Manage the subscription to HeccBot's News Feed`,
                    'en-US': `Manage the subscription to HeccBot's News Feed`
                },
                options: [
                    {
                        type: ApplicationCommandOptionType.Subcommand,
                        name: "subscribe",
                        description: "Subscribe to HeccBot's News & Updates Feed",
                        description_localizations: {
                            'en-GB': `Subscribe to HeccBot's News & Updates Feed`,
                            'en-US': `Subscribe to HeccBot's News & Updates Feed`
                        },
                        options: [
                            {
                                type: ApplicationCommandOptionType.Channel,
                                name: "channel",
                                description: "Channel to subscribe this feed to",
                                description_localizations: {
                                    'en-GB': `Channel to subscribe this feed to`,
                                    'en-US': `Channel to subscribe this feed to`
                                },
                                channel_types: [ ChannelType.GuildText ],
                                required: true
                            }
                        ]
                    }
                ]
            },
            /* {
                type: ApplicationCommandOptionType.SubcommandGroup,
                name: "status",
                description: "Manage the subscription to HeccBot's Status Feed",
                description_localizations: {
                    'en-GB': `Manage the subscription to HeccBot's Status Feed`,
                    'en-US': `Manage the subscription to HeccBot's Status Feed`
                },
                options: [
                    {
                        type: ApplicationCommandOptionType.Subcommand,
                        name: "subscribe",
                        description: "Subscribe to HeccBot's Status & Outages Feed",
                        description_localizations: {
                            'en-GB': `Subscribe to HeccBot's Status & Outages Feed`,
                            'en-US': `Subscribe to HeccBot's Status & Outages Feed`
                        },
                        options: [
                            {
                                type: ApplicationCommandOptionType.Channel,
                                name: "channel",
                                description: "Channel to subscribe this feed to",
                                description_localizations: {
                                    'en-GB': `Channel to subscribe this feed to`,
                                    'en-US': `Channel to subscribe this feed to`
                                },
                                channelTypes: [ ChannelType.GuildText ],
                                required: true
                            }
                        ]
                    }
                ]
            } */
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
        const InputSubcommandGroup = interaction.options.getSubcommandGroup(true);
        const InputChannel = interaction.options.getChannel("channel", true, [ChannelType.GuildText]);

        // Ensure HeccBot can actually see the Channel in question
        if ( !InputChannel.permissionsFor(DiscordClient.user.id).has(PermissionFlagsBits.ViewChannel) )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'HECCBOT_FEED_ERROR_MISSING_VIEW_CHANNEL_PERMISSION', `<#${InputChannel.id}>`) });
            return;
        }

        // Check HeccBot has MANAGE_WEBHOOKS Permission in the Channel
        if ( !InputChannel.permissionsFor(DiscordClient.user.id).has(PermissionFlagsBits.ManageWebhooks) )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'HECCBOT_FEED_ERROR_MISSING_MANAGE_WEBHOOKS_PERMISSION', `<#${InputChannel.id}>`) });
            return;
        }

        // Just in case
        await interaction.deferReply({ ephemeral: true });

        // Fetch Announcement Channels, just in case
        const HeccbotUpdatesChannel = await DiscordClient.channels.fetch("1017011633576497155");
        //const HeccbotStatusChannel = await DiscordClient.channels.fetch("1181955422832316456");
        

        // Subscribe the relevent feed
        if ( InputSubcommandGroup === "news" )
        {
            await HeccbotUpdatesChannel.addFollower(InputChannel.id, localize(interaction.guildLocale, 'HECCBOT_FEED_AUDIT_LOG', fetchDisplayName(interaction.user, true)))
            .then(async () => {
                await interaction.editReply({ content: localize(interaction.locale, 'HECCBOT_FEED_NEWS_SUCCESS', `<#${InputChannel.id}>`) });
                return;
            })
            .catch(async err => {
                await LogToUserInteraction(interaction, null, err);
                return;
            });
        }
        /* else if ( InputSubcommandGroup === "status" )
        {
            await HeccbotStatusChannel.addFollower(InputChannel.id, localize(interaction.guildLocale, 'HECCBOT_FEED_AUDIT_LOG', fetchDisplayName(interaction.user, true)))
            .then(async () => {
                await interaction.editReply({ content: localize(interaction.locale, 'HECCBOT_FEED_STATUS_SUCCESS', `<#${InputChannel.id}>`) });
                return;
            })
            .catch(async err => {
                await LogToUserInteraction(interaction, null, err);
                return;
            });
        } */

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
