import { ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, ApplicationCommandOptionType, ChannelType, ButtonStyle, InviteType, InviteTargetType } from 'discord-api-types/v10';
import { API, MessageFlags } from '@discordjs/core';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from '@discordjs/builders';
import { DiscordSnowflake } from '@sapphire/snowflake';
import { localize } from '../../../Utility/localizeResponses.js';
import * as AppEmoji from '../../../Assets/AppEmojis.js';
import { getGuildPremiumTierEmoji, readableChannelType, readableGuildPremiumTier, readableInviteType, readableNSFWLevel } from '../../../Modules/InfoCmdModule.js';
import { DISCORD_APP_USER_ID } from '../../../config.js';
import { titleCaseGuildFeature } from '../../../Utility/utilityMethods.js';


/**
 * RegEx to match Discord invite links.
 * The `code` group property is present on the `exec()` resultant
 * @type {RegExp}
 */
const InvitePattern = new RegExp(/discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/(?<code>[\w-]{2,255})/i);

/**
 * Invite Flags (not officially documented)
 */
const InviteFlags = {
    /** Invite grants one-time access to a Voice Channel in a Guild */
    Guest: 1 << 0,
    /** Invite has been viewed by any User (ie: has been retrieved using the `GET Invite` endpoint) */
    Viewed: 1 << 1
};

/** 
 * Resolves Invite Links to return the Invite code
 * @param {String} inviteString The Invite link to get the Invite code from
 * @returns {String}
 */
function _resolveInviteCode(inviteString) {
    return InvitePattern.exec(inviteString)?.[1] ?? inviteString;
}


