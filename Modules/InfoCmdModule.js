import fetch from "node-fetch";
import { GuildPremiumTier, UserFlags, GuildMemberFlags, ChannelType, ApplicationFlags, RoleFlags, ChannelFlags, InviteType, GuildNSFWLevel } from "discord-api-types/v10";
import { checkExternalEmojiPermission, titleCaseGuildFeature } from "../Utility/utilityMethods.js";
import { DiscordClient } from "../Utility/utilityConstants.js";
import * as AppEmoji from "../Assets/AppEmojis.js";
import { localize } from "../Utility/localizeResponses.js";

if (!globalThis.fetch) { globalThis.fetch = fetch; }


/**
 * Readable Server Boost Tiers
 * @param {GuildPremiumTier} premiumTier
 * @param {String} locale
 * 
 * @returns {String}
 */
export function readableGuildPremiumTier(premiumTier, locale) {
    switch (premiumTier) {
        case GuildPremiumTier.None:
            return localize(locale, 'INFO_READABLE_GUILD_BOOST_NONE');

        case GuildPremiumTier.Tier1:
            return localize(locale, 'INFO_READABLE_GUILD_BOOST_LEVEL_ONE');

        case GuildPremiumTier.Tier2:
            return localize(locale, 'INFO_READABLE_GUILD_BOOST_LEVEL_TWO');

        case GuildPremiumTier.Tier3:
            return localize(locale, 'INFO_READABLE_GUILD_BOOST_LEVEL_THREE');
    }
}


/**
 * Gets the emoji representing the Guild's current Premium Tier
 * @param {GuildPremiumTier} premiumTier
 * 
 * @returns {String}
 */
export function getGuildPremiumTierEmoji(premiumTier) {
    switch (premiumTier) {
        case GuildPremiumTier.None:
            return "";

        case GuildPremiumTier.Tier1:
            return AppEmoji.GUILD_BOOST_TIER_ONE;

        case GuildPremiumTier.Tier2:
            return AppEmoji.GUILD_BOOST_TIER_TWO;

        case GuildPremiumTier.Tier3:
            return AppEmoji.GUILD_BOOST_TIER_THREE;
    }
}


/**
 * Readable Guild NSFW Level
 * @param {GuildNSFWLevel} nsfwLevel 
 * @param {String} locale 
 * 
 * @returns {String}
 */
export function readableNSFWLevel(nsfwLevel, locale) {
    switch (nsfwLevel) {
        case GuildNSFWLevel.Default:
            return localize(locale, 'INFO_READABLE_GUILD_NSFW_LEVEL_DEFAULT');

        case GuildNSFWLevel.AgeRestricted:
            return localize(locale, 'INFO_READABLE_GUILD_NSFW_LEVEL_RESTRICTED');

        case GuildNSFWLevel.Explicit:
            return localize(locale, 'INFO_READABLE_GUILD_NSFW_LEVEL_EXPLICIT');

        case GuildNSFWLevel.Safe:
            return localize(locale, 'INFO_READABLE_GUILD_NSFW_LEVEL_SAFE');
    }
}


/**
 * Readable User Flags
 * @param {BigInt} userFlags
 * @param {String} locale
 * 
 * @returns {Array<String>}
 */
