const { InteractionEditReplyOptions, ChatInputCommandInteraction, Routes, TextChannel, VoiceChannel, StageChannel, NewsChannel, CategoryChannel, ForumChannel, MediaChannel, EmbedBuilder, ChannelType, GuildPremiumTier, ActionRowBuilder, ButtonBuilder, ButtonStyle, Invite, InviteTargetType, GuildMember, GuildMemberFlags, Role } = require("discord.js");
const { localize } = require("../LocalizationModule");
const fetch = require("node-fetch");
const { checkExternalEmojiPermission, DiscordClient, titleCaseGuildFeature, fetchDisplayName } = require("../../constants");
const { EMOJI_OWNER_CROWN, EMOJI_ACTIVE_DEVELOPER, EMOJI_EARLY_VERIFIED_BOT_DEV, EMOJI_VERIFIED_BOT, EMOJI_STAFF, EMOJI_EARLY_SUPPORTER, EMOJI_PARTNERED_SERVER_OWNER, EMOJI_HYPESQUAD_EVENTS, EMOJI_HYPESQUAD_BALANCE, EMOJI_HYPESQUAD_BRILLIANCE, EMOJI_HYPESQUAD_BRAVERY, EMOJI_MOD_PROGRAM, EMOJI_BUG_HUNTER_TIER_2, EMOJI_BUG_HUNTER_TIER_1, EMOJI_TIER_ONE, EMOJI_TIER_TWO, EMOJI_TIER_THREE, EMOJI_BOOST, EMOJI_EMOJI, EMOJI_STICKER, EMOJI_ROLE, EMOJI_SCHEDULED_EVENT, EMOJI_MEMBERS, EMOJI_STATUS_ONINE, EMOJI_CHANNEL_CATEGORY, EMOJI_CHANNEL_TEXT, EMOJI_CHANNEL_VOICE, EMOJI_CHANNEL_NEWS, EMOJI_CHANNEL_STAGE, EMOJI_CHANNEL_FORUM, EMOJI_CHANNEL_MEDIA, EMOJI_STATUS_IDLE, EMOJI_CHANNEL_RULES, EMOJI_PARTNER, EMOJI_VERIFIED, EMOJI_MEMBERSHIP_GATING, EMOJI_TIMEOUT, EMOJI_SUPPORTS_APP_COMMANDS, EMOJI_USES_AUTOMOD } = require("../../Resources/Emojis");
const { LogDebug } = require("../LoggingModule");

if (!globalThis.fetch) { globalThis.fetch = fetch; }


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
 * Readable Guild Member Flags
 * @param {String} memberFlag 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableMemberFlags(memberFlag, locale)
{
    let readableString = "";
    switch(memberFlag)
    {
        case "AutomodQuarantinedBio":
            readableString = localize(locale, 'INFO_READABLE_MEMBER_FLAG_AUTOMOD_QUARANTIED_BIO');
            break;

        case "AutomodQuarantinedUsernameOrGuildNickname":
            readableString = localize(locale, 'INFO_READABLE_MEMBER_FLAG_AUTOMOD_QUARANTIED_NAME');
            break;

        case "BypassesVerification":
            //readableString = localize(locale, 'INFO_READABLE_MEMBER_FLAG_BYPASS_SERVER_VERIFICATION');
            readableString = "NULL"; // Don't want this Flag showing to non-Server Mods, so hiding it for now.
            break;

        case "CompletedHomeActions":
            readableString = localize(locale, 'INFO_READABLE_MEMBER_FLAG_GUIDE_TODO_COMPLETED');
            break;

        case "CompletedOnboarding":
            readableString = localize(locale, 'INFO_READABLE_MEMBER_FLAG_ONBOARDING_COMPLETED');
            break;

        case "DidRejoin":
            readableString = localize(locale, 'INFO_READABLE_MEMBER_FLAG_REJOIN');
            break;

        case "StartedHomeActions":
            readableString = localize(locale, 'INFO_READABLE_MEMBER_FLAG_GUIDE_TODO_STARTED');
            break;

        case "StartedOnboarding":
            readableString = localize(locale, 'INFO_READABLE_MEMBER_FLAG_ONBOARDING_STARTED');
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

        default:
            readableString = applicationFlag;
            break;
    }
    return readableString;
}