export const SlashCommand = {
    /** Command's Name, in fulllowercase (can include hyphens)
     * @type {String}
     */
    name: "info",

    /** Command's Description
     * @type {String}
     */
    description: "Shows information about this Server, a User, a Role, a Channel, or an Invite",

    /** Command's Localised Descriptions
     * @type {import('discord-api-types/v10').LocalizationMap}
     */
    localizedDescriptions: {
        'en-GB': 'Shows information about this Server, a User, a Role, a Channel, or an Invite',
        'en-US': 'Shows information about this Server, a User, a Role, a Channel, or an Invite'
    },

    /** Command's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 30,

    /**
     * Cooldowns for specific Subcommands
     */
    // Where "exampleName" is either the Subcommand's Name, or a combo of both Subcommand Group Name and Subcommand Name
    //  For ease in handling cooldowns, this should also include the root Command name as a prefix
    // In either "rootCommandName_subcommandName" or "rootCommandName_groupName_subcommandName" formats
    subcommandCooldown: {
        "server": 30,
        "invite": 30,
        "user": 30,
        "role": 20,
        "channel": 20,
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
                type: ApplicationCommandOptionType.Subcommand,
                name: "server",
                description: "Display information about this Server",
                description_localizations: {
                    'en-GB': "Display information about this Server",
                    'en-US': "Display information about this Server"
                }
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "user",
                description: "Display information about either yourself, or another User",
                description_localizations: {
                    'en-GB': "Display information about either yourself, or another User",
                    'en-US': "Display information about either yourself, or another User"
                },
                options: [{
                    type: ApplicationCommandOptionType.User,
                    name: "user",
                    description: "User to display information about",
                    description_localizations: {
                        'en-GB': "User to display information about",
                        'en-US': "User to display information about"
                    },
                    required: false
                }]
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "invite",
                description: "Display information about a given Discord Invite link/code",
                description_localizations: {
                    'en-GB': "Display information about a given Discord Invite link/code",
                    'en-US': "Display information about a given Discord Invite link/code"
                },
                options: [{
                    type: ApplicationCommandOptionType.String,
                    name: "code",
                    description: "The Invite link or code",
                    description_localizations: {
                        'en-GB': "The Invite link or code",
                        'en-US': "The invite link or code"
                    },
                    max_length: 150,
                    required: true
                }]
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "role",
                description: "Display information about a Role from this Server",
                description_localizations: {
                    'en-GB': "Display information about a Role from this Server",
                    'en-US': "Display information about a Role from this Server"
                },
                options: [{
                    type: ApplicationCommandOptionType.Role,
                    name: "role",
                    description: "Role to display information about",
                    description_localizations: {
                        'en-GB': "Role to display information about",
                        'en-US': "Role to display information about"
                    },
                    required: true
                }]
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "channel",
                description: "Display information about either this Channel, or another Channel in this Server",
                description_localizations: {
                    'en-GB': "Display information about either this Channel, or another Channel in this Server",
                    'en-US': "Display information about either this Channel, or another Channel in this Server"
                },
                options: [{
                    type: ApplicationCommandOptionType.Channel,
                    name: "channel",
                    description: "Channel to display information about",
                    description_localizations: {
                        'en-GB': "Channel to display information about",
                        'en-US': "Channel to display information about"
                    },
                    required: false
                }]
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
        // Grab subcommand used and execute correct method
        const InputSubcommand = interaction.data.options.find(option => option.type === ApplicationCommandOptionType.Subcommand);

        // Defer just in case :)
        await api.interactions.defer(interaction.id, interaction.token, { flags: MessageFlags.Ephemeral });

        // Performing an extra check on the context these were used in
        //   Simply because, there may be some API calls we cannot do in a User App context, and thus have to show less info in such cases
        //   Example: Running "/info server" in a Guild context will show more info then in a User App context

        if ( InputSubcommand.name === "server" && (interaction.authorizing_integration_owners[0] != undefined) ) { await _getServerInfoGuildContext(interaction, api, InputSubcommand); return; }
        else if ( InputSubcommand.name === "server" && (interaction.authorizing_integration_owners[0] == undefined && interaction.authorizing_integration_owners[1] != undefined) ) { await _getServerInfoUserContext(interaction, api, InputSubcommand); return; }
        
        else if ( InputSubcommand.name === "user" && (interaction.authorizing_integration_owners[0] != undefined) ) { await _getUserInfoGuildContext(interaction, api, InputSubcommand); return; }
        else if ( InputSubcommand.name === "user" && (interaction.authorizing_integration_owners[0] == undefined && interaction.authorizing_integration_owners[1] != undefined) ) { await _getUserInfoUserContext(interaction, api, InputSubcommand); return; }
        
        else if ( InputSubcommand.name === "invite" ) { await _getInviteInfo(interaction, api, InputSubcommand); return; }
        
        else if ( InputSubcommand.name === "role" && (interaction.authorizing_integration_owners[0] != undefined) ) { await _getRoleInfoGuildContext(interaction, api, InputSubcommand); return; }
        else if ( InputSubcommand.name === "role" && (interaction.authorizing_integration_owners[0] == undefined && interaction.authorizing_integration_owners[1] != undefined) ) { await _getRoleInfoUserContext(interaction, api, InputSubcommand); return; }
        
        else if ( InputSubcommand.name === "channel" && (interaction.authorizing_integration_owners[0] != undefined) ) { await _getChannelInfoGuildContext(interaction, api, InputSubcommand); return; }
        else if ( InputSubcommand.name === "channel" && (interaction.authorizing_integration_owners[0] == undefined && interaction.authorizing_integration_owners[1] != undefined) ) { await _getChannelInfoUserContext(interaction, api, InputSubcommand); return; }

        return;
    }
}



/** Returns the Server's public information, when used in a Guild context
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {API} api
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} inputSubcommand 
 */
