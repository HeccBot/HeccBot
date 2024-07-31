const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, PermissionFlagsBits, ApplicationCommandOptionType, ChannelType, PermissionsBitField } = require("discord.js");
const { DiscordClient, fetchDisplayName } = require("../../../constants");
const { localize } = require("../../../BotModules/LocalizationModule");
const { LogToUserInteraction } = require("../../../BotModules/LoggingModule");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "news",

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
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "Channel to subscribe HeccBot's News feed to",
                description_localizations: {
                    'en-GB': `Channel to subscribe HeccBot's News feed to`,
                    'en-US': `Channel to subscribe HeccBot's News feed to`
                },
                channel_types: [ ChannelType.GuildText ],
                required: true
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
        const HeccbotUpdatesChannel = await DiscordClient.channels.fetch("1265231805858975808");
        

        // Subscribe the relevent feed
        await HeccbotUpdatesChannel.addFollower(InputChannel.id, localize(interaction.guildLocale, 'HECCBOT_FEED_AUDIT_LOG', fetchDisplayName(interaction.user, true)))
        .then(async () => {
            await interaction.editReply({ content: localize(interaction.locale, 'HECCBOT_FEED_NEWS_SUCCESS', `<#${InputChannel.id}>`) });
            return;
        })
        .catch(async err => {
            await LogToUserInteraction(interaction, null, err);
            return;
        });

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