/** Bot Flags to be included in seperate Embed Field to the others */
const BotIntentFlags = [ "GatewayPresence", "GatewayPresenceLimited", "GatewayMessageContent", "GatewayMessageContentLimited", "GatewayGuildMembers", "GatewayGuildMembersLimited" ];


/**
 * Readable Role Flags
 * @param {String} roleFlag 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableRoleFlags(roleFlag, locale)
{
    let readableString = "";
    switch(roleFlag)
    {
        case "InPrompt":
            readableString = localize(locale, 'INFO_ROLE_FLAG_PROMPT');
            break;

        default:
            readableString = roleFlag;
            break;
    }
    return readableString;
}







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


        // Extra Info Buttons
        const ExtraInfoActionRow = new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`info-server_extra`).setLabel(localize(interaction.locale, 'INFO_SERVER_BUTTON_MISC')));

        
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
        if ( AssetActionRow.components.length > 0 ) { await interaction.editReply({ embeds: [ServerInfoEmbed], components: [ExtraInfoActionRow, AssetActionRow] }); }
        else { await interaction.editReply({ embeds: [ServerInfoEmbed], components: [ExtraInfoActionRow] }); }

        return;
    },









    /**
     * Fetches information about the given Server Invite Link
     * @param {ChatInputCommandInteraction} interaction 
     */
    async fetchInviteInfo(interaction)
    {
        // Defer
        await interaction.deferReply({ ephemeral: true });

        // Check for External Emojis Permission
        const ExternalEmojiPermission = checkExternalEmojiPermission(interaction);

        // Grab invite link
        const InputInvite = interaction.options.getString("code", true);

        // Validate given invite link/code
        /** @type {Invite} */
        let fetchedInvite = null;
        try { fetchedInvite = await DiscordClient.fetchInvite(InputInvite); }
        catch (err) {
            await interaction.editReply({ content: localize(interaction.locale, 'INFO_COMMAND_ERROR_INVITE_INVALID') });
            await LogDebug(err);
        }


        // Fetch parts of Invite data that will be referred back to constantly
        const InviteGuild = ( fetchedInvite.guild || null );


        // Construct embed
        const InviteEmbed = new EmbedBuilder().setAuthor({ name: `${localize(interaction.locale, 'INFO_INVITE_HEADER_DATA')} ${fetchedInvite.code}` });

        // General Invite Info
        let generalInviteInfo = "";
        if ( fetchedInvite.inviter != null ) { generalInviteInfo += `**${localize(interaction.locale, 'INFO_INVITE_CREATOR')}** ${fetchDisplayName(fetchedInvite.inviter, true)}\n**${localize(interaction.locale, 'INFO_INVITE_CREATOR_BOT')}** ${fetchedInvite.inviter.bot ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}`; }
        if ( fetchedInvite.createdAt?.getTime() != null ) { generalInviteInfo += `${generalInviteInfo.length > 1 ? `\n` : ""}**${localize(interaction.locale, 'INFO_INVITE_CREATED')}** <t:${Math.floor(fetchedInvite.createdAt.getTime() / 1000)}:R>`; }
        if ( fetchedInvite.expiresAt?.getTime() != null ) { generalInviteInfo += `${generalInviteInfo.length > 1 ? `\n` : ""}**${localize(interaction.locale, 'INFO_INVITE_EXPIRES')}** <t:${Math.floor(fetchedInvite.expiresAt.getTime() / 1000)}:R>`; }
        
        if ( generalInviteInfo.length > 1 ) { InviteEmbed.addFields({ name: localize(interaction.locale, 'INFO_INVITE_HEADER_GENERAL'), value: generalInviteInfo }); }
        
        // Invite Target Info
        let targetInviteInfo = "";
        if ( fetchedInvite.channel != null ) { targetInviteInfo += `**${localize(interaction.locale, 'INFO_INVITE_CHANNEL_TYPE')}** ${readableChannelType(fetchedInvite.channel.type, interaction.locale)}\n**${localize(interaction.locale, 'INFO_INVITE_CHANNEL_NAME')}** ${fetchedInvite.channel.name}`; }
        if ( fetchedInvite.targetType != null && fetchedInvite.targetType === InviteTargetType.Stream ) { targetInviteInfo += `${targetInviteInfo.length > 1 ? `\n` : ""}**${localize(interaction.locale, 'INFO_INVITE_TARGET_TYPE')}** ${localize(interaction.locale, 'INFO_INVITE_TARGET_STREAM')}`; }
        if ( fetchedInvite.targetType != null && fetchedInvite.targetType === InviteTargetType.EmbeddedApplication ) { targetInviteInfo += `${targetInviteInfo.length > 1 ? `\n` : ""}**${localize(interaction.locale, 'INFO_INVITE_TARGET_TYPE')}** ${localize(interaction.locale, 'INFO_INVITE_TARGET_ACTIVITY')}${(fetchedInvite.targetApplication != null) && (fetchedInvite.targetApplication.name != null) ? `\n**${localize(interaction.locale, 'INFO_INVITE_TARGET_ACTIVITY_NAME')}** ${fetchedInvite.targetApplication.name}` : ""}`; }
        
        if ( targetInviteInfo.length > 1 ) { InviteEmbed.addFields({ name: localize(interaction.locale, 'INFO_INVITE_HEADER_TARGET'), value: targetInviteInfo }); }
        
        // Guild Info
        if ( InviteGuild != null )
        {
            if ( InviteGuild.description != null ) { InviteEmbed.setDescription(InviteGuild.description); }
            if ( InviteGuild.icon != null ) { InviteEmbed.setAuthor({ iconURL: InviteGuild.iconURL({ extension: 'png' }), name: `${localize(interaction.locale, 'INFO_INVITE_HEADER_DATA')} ${fetchedInvite.code}` }); }
            
            let guildInviteInfo = `**${localize(interaction.locale, 'INFO_INVITE_SERVER_NAME')}** ${InviteGuild.name}
${ExternalEmojiPermission && InviteGuild.partnered ? `${EMOJI_PARTNER} ` : ""}**${localize(interaction.locale, 'INFO_INVITE_SERVER_PARTNERED')}** ${InviteGuild.partnered ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}
${ExternalEmojiPermission && InviteGuild.verified ? `${EMOJI_VERIFIED} ` : ""}**${localize(interaction.locale, 'INFO_INVITE_SERVER_VERIFIED')}** ${InviteGuild.verified ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}`;
            
            if ( InviteGuild.premiumSubscriptionCount != null ) { guildInviteInfo += `\n**${localize(interaction.locale, 'INFO_INVITE_SERVER_BOOST_COUNT')}** ${InviteGuild.premiumSubscriptionCount}` }
            if ( fetchedInvite.memberCount ) { guildInviteInfo += `\n**${localize(interaction.locale, 'INFO_INVITE_SERVER_APPROX_TOTAL_MEMBERS')}** ${fetchedInvite.memberCount}`; }
            if ( fetchedInvite.presenceCount ) { guildInviteInfo += `\n**${localize(interaction.locale, 'INFO_INVITE_SERVER_APPROX_ONLINE_MEMBERS')}** ${fetchedInvite.presenceCount}`; }
            
            InviteEmbed.addFields({ name: localize(interaction.locale, 'INFO_INVITE_HEADER_SERVER'), value: guildInviteInfo });

            // Server Feature Flags, grabbing from raw API to ensure up-to-date data
            let rawData = await DiscordClient.rest.get(Routes.invite(fetchedInvite.code));
            const RawFeatures = rawData["guild"]["features"];
            let guildFeatures = [];
            RawFeatures.forEach(feature => guildFeatures.push(titleCaseGuildFeature(feature)));
            if ( guildFeatures.length > 0 ) { InviteEmbed.addFields({ name: localize(interaction.locale, 'INFO_INVITE_HEADER_SERVER_FLAGS'), value: `${guildFeatures.sort().join(', ').slice(0, 1023)}` }); }
        }


        // Construct Button
        const InviteActionRow = new ActionRowBuilder().addComponents([
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'INFO_INVITE_BUTTON_JOIN_SERVER')).setURL(`https://discord.gg/${fetchedInvite.code}`)
        ]);


        // ACK
        await interaction.editReply({ embeds: [InviteEmbed], components: [InviteActionRow] });
        return;
    },









    /**
     * Fetches information about either the User running this Command, or a specified Guild Member (including Bots)
     * @param {ChatInputCommandInteraction} interaction 
     */
    async fetchUserInfo(interaction)
    {
        await interaction.deferReply({ ephemeral: true });

        // Use_External_Emojis Permission Check
        const ExternalEmojiPermission = checkExternalEmojiPermission(interaction);

        // Fetch Member
        /** @type {GuildMember} */
        let fetchedMember;
        const InputMember = interaction.options.getMember("user");
        if ( !InputMember || InputMember == null )
        {
            try {
                fetchedMember = await interaction.guild.members.fetch(interaction.user.id);
            } catch (err) {
                await interaction.editReply({ content: localize(interaction.locale, 'INFO_COMMAND_ERROR_UNABLE_TO_FETCH_USER_SELF') });
            }
        }
        else
        {
            try {
                fetchedMember = await interaction.guild.members.fetch(InputMember.id);
            } catch (err) {
                await interaction.editReply({ content: localize(interaction.locale, 'INFO_COMMAND_ERROR_UNABLE_TO_FETCH_USER_OTHER') });
            }
        }


        // Grab stuff
        const FetchedUser = await fetchedMember.user.fetch();
        
        // Member Info
        const MemberHighestRole = fetchedMember.roles.highest.id === interaction.guildId ? "@everyone" : `<@&${fetchedMember.roles.highest.id}>`;
        const MemberRoleCount = fetchedMember.roles.cache.filter(role => role.id !== interaction.guildId).size;

        // Assets
        const HasMemberAvatar = fetchedMember.avatar == null ? false : true;
        const HasGlobalAvatar = FetchedUser?.avatar == null ? false : true;
        const HasGlobalBanner = FetchedUser?.banner == null ? false : true;
        const HasAvatarDecoration = FetchedUser?.avatarDecoration == null ? false : true;

        // User Flags
        const UserFlagStrings = [];
        let userFlagEmojis = [];
        const RawUserFlags = FetchedUser.flags.toArray();
        RawUserFlags.forEach(flag => {
            UserFlagStrings.push(readableUserFlags(flag, interaction.locale));
            userFlagEmojis.push(readableUserFlagsEmoji(flag));
        });
        // Filter out badgeless flags
        userFlagEmojis = userFlagEmojis.filter(emojiString => emojiString !== "NULL");

        // GuildMember Flags
        let memberFlagStrings = [];
        const RawMemberFlags = fetchedMember.flags.toArray();
        RawMemberFlags.forEach(flag => {
            memberFlagStrings.push(readableMemberFlags(flag, interaction.locale));
        });
        // Filter out NULLs
        memberFlagStrings = memberFlagStrings.filter(flag => flag !== "NULL");



        // Construct Embed
        const UserInfoEmbed = new EmbedBuilder().setAuthor({ iconURL: fetchedMember.displayAvatarURL({ extension: 'png' }), name: fetchDisplayName(fetchedMember) })
        .setColor(fetchedMember.displayHexColor);

        // Member Info
        let memberInformationString = "";

        if ( FetchedUser.id === interaction.guild.ownerId ) { memberInformationString += `${ExternalEmojiPermission ? `${EMOJI_OWNER_CROWN} `: ""}**${localize(interaction.locale, 'INFO_USER_SERVER_OWNER')}** ${localize(interaction.locale, 'TRUE')}`; }
        if ( fetchedMember.displayName != null ) { memberInformationString += `${memberInformationString.length > 1 ? `\n`: ""}**${localize(interaction.locale, 'INFO_USER_DISPLAY_NAME')}** \`${fetchDisplayName(fetchedMember)}\``; }
        if ( fetchedMember.joinedAt != null ) { memberInformationString += `${memberInformationString.length > 1 ? `\n`: ""}**${localize(interaction.locale, 'INFO_USER_JOINED_SERVER')}** <t:${Math.floor(fetchedMember.joinedAt.getTime() / 1000)}:R>`; }
        if ( MemberHighestRole != null ) { memberInformationString += `${memberInformationString.length > 1 ? `\n`: ""}**${localize(interaction.locale, 'INFO_USER_HIGHEST_ROLE')}** ${MemberHighestRole}`; }
        if ( MemberRoleCount > 0 ) { memberInformationString += `${memberInformationString.length > 1 ? `\n`: ""}${ExternalEmojiPermission ? `${EMOJI_ROLE} ` : ""}**${localize(interaction.locale, 'INFO_USER_ROLE_COUNT')}** ${MemberRoleCount}`; }
        if ( fetchedMember.premiumSince != null ) { memberInformationString += `${memberInformationString.length > 1 ? `\n`: ""}${ExternalEmojiPermission ? `${EMOJI_BOOST} ` : ""}**${localize(interaction.locale, 'INFO_USER_BOOSTING_SERVER')}** <t:${Math.floor(fetchedMember.premiumSince.getTime() / 1000)}:R>`; }
        if ( fetchedMember.pending === true ) { memberInformationString += `${memberInformationString.length > 1 ? `\n`: ""}${ExternalEmojiPermission ? `${EMOJI_MEMBERSHIP_GATING} ` : ""}**${localize(interaction.locale, 'INFO_USER_PENDING_VERIFICATION')}**`; }
        if ( fetchedMember.communicationDisabledUntil != null && MemberTimedOut.getTime() > Date.now() ) { memberInformationString += `${memberInformationString.length > 1 ? `\n`: ""}${ExternalEmojiPermission ? `${EMOJI_TIMEOUT} ` : ""}${localize(interaction.locale, 'INFO_USER_TIMED_OUT', `<t:${Math.floor(fetchedMember.communicationDisabledUntil.getTime() / 1000)}:R>`)}`; }
        
        if ( memberInformationString.length > 1 ) { UserInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_USER_HEADER_MEMBER'), value: memberInformationString }); }


        // User Info
        let userInformationString = "";

        userInformationString += `**${localize(interaction.locale, 'INFO_USER_MENTION')}** <@${fetchedMember.user.id}>`;
        userInformationString += `\n**${localize(interaction.locale, 'INFO_USER_ACCOUNT_CREATED')}** <t:${Math.floor(FetchedUser.createdAt.getTime() / 1000)}:R>`;
        userInformationString += `\n**${localize(interaction.locale, 'INFO_USER_BOT')}** ${FetchedUser.id === "156482326887530498" ? ':thinking:' : `${FetchedUser.bot ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}`}`;
        if ( FetchedUser.id === "156482326887530498" ) { userInformationString += `\n**${localize(interaction.locale, 'INFO_USER_HECCBOT_CREATOR')}** ${localize(interaction.locale, 'TRUE')}`; }

        UserInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_USER_HEADER_USER'), value: userInformationString });


        // Bot Info (if specified User is a Bot Account)
        let botAppFlagStrings = [];
        let botIntentFlagStrings = [];

        if ( FetchedUser.bot )
        {
            let botInformationString = "";

            // Bot specific Information
            if ( FetchedUser.client.application.botPublic != null ) { botInformationString += `**${localize(interaction.locale, 'INFO_USER_BOT_INVITIBLE')}** ${FetchedUser.client.application.botPublic ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}`; }
            if ( FetchedUser.client.application.botRequireCodeGrant != null ) { botInformationString += `${botInformationString.length > 1 ? `\n` : ""}**${localize(interaction.locale, 'INFO_USER_BOT_OAUTH')}** ${FetchedUser.client.application.botRequireCodeGrant ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}` }

            // Bot Application Flags
            const BotAppFlags = FetchedUser.client.application.flags.toArray();
            BotAppFlags.forEach(flag => {
                // Emojis
                if ( flag === "ApplicationCommandBadge" ) { userFlagEmojis.push(EMOJI_SUPPORTS_APP_COMMANDS); }
                if ( flag === "ApplicationAutoModerationRuleCreateBadge" ) { userFlagEmojis.push(EMOJI_USES_AUTOMOD); }

                // Plain Text
                if ( BotIntentFlags.includes(flag) ) { botIntentFlagStrings.push(readableApplicationFlags(flag, interaction.locale)); }
                else { botAppFlagStrings.push(readableApplicationFlags(flag, interaction.locale)); }
            });

            // Add Intents to Bot Info String
            if ( botIntentFlagStrings.length > 0 ) { botInformationString += `${botInformationString.length > 1 ? `\n` : ""}${botIntentFlagStrings.sort().join(`\n`).slice(0, 1023)}`; }

            // Add to Embed
            if ( botInformationString.length > 1 ) { UserInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_USER_HEADER_BOT'), value: botInformationString }); }
        }


        // Guild Member Flags
        if ( memberFlagStrings.length > 0 ) { UserInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_USER_HEADER_MEMBER_FLAGS'), value: memberFlagStrings.sort().join(', ').slice(0, 1023) }); }
        
        // User Flags & Badges
        if ( UserFlagStrings.length > 0 ) { UserInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_USER_HEADER_USER_FLAGS'), value: UserFlagStrings.sort().join(', ').slice(0, 1023) }); }
        if ( userFlagEmojis.length > 0 && ExternalEmojiPermission ) { UserInfoEmbed.setDescription(userFlagEmojis.join(' ')); }

        // Bot/Application Flags (excluding Flags for Intents, those are handled above)
        if ( botAppFlagStrings.length > 0 ) { UserInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_USER_HEADER_BOT_FLAGS'), value: botAppFlagStrings.sort().join(', ').slice(0, 1023) }); }


        // Buttons!
        const ExtraUserInfoRow = new ActionRowBuilder();
        const UserAssetRow = new ActionRowBuilder();
        const ActionRowResponse = [];

        if ( MemberRoleCount > 0 ) { ExtraUserInfoRow.addComponents( new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`info-user-role_${FetchedUser.id}`).setLabel(localize(interaction.locale, 'INFO_USER_BUTTON_ROLES')).setEmoji(EMOJI_ROLE) ); }
        if ( HasMemberAvatar ) { UserAssetRow.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'INFO_USER_BUTTON_MEMBER_AVATAR')).setURL(fetchedMember.avatarURL())); }
        if ( HasGlobalAvatar ) { UserAssetRow.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'INFO_USER_BUTTON_GLOBAL_AVATAR')).setURL(FetchedUser.avatarURL())); }
        if ( HasGlobalBanner ) { UserAssetRow.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'INFO_USER_BUTTON_GLOBAL_BANNER')).setURL(FetchedUser.bannerURL())); }
        if ( HasAvatarDecoration ) { UserAssetRow.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'INFO_USER_BUTTON_AVATAR_DECORATION')).setURL(FetchedUser.avatarDecorationURL())); }

        // Put together Command Response
        /** @type {InteractionEditReplyOptions} */
        let commandResponse = { embeds: [UserInfoEmbed] };

        if ( ExtraUserInfoRow.components.length > 0 ) { ActionRowResponse.push(ExtraUserInfoRow); }
        if ( UserAssetRow.components.length > 0 ) { ActionRowResponse.push(UserAssetRow); }
        if ( ActionRowResponse.length > 0 ) { commandResponse.components = ActionRowResponse; }

        // Only use if User tried putting in a different User that isn't in the Guild (Bot will fall back to doing the User who ran the Command anyways)
        if ( (!InputMember || InputMember == null) && (interaction.options.data[0]?.options?.length > 0) ) { commandResponse.content = `:information_source: ${localize(interaction.locale, 'INFO_COMMAND_ERROR_USER_NOT_IN_GUILD')}`; }


        // ACK
        await interaction.editReply(commandResponse);
        return;
    },









    /**
     * Fetches information about the specified Server Role
     * @param {ChatInputCommandInteraction} interaction 
     */
    async fetchRoleInfo(interaction)
    {
        await interaction.deferReply({ ephemeral: true });

        // Grab Role & ensure it's actually existing in the Server
        /** @type {?Role} */
        const InputRole = interaction.options.getRole("role");

        if ( !InputRole || InputRole == null )
        {
            await interaction.editReply({ content: localize(interaction.locale, 'INFO_COMMAND_ERROR_ROLE_NOT_FOUND') });
            return;
        }

        // Reject atEveryone
        if ( InputRole.id === interaction.guildId )
        {
            await interaction.editReply({ content: localize(interaction.locale, 'INFO_COMMAND_ERROR_ROLE_EVERYONE_UNSUPPORTED') });
            return;
        }


        // Construct Embed
        const RoleInfoEmbed = new EmbedBuilder().setColor(InputRole.hexColor);


        // General Role Information
        let generalRoleInfoString = `**${localize(interaction.locale, 'INFO_ROLE_CREATED')}** <t:${Math.floor(InputRole.createdAt.getTime() / 1000)}:R>`;
        generalRoleInfoString += `\n**${localize(interaction.locale, 'INFO_ROLE_COLOR')}** ${InputRole.hexColor}`;
        generalRoleInfoString += `\n**${localize(interaction.locale, 'INFO_ROLE_HOISTED')}** ${InputRole.hoist ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}`;
        generalRoleInfoString += `\n**${localize(interaction.locale, 'INFO_ROLE_MANAGED')}** ${InputRole.managed ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}`;
        generalRoleInfoString += `\n**${localize(interaction.locale, 'INFO_ROLE_MEMBERS')}** ${InputRole.members.size}`;
        if ( InputRole.unicodeEmoji != null ) { generalRoleInfoString += `\n**${localize(interaction.locale, 'INFO_ROLE_ICON_EMOJI')}** ${InputRole.unicodeEmoji}`; }
        generalRoleInfoString += `\n**${localize(interaction.locale, 'INFO_ROLE_ICON_CUSTOM')}** ${InputRole.icon != null ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}`;

        RoleInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_ROLE_HEADER_GENERAL'), value: generalRoleInfoString });


        // Role Custom Icon Check
        if ( InputRole.icon != null ) { RoleInfoEmbed.setAuthor({ name: InputRole.name, iconURL: InputRole.iconURL({ extension: 'png' }) }); }
        else { RoleInfoEmbed.setAuthor({ name: InputRole.name }); }


        // Role Tags
        if ( InputRole.tags != null )
        {
            let roleTagInfo = "";
            let roleTags = InputRole.tags;

            if ( roleTags.botId != undefined ) { roleTagInfo += `**${localize(interaction.locale, 'INFO_ROLE_BOT')}** <@${roleTags.botId}>`; }
            if ( roleTags.integrationId != undefined ) { roleTagInfo += `${roleTagInfo.length > 1 ? `\n` : ""}**${localize(interaction.locale, 'INFO_ROLE_INTEGRATION')}** ${localize(interaction.locale, 'TRUE')}`; }
            if ( roleTags.premiumSubscriberRole != undefined ) { roleTagInfo += `${roleTagInfo.length > 1 ? `\n` : ""}**${localize(interaction.locale, 'INFO_ROLE_SERVER_BOOST')}** ${localize(interaction.locale, 'TRUE')}`; }
            if ( roleTags.subscriptionListingId != undefined ) { roleTagInfo += `${roleTagInfo.length > 1 ? `\n` : ""}**${localize(interaction.locale, 'INFO_ROLE_MONETIZATION')}** ${localize(interaction.locale, 'TRUE')}`; }
            if ( roleTags.availableForPurchase != undefined ) { roleTagInfo += `${roleTagInfo.length > 1 ? `\n` : ""}**${localize(interaction.locale, 'INFO_ROLE_PURCHASABLE')}** ${localize(interaction.locale, 'TRUE')}`; }
            if ( roleTags.guildConnections != undefined ) { roleTagInfo += `${roleTagInfo.length > 1 ? `\n` : ""}**${localize(interaction.locale, 'INFO_ROLE_LINKED')}** ${localize(interaction.locale, 'TRUE')}`; }

            if ( roleTagInfo.length > 1 ) { RoleInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_ROLE_HEADER_TAGS'), value: roleTagInfo }); }
        }


        // Role Flags
        const RoleFlagStrings = [];
        let rawRoleFlags = InputRole.flags.toArray();
        rawRoleFlags.forEach(flag => { RoleFlagStrings.push(readableRoleFlags(flag, interaction.locale)); });

        if ( RoleFlagStrings.length > 0 ) { RoleInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_ROLE_HEADER_FLAGS'), value: RoleFlagStrings.sort().join(', ').slice(0, 1023) }); }


        // ACK
        await interaction.editReply({ embeds: [RoleInfoEmbed] });
        return;
    }
}