async function _getServerInfoGuildContext(interaction, api, inputSubcommand) {
    // Fetch Guild for up-to-date information
    const FetchedGuild = await api.guilds.get(interaction.guild_id, { with_counts: true });


    // Get what type of Server this is
    let serverType = localize(interaction.locale, 'SERVER_TYPE_STANDARD');
    if ( FetchedGuild.features.includes('COMMUNITY') && !FetchedGuild.features.includes('CLAN') && !FetchedGuild.features.includes('HUB') && !FetchedGuild.features.includes('INTERNAL_EMPLOYEE_ONLY') ) { serverType = localize(interaction.locale, 'SERVER_TYPE_STANDARD_COMMUNITY'); }
    else if ( FetchedGuild.features.includes('CLAN') && !FetchedGuild.features.includes('HUB') && !FetchedGuild.features.includes('INTERNAL_EMPLOYEE_ONLY') ) { serverType = localize(interaction.locale, 'SERVER_TYPE_GAMING_GUILD'); }
    else if ( !FetchedGuild.features.includes('CLAN') && FetchedGuild.features.includes('HUB') && !FetchedGuild.features.includes('INTERNAL_EMPLOYEE_ONLY') ) { serverType = localize(interaction.locale, 'SERVER_TYPE_HUB'); }
    else if ( !FetchedGuild.features.includes('CLAN') && !FetchedGuild.features.includes('HUB') && FetchedGuild.features.includes('INTERNAL_EMPLOYEE_ONLY') ) { serverType = localize(interaction.locale, 'SERVER_TYPE_STAFF'); }


    // Channel information
    const GuildChannels = await api.guilds.getChannels(interaction.guild_id);
    let textChannelCount = 0;
    let voiceChannelCount = 0;
    let stageChannelCount = 0;
    let announcementChannelCount = 0;
    let categoryChannelCount = 0;
    let forumChannelCount = 0;
    let mediaChannelCount = 0;
    let directoryChannelCount = 0;
    let unknownChannelCount = 0;

    GuildChannels.forEach(channel => {
        if ( channel.type === ChannelType.GuildAnnouncement ) { announcementChannelCount += 1; }
        else if ( channel.type === ChannelType.GuildCategory ) { categoryChannelCount += 1; }
        else if ( channel.type === ChannelType.GuildDirectory ) { directoryChannelCount += 1; }
        else if ( channel.type === ChannelType.GuildForum ) { forumChannelCount += 1; }
        else if ( channel.type === ChannelType.GuildMedia ) { mediaChannelCount += 1; }
        else if ( channel.type === ChannelType.GuildStageVoice ) { stageChannelCount += 1; }
        else if ( channel.type === ChannelType.GuildText ) { textChannelCount += 1; }
        else if ( channel.type === ChannelType.GuildVoice ) { voiceChannelCount += 1; }
        else { unknownChannelCount += 1; }
    });


    // Role information
    const GuildRoles = FetchedGuild.roles.filter(role => role.id !== interaction.guild_id); // Filters out atEveryone


    // Expressions
    const GuildEmojis = FetchedGuild.emojis;
    const GuildStickers = FetchedGuild.stickers;
    const GuildSounds = Array.from((await api.rest.get(`/guilds/${interaction.guild_id}/soundboard-sounds`))["items"]);


    // Scheduled Events
    const GuildScheduledEvents = await api.guilds.getScheduledEvents(interaction.guild_id);


    // Assets
    const HasBanner = FetchedGuild.banner == null ? false : true;
    const HasIcon = FetchedGuild.icon == null ? false : true;
    const HasDiscoverySplash = FetchedGuild.discovery_splash == null ? false : true;
    const HasInviteSplash = FetchedGuild.splash == null ? false : true;


    // Construct Embed
    const ServerInfoEmbed = new EmbedBuilder()
        .setAuthor(HasIcon ? { name: FetchedGuild.name, iconURL: `https://cdn.discordapp.com/icons/${interaction.guild_id}/${FetchedGuild.icon}${FetchedGuild.icon.startsWith("a_") ? '.gif' : '.png'}` } : { name: FetchedGuild.name })
        .setFooter({ text: localize(interaction.locale, 'CREATED') })
        .setTimestamp(DiscordSnowflake.timestampFrom(interaction.guild_id));
    
    
    // General information
    let generalInformation = ``;
    generalInformation += `**${localize(interaction.locale, 'INFO_SERVER_TYPE')}** ${serverType}`;
    generalInformation += `\n${AppEmoji.GUILD_OWNER_CROWN} **${localize(interaction.locale, 'INFO_SERVER_OWNER')}** <@${FetchedGuild.owner_id}>`;
    if ( FetchedGuild.features.includes("PARTNERED") ) { generalInformation += `\n${AppEmoji.PARTNERED_GUILD} **${localize(interaction.locale, 'INFO_SERVER_PARTNERED')}** ${localize(interaction.locale, 'TRUE')}`; }
    if ( FetchedGuild.features.includes("VERIFIED") ) { generalInformation += `\n${AppEmoji.VERIFIED_GUILD} **${localize(interaction.locale, 'INFO_SERVER_VERIFIED')}** ${localize(interaction.locale, 'TRUE')}`; }
    generalInformation += `\n${getGuildPremiumTierEmoji(FetchedGuild.premium_tier)} **${localize(interaction.locale, 'INFO_SERVER_BOOST_TIER')}** ${readableGuildPremiumTier(FetchedGuild.premium_tier, interaction.locale)}`;
    if ( FetchedGuild.premium_subscription_count != undefined ) { generalInformation += `\n${AppEmoji.GUILD_BOOST} **${localize(interaction.locale, 'INFO_SERVER_BOOST_COUNT')}** ${FetchedGuild.premium_subscription_count}`; }
    generalInformation += `\n${AppEmoji.EMOJI} **${localize(interaction.locale, 'INFO_SERVER_EMOJIS')}** ${GuildEmojis.length}`;
    generalInformation += `\n${AppEmoji.STICKER} **${localize(interaction.locale, 'INFO_SERVER_STICKERS')}** ${GuildStickers.length}`;
    generalInformation += `\n:trumpet: **${localize(interaction.locale, 'INFO_SERVER_SOUNDS')}** ${GuildSounds.length}`;
    generalInformation += `\n${AppEmoji.ROLE} **${localize(interaction.locale, 'INFO_SERVER_ROLES')}** ${GuildRoles.length} / 250`;

    // Additional general information
    if ( GuildScheduledEvents.length > 0 ) { generalInformation += `\n${AppEmoji.SCHEDULED_EVENT} **${localize(interaction.locale, 'INFO_SERVER_SCHEDULED_EVENTS')}** ${GuildScheduledEvents.length}`; }
    if ( FetchedGuild.approximate_member_count != undefined ) { generalInformation += `\n${AppEmoji.GUILD_MEMBERS} **${localize(interaction.locale, 'INFO_SERVER_APPROX_TOTAL_MEMBERS')}** ${FetchedGuild.approximate_member_count}`; }
    if ( FetchedGuild.approximate_presence_count != undefined ) { generalInformation += `\n${AppEmoji.STATUS_ONINE} **${localize(interaction.locale, 'INFO_SERVER_APPROX_ONLINE_MEMBERS')}** ${FetchedGuild.approximate_presence_count}`; }
    if ( FetchedGuild.vanity_url_code != undefined ) { generalInformation += `\n:link: **${localize(interaction.locale, 'INFO_SERVER_VANITY')}** https://discord.gg/${FetchedGuild.vanity_url_code}` }

    // Channel information
    let channelInformation = ``;
    if ( categoryChannelCount > 0 ) { channelInformation += `${AppEmoji.CHANNEL_CATEGORY} **${localize(interaction.locale, 'CHANNEL_TYPE_CATEGORY')}:** ${categoryChannelCount}`; }
    if ( textChannelCount > 0 ) { channelInformation += `${channelInformation.length > 3 ? `\n` : ''}${AppEmoji.CHANNEL_TEXT} **${localize(interaction.locale, 'CHANNEL_TYPE_TEXT')}:** ${textChannelCount}`; }
    if ( voiceChannelCount > 0 ) { channelInformation += `${channelInformation.length > 3 ? `\n` : ''}${AppEmoji.CHANNEL_VOICE} **${localize(interaction.locale, 'CHANNEL_TYPE_VOICE')}:** ${voiceChannelCount}`; }
    if ( announcementChannelCount > 0 ) { channelInformation += `${channelInformation.length > 3 ? `\n` : ''}${AppEmoji.CHANNEL_NEWS} **${localize(interaction.locale, 'CHANNEL_TYPE_ANNOUNCEMENT')}:** ${announcementChannelCount}`; }
    if ( forumChannelCount > 0 ) { channelInformation += `${channelInformation.length > 3 ? `\n` : ''}${AppEmoji.CHANNEL_FORUM} **${localize(interaction.locale, 'CHANNEL_TYPE_FORUM')}:** ${forumChannelCount}`; }
    if ( mediaChannelCount > 0 ) { channelInformation += `${channelInformation.length > 3 ? `\n` : ''}${AppEmoji.CHANNEL_MEDIA} **${localize(interaction.locale, 'CHANNEL_TYPE_MEDIA')}:** ${mediaChannelCount}`; }
    if ( stageChannelCount > 0 ) { channelInformation += `${channelInformation.length > 3 ? `\n` : ''}${AppEmoji.CHANNEL_STAGE} **${localize(interaction.locale, 'CHANNEL_TYPE_STAGE')}:** ${stageChannelCount}`; }
    if ( directoryChannelCount > 0 ) { channelInformation += `${channelInformation.length > 3 ? `\n` : ''}:compass: **${localize(interaction.locale, 'CHANNEL_TYPE_DIRECTORY')}:** ${directoryChannelCount}`; }
    if ( unknownChannelCount > 0 ) { channelInformation += `${channelInformation.length > 3 ? `\n` : ''}:grey_question: **${localize(interaction.locale, 'UNKNOWN')}:** ${unknownChannelCount}`; }
    if ( FetchedGuild.afk_channel_id != null ) { channelInformation += `${channelInformation.length > 3 ? `\n` : ''}${AppEmoji.STATUS_IDLE} **${localize(interaction.locale, 'CHANNEL_AFK')}** <#${FetchedGuild.afk_channel_id}>`; }
    if ( FetchedGuild.system_channel_id != null ) { channelInformation += `${channelInformation.length > 3 ? `\n` : ''}:gear: **${localize(interaction.locale, 'CHANNEL_SYSTEM')}** <#${FetchedGuild.system_channel_id}>`; }
    if ( FetchedGuild.rules_channel_id != null ) { channelInformation += `${channelInformation.length > 3 ? `\n` : ''}${AppEmoji.CHANNEL_RULES} **${localize(interaction.locale, 'CHANNEL_RULES')}** <#${FetchedGuild.rules_channel_id}>`; }

    
    // Add to embed
    ServerInfoEmbed.setDescription(FetchedGuild.description)
    .addFields(
        { name: localize(interaction.locale, 'INFO_SERVER_HEADER_GENERAL'), value: generalInformation },
        { name: `${localize(interaction.locale, 'INFO_SERVER_HEADER_CHANNELS')} (${GuildChannels.length} / 500)`, value: channelInformation }
    );


    // Create Buttons
    const InfoActionRow = new ActionRowBuilder();
    if ( FetchedGuild.features.length > 0 ) { InfoActionRow.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`info-server_feature-flags`).setLabel(localize(interaction.locale, 'INFO_SERVER_BUTTON_FLAGS'))); }
    InfoActionRow.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`info-server_extra-info`).setLabel(localize(interaction.locale, 'INFO_SERVER_BUTTON_MISC')));



    // Asset Buttons!
    const AssetActionRow = new ActionRowBuilder();
    if ( HasIcon ) {
        AssetActionRow.addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel(localize(interaction.locale, 'INFO_SERVER_BUTTON_ICON'))
                .setURL(`https://cdn.discordapp.com/icons/${FetchedGuild.id}/${FetchedGuild.icon}${FetchedGuild.icon.startsWith("a_") ? '.gif' : '.png'}`)
        );
    }
    if ( HasBanner ) {
        AssetActionRow.addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel(localize(interaction.locale, 'INFO_SERVER_BUTTON_BANNER'))
                .setURL(`https://cdn.discordapp.com/banners/${FetchedGuild.id}/${FetchedGuild.banner}${FetchedGuild.banner.startsWith("a_") ? '.gif' : '.png'}`)
        );
    }
    if ( HasInviteSplash ) {
        AssetActionRow.addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel(localize(interaction.locale, 'INFO_SERVER_BUTTON_INVITE_SPLASH'))
                .setURL(`https://cdn.discordapp.com/splashes/${FetchedGuild.id}/${FetchedGuild.splash}.png`)
        );
    }
    if ( HasDiscoverySplash ) {
        AssetActionRow.addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel(localize(interaction.locale, 'INFO_SERVER_BUTTON_DISCOVERY_SPLASH'))
                .setURL(`https://cdn.discordapp.com/discovery-splashes/${FetchedGuild.id}/${FetchedGuild.discovery_splash}.png`)
        );
    }


    // ACK
    let responseActionRows = [];
    if ( AssetActionRow.components.length > 0 ) { responseActionRows.push(InfoActionRow, AssetActionRow); }
    else { responseActionRows.push(InfoActionRow); }

    await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, { embeds: [ServerInfoEmbed], components: responseActionRows }, '@original');

    return;
}



