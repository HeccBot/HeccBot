const { ChatInputCommandInteraction, Routes, TextChannel, VoiceChannel, StageChannel, NewsChannel, CategoryChannel, ForumChannel, MediaChannel, EmbedBuilder, ChannelType, GuildPremiumTier, GuildNSFWLevel, GuildMFALevel, GuildDefaultMessageNotifications, GuildExplicitContentFilter, GuildVerificationLevel, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { localize } = require("../LocalizationModule");
const fetch = require("node-fetch");
const { checkExternalEmojiPermission, DiscordClient, titleCaseGuildFeature, fetchDisplayName } = require("../../constants");
const { EMOJI_OWNER_CROWN, EMOJI_ACTIVE_DEVELOPER, EMOJI_EARLY_VERIFIED_BOT_DEV, EMOJI_VERIFIED_BOT, EMOJI_STAFF, EMOJI_EARLY_SUPPORTER, EMOJI_PARTNERED_SERVER_OWNER, EMOJI_HYPESQUAD_EVENTS, EMOJI_HYPESQUAD_BALANCE, EMOJI_HYPESQUAD_BRILLIANCE, EMOJI_HYPESQUAD_BRAVERY, EMOJI_MOD_PROGRAM, EMOJI_BUG_HUNTER_TIER_2, EMOJI_BUG_HUNTER_TIER_1, EMOJI_TIER_ONE, EMOJI_TIER_TWO, EMOJI_TIER_THREE, EMOJI_BOOST, EMOJI_EMOJI, EMOJI_STICKER, EMOJI_ROLE, EMOJI_SCHEDULED_EVENT, EMOJI_MEMBERS, EMOJI_STATUS_ONINE, EMOJI_CHANNEL_CATEGORY, EMOJI_CHANNEL_TEXT, EMOJI_CHANNEL_VOICE, EMOJI_CHANNEL_NEWS, EMOJI_CHANNEL_STAGE, EMOJI_CHANNEL_FORUM, EMOJI_CHANNEL_MEDIA, EMOJI_STATUS_IDLE, EMOJI_CHANNEL_RULES, EMOJI_PARTNER, EMOJI_VERIFIED } = require("../../Resources/Emojis");

if (!globalThis.fetch) { globalThis.fetch = fetch; }

/**
 * Readable Guild Verification Level
 * @param {GuildVerificationLevel} guildVerificationLevel 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableVerificationLevel(guildVerificationLevel, locale) {
    let readableString = "";
    switch (guildVerificationLevel)
    {
        case GuildVerificationLevel.None:
            readableString = localize(locale, 'INFO_READABLE_GUILD_VERIFICATION_NONE');
            break;

        case GuildVerificationLevel.Low:
            readableString = localize(locale, 'INFO_READABLE_GUILD_VERIFICATION_LOW');
            break;

        case GuildVerificationLevel.Medium:
            readableString = localize(locale, 'INFO_READABLE_GUILD_VERIFICATION_MEDIUM');
            break;

        case GuildVerificationLevel.High:
            readableString = localize(locale, 'INFO_READABLE_GUILD_VERIFICATION_HIGH');
            break;

        case GuildVerificationLevel.VeryHigh:
            readableString = localize(locale, 'INFO_READABLE_GUILD_VERIFICATION_VERY_HIGH');
            break;
    }
    return readableString;
}

/**
 * Readable Guild Explicit Content Filter
 * @param {GuildExplicitContentFilter} guildExplicitContentLevel 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableExplicitFilter(guildExplicitContentLevel, locale)
{
    let readableString = "";
    switch (guildExplicitContentLevel)
    {
        case GuildExplicitContentFilter.Disabled:
            readableString = localize(locale, 'INFO_READABLE_GUILD_EXPLICIT_FILTER_DISABLED');
            break;

        case GuildExplicitContentFilter.MembersWithoutRoles:
            readableString = localize(locale, 'INFO_READABLE_GUILD_EXPLICIT_FILTER_ROLELESS');
            break;

        case GuildExplicitContentFilter.AllMembers:
            readableString = localize(locale, 'INFO_READABLE_GUILD_EXPLICIT_FILTER_EVERYONE');
            break;
    }
    return readableString;
}

/**
 * Readable Default Message Notification
 * @param {GuildDefaultMessageNotifications} defaultMessageNotification 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableDefaultNotification(defaultMessageNotification, locale)
{
    let readableString = "";
    switch(defaultMessageNotification)
    {
        case GuildDefaultMessageNotifications.AllMessages:
            readableString = localize(locale, 'INFO_READABLE_DEFAULT_NOTIFICATIONS_ALL_MESSAGES');
            break;

        case GuildDefaultMessageNotifications.OnlyMentions:
            readableString = localize(locale, 'INFO_READABLE_DEFAULT_NOTIFICATIONS_ONLY_MENTIONS');
            break;
    }
    return readableString;
}

/**
 * Readable MFA Level
 * @param {GuildMFALevel} mfaLevel 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableMFALevel(mfaLevel, locale)
{
    let readableString = "";
    switch(mfaLevel)
    {
        case GuildMFALevel.None:
            readableString = localize(locale, 'INFO_READABLE_GUILD_MFA_NONE');
            break;

        case GuildMFALevel.Elevated:
            readableString = localize(locale, 'INFO_READABLE_GUILD_MFA_ENABLED');
            break;
    }
    return readableString;
}

/**
 * Readable NSFW Level
 * @param {GuildNSFWLevel} nsfwLevel 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableNSFWLevel(nsfwLevel, locale)
{
    let readableString = "";
    switch(nsfwLevel)
    {
        case GuildNSFWLevel.Default:
            readableString = localize(locale, 'INFO_READABLE_GUILD_NSFW_LEVEL_DEFAULT');
            break;

        case GuildNSFWLevel.Safe:
            readableString = localize(locale, 'INFO_READABLE_GUILD_NSFW_LEVEL_SAFE');
            break;

        case GuildNSFWLevel.AgeRestricted:
            readableString = localize(locale, 'INFO_READABLE_GUILD_NSFW_LEVEL_RESTRICTED');
            break;

        case GuildNSFWLevel.Explicit:
            readableString = localize(locale, 'INFO_READABLE_GUILD_NSFW_LEVEL_EXPLICIT');
            break;
    }
    return readableString;
}

/**
 * Readable Boosting Tiers
 * @param {GuildPremiumTier} premiumTier 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableGuildPremiumTier(premiumTier, locale)
{
    let readableString = "";
    switch(premiumTier)
    {
        case GuildPremiumTier.None:
            readableString = localize(locale, 'INFO_READABLE_GUILD_BOOST_NONE');
            break;

        case GuildPremiumTier.Tier1:
            readableString = localize(locale, 'INFO_READABLE_GUILD_BOOST_LEVEL_ONE');
            break;

        case GuildPremiumTier.Tier2:
            readableString = localize(locale, 'INFO_READABLE_GUILD_BOOST_LEVEL_TWO');
            break;

        case GuildPremiumTier.Tier3:
            readableString = localize(locale, 'INFO_READABLE_GUILD_BOOST_LEVEL_THREE');
            break;
    }
    return readableString;
}

/**
 * Readable Boosting Tiers, returns Emoji Strings
 * @param {GuildPremiumTier} premiumTier 
 * @returns {String}
 */
function readableGuildPremiumTierEmoji(premiumTier)
{
    let readableString = "";
    switch(premiumTier)
    {
        case GuildPremiumTier.None:
            readableString = "";
            break;

        case GuildPremiumTier.Tier1:
            readableString = EMOJI_TIER_ONE;
            break;

        case GuildPremiumTier.Tier2:
            readableString = EMOJI_TIER_TWO;
            break;

        case GuildPremiumTier.Tier3:
            readableString = EMOJI_TIER_THREE;
            break;
    }
    return readableString;
}


/**
 * Readable User Flags
 * @param {String} userFlag 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableUserFlags(userFlag, locale)
{
    let readableString = "";
    switch(userFlag)
    {
        case "ActiveDeveloper":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_ACTIVE_DEVELOPER');
            break;

        case "BotHTTPInteractions":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_HTTP_INTERACTIONS');
            break;

        case "BugHunterLevel1":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_BUG_HUNTER_LEVEL_ONE');
            break;

        case "BugHunterLevel2":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_BUG_HUNTER_LEVEL_TWO');
            break;

        case "CertifiedModerator":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_MODERATOR_ALUMNI');
            break;

        case "Collaborator":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_COLLABORATOR');
            break;

        case "HypeSquadOnlineHouse1":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_HYPESQUAD_HOUSE_BRAVERY');
            break;

        case "HypeSquadOnlineHouse2":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_HYPESQUAD_HOUSE_BRILLIANCE');
            break;

        case "HypeSquadOnlineHouse3":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_HYPESQUAD_HOUSE_BALANCE');
            break;

        case "Hypesquad":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_HYPESQUAD_EVENTS');
            break;

        case "Partner":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_PARTNER');
            break;

        case "PremiumEarlySupporter":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_EARLY_SUPPORTER');
            break;

        case "Quarantined":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_QUARANTINED');
            break;

        case "RestrictedCollaborator":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_RESTRICTED_COLLABORATOR');
            break;

        case "Spammer":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_LIKELY_SPAMMER');
            break;

        case "Staff":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_STAFF');
            break;

        case "TeamPseudoUser":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_TEAM_USER');
            break;

        case "VerifiedBot":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_VERIFIED_BOT');
            break;

        case "VerifiedDeveloper":
            readableString = localize(locale, 'INFO_READABLE_USER_FLAG_EARLY_VERIFIED_BOT_DEVELOPER');
            break;

        default:
            readableString = userFlag;
            break;
    }
    return readableString;
}

/**
 * Readable User Flags, returns Emoji strings
 * @param {String} userFlag 
 * @returns {String}
 */
function readableUserFlagsEmoji(userFlag)
{
    let readableString = "";
    switch(userFlag)
    {
        case "BugHunterLevel1":
            readableString = EMOJI_BUG_HUNTER_TIER_1;
            break;

        case "BugHunterLevel2":
            readableString = EMOJI_BUG_HUNTER_TIER_2;
            break;

        case "CertifiedModerator":
            readableString = EMOJI_MOD_PROGRAM;
            break;

        case "HypeSquadOnlineHouse1":
            readableString = EMOJI_HYPESQUAD_BRAVERY;
            break;

        case "HypeSquadOnlineHouse2":
            readableString = EMOJI_HYPESQUAD_BRILLIANCE;
            break;

        case "HypeSquadOnlineHouse3":
            readableString = EMOJI_HYPESQUAD_BALANCE;
            break;

        case "Hypesquad":
            readableString = EMOJI_HYPESQUAD_EVENTS;
            break;

        case "Partner":
            readableString = EMOJI_PARTNERED_SERVER_OWNER;
            break;

        case "PremiumEarlySupporter":
            readableString = EMOJI_EARLY_SUPPORTER;
            break;

        case "Staff":
            readableString = EMOJI_STAFF;
            break;

        case "VerifiedBot":
            readableString = EMOJI_VERIFIED_BOT;
            break;

        case "VerifiedDeveloper":
            readableString = EMOJI_EARLY_VERIFIED_BOT_DEV;
            break;

        case "ActiveDeveloper":
            readableString = EMOJI_ACTIVE_DEVELOPER;
            break;

        default:
            // To catch the Flags that DON'T have Badges connected with them
            readableString = "NULL";
            break;
    }
    return readableString;
}


/**
 * Readable Channel Types
 * @param {ChannelType} channelType 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableChannelType(channelType, locale)
{
    let readableString = "";
    switch(channelType)
    {
        case ChannelType.DM:
            readableString = localize(locale, 'CHANNEL_TYPE_DM');
            break;

        case ChannelType.GroupDM:
            readableString = localize(locale, 'CHANNEL_TYPE_GROUP_DM');
            break;

        case ChannelType.GuildCategory:
            readableString = localize(locale, 'CHANNEL_TYPE_CATEGORY');
            break;

        case ChannelType.GuildDirectory:
            readableString = localize(locale, 'CHANNEL_TYPE_DIRECTORY');
            break;

        case ChannelType.GuildForum:
            readableString = localize(locale, 'CHANNEL_TYPE_FORUM');
            break;

        case ChannelType.GuildAnnouncement:
            readableString = localize(locale, 'CHANNEL_TYPE_ANNOUNCEMENT');
            break;
            
        case ChannelType.AnnouncementThread:
            readableString = localize(locale, 'CHANNEL_TYPE_THREAD_ANNOUNCEMENT');
            break;

        case ChannelType.PrivateThread:
            readableString = localize(locale, 'CHANNEL_TYPE_THREAD_PRIVATE');
            break;

        case ChannelType.PublicThread:
            readableString = localize(locale, 'CHANNEL_TYPE_THREAD_PUBLIC');
            break;

        case ChannelType.GuildStageVoice:
            readableString = localize(locale, 'CHANNEL_TYPE_STAGE');
            break;

        case ChannelType.GuildText:
            readableString = localize(locale, 'CHANNEL_TYPE_TEXT');
            break;

        case ChannelType.GuildVoice:
            readableString = localize(locale, 'CHANNEL_TYPE_VOICE');
            break;

        case ChannelType.GuildMedia:
            readableString = localize(locale, 'CHANNEL_TYPE_MEDIA');
            break;

        default:
            readableString = localize(locale, 'CHANNEL_TYPE_UNKNOWN');
            break;
    }
    return readableString;
}

/**
 * Readable Bot Application Flags
 * @param {String} applicationFlag 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableApplicationFlags(applicationFlag, locale)
{
    let readableString = "";
    switch(applicationFlag)
    {
        case "ApplicationAutoModerationRuleCreateBadge":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_AUTOMOD_BADGE');
            break;

        case "ApplicationCommandBadge":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_APP_COMMANDS_BADGE');
            break;

        case "Embedded":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_EMBEDDED');
            break;

        case "EmbeddedFirstParty":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_EMBEDDED_FIRST_PARTY');
            break;

        case "EmbeddedIAP":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_EMBEDDED_IAP');
            break;

        case "EmbeddedReleased":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_EMBEDDED_RELEASED');
            break;

        case "GatewayGuildMembers":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_GUILD_MEMBERS');
            break;

        case "GatewayGuildMembersLimited":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_GUILD_MEMBERS_LIMITED');
            break;

        case "GatewayMessageContent":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_MESSAGE_CONTENT');
            break;

        case "GatewayMessageContentLimited":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_MESSAGE_CONTENT_LIMITED');
            break;

        case "GatewayPresence":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_PRESENCE');
            break;

        case "GatewayPresenceLimited":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_PRESENCE_LIMITED');
            break;

        case "GroupDMCreate":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_GROUP_DM_CREATE');
            break;

        case "ManagedEmoji":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_MANAGED_EMOJI');
            break;

        case "RPCHasConnected":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_RPC_CONNECTED');
            break;

        case "VerificationPendingGuildLimit":
            readableString = localize(locale, 'INFO_READABLE_APP_FLAG_VERIFICATION_BLOCKED_BY_GROWTH');
            break;
    }
    return readableString;
}

/** Bot Flags to be included in seperate Embed Field to the others */
const BotIntentFlags = [ "GatewayPresence", "GatewayPresenceLimited", "GatewayMessageContent", "GatewayMessageContentLimited", "GatewayGuildMembers", "GatewayGuildMembersLimited" ];







module.exports = {
    /**
     * Fetches information about the Server the /info Command was run in
     * @param {ChatInputCommandInteraction} interaction 
     */
    async fetchServerInfo(interaction)
    {
        // Defer
        await interaction.deferReply({ ephemeral: true });

        // Fetch Guild & Guild Owner for most up-to-date info
        const CurrentGuild = await interaction.guild.fetch();
        const GuildOwner = await CurrentGuild.fetchOwner();

        // Check for External Emojis Permission
        const ExternalEmojiPermission = checkExternalEmojiPermission(interaction);


        // Grab Server Feature Flags
        let rawData = await DiscordClient.rest.get(Routes.guild(CurrentGuild.id));
        /** @type {Array<String>} */
        const RawFeatureFlags = rawData["features"];
        let guildFeatures = [];
        RawFeatureFlags.forEach(feature => guildFeatures.push(titleCaseGuildFeature(feature)));


        // Grab Channel information
        const GuildChannels = await CurrentGuild.channels.fetch();
        const TotalChannelCount = GuildChannels.size;
        let textChannelCount = 0;
        let voiceChannelCount = 0;
        let stageChannelCount = 0;
        let announcementChannelCount = 0;
        let categoryChannelCount = 0;
        let forumChannelCount = 0;
        let mediaChannelCount = 0;
        let unknownChannelCount = 0;
        
        GuildChannels.forEach(channel => {
            if ( channel instanceof TextChannel ) { textChannelCount += 1; }
            else if ( channel instanceof VoiceChannel ) { voiceChannelCount += 1; }
            else if ( channel instanceof StageChannel ) { stageChannelCount += 1; }
            else if ( channel instanceof NewsChannel ) { announcementChannelCount += 1; }
            else if ( channel instanceof CategoryChannel ) { categoryChannelCount += 1; }
            else if ( channel instanceof ForumChannel ) { forumChannelCount += 1; }
            else if ( channel instanceof MediaChannel ) { mediaChannelCount += 1; }
            else { unknownChannelCount += 1; }
        });


        // Roles
        const GuildRoles = await CurrentGuild.roles.fetch();
        const TotalRoleCount = GuildRoles.size - 1; // Remove atEveryone since that doesn't count towards 250 Role Limit

        // Expressions
        const GuildEmojis = await CurrentGuild.emojis.fetch();
        const GuildStickers = await CurrentGuild.stickers.fetch();
        
        // Scheduled Events
        const GuildScheduledEvents = await CurrentGuild.scheduledEvents.fetch();


        // Nullable info
        const GuildDescription = ( CurrentGuild.description || " " );
        const GuildVanityCode = ( CurrentGuild.vanityURLCode || null );
        const GuildApproxTotalMembers = ( CurrentGuild.approximateMemberCount || null );
        const GuildApproxOnlineMembers = ( CurrentGuild.approximatePresenceCount || null );
        
        const AfkChannelId = ( CurrentGuild.afkChannelId || null );
        const RulesChannelId = ( CurrentGuild.rulesChannelId || null );
        const SystemChannelId = ( CurrentGuild.systemChannelId || null );

        const HasBanner = CurrentGuild.banner === null ? false : true;
        const HasIcon = CurrentGuild.icon === null ? false : true;
        const HasDiscoverySplash = CurrentGuild.discoverySplash === null ? false : true;
        const HasInviteSplash = CurrentGuild.splash === null ? false : true;


        // Construct Embed
        const ServerInfoEmbed = new EmbedBuilder().setAuthor({ name: CurrentGuild.name })
        .setFooter({ text: localize(interaction.locale, 'CREATED') })
        .setTimestamp(CurrentGuild.createdAt);

        // Construct Strings for Embed
        let generalInfoString = `${ExternalEmojiPermission ? EMOJI_OWNER_CROWN : ""} **${localize(interaction.locale, 'INFO_SERVER_OWNER')}** ${fetchDisplayName(GuildOwner.user, true)}
${ExternalEmojiPermission ? readableGuildPremiumTierEmoji(CurrentGuild.premiumTier) : ""} **${localize(interaction.locale, 'INFO_SERVER_BOOST_TIER')}** ${readableGuildPremiumTier(CurrentGuild.premiumTier, interaction.locale)}
${ExternalEmojiPermission ? EMOJI_BOOST : ""} **${localize(interaction.locale, 'INFO_SERVER_BOOST_COUNT')}** ${CurrentGuild.premiumSubscriptionCount}
${ExternalEmojiPermission ? EMOJI_EMOJI : ""} **${localize(interaction.locale, 'INFO_SERVER_EMOJIS')}** ${GuildEmojis.size}
${ExternalEmojiPermission ? EMOJI_STICKER : ""} **${localize(interaction.locale, 'INFO_SERVER_STICKERS')}** ${GuildStickers.size}
${ExternalEmojiPermission ? EMOJI_ROLE : ""} **${localize(interaction.locale, 'INFO_SERVER_ROLES')}** ${TotalRoleCount} / 250`;

        // For extra general info
        let generalInfoAdditionalString = ``;
        if ( GuildScheduledEvents.size > 0 ) { generalInfoAdditionalString += `\n${ExternalEmojiPermission ? EMOJI_SCHEDULED_EVENT : ""} **${localize(interaction.locale, 'INFO_SERVER_SCHEDULED_EVENTS')}** ${GuildScheduledEvents.size}`; }
        if ( GuildApproxTotalMembers != null ) { generalInfoAdditionalString += `\n${ExternalEmojiPermission ? EMOJI_MEMBERS : ""} **${localize(interaction.locale, 'INFO_SERVER_APPROX_TOTAL_MEMBERS')}** ${GuildApproxTotalMembers}`; }
        if ( GuildApproxOnlineMembers != null ) { generalInfoAdditionalString += `\n${ExternalEmojiPermission ? EMOJI_STATUS_ONINE : ""} **${localize(interaction.locale, 'INFO_SERVER_APPROX_ONLINE_MEMBERS')}** ${GuildApproxOnlineMembers}`; }
        if ( GuildVanityCode != null ) { generalInfoAdditionalString += `\n${ExternalEmojiPermission ? `:link:` : ""} **${localize(interaction.locale, 'INFO_SERVER_VANITY')}** https://discord.gg/${GuildVanityCode}`; }
        if ( generalInfoAdditionalString.length > 3 ) { generalInfoString += generalInfoAdditionalString; }

        // For Channel info
        let channelInfoString = ``;
        if ( categoryChannelCount > 0 ) { channelInfoString += `${ExternalEmojiPermission ? EMOJI_CHANNEL_CATEGORY : ""} **${localize(interaction.locale, 'CHANNEL_TYPE_CATEGORY')}:** ${categoryChannelCount}`; }
        if ( textChannelCount > 0 ) { channelInfoString += `${channelInfoString.length > 3 ? `\n` : ""}${ExternalEmojiPermission ? EMOJI_CHANNEL_TEXT : ""} **${localize(interaction.locale, 'CHANNEL_TYPE_TEXT')}:** ${textChannelCount}`; }
        if ( voiceChannelCount > 0 ) { channelInfoString += `${channelInfoString.length > 3 ? `\n` : ""}${ExternalEmojiPermission ? EMOJI_CHANNEL_VOICE : ""} **${localize(interaction.locale, 'CHANNEL_TYPE_VOICE')}:** ${voiceChannelCount}`; }
        if ( announcementChannelCount > 0 ) { channelInfoString += `${channelInfoString.length > 3 ? `\n` : ""}${ExternalEmojiPermission ? EMOJI_CHANNEL_NEWS : ""} **${localize(interaction.locale, 'CHANNEL_TYPE_ANNOUNCEMENT')}:** ${announcementChannelCount}`; }
        if ( stageChannelCount > 0 ) { channelInfoString += `${channelInfoString.length > 3 ? `\n` : ""}${ExternalEmojiPermission ? EMOJI_CHANNEL_STAGE : ""} **${localize(interaction.locale, 'CHANNEL_TYPE_STAGE')}:** ${stageChannelCount}`; }
        if ( forumChannelCount > 0 ) { channelInfoString += `${channelInfoString.length > 3 ? `\n` : ""}${ExternalEmojiPermission ? EMOJI_CHANNEL_FORUM : ""} **${localize(interaction.locale, 'CHANNEL_TYPE_FORUM')}:** ${forumChannelCount}`; }
        if ( mediaChannelCount > 0 ) { channelInfoString += `${channelInfoString.length > 3 ? `\n` : ""}${ExternalEmojiPermission ? EMOJI_CHANNEL_MEDIA : ""} **${localize(interaction.locale, 'CHANNEL_TYPE_MEDIA')}:** ${mediaChannelCount}`; }
        if ( unknownChannelCount > 0 ) { channelInfoString += `${channelInfoString.length > 3 ? `\n` : ""}${ExternalEmojiPermission ? ":grey_question:" : ""} **${localize(interaction.locale, 'CHANNEL_TYPE_UNKNOWN')}:** ${unknownChannelCount}`; }
        if ( AfkChannelId != null ) { channelInfoString += `${channelInfoString.length > 3 ? `\n` : ""}${ExternalEmojiPermission ? EMOJI_STATUS_IDLE : ""} **${localize(interaction.locale, 'CHANNEL_AFK')}:** <#${AfkChannelId}>`; }
        if ( SystemChannelId != null ) { channelInfoString += `${channelInfoString.length > 3 ? `\n` : ""}${ExternalEmojiPermission ? ":gear:" : ""} **${localize(interaction.locale, 'CHANNEL_SYSTEM')}:** <#${SystemChannelId}>`; }
        if ( RulesChannelId != null ) { channelInfoString += `${channelInfoString.length > 3 ? `\n` : ""}${ExternalEmojiPermission ? EMOJI_CHANNEL_RULES : ""} **${localize(interaction.locale, 'CHANNEL_RULES')}:** <#${RulesChannelId}>`; }

        // Embed Description
        let descriptionString = " ";
        if ( CurrentGuild.partnered ) { descriptionString += `${ExternalEmojiPermission ? EMOJI_PARTNER : localize(interaction.locale, 'INFO_SERVER_PARTNERED')}`; }
        if ( CurrentGuild.verified ) { descriptionString += `${descriptionString.length > 0 ? " & " : " "}${ExternalEmojiPermission ? EMOJI_VERIFIED : localize(interaction.locale, 'INFO_SERVER_VERIFIED')}`; }
        if ( GuildDescription != null ) { descriptionString += `${descriptionString.length > 0 ? `\n` : ""}${GuildDescription}`; }


        // Add to Embed
        ServerInfoEmbed.setDescription(descriptionString)
        .addFields(
            { name: localize(interaction.locale, 'INFO_SERVER_HEADER_GENERAL'), value: generalInfoString, inline: true },
            { name: `${localize(interaction.locale, 'INFO_SERVER_HEADER_CHANNELS')} (${TotalChannelCount} / 500)`, value: channelInfoString, inline: true }
        );
        if ( guildFeatures.length > 0 ) { ServerInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_SERVER_HEADER_FEATURE_FLAGS'), value: `${guildFeatures.sort().join(', ').slice(0, 1023)}` }); }


        // Asset Buttons!
        const AssetActionRow = new ActionRowBuilder();
        if ( HasIcon )
        {
            ServerInfoEmbed.setAuthor({ name: CurrentGuild.name, iconURL: CurrentGuild.iconURL({ extension: 'png' }) });
            AssetActionRow.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'INFO_SERVER_BUTTON_ICON')).setURL(CurrentGuild.iconURL()));
        }
        if ( HasBanner ) { AssetActionRow.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'INFO_SERVER_BUTTON_BANNER')).setURL(CurrentGuild.bannerURL())); }
        if ( HasInviteSplash ) { AssetActionRow.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'INFO_SERVER_BUTTON_INVITE_SPLASH')).setURL(CurrentGuild.splashURL())); }
        if ( HasDiscoverySplash ) { AssetActionRow.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'INFO_SERVER_BUTTON_DISCOVERY_SPLASH')).setURL(CurrentGuild.discoverySplashURL())); }
        
        // ACK
        if ( AssetActionRow.components.length > 0 ) { await interaction.editReply({ embeds: [ServerInfoEmbed], components: [AssetActionRow] }); }
        else { await interaction.editReply({ embeds: [ServerInfoEmbed] }); }

        return;
    }
}