export function readableUserFlags(userFlags, locale) {
    let readableStrings = [];

    // Splitting up the below based off starting character just for code readability

    if ( (userFlags & UserFlags.ActiveDeveloper) == UserFlags.ActiveDeveloper ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_ACTIVE_DEVELOPER')); }

    if ( (userFlags & UserFlags.BotHTTPInteractions) == UserFlags.BotHTTPInteractions ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_HTTP_INTERACTIONS')); }
    if ( (userFlags & UserFlags.BugHunterLevel1) == UserFlags.BugHunterLevel1 ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_BUG_HUNTER_LEVEL_ONE')); }
    if ( (userFlags & UserFlags.BugHunterLevel2) == UserFlags.BugHunterLevel2 ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_BUG_HUNTER_LEVEL_TWO')); }

    if ( (userFlags & UserFlags.CertifiedModerator) == UserFlags.CertifiedModerator ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_MODERATOR_ALUMNI')); }
    if ( (userFlags & UserFlags.Collaborator) == UserFlags.Collaborator ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_COLLABORATOR')); }

    if ( (userFlags & UserFlags.HypeSquadOnlineHouse1) == UserFlags.HypeSquadOnlineHouse1 ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_HYPESQUAD_HOUSE_BRAVERY')); }
    if ( (userFlags & UserFlags.HypeSquadOnlineHouse2) == UserFlags.HypeSquadOnlineHouse2 ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_HYPESQUAD_HOUSE_BRILLIANCE')); }
    if ( (userFlags & UserFlags.HypeSquadOnlineHouse3) == UserFlags.HypeSquadOnlineHouse3 ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_HYPESQUAD_HOUSE_BALANCE')); }
    if ( (userFlags & UserFlags.Hypesquad) == UserFlags.Hypesquad ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_HYPESQUAD_EVENTS')); }

    if ( (userFlags & UserFlags.Partner) == UserFlags.Partner ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_PARTNER')); }
    if ( (userFlags & UserFlags.PremiumEarlySupporter) == UserFlags.PremiumEarlySupporter ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_EARLY_SUPPORTER')); }

    if ( (userFlags & UserFlags.Quarantined) == UserFlags.Quarantined ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_QUARANTINED')); }

    if ( (userFlags & UserFlags.RestrictedCollaborator) == UserFlags.RestrictedCollaborator ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_RESTRICTED_COLLABORATOR')); }

    if ( (userFlags & UserFlags.Spammer) == UserFlags.Spammer ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_LIKELY_SPAMMER')); }
    if ( (userFlags & UserFlags.Staff) == UserFlags.Staff ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_STAFF')); }

    if ( (userFlags & UserFlags.TeamPseudoUser) == UserFlags.TeamPseudoUser ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_TEAM_USER')); }

    if ( (userFlags & UserFlags.VerifiedBot) == UserFlags.VerifiedBot ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_VERIFIED_BOT')); }
    if ( (userFlags & UserFlags.VerifiedDeveloper) == UserFlags.VerifiedDeveloper ) { readableStrings.push(localize(locale, 'INFO_READABLE_USER_FLAG_EARLY_VERIFIED_BOT_DEVELOPER')); }

    return readableStrings;
}


/**
 * Gets the emojis representing the User's Badges (well, the ones attached to User Flags)
 * @param {BigInt} userFlags
 * 
 * @returns {Array<String>}
 */
export function getUserFlagEmojis(userFlags) {
    let readableStrings = [];
    // Splitting up the below based off starting character just for code readability

    if ( (userFlags & UserFlags.ActiveDeveloper) == UserFlags.ActiveDeveloper ) { readableStrings.push(AppEmoji.BADGE_ACTIVE_DEVELOPER); }
    if ( (userFlags & UserFlags.BugHunterLevel1) == UserFlags.BugHunterLevel1 ) { readableStrings.push(AppEmoji.BADGE_BUG_HUNTER_TIER_1); }
    if ( (userFlags & UserFlags.BugHunterLevel2) == UserFlags.BugHunterLevel2 ) { readableStrings.push(AppEmoji.BADGE_BUG_HUNTER_TIER_2); }
    if ( (userFlags & UserFlags.CertifiedModerator) == UserFlags.CertifiedModerator ) { readableStrings.push(AppEmoji.BADGE_CERTIFIED_MOD); }
    if ( (userFlags & UserFlags.HypeSquadOnlineHouse1) == UserFlags.HypeSquadOnlineHouse1 ) { readableStrings.push(AppEmoji.BADGE_HYPESQUAD_BRAVERY); }
    if ( (userFlags & UserFlags.HypeSquadOnlineHouse2) == UserFlags.HypeSquadOnlineHouse2 ) { readableStrings.push(AppEmoji.BADGE_HYPESQUAD_BRILLIANCE); }
    if ( (userFlags & UserFlags.HypeSquadOnlineHouse3) == UserFlags.HypeSquadOnlineHouse3 ) { readableStrings.push(AppEmoji.BADGE_HYPESQUAD_BALANCE); }
    if ( (userFlags & UserFlags.Hypesquad) == UserFlags.Hypesquad ) { readableStrings.push(AppEmoji.BADGE_HYPESQUAD_EVENTS); }
    if ( (userFlags & UserFlags.Partner) == UserFlags.Partner ) { readableStrings.push(AppEmoji.BADGE_PARTNERED_SERVER_OWNER); }
    if ( (userFlags & UserFlags.PremiumEarlySupporter) == UserFlags.PremiumEarlySupporter ) { readableStrings.push(AppEmoji.BADGE_EARLY_SUPPORTER); }
    if ( (userFlags & UserFlags.Staff) == UserFlags.Staff ) { readableStrings.push(AppEmoji.BADGE_STAFF); }
    if ( (userFlags & UserFlags.VerifiedDeveloper) == UserFlags.VerifiedDeveloper ) { readableStrings.push(AppEmoji.BADGE_EARLY_VERIFIED_BOT_DEV); }

    return readableStrings;
}


/**
 * Readable Member Flags
 * @param {BigInt} memberFlags
 * @param {String} locale
 * 
 * @returns {Array<String>}
 */
export function readableMemberFlags(memberFlags, locale) {
    let readableStrings = [];

    // Splitting up the below based off starting character just for code readability

    if ( (memberFlags & GuildMemberFlags.AutomodQuarantinedUsernameOrGuildNickname) == GuildMemberFlags.AutomodQuarantinedUsernameOrGuildNickname ) { readableStrings.push(localize(locale, 'INFO_READABLE_MEMBER_FLAG_AUTOMOD_QUARANTIED_NAME')); }

    if ( (memberFlags & GuildMemberFlags.BypassesVerification) == GuildMemberFlags.BypassesVerification ) { readableStrings.push(localize(locale, 'INFO_READABLE_MEMBER_FLAG_BYPASS_SERVER_VERIFICATION')); }

    if ( (memberFlags & GuildMemberFlags.CompletedHomeActions) == GuildMemberFlags.CompletedHomeActions ) { readableStrings.push(localize(locale, 'INFO_READABLE_MEMBER_FLAG_GUIDE_TODO_COMPLETED')); }
    if ( (memberFlags & GuildMemberFlags.CompletedOnboarding) == GuildMemberFlags.CompletedOnboarding ) { readableStrings.push(localize(locale, 'INFO_READABLE_MEMBER_FLAG_ONBOARDING_COMPLETED')); }

    if ( (memberFlags & GuildMemberFlags.DidRejoin) == GuildMemberFlags.DidRejoin ) { readableStrings.push(localize(locale, 'INFO_READABLE_MEMBER_FLAG_REJOIN')); }

    if ( (memberFlags & GuildMemberFlags.IsGuest) == GuildMemberFlags.IsGuest ) { readableStrings.push(localize(locale, 'INFO_READABLE_MEMBER_FLAG_IS_GUEST')); }
    
    if ( (memberFlags & GuildMemberFlags.StartedHomeActions) == GuildMemberFlags.StartedHomeActions ) { readableStrings.push(localize(locale, 'INFO_READABLE_MEMBER_FLAG_GUIDE_TODO_STARTED')); }
    if ( (memberFlags & GuildMemberFlags.StartedOnboarding) == GuildMemberFlags.StartedOnboarding ) { readableStrings.push(localize(locale, 'INFO_READABLE_MEMBER_FLAG_ONBOARDING_STARTED')); }

    return readableStrings;
}


/**
 * Readable Channel Type
 * @param {ChannelType} channelType
 * @param {String} locale
 * 
 * @returns {String}
 */
export function readableChannelType(channelType, locale) {
    switch (channelType) {
        // Existing/usable Channel types
        case ChannelType.AnnouncementThread:
            return localize(locale, 'CHANNEL_TYPE_ANNOUNCEMENT_THREAD');

        case ChannelType.DM:
            return localize(locale, 'CHANNEL_TYPE_DM');

        case ChannelType.GroupDM:
            return localize(locale, 'CHANNEL_TYPE_GROUP_DM');

        case ChannelType.GuildAnnouncement:
            return localize(locale, 'CHANNEL_TYPE_ANNOUNCEMENT');

        case ChannelType.GuildCategory:
            return localize(locale, 'CHANNEL_TYPE_CATEGORY');

        case ChannelType.GuildDirectory:
            return localize(locale, 'CHANNEL_TYPE_DIRECTORY');

        case ChannelType.GuildForum:
            return localize(locale, 'CHANNEL_TYPE_FORUM');

        case ChannelType.GuildMedia:
            return localize(locale, 'CHANNEL_TYPE_MEDIA');

        case ChannelType.GuildStageVoice:
            return localize(locale, 'CHANNEL_TYPE_STAGE');

        case ChannelType.GuildText:
            return localize(locale, 'CHANNEL_TYPE_TEXT');

        case ChannelType.GuildVoice:
            return localize(locale, 'CHANNEL_TYPE_VOICE');

        case ChannelType.PrivateThread:
            return localize(locale, 'CHANNEL_TYPE_PRIVATE_THREAD');
        
        case ChannelType.PublicThread:
            return localize(locale, 'CHANNEL_TYPE_PUBLIC_THREAD');

        // Deleted Channel types (just in case)
        case 6:
            // GUILD_STORE Channel - actually deprecated not deleted (existing ones still exist), but cannot be created since 2022 (or 2023)
            //   Used to be used for Game Devs to sell their games directly inside Discord within their own Servers.
            return localize(locale, 'CHANNEL_TYPE_DELETED_STORE');
        
        case 7:
            // GUILD_LFG Channel - was a scrapped experiment (LFG = Looking For Game)
            return localize(locale, 'CHANNEL_TYPE_DELETED_LFG');

        case 8:
            // LFG_GROUP_DM Channel - part of the same scrapped experiment as GUILD_LFG. These existed only inside GUILD_LFG Channels
            return localize(locale, 'CHANNEL_TYPE_DELETED_LFG_GROUP_DM');

        case 9:
            // THREAD_ALPHA Channel - The first iteration of the Threads feature/Channels, never widely used and was scrapped in favour of the newer *_THREAD Channel types
            return localize(locale, 'CHANNEL_TYPE_DELETED_THREAD_ALPHA');

        // Experimental / WIP / Upcoming new Channel Types that haven't been fully released
        case 17:
            // LOBBY Channel. Theory: Used as a new Channel for Gaming Guilds to have a connected feed/chat between that specific Channel in Discord and a Game/Activity's chat?
            return localize(locale, 'CHANNEL_TYPE_EXPERIMENTAL_LOBBY');

        case 18:
            // DM_SDK Channel. Theory: Used as a new DM type between a User and a Game/Activity said User has connected to their Account?
            return localize(locale, 'CHANNEL_TYPE_EXPERIMENTAL_DM_SDK');
    }
}


/**
 * Readable Application Flags
 * @param {BigInt} appFlags
 * @param {String} locale
 * 
 * @returns {Array<String>}
 */
export function readableAppFlags(appFlags, locale) {
    let readableStrings = [];

    // Splitting up the below based off starting character just for code readability

    if ( (appFlags & ApplicationFlags.ApplicationAutoModerationRuleCreateBadge) == ApplicationFlags.ApplicationAutoModerationRuleCreateBadge ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_AUTOMOD_BADGE')); }
    if ( (appFlags & ApplicationFlags.ApplicationCommandBadge) == ApplicationFlags.ApplicationCommandBadge ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_APP_COMMANDS_BADGE')); }

    if ( (appFlags & ApplicationFlags.Embedded) == ApplicationFlags.Embedded ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_EMBEDDED')); }
    if ( (appFlags & ApplicationFlags.EmbeddedFirstParty) == ApplicationFlags.EmbeddedFirstParty ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_EMBEDDED_FIRST_PARTY')); }
    if ( (appFlags & ApplicationFlags.EmbeddedIAP) == ApplicationFlags.EmbeddedIAP ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_EMBEDDED_IAP')); }
    if ( (appFlags & ApplicationFlags.EmbeddedReleased) == ApplicationFlags.EmbeddedReleased ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_EMBEDDED_RELEASED')); }

    if ( (appFlags & ApplicationFlags.GatewayGuildMembers) == ApplicationFlags.GatewayGuildMembers ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_GUILD_MEMBERS')); }
    if ( (appFlags & ApplicationFlags.GatewayGuildMembersLimited) == ApplicationFlags.GatewayGuildMembersLimited ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_GUILD_MEMBERS_LIMITED')); }
    if ( (appFlags & ApplicationFlags.GatewayMessageContent) == ApplicationFlags.GatewayMessageContent ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_MESSAGE_CONTENT')); }
    if ( (appFlags & ApplicationFlags.GatewayGuildMembersLimited) == ApplicationFlags.GatewayMessageContentLimited ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_MESSAGE_CONTENT_LIMITED')); }
    if ( (appFlags & ApplicationFlags.GatewayPresence) == ApplicationFlags.GatewayPresence ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_PRESENCE')); }
    if ( (appFlags & ApplicationFlags.GatewayPresenceLimited) == ApplicationFlags.GatewayPresenceLimited ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_INTENT_PRESENCE_LIMITED')); }
    if ( (appFlags & ApplicationFlags.GroupDMCreate) == ApplicationFlags.GroupDMCreate ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_GROUP_DM_CREATE')); }

    if ( (appFlags & ApplicationFlags.ManagedEmoji) == ApplicationFlags.ManagedEmoji ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_MANAGED_EMOJI')); }

    if ( (appFlags & ApplicationFlags.RPCHasConnected) == ApplicationFlags.RPCHasConnected ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_RPC_CONNECTED')); }

    if ( (appFlags & ApplicationFlags.VerificationPendingGuildLimit) == ApplicationFlags.VerificationPendingGuildLimit ) { readableStrings.push(localize(locale, 'INFO_READABLE_APP_FLAG_VERIFICATION_BLOCKED_BY_GROWTH')); }

    return readableStrings;
}


/**
 * Readable Role Flags
 * @param {BigInt} roleFlags
 * @param {String} locale
 * 
 * @returns {Array<String>}
 */
export function readableRoleFlags(roleFlags, locale) {
    let readableStrings = [];

    if ( (roleFlags & RoleFlags.InPrompt) == RoleFlags.InPrompt ) { readableStrings.push(localize(locale, 'INFO_ROLE_FLAG_PROMPT')); }

    return readableStrings;
}


/**
 * Readable Channel Flags
 * @param {BigInt} channelFlags
 * @param {String} locale
 * 
 * @returns {Array<String>}
 */
export function readableChannelFlags(channelFlags, locale) {
    let readableStrings = [];

    // Splitting up the below based off starting character just for code readability

    if ( (channelFlags & ChannelFlags.ActiveChannelsRemoved) == ChannelFlags.ActiveChannelsRemoved ) { readableStrings.push(localize(locale, 'INFO_CHANNEL_FLAG_ACTIVE_CHANNELS_REMOVED')); }

    if ( (channelFlags & ChannelFlags.ClydeAI) == ChannelFlags.ClydeAI ) { readableStrings.push(localize(locale, 'INFO_CHANNEL_FLAG_CLYDE_AI')); }

    if ( (channelFlags & ChannelFlags.GuildFeedRemoved) == ChannelFlags.GuildFeedRemoved ) { readableStrings.push(localize(locale, 'INFO_CHANNEL_FLAG_GUILD_FEED_REMOVED')); }

    if ( (channelFlags & ChannelFlags.HideMediaDownloadOptions) == ChannelFlags.HideMediaDownloadOptions ) { readableStrings.push(localize(locale, 'INFO_CHANNEL_FLAG_DOWNLOAD_HIDDEN')); }

    if ( (channelFlags & ChannelFlags.IsGuildResourceChannel) == ChannelFlags.IsGuildResourceChannel ) { readableStrings.push(localize(locale, 'INFO_CHANNEL_FLAG_RESOURCE')); }
    if ( (channelFlags & ChannelFlags.IsScheduledForDeletion) == ChannelFlags.IsScheduledForDeletion ) { readableStrings.push(localize(locale, 'INFO_CHANNEL_FLAG_SCHEDULED_DELETION')); }
    if ( (channelFlags & ChannelFlags.IsSpam) == ChannelFlags.IsSpam ) { readableStrings.push(localize(locale, 'INFO_CHANNEL_FLAG_SPAM')); }

    if ( (channelFlags & ChannelFlags.Pinned) == ChannelFlags.Pinned ) { readableStrings.push(localize(locale, 'INFO_CHANNEL_FLAG_PINNED')); }
    
    if ( (channelFlags & ChannelFlags.RequireTag) == ChannelFlags.RequireTag ) { readableStrings.push(localize(locale, 'INFO_CHANNEL_FLAG_REQUIRE_TAG')); }

    return readableStrings;
}


/**
 * Readable Invite Types
 * @param {InviteType} inviteType
 * @param {String} locale
 * 
 * @returns {String}
 */
export function readableInviteType(inviteType, locale) {
    switch (inviteType) {
        case InviteType.Friend:
            return localize(locale, 'INFO_INVITE_TYPE_FRIEND');

        case InviteType.GroupDM:
            return localize(locale, 'INFO_INVITE_TYPE_GROUP_DM');

        case InviteType.Guild:
            return localize(locale, 'INFO_INVITE_TYPE_GUILD');
    }
}