/** Returns the Server's public information, when used in an User App context
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {API} api
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} inputSubcommand 
 */
async function _getServerInfoUserContext(interaction, api, inputSubcommand) {
    // First, make sure this isn't being run in (G)DMs
    if ( interaction.channel.type === ChannelType.DM || interaction.channel.type === ChannelType.GroupDM ) {
        await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
            content: localize(interaction.locale, 'INFO_COMMAND_SERVER_ERROR_NOT_USABLE_IN_DMS', `</info channel:${interaction.data.id}>`)
        }, '@original');
        return;
    }

    // Since all the API gives us in a User App context is the Server's Feature Flags, its Server ID, and its Server Locale. Not even its name & icon!
    await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
        content: localize(interaction.locale, 'INFO_COMMAND_SERVER_ERROR_NOT_USABLE_AS_USER_APP_COMMAND')
    }, '@original');
    return;
}



/** Returns the User's public information, when used in a Guild context
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {API} api
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} inputSubcommand 
 */
async function _getUserInfoGuildContext(interaction, api, inputSubcommand) {
    // TODO
}



/** Returns the User's public information, when used in an User App context
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {API} api
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} inputSubcommand 
 */
async function _getUserInfoUserContext(interaction, api, inputSubcommand) {
    // TODO
}



/** Returns the Invite's public information, when used in ether a Guild or User App context
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {API} api
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} inputSubcommand 
 */
async function _getInviteInfo(interaction, api, inputSubcommand) {
    // Grab input
    const InputInvite = inputSubcommand.options.find(option => option.name === "code");

    // Validate given invite link/code
    /** @type {import('discord-api-types/v10').APIExtendedInvite} */
    let fetchedInvite = null;
    try {
        fetchedInvite = await api.invites.get(_resolveInviteCode(InputInvite.value), { with_counts: true, with_expiration: true });
    }
    catch (err) {
        await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
            content: localize(interaction.locale, 'INFO_COMMAND_ERROR_INVITE_INVALID')
        });
        //console.error(err);
        return;
    }
    console.log(fetchedInvite);


    // Create Embed & Component Array to display information in
    const InviteEmbed = new EmbedBuilder();
    const ResponseComponents = [];


    // General Invite info - shared across all types of Invites
    InviteEmbed.setAuthor({ name: `${localize(interaction.locale, 'INFO_INVITE_HEADER_DATA')} ${fetchedInvite.code}` });

    let generalInviteInformation = "";

    generalInviteInformation += `**${localize(interaction.locale, 'INFO_INVITE_TYPE')}** ${readableInviteType(fetchedInvite.type, interaction.locale)}`;
    if ( fetchedInvite.inviter != undefined ) {
        generalInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_CREATOR')}** ${fetchedInvite.inviter.global_name != null ? fetchedInvite.inviter.global_name : fetchedInvite.inviter.username}`;
        generalInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_CREATOR_BOT')}** ${fetchedInvite.inviter.bot === true ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}`;
    }
    if ( fetchedInvite.created_at != null ) {
        generalInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_CREATED')}** <t:${Math.floor(Date.parse(fetchedInvite.created_at) / 1000)}:R>`;
    }
    if ( fetchedInvite.expires_at != null ) {
        generalInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_EXPIRES')}** <t:${Math.floor(Date.parse(fetchedInvite.expires_at) / 1000)}:R>`;
    }
    if ( fetchedInvite.uses != null && fetchedInvite.max_uses == null ) {
        generalInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_USES')}** ${fetchedInvite.uses}`;
    }
    else if ( fetchedInvite.uses != null && fetchedInvite.max_uses != null ) {
        generalInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_USES')}** ${fetchedInvite.uses} / ${fetchedInvite.max_uses}`;
    }
    if ( fetchedInvite.flags != null ) {
        let invFlags = Number(fetchedInvite.flags);
        // Future proofing!
        let invFlagInformation = [];

        if ( (invFlags & InviteFlags.Guest) == InviteFlags.Guest ) { invFlagInformation.push(localize(interaction.locale, 'INFO_INVITE_FLAG_GUEST')); }
        
        if ( invFlagInformation.length > 0 ) { generalInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_FLAGS')}** ${invFlagInformation.sort().join(', ')}`; }
    }

    InviteEmbed.addFields({ name: localize(interaction.locale, 'INFO_INVITE_HEADER_GENERAL'), value: generalInviteInformation });



    // Check what type of Invite this is
    if ( fetchedInvite.type === InviteType.Guild ) { 
        // For ease
        const InviteGuild = ( fetchedInvite.guild || null );

        // Invite Target Information
        let targetInformation = "";
        if ( fetchedInvite.channel != null ) {
            targetInformation += `**${localize(interaction.locale, 'INFO_INVITE_CHANNEL_TYPE')}** ${readableChannelType(fetchedInvite.channel.type, interaction.locale)}`;
            targetInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_CHANNEL_NAME')}** ${fetchedInvite.channel.name}`;
        }
        if ( fetchedInvite.target_type != undefined && fetchedInvite.target_type === InviteTargetType.Stream ) {
            targetInformation += `${targetInformation.length > 1 ? `\n` : ''}**${localize(interaction.locale, 'INFO_INVITE_TARGET_TYPE')}** ${localize(interaction.locale, 'INFO_INVITE_TARGET_STREAM')}`;
        }
        else if ( fetchedInvite.target_type != undefined && fetchedInvite.target_type === InviteTargetType.EmbeddedApplication ) {
            targetInformation += `${targetInformation.length > 1 ? `\n` : ''}**${localize(interaction.locale, 'INFO_INVITE_TARGET_TYPE')}** ${localize(interaction.locale, 'INFO_INVITE_TARGET_ACTIVITY')}`;
            if ( fetchedInvite.target_application != undefined && fetchedInvite.target_application.name != undefined ) {
                targetInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_TARGET_ACTIVITY_NAME')}** ${fetchedInvite.target_application.name}`;
            }
        }
        // TARGET TYPE: Role Subscriptions
        else if ( fetchedInvite.target_type != undefined && fetchedInvite.target_type === 2 ) {
            targetInformation += `${targetInformation.length > 1 ? `\n` : ''}**${localize(interaction.locale, 'INFO_INVITE_TARGET_TYPE')}** ${localize(interaction.locale, 'INFO_INVITE_TARGET_ROLE_SUBSCRIPTIONS')}`;
        }
        // TARGET TYPE: Creator Page
        else if ( fetchedInvite.target_type != undefined && fetchedInvite.target_type === 3 ) {
            targetInformation += `${targetInformation.length > 1 ? `\n` : ''}**${localize(interaction.locale, 'INFO_INVITE_TARGET_TYPE')}** ${localize(interaction.locale, 'INFO_INVITE_TARGET_CREATOR_PAGE')}`;
        }

        if ( targetInformation.length > 1 ) { InviteEmbed.addFields({ name: localize(interaction.locale, 'INFO_INVITE_HEADER_TARGET'), value: targetInformation }); }


        // Invite Guild Information
        if ( InviteGuild != null ) {
            if ( InviteGuild.description != null ) { InviteEmbed.setDescription(InviteGuild.description); }
            if ( InviteGuild.icon != null ) {
                InviteEmbed.setAuthor({
                    iconURL: `https://cdn.discordapp.com/icons/${InviteGuild.id}/${InviteGuild.icon}.png`,
                    name: `${localize(interaction.locale, 'INFO_INVITE_HEADER_DATA')} ${fetchedInvite.code}`
                });
            }

            let guildInviteInformation = "";
            
            guildInviteInformation += `**${localize(interaction.locale, 'INFO_INVITE_SERVER_NAME')}** ${InviteGuild.name}`;
            if ( InviteGuild.features.includes("PARTNERED") ) { guildInviteInformation += `\n${AppEmoji.PARTNERED_GUILD} **${localize(interaction.locale, 'INFO_INVITE_SERVER_PARTNERED')}** ${localize(interaction.locale, 'TRUE')}`; }
            if ( InviteGuild.features.includes("VERIFIED") ) { guildInviteInformation += `\n${AppEmoji.VERIFIED_GUILD} **${localize(interaction.locale, 'INFO_INVITE_SERVER_VERIFIED')}** ${localize(interaction.locale, 'TRUE')}`; }
            if ( InviteGuild.premium_subscription_count != undefined ) { guildInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_SERVER_BOOST_COUNT')}** ${InviteGuild.premium_subscription_count}`; }
            if ( fetchedInvite.approximate_member_count != undefined ) { guildInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_SERVER_APPROX_TOTAL_MEMBERS')}** ${fetchedInvite.approximate_member_count}`; }
            if ( fetchedInvite.approximate_presence_count != undefined ) { guildInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_SERVER_APPROX_ONLINE_MEMBERS')}** ${fetchedInvite.approximate_presence_count}`; }
            if ( InviteGuild.nsfw_level != null ) { guildInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_SERVER_NSFW_LEVEL')}** ${readableNSFWLevel(InviteGuild.nsfw_level, interaction.locale)}`; }

            InviteEmbed.addFields({ name: localize(interaction.locale, 'INFO_INVITE_HEADER_SERVER'), value: guildInviteInformation });


            // Server Feature Flags - not putting in own button like with `/info server` just to reduce API calls to the GET Invite endpoint!
            if ( InviteGuild.features.length > 0 ) {
                let featureFlags = [];
                InviteGuild.features.forEach(flag => featureFlags.push(titleCaseGuildFeature(flag)));
                InviteEmbed.addFields({ name: localize(interaction.locale, 'INFO_INVITE_HEADER_SERVER_FLAGS'), value: `${featureFlags.sort().join(', ').slice(0, 1023)}` });
            }
        }


        // Contruct Link Button
        const GuildInviteRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'INFO_INVITE_BUTTON_SERVER')).setURL(`https://discord.gg/${fetchedInvite.code}`)
        );

        ResponseComponents.push(GuildInviteRow);


    }
    else if ( fetchedInvite.type === InviteType.GroupDM ) {
        // Invite Target Information (just in case? You never know, GDMs do support calls and Activities after all!)
        let gdmInviteInformation = "";
        if ( fetchedInvite.channel != null ) {
            gdmInviteInformation += `**${localize(interaction.locale, 'INFO_INVITE_CHANNEL_TYPE')}** ${readableChannelType(fetchedInvite.channel.type, interaction.locale)}`;
            if ( fetchedInvite.channel.name != null ) { gdmInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_CHANNEL_NAME')}** ${fetchedInvite.channel.name}`; }
        }
        if ( fetchedInvite.target_type != undefined && fetchedInvite.target_type === InviteTargetType.Stream ) {
            gdmInviteInformation += `${gdmInviteInformation.length > 1 ? `\n` : ''}**${localize(interaction.locale, 'INFO_INVITE_TARGET_TYPE')}** ${localize(interaction.locale, 'INFO_INVITE_TARGET_STREAM')}`;
        }
        else if ( fetchedInvite.target_type != undefined && fetchedInvite.target_type === InviteTargetType.EmbeddedApplication ) {
            gdmInviteInformation += `${gdmInviteInformation.length > 1 ? `\n` : ''}**${localize(interaction.locale, 'INFO_INVITE_TARGET_TYPE')}** ${localize(interaction.locale, 'INFO_INVITE_TARGET_ACTIVITY')}`;
            if ( fetchedInvite.target_application != undefined && fetchedInvite.target_application.name != undefined ) {
                gdmInviteInformation += `\n**${localize(interaction.locale, 'INFO_INVITE_TARGET_ACTIVITY_NAME')}** ${fetchedInvite.target_application.name}`;
            }
        }
        if ( fetchedInvite.approximate_member_count != undefined ) {
            gdmInviteInformation += `${gdmInviteInformation.length > 1 ? `\n` : ''}**${localize(interaction.locale, 'INFO_INVITE_SERVER_APPROX_TOTAL_MEMBERS')}** ${fetchedInvite.approximate_member_count}`;
        }

        if ( gdmInviteInformation.length > 1 ) { InviteEmbed.addFields({ name: localize(interaction.locale, 'INFO_INVITE_HEADER_TARGET'), value: gdmInviteInformation }); }

        
        // Contruct Link Button
        const GroupDMInviteRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'INFO_INVITE_BUTTON_GROUP_DM')).setURL(`https://discord.gg/${fetchedInvite.code}`)
        );

        ResponseComponents.push(GroupDMInviteRow);


    }
    else if ( fetchedInvite.type === InviteType.Friend ) {
        // TODO


    }


    // ACK
    await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, {
        embeds: [InviteEmbed],
        components: ResponseComponents.length > 0 ? ResponseComponents : undefined
    }, '@original');

    return;
}



/** Returns the Role's public information, when used in a Guild context
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {API} api
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} inputSubcommand 
 */
async function _getRoleInfoGuildContext(interaction, api, inputSubcommand) {
    // TODO
}



/** Returns the Role's public information, when used in an User App context
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {API} api
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} inputSubcommand 
 */
async function _getRoleInfoUserContext(interaction, api, inputSubcommand) {
    // TODO
}



/** Returns the Channel's public information, when used in a Guild context
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {API} api
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} inputSubcommand 
 */
async function _getChannelInfoGuildContext(interaction, api, inputSubcommand) {
    // TODO
}



/** Returns the Channel's public information, when used in an User App context
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {API} api
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} inputSubcommand 
 */
async function _getChannelInfoUserContext(interaction, api, inputSubcommand) {
    // TODO
}
