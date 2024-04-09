module.exports = {
    // ******* GENERIC STUFF
    PLEASE_SELECT_AN_ACTION: `Please select an action`,
    CREATED: `Created`,
    DELETE: `Delete`,
    CANCEL: `Cancel`,
    TRUE: `True`,
    FALSE: `False`,
    NO_LIMIT: `No limit`,
    KBPS: `kbps`,
    SECONDS: `seconds`,
    UNKNOWN: `Unknown`,

    JUMP_TO_SOURCE_MESSAGE: `Jump to source Message`,

    ERROR_GENERIC: `An error has occurred.`,
    ERROR_WITH_PREVIEW: `An error has occurred. A preview of the raw error is as follows:\n\`\`\`{{0}}\`\`\``,
    ERROR_COMMAND_OUTAGE: `Sorry, but this Command cannot be used during a Discord API Outage. Feel free to check [Discord's Outage Site](<https://discordstatus.com>) to see more details (if there is any posted).`,
    ERROR_INVALID_COLOR_HEX: `That wasn't a valid hex colour code! Please try again, using a valid hex colour code, including the \`#\` (hash) at the start.`,



    // ******* FOR HECCBOT DESCRIPTIONS, ETC
    HECCBOT_DESCRIPTION_SHORT: `The most general Discord Bot ever. Features Action Commands, Button Role Menus, Role-lockable Emojis, and more.`,
    HECCBOT_DESCRIPTION_LONG: `The most general Discord Bot ever, focusing on actual "general" features - so you won't find moderation or levelling features here.\nExamples of HeccBot's features includes: Button Role Menus, Action Commands, Temperature Conversions, ability to Role-lock Custom Emojis, and more!`,



    // ******* GENERIC TEXT COMMAND STUFF
    TEXT_COMMAND_ERROR_COOLDOWN_SECONDS: `Please wait {{0}} more seconds before using this Command again.`,
    TEXT_COMMAND_ERROR_COOLDOWN_MINUTES: `Please wait {{0}} more minutes before using this Command again.`,
    TEXT_COMMAND_ERROR_COOLDOWN_HOURS: `Please wait {{0}} more hours before using this Command again.`,
    TEXT_COMMAND_ERROR_COOLDOWN_DAYS: `Please wait {{0}} more days before using this Command again.`,
    TEXT_COMMAND_ERROR_COOLDOWN_MONTHS: `Please wait {{0}} more months before using this Command again.`,



    // ******* GENERIC SLASH COMMAND STUFF
    SLASH_COMMAND_ERROR_GENERIC: `Sorry, but there was a problem trying to run this Slash Command.`,
    SLASH_COMMAND_ERROR_GUILDS_UNSUPPORTED: `Sorry, but this Slash Command can only be used in Direct Messages (DMs) with me.`,
    SLASH_COMMAND_ERROR_DMS_UNSUPPORTED: `Sorry, but this Slash Command cannot be used within Direct Messages (DMs) or Group DMs.`,
    SLASH_COMMAND_ERROR_HECCBOT_DMS_UNSUPPORTED: `Sorry, but this Slash Command can only be used in Servers, not in Direct Messages (DMs) with me.`,
    SLASH_COMMAND_ERROR_ONLY_TEXT_CHANNELS: `Sorry, but this Slash Command can only be used inside of Server Text Channels.`,
    SLASH_COMMAND_ERROR_DISCORD_OUTAGE: `Sorry, but this Command is unusable while there's a Discord Outage affecting your Server. You can check [Discord's Outage Page](https://discordstatus.com) for extra details.`,

    SLASH_COMMAND_ERROR_COOLDOWN_SECONDS: `Please wait {{0}} more seconds before using this Slash Command again.`,
    SLASH_COMMAND_ERROR_COOLDOWN_MINUTES: `Please wait {{0}} more minutes before using this Slash Command again.`,
    SLASH_COMMAND_ERROR_COOLDOWN_HOURS: `Please wait {{0}} more hours before using this Slash Command again.`,
    SLASH_COMMAND_ERROR_COOLDOWN_DAYS: `Please wait {{0}} more days before using this Slash Command again.`,
    SLASH_COMMAND_ERROR_COOLDOWN_MONTHS: `Please wait {{0}} more months before using this Slash Command again.`,



    // ******* GENERIC CONTEXT COMMAND STUFF
    CONTEXT_COMMAND_ERROR_GENERIC: `Sorry, an error occurred while trying to run this Context Command...`,
    CONTEXT_COMMAND_ERROR_DMS_UNSUPPORTED: `Sorry, but this Context Command cannot be used within Direct Messages (DMs) or Group DMs.`,
    CONTEXT_COMMAND_ERROR_SYSTEM_AND_BOT_MESSAGES_UNSUPPORTED: `Sorry, but this Context Command cannot be used on a System or Bot Message.`,
    CONTEXT_COMMAND_ERROR_MISSING_CONTENT: `Sorry, but that Message doesn't have any content! (Attachments aren't checked by this Context Command).`,
    CONTEXT_COMMAND_ERROR_GUILDS_UNSUPPORTED: `Sorry, but this Context Command can only be used in Direct Messages (DMs) with me.`,
    CONTEXT_COMMAND_ERROR_DMS_UNSUPPORTED: `Sorry, but this Context Command cannot be used within Direct Messages (DMs) or Group DMs.`,
    CONTEXT_COMMAND_ERROR_HECCBOT_DMS_UNSUPPORTED: `Sorry, but this Context Command can only be used in Servers, not in Direct Messages (DMs) with me.`,

    CONTEXT_COMMAND_ERROR_COOLDOWN_SECONDS: `Please wait {{0}} more seconds before using this Context Command again.`,
    CONTEXT_COMMAND_ERROR_COOLDOWN_MINUTES: `Please wait {{0}} more minutes before using this Context Command again.`,
    CONTEXT_COMMAND_ERROR_COOLDOWN_HOURS: `Please wait {{0}} more hours before using this Context Command again.`,
    CONTEXT_COMMAND_ERROR_COOLDOWN_DAYS: `Please wait {{0}} more days before using this Context Command again.`,
    CONTEXT_COMMAND_ERROR_COOLDOWN_MONTHS: `Please wait {{0}} more months before using this Context Command again.`,



    // ******* GENERIC BUTTON STUFF
    BUTTON_ERROR_GENERIC: `An error occurred while trying to process that Button press...`,

    BUTTON_ERROR_COOLDOWN_SECONDS: `Please wait {{0}} more seconds before using this Button again.`,
    BUTTON_ERROR_COOLDOWN_MINUTES: `Please wait {{0}} more minutes before using this Button again.`,
    BUTTON_ERROR_COOLDOWN_HOURS: `Please wait {{0}} more hours before using this Button again.`,
    BUTTON_ERROR_COOLDOWN_DAYS: `Please wait {{0}} more days before using this Button again.`,
    BUTTON_ERROR_COOLDOWN_MONTHS: `Please wait {{0}} more months before using this Button again.`,



    // ******* GENERIC SELECT MENU STUFF
    SELECT_MENU_ERROR_GENERIC: `An error occurred while trying to process that Select Menu choice...`,

    SELECT_MENU_ERROR_COOLDOWN_SECONDS: `Please wait {{0}} more seconds before using this Select Menu again.`,
    SELECT_MENU_ERROR_COOLDOWN_MINUTES: `Please wait {{0}} more minutes before using this Select Menu again.`,
    SELECT_MENU_ERROR_COOLDOWN_HOURS: `Please wait {{0}} more hours before using this Select Menu again.`,
    SELECT_MENU_ERROR_COOLDOWN_DAYS: `Please wait {{0}} more days before using this Select Menu again.`,
    SELECT_MENU_ERROR_COOLDOWN_MONTHS: `Please wait {{0}} more months before using this Select Menu again.`,



    // ******* GENERIC MODAL STUFF
    MODAL_ERROR_GENERIC: `An error occurred while trying to process that Modal submission...`,



    // ******* GENERIC AUTOCOMPLETE STUFF
    AUTOCOMPLETE_ERROR_GENERIC: `Error: Unable to process. Please contact this Bot's developer!`,



    // ******* CHANNEL TYPES
    CHANNEL_TYPE_DM: `Direct Message (DM)`,
    CHANNEL_TYPE_GROUP_DM: `Group DM`,
    CHANNEL_TYPE_CATEGORY: `Category`,
    CHANNEL_TYPE_DIRECTORY: `Directory`,
    CHANNEL_TYPE_FORUM: `Forum`,
    CHANNEL_TYPE_ANNOUNCEMENT: `Announcement`,
    CHANNEL_TYPE_THREAD_ANNOUNCEMENT: `Public Thread (in Announcement)`,
    CHANNEL_TYPE_THREAD_PRIVATE: `Private Thread`,
    CHANNEL_TYPE_THREAD_PUBLIC: `Public Thread`,
    CHANNEL_TYPE_STAGE: `Stage`,
    CHANNEL_TYPE_TEXT: `Text`,
    CHANNEL_TYPE_VOICE: `Voice`,
    CHANNEL_TYPE_MEDIA: `Media`,
    CHANNEL_TYPE_UNKNOWN: `Unknown`,
    // While not Types of Channels, these are specially flagged Channels
    CHANNEL_AFK: `AFK`,
    CHANNEL_SYSTEM: `System`,
    CHANNEL_RULES: `Rules`,



    // ******* FOR INVITE AND SUPPORT COMMANDS
    INVITE_COMMAND_RESPONSE: `Want to invite HeccBot to your own Server? Use its invite link below!`,
    INVITE_COMMAND_BUTTON_LABEL: `Invite HeccBot`,
    SUPPORT_COMMAND_RESPONSE: `Need help with using HeccBot? Want to report an issue or suggest a new idea for HeccBot?\nFeel free to join HeccBot's Support Server ("Twilight Domain") via the link below!`,
    SUPPORT_COMMAND_BUTTON_LABEL: `Join Support Server`,



    // ******* FOR HECCBOT ANNOUNCEMENT FEED SUBSCRIPTION COMMAND
    HECCBOT_FEED_NEWS_SUCCESS: `Successfully subscribed {{0}} to my News/Update announcement feed!\n\nIf you want to change which Channel is subscribed, or want to remove this feed, go to **Server Settings > Integerations > Channels Followed** on Desktop/Web versions of Discord.`,
    HECCBOT_FEED_STATUS_SUCCESS: `Successfully subscribed {{0}} to my Status/Outage announcement feed!\n\nIf you want to change which Channel is subscribed, or want to remove this feed, go to **Server Settings > Integerations > Channels Followed** on Desktop/Web versions of Discord.`,
    HECCBOT_FEED_AUDIT_LOG: `Due to {{0}} using /heccbot`,

    HECCBOT_FEED_ERROR_MISSING_MANAGE_WEBHOOKS_PERMISSION: `Sorry, but I need the "**Manage Webhooks**" Permission in {{0}} if you want me to add my announcement feed to that Channel!`,
    HECCBOT_FEED_ERROR_MISSING_VIEW_CHANNEL_PERMISSION: `Sorry, but I need the "**View Channel**" Permission in {{0}} if you want me to add my announcement feed to that Channel!`,
    
    
    
    // ******* FOR ACTION COMMANDS
    ACTION_COMMAND_OTHER_USER_HEADPAT: `**{{0}}** gave **{{1}}** a headpat`,
    ACTION_COMMAND_OTHER_USER_HUG: `**{{0}}** cuddled **{{1}}**`,
    ACTION_COMMAND_OTHER_USER_BONK: `**{{0}}** bonked **{{1}}**`,
    ACTION_COMMAND_OTHER_USER_BOOP: `**{{0}}** booped **{{1}}**`,
    ACTION_COMMAND_OTHER_USER_KISS: `**{{0}}** kissed **{{1}}**`,
    ACTION_COMMAND_OTHER_USER_YEET: `**{{0}}** yeeted **{{1}}**`,

    ACTION_COMMAND_SELF_USER_HEADPAT: `**{{0}}** gave themself a headpat`,
    ACTION_COMMAND_SELF_USER_HUG: `**{{0}}** gave themself a cuddle`,
    ACTION_COMMAND_SELF_USER_BONK: `**{{0}}** bonked themself`,
    ACTION_COMMAND_SELF_USER_BOOP: `**{{0}}** booped themself`,
    ACTION_COMMAND_SELF_USER_KISS: `**{{0}}** attempted to kiss themself`,
    ACTION_COMMAND_SELF_USER_YEET: `**{{0}}** yeeted themselves out of a cannon`,

    ACTION_COMMAND_ROLE_HEADPAT: `**{{0}}** gave everyone with **{{1}}** headpats`,
    ACTION_COMMAND_ROLE_HUG: `**{{0}}** gave everyone with **{{1}}** a group hug`,
    ACTION_COMMAND_ROLE_BONK: `**{{0}}** collectively bonked **{{1}}**`,
    ACTION_COMMAND_ROLE_BOOP: `**{{0}}** booped everyone with **{{1}}**`,
    ACTION_COMMAND_ROLE_KISS: `**{{0}}** kissed everyone with **{{1}}**`,
    ACTION_COMMAND_ROLE_YEET: `**{{0}}** collectively yeeted **{{1}}**`,

    ACTION_COMMAND_EVERYONE_HEADPAT: `**{{0}}** gave \`@everyone\` a headpat`,
    ACTION_COMMAND_EVERYONE_HUG: `**{{0}}** gave \`@everyone\` a group hug`,
    ACTION_COMMAND_EVERYONE_BONK: `**{{0}}** bonked \`@everyone\``,
    ACTION_COMMAND_EVERYONE_BOOP: `**{{0}}** booped \`@everyone\``,
    ACTION_COMMAND_EVERYONE_KISS: `**{{0}}** gave \`@everyone\` a kiss`,
    ACTION_COMMAND_EVERYONE_YEET: `**{{0}}** yeeted \`@everyone\` with a catapult`,

    ACTION_COMMAND_OTHER_BOTS_HEADPAT: `**{{0}}** gave **{{1}}** a virtual headpat`,
    ACTION_COMMAND_OTHER_BOTS_HUG: `**{{0}}** virtually cuddled **{{1}}**`,
    ACTION_COMMAND_OTHER_BOTS_BONK: `**{{0}}** bonked **{{1}}**'s code`,
    ACTION_COMMAND_OTHER_BOTS_BOOP: `**{{0}}** booped **{{1}}**`,
    ACTION_COMMAND_OTHER_BOTS_KISS: `**{{0}}** sent **{{1}}** a virtual kiss`,
    ACTION_COMMAND_OTHER_BOTS_YEET: `**{{0}}** yeeted **{{1}}** out the internet`,

    ACTION_COMMAND_HECCBOT_HEADPAT: `**{{0}}** gave me a headpat <3`,
    ACTION_COMMAND_HECCBOT_HUG: `**{{0}}** cuddled me <3`,
    ACTION_COMMAND_HECCBOT_BONK: `I bonked **{{0}}** in retaliation - nobody attempts to bonk me!`,
    ACTION_COMMAND_HECCBOT_BOOP: `**{{0}}** booped me!`,
    ACTION_COMMAND_HECCBOT_KISS: `**{{0}}** kissed...me? :flushed:`,
    ACTION_COMMAND_HECCBOT_YEET: `I gave **{{0}}** flying lessons for trying to yeet me!`,

    ACTION_COMMAND_MEE6_HEADPAT: `***{{0}}** gave **{{1}}** a headpat...*`,
    ACTION_COMMAND_MEE6_HUG: `***{{0}}** hugged **{{1}}**...*`,
    ACTION_COMMAND_MEE6_BONK: `**{{0}}** bonked **{{1}}**!`,
    ACTION_COMMAND_MEE6_BOOP: `***{{0}}** booped **{{1}}**...*`,
    ACTION_COMMAND_MEE6_KISS: `OK, listen **{{0}}**, **{{1}}** doesn't deserve a kiss.`,
    ACTION_COMMAND_MEE6_YEET: `**{{0}}** absolutely YEETED **{{1}}**`,

    ACTION_RETURN_BUTTON_LABEL_HEADPAT: `Return Headpat`,
    ACTION_RETURN_BUTTON_LABEL_HUG: `Return Hug`,
    ACTION_RETURN_BUTTON_LABEL_BONK: `Return Bonk`,
    ACTION_RETURN_BUTTON_LABEL_BOOP: `Return Boop`,
    ACTION_RETURN_BUTTON_LABEL_KISS: `Return Kiss`,

    ACTION_RETURN_HEADPAT: `**{{0}}** gave **{{1}}** a headpat in return!`,
    ACTION_RETURN_HUG: `**{{0}}** cuddled **{{1}}** too!`,
    ACTION_RETURN_BONK: `**{{0}}** bonked **{{1}}** in retaliation!`,
    ACTION_RETURN_BOOP: `**{{0}}** revenge booped **{{1}}**!`,
    ACTION_RETURN_KISS: `**{{0}}** kissed **{{1}}** in return!`,

    ACTION_ERROR_RETURN_NOT_TARGETED_AT_SELF: `You cannot return an Action that wasn't aimed at you!`,
    ACTION_ERROR_CANNOT_RETURN_TO_SENDER: `You cannot return the Action you sent!`,
    ACTION_ERROR_RETURN_CANNOT_FETCH_ORIGINAL_SENDER: `Sorry, there was an error trying to fetch the original sender of that Action.`,
    ACTION_ERROR_RETURN_CANNOT_FETCH_TARGET: `Sorry, but there was an error trying to fetch the original target of that Action.`,



    // ******* DISCORD STATUS FEED
    DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS_AUDIT_LOG: `{{0}} subscribed to the Discord Outage Feed using HeccBot`,
    DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS: `Successfully subscribed this Server to the Discord Outage Feed!\nAny Discord Outages will be notified about in the {{0}} Channel.`,
    DSTATUS_COMMAND_UNSUBSCRIPTION_SUCCESS_AUDIT_LOG: `{{0}} unsubscribed from the Discord Outage Feed using HeccBot`,
    DSTATUS_COMMAND_UNSUBSCRIPTION_SUCCESS: `Successfully unsubscribed from the Discord Outage Feed.\nThis Server will no longer receive notifications from HeccBot about Discord's Outages.{{0}}`,

    DSTATUS_COMMAND_ERROR_THREAD_INVALID: `Sorry, but a Thread cannot be selected if its within an Announcement or Media Channel.\nIf you want to subscribe a Thread to the Discord Outage Feed, please pick a Thread that is within a Forum or Text Channel.\nOtherwise, you can select a standard Text Channel itself instead.`,
    DSTATUS_COMMAND_ERROR_MISSING_PERMISSIONS: `Sorry, but my Discord Outage Feed cannot be subscribed to Channels (or Threads) in which I do not have *both* the **View Channel** and **Manage Webhooks** Permissions for!\nPlease try again, once I have been granted those Permissions in that Channel/Thread.\n*(Note: if you tried to subscribe in a Thread or Forum Post, you'll have to grant the Permissions in the parent Channel, since Threads/Posts inherit their Permissions from their parent Channel)*`,
    DSTATUS_COMMAND_ERROR_ALREADY_SUBSCRIBED: `This Server is already subscribed to the Discord Outage Feed!\nIf you want to disable the Discord Outage Feed in this Server, please use the {{0}} Command.`,
    DSTATUS_COMMAND_ERROR_SUBSCRIPTION_GENERIC: `Sorry, but something went wrong while trying to subscribe to the Discord Outage Feed...`,
    DSTATUS_COMMAND_ERROR_UNSUBSCRIPTION_GENERIC: `Sorry, something went wrong while trying to unsubscribe from the Discord Outage Feed...`,
    DSTATUS_COMMAND_ERROR_PRIVATE_THREAD: `Sorry, but you cannot subscribe a Private Thread to the Discord Outage Feed.`,
    DSTATUS_COMMAND_ERROR_NOT_CURRENTLY_SUBSCRIBED: `There is no found Discord Outage Feed for this Server - as such, you cannot unsubscribe from a non-existent Feed subscription!`,
    DSTATUS_COMMAND_ERROR_WEBHOOK_DELETION_FAILED: `An error occurred while I was trying to delete the Webhook for this Feed.\nYou will have to delete the Webhook manually in Server Settings > Integrations.`,



    // ******* INFO COMMAND - UX READABLE API VALUES
    INFO_READABLE_GUILD_VERIFICATION_NONE: `Unrestricted`,
    INFO_READABLE_GUILD_VERIFICATION_LOW: `Low`,
    INFO_READABLE_GUILD_VERIFICATION_MEDIUM: `Medium`,
    INFO_READABLE_GUILD_VERIFICATION_HIGH: `High`,
    INFO_READABLE_GUILD_VERIFICATION_VERY_HIGH: `Highest`,

    INFO_READABLE_GUILD_EXPLICIT_FILTER_DISABLED: `Disabled`,
    INFO_READABLE_GUILD_EXPLICIT_FILTER_ROLELESS: `Scan roleless Members' attachments`,
    INFO_READABLE_GUILD_EXPLICIT_FILTER_EVERYONE: `Scan attachments from everyone`,

    INFO_READABLE_DEFAULT_NOTIFICATIONS_ALL_MESSAGES: `All Messages`,
    INFO_READABLE_DEFAULT_NOTIFICATIONS_ONLY_MENTIONS: `Only @mentions`,

    INFO_READABLE_GUILD_MFA_NONE: `None`,
    INFO_READABLE_GUILD_MFA_ENABLED: `Enabled`,

    INFO_READABLE_GUILD_NSFW_LEVEL_DEFAULT: `Default`,
    INFO_READABLE_GUILD_NSFW_LEVEL_SAFE: `Safe`,
    INFO_READABLE_GUILD_NSFW_LEVEL_RESTRICTED: `Age-restricted`,
    INFO_READABLE_GUILD_NSFW_LEVEL_EXPLICIT: `Explicit`,

    INFO_READABLE_GUILD_BOOST_NONE: `None`,
    INFO_READABLE_GUILD_BOOST_LEVEL_ONE: `Tier 1`,
    INFO_READABLE_GUILD_BOOST_LEVEL_TWO: `Tier 2`,
    INFO_READABLE_GUILD_BOOST_LEVEL_THREE: `Tier 3`,

    INFO_READABLE_USER_FLAG_ACTIVE_DEVELOPER: `Active Bot Developer`,
    INFO_READABLE_USER_FLAG_HTTP_INTERACTIONS: `HTTP Interactions Bot`,
    INFO_READABLE_USER_FLAG_BUG_HUNTER_LEVEL_ONE: `Bug Hunter Tier 1`,
    INFO_READABLE_USER_FLAG_BUG_HUNTER_LEVEL_TWO: `Bug Hunter Tier 2`,
    INFO_READABLE_USER_FLAG_MODERATOR_ALUMNI: `Moderator Programs Alumni`,
    INFO_READABLE_USER_FLAG_COLLABORATOR: `Collaborator`,
    INFO_READABLE_USER_FLAG_HYPESQUAD_HOUSE_BRAVERY: `Bravery HypeSquad House`,
    INFO_READABLE_USER_FLAG_HYPESQUAD_HOUSE_BRILLIANCE: `Brilliance HypeSquad House`,
    INFO_READABLE_USER_FLAG_HYPESQUAD_HOUSE_BALANCE: `Balance HypeSquad House`,
    INFO_READABLE_USER_FLAG_HYPESQUAD_EVENTS: `HypeSquad Events`,
    INFO_READABLE_USER_FLAG_PARTNER: `Partnered Server Owner`,
    INFO_READABLE_USER_FLAG_EARLY_SUPPORTER: `Early Nitro Supporter`,
    INFO_READABLE_USER_FLAG_QUARANTINED: `Quarantined`,
    INFO_READABLE_USER_FLAG_RESTRICTED_COLLABORATOR: `Restricted Collaborator`,
    INFO_READABLE_USER_FLAG_LIKELY_SPAMMER: `Likely Spammer`,
    INFO_READABLE_USER_FLAG_STAFF: `Discord Employee`,
    INFO_READABLE_USER_FLAG_TEAM_USER: `Team (Pseudo User)`,
    INFO_READABLE_USER_FLAG_VERIFIED_BOT: `Verified Bot`,
    INFO_READABLE_USER_FLAG_EARLY_VERIFIED_BOT_DEVELOPER: `Early Verified Bot Developer`,

    INFO_READABLE_MEMBER_FLAG_REJOIN: `Did Rejoin`,
    INFO_READABLE_MEMBER_FLAG_ONBOARDING_STARTED: `Started Onboarding`,
    INFO_READABLE_MEMBER_FLAG_ONBOARDING_COMPLETED: `Completed Onboarding`,
    INFO_READABLE_MEMBER_FLAG_AUTOMOD_QUARANTIED_BIO: `Quarantied by AutoMod (Profile Bio Filter)`,
    INFO_READABLE_MEMBER_FLAG_AUTOMOD_QUARANTIED_NAME: `Quarantied by AutoMod (User/Display/Nick Name Filter)`,
    INFO_READABLE_MEMBER_FLAG_GUIDE_TODO_STARTED: `Started Guide ToDo Tasks`,
    INFO_READABLE_MEMBER_FLAG_GUIDE_TODO_COMPLETED: `Completed Guide ToDo Tasks`,
    INFO_READABLE_MEMBER_FLAG_BYPASS_SERVER_VERIFICATION: `Bypasses Server Verification Requirements`,

    INFO_READABLE_APP_FLAG_AUTOMOD_BADGE: `Uses AutoMod API`,
    INFO_READABLE_APP_FLAG_APP_COMMANDS_BADGE: `Supports Application Commands`,
    INFO_READABLE_APP_FLAG_EMBEDDED: `Embedded (Activity)`,
    INFO_READABLE_APP_FLAG_EMBEDDED_FIRST_PARTY: `Embedded First Party (Activity)`,
    INFO_READABLE_APP_FLAG_EMBEDDED_IAP: `Has Embedded In-App Purchases (Activity)`,
    INFO_READABLE_APP_FLAG_EMBEDDED_RELEASED: `Embedded Released (Activity)`,
    INFO_READABLE_APP_FLAG_INTENT_GUILD_MEMBERS: `Has Server Members Intent (Verified)`,
    INFO_READABLE_APP_FLAG_INTENT_GUILD_MEMBERS_LIMITED: `Has Server Members Intent`,
    INFO_READABLE_APP_FLAG_INTENT_MESSAGE_CONTENT: `Has Message Content Intent (Verified)`,
    INFO_READABLE_APP_FLAG_INTENT_MESSAGE_CONTENT_LIMITED: `Has Message Content Intent`,
    INFO_READABLE_APP_FLAG_INTENT_PRESENCE: `Has Presence Intent (Verified)`,
    INFO_READABLE_APP_FLAG_INTENT_PRESENCE_LIMITED: `Has Presence Intent`,
    INFO_READABLE_APP_FLAG_GROUP_DM_CREATE: `Can create Group DMs`,
    INFO_READABLE_APP_FLAG_MANAGED_EMOJI: `Has managed Emoji`,
    INFO_READABLE_APP_FLAG_RPC_CONNECTED: `RPC has connected`,
    INFO_READABLE_APP_FLAG_VERIFICATION_BLOCKED_BY_GROWTH: `Verification Blocked (by unusual growth)`,



    // ******* INFO COMMAND - CHANNEL STUFF
    INFO_CHANNEL_TYPE: `Channel Type:`,
    INFO_CHANNEL_LINK: `Channel Link:`,
    INFO_CHANNEL_PARENT_CHANNEL: `Parent Channel:`,
    INFO_CHANNEL_PARENT_CATEGORY: `Parent Category:`,
    INFO_CHANNEL_CAN_EVERYONE_VIEW: `Can @everyone View Channel:`,
    
    INFO_CHANNEL_NSFW: `Age-restricted:`,
    INFO_CHANNEL_DEFAULT_THREAD_VISIBILITY_DURATION: `Default Thread Visibility Duration:`,
    INFO_CHANNEL_MESSAGE_SLOWMODE: `Message Slowmode:`,
    INFO_CHANNEL_AUDIO_BITRATE: `Audio Bitrate:`,
    INFO_CHANNEL_CONNECTED_MEMBERS: `Cached Connected Members:`,
    INFO_CHANNEL_VIDEO_QUALITY_MODE: `Video Quality Mode:`,
    INFO_CHANNEL_VIDEO_QUALITY_AUTOMATIC: `Automatic`,
    INFO_CHANNEL_VIDEO_QUALITY_720: `720p`,

    INFO_CHANNEL_CATEGORY_CACHED_CHILDREN: `Cached Child Channels:`,
    
    INFO_CHANNEL_FORUM_DEFAULT_REACTION: `Has a Default Reaction:`,
    INFO_CHANNEL_FORUM_DEFAULT_SORT_ORDER: `Default Sort Order:`,
    INFO_CHANNEL_FORUM_SORT_CREATION: `Creation Date`,
    INFO_CHANNEL_FORUM_SORT_ACTIVITY: `Latest Activity`,
    INFO_CHANNEL_FORUM_DEFAULT_VISIBILITY_DURATION: `Default Post Visibility Duration:`,
    INFO_CHANNEL_FORUM_VISIBILITY_ONE_HOUR: `One Hour`,
    INFO_CHANNEL_FORUM_VISIBILITY_ONE_DAY: `One Day`,
    INFO_CHANNEL_FORUM_VISIBILITY_THREE_DAYS: `Three Days`,
    INFO_CHANNEL_FORUM_VISIBILITY_ONE_WEEK: `One Week`,
    INFO_CHANNEL_FORUM_DEFAULT_MESSAGE_SLOWMODE: `Default Message Slowmode:`,
    INFO_CHANNEL_FORUM_POST_CREATION_SLOWMODE: `Post Creation Slowmode:`,
    INFO_CHANNEL_FORUM_REQUIRES_TAGS: `Posts Requires Tags:`,
    INFO_CHANNEL_FORUM_TAG_AMOUNT: `Number of Tags:`,

    INFO_CHANNEL_STAGE_LIVE_STARTED: `Live Stage Started:`,
    INFO_CHANNEL_STAGE_EVENT_CONNECTION: `Connected to Scheduled Event:`,
    INFO_CHANNEL_STAGE_TOPIC: `Stage Topic:`,

    INFO_CHANNEL_THREAD_CREATOR: `Thread/Post Creator:`,
    INFO_CHANNEL_THREAD_APPLIED_TAGS: `Number of Applied Tags:`,
    INFO_CHANNEL_THREAD_CLOSED: `Closed:`,
    INFO_CHANNEL_THREAD_LOCKED: `Locked:`,
    INFO_CHANNEL_THREAD_VISIBILITY_DURATION: `Visibility Duration:`,
    INFO_CHANNEL_THREAD_INVITIBLE: `Can Anyone Invite to Private Thread:`,

    INFO_CHANNEL_VOICE_FULL: `Is Full:`,
    INFO_CHANNEL_VOICE_LIMIT: `Member Limit:`,

    INFO_CHANNEL_FLAG_ACTIVE_CHANNELS_REMOVED: `Active Channels Removed`,
    INFO_CHANNEL_FLAG_GUILD_FEED_REMOVED: `Server Feed Removed`,
    INFO_CHANNEL_FLAG_DOWNLOAD_HIDDEN: `Media Download Options Hidden`,
    INFO_CHANNEL_FLAG_RESOURCE: `Is Guide Resource`,
    INFO_CHANNEL_FLAG_SCHEDULED_DELETION: `Is Scheduled for Deletion`,
    INFO_CHANNEL_FLAG_SPAM: `Is Likely Spam`,
    INFO_CHANNEL_FLAG_PINNED: `Is Pinned Post`,
    INFO_CHANNEL_FLAG_REQUIRE_TAG: `Requires Forum/Media Tags`,

    INFO_CHANNEL_HEADER_GENERAL: `>> General Information`,
    INFO_CHANNEL_HEADER_CATEGORY: `>> Category Information`,
    INFO_CHANNEL_HEADER_FORUM: `>> Forum Information`,
    INFO_CHANNEL_HEADER_FORUM_TAGS: `>> Available Tags`,
    INFO_CHANNEL_HEADER_ANNOUNCEMENT: `>> Announcement Information`,
    INFO_CHANNEL_HEADER_STAGE: `>> Stage Information`,
    INFO_CHANNEL_HEADER_LIVE_STAGE: `>> Live Stage Information`,
    INFO_CHANNEL_HEADER_TEXT: `>> Text Information`,
    INFO_CHANNEL_HEADER_THREAD: `>> Thread Information`,
    INFO_CHANNEL_HEADER_POST_FORUM: `>> Forum Post Information`,
    INFO_CHANNEL_HEADER_POST_MEDIA: `>> Media Post Information`,
    INFO_CHANNEL_HEADER_VOICE: `>> Voice Information`,
    INFO_CHANNEL_HEADER_MEDIA: `>> Media Information`,
    INFO_CHANNEL_HEADER_FLAGS: `>> Channel's Flags`,



    // ******* INFO COMMAND - SERVER STUFF
    INFO_SERVER_OWNER: `Server Owner:`,
    INFO_SERVER_PARTNERED: `Is Partnered`,
    INFO_SERVER_VERIFIED: `Is Verified`,
    INFO_SERVER_BOOST_TIER: `Boost Tier:`,
    INFO_SERVER_BOOST_COUNT: `Boost Count:`,
    INFO_SERVER_EMOJIS: `Emojis:`,
    INFO_SERVER_STICKERS: `Stickers:`,
    //INFO_SERVER_SOUNDS: `Soundboard Sounds:`, // Can't grab sounds yet
    INFO_SERVER_ROLES: `Roles:`,
    INFO_SERVER_SCHEDULED_EVENTS: `Scheduled Events:`,
    INFO_SERVER_VANITY: `Invite Vanity:`,
    INFO_SERVER_APPROX_TOTAL_MEMBERS: `Approximate Total Members:`,
    INFO_SERVER_APPROX_ONLINE_MEMBERS: `Approximate Online Members:`,

    INFO_SERVER_VERIFICATION_LEVEL: `Verification Level:`,
    INFO_SERVER_EXPLICIT_FILTER: `Explicit Attachments Filter:`,
    INFO_SERVER_MFA_MODERATION: `MFA-enabled Moderation:`,
    INFO_SERVER_NSFW_LEVEL: `Age-restricted Level:`,
    INFO_SERVER_DEFAULT_NOTIFICATIONS: `Default Notifications:`,

    INFO_SERVER_THREADS_POSTS_TOTAL: `Number of Forum Posts:`,
    INFO_SERVER_THREADS_PUBLIC_TOTAL: `Number of Public Threads:`,
    INFO_SERVER_THREADS_NEWS_TOTAL: `Number of Announcement Threads:`,
    INFO_SERVER_THREADS_FULL_TOTAL: `Total Number of Threads/Posts:`,
    INFO_SERVER_THREADS_DISCLAIMER: `Thread & Post totals only counts the number of active/open Threads & Posts. Closed Threads/Posts, and Private Threads, are not included in these totals.`,

    INFO_SERVER_ONBOARDING_IS_ENABLED: `Onboarding is Enabled:`,
    INFO_SERVER_ONBOARDING_MODE: `Onboarding Mode:`,
    INFO_SERVER_ONBOARDING_MODE_DEFAULT: `Default`,
    INFO_SERVER_ONBOARDING_MODE_ADVANCED: `Advanced`,
    INFO_SERVER_ONBOARDING_TOTAL_DEFAULT_CHANNELS: `Number of Default Channels:`,
    INFO_SERVER_ONBOARDING_TOTAL_PROMPTS: `Total Number of Questions:`,
    INFO_SERVER_ONBOARDING_TOTAL_PREJOIN_PROMPTS: `Number of Pre-Join Questions:`,
    INFO_SERVER_ONBOARDING_TOTAL_POSTJOIN_PROMPTS: `Number of Post-Join Questions:`,


    INFO_SERVER_HEADER_GENERAL: `>> General Information`,
    INFO_SERVER_HEADER_CHANNELS: `>> Channels`,
    INFO_SERVER_HEADER_FEATURE_FLAGS: `>> Server's Feature Flags`,
    INFO_SERVER_HEADER_ONBOARDING: `>> Server Onboarding`,
    INFO_SERVER_HEADER_THREADS: `>> Active Threads Information`,
    INFO_SERVER_HEADER_MISCELLANEOUS: `>> Miscellaneous Information`,

    INFO_SERVER_BUTTON_MISC: `Extra Info`,

    INFO_SERVER_BUTTON_ICON: `Icon`,
    INFO_SERVER_BUTTON_BANNER: `Banner`,
    INFO_SERVER_BUTTON_INVITE_SPLASH: `Invite Splash`,
    INFO_SERVER_BUTTON_DISCOVERY_SPLASH: `Discovery Splash`,



    // ******* INFO COMMAND - ROLE STUFF
    INFO_ROLE_CREATED: `Role Created:`,
    INFO_ROLE_COLOR: `Colour:`,
    INFO_ROLE_HOISTED: `Hoisted:`,
    INFO_ROLE_MANAGED: `Managed by Integration:`,
    INFO_ROLE_MEMBERS: `Cached Members with Role:`,
    INFO_ROLE_ICON_EMOJI: `Role's Emoji Icon:`,
    INFO_ROLE_ICON_CUSTOM: `Has Custom Icon:`,

    INFO_ROLE_BOT: `Role for Bot:`,
    INFO_ROLE_INTEGRATION: `Is Integration-managed Role:`,
    INFO_ROLE_SERVER_BOOST: `Is Server Booster Role:`,
    INFO_ROLE_MONETIZATION: `Is a Server Subscription Role:`,
    INFO_ROLE_PURCHASABLE: `Is Purchasable:`,
    INFO_ROLE_LINKED: `Is a Linked Role:`,
    INFO_ROLE_FLAG_PROMPT: `In Onboarding Prompt`,

    INFO_ROLE_HEADER_GENERAL: `>> General Information`,
    INFO_ROLE_HEADER_TAGS: `>> Role's Tags`,
    INFO_ROLE_HEADER_FLAGS: `>> Role's Flags`,



    // ******* INFO COMMAND - USER STUFF
    INFO_USER_SERVER_OWNER: `Is Server Owner:`,
    INFO_USER_DISPLAY_NAME: `Display Name:`,
    INFO_USER_JOINED_SERVER: `Joined Server:`,
    INFO_USER_HIGHEST_ROLE: `Highest Role:`,
    INFO_USER_ROLE_COUNT: `Role Count:`,
    INFO_USER_BOOSTING_SERVER: `Boosting Server Since:`,
    INFO_USER_PENDING_VERIFICATION: `Yet to pass Rules Screening`,
    INFO_USER_TIMED_OUT: `**Currently Timed-out** (expires {{0}})`, // Adding Bolding Formatting here instead in code itself because don't want the bracketed bit being bolded

    INFO_USER_MENTION: `Mention:`,
    INFO_USER_ACCOUNT_CREATED: `Account Created:`,
    INFO_USER_BOT: `Is a Bot:`,
    INFO_USER_HECCBOT_CREATOR: `Is Creator of HeccBot:`,

    INFO_USER_BOT_INVITIBLE: `Is Publicly Invitable:`,
    INFO_USER_BOT_OAUTH: `Requires OAuth Grant:`,

    INFO_USER_HEADER_MEMBER: `>> Member Information`,
    INFO_USER_HEADER_USER: `>> User Information`,
    INFO_USER_HEADER_BOT: `>> Bot Information`,
    INFO_USER_HEADER_MEMBER_FLAGS: `>> Server Member's Flags`,
    INFO_USER_HEADER_USER_FLAGS: `>> User's Flags`,
    INFO_USER_HEADER_BOT_FLAGS: `>> Bot's Flags`,
    INFO_USER_HEADER_ROLES: `{{0}} Roles`,

    INFO_USER_BUTTON_ROLES: `View Roles`,
    INFO_USER_BUTTON_MEMBER_AVATAR: `Member Avatar`,
    INFO_USER_BUTTON_GLOBAL_AVATAR: `Global Avatar`,
    INFO_USER_BUTTON_GLOBAL_BANNER: `Global Banner`,
    INFO_USER_BUTTON_AVATAR_DECORATION: `Avatar Decoration`,



    // ******* INFO COMMAND - INVITE STUFF
    INFO_INVITE_CREATOR: `Inviter:`,
    INFO_INVITE_CREATOR_BOT: `Inviter is Bot:`,
    INFO_INVITE_CREATED: `Invite Created:`,
    INFO_INVITE_EXPIRES: `Invite Expires:`,

    INFO_INVITE_CHANNEL_TYPE: `Channel Type:`,
    INFO_INVITE_CHANNEL_NAME: `Channel Name:`,
    INFO_INVITE_TARGET_TYPE: `Target Type:`,
    INFO_INVITE_TARGET_STREAM: `Screenshare`,
    INFO_INVITE_TARGET_ACTIVITY: `Activity`,
    INFO_INVITE_TARGET_ACTIVITY_NAME: `Activity's Name:`,

    INFO_INVITE_SERVER_NAME: `Server Name:`,
    INFO_INVITE_SERVER_PARTNERED: `Is Partnered:`,
    INFO_INVITE_SERVER_VERIFIED: `Is Verified:`,
    INFO_INVITE_SERVER_BOOST_COUNT: `Boost Count:`,
    INFO_INVITE_SERVER_APPROX_TOTAL_MEMBERS: `Approximate Total Members:`,
    INFO_INVITE_SERVER_APPROX_ONLINE_MEMBERS: `Approximate Online Members:`,

    INFO_INVITE_HEADER_DATA: `Data for Invite Code:`,
    INFO_INVITE_HEADER_GENERAL: `>> General Information`,
    INFO_INVITE_HEADER_TARGET: `>> Target Information`,
    INFO_INVITE_HEADER_SERVER: `>> Server Information`,
    INFO_INVITE_HEADER_SERVER_FLAGS: `>> Server's Feature Flags`,

    INFO_INVITE_BUTTON_JOIN_SERVER: `Join Server`,



    // ******* INFO COMMAND - ERRORS
    INFO_COMMAND_ERROR_DIRECTORY_UNSUPPORTED: `Sorry, the [Directory Channel](<https://support.discord.com/hc/en-us/articles/4406046651927>) type isn't supported by this Bot.`,
    INFO_COMMAND_ERROR_DMS_UNSUPPORTED: `Sorry, I cannot fetch information about DMs (Direct Messages) or Group DMs.`,
    INFO_COMMAND_ERROR_CHANNEL_FETCH_FAILED: `Sorry, there was an error trying to fetch information about that Channel.\nI may not have the "**View Channels**" Permission required to see that specified Channel.`,
    
    INFO_COMMAND_ERROR_ROLE_EVERYONE_UNSUPPORTED: `Sorry, I cannot bring up Role Information about @everyone`,
    INFO_COMMAND_ERROR_ROLE_NOT_FOUND: `Sorry, but I couldn't find any Roles in this Server that matched your input.`,
    
    INFO_COMMAND_ERROR_USER_NOT_IN_GUILD: `Sorry, that User isn't a Member of this Server!\nHere's information about yourself instead.`,
    INFO_COMMAND_ERROR_UNABLE_TO_FETCH_USER_SELF: `Sorry, I was unable to fetch public Discord information about yourself. Please try again in a few minutes.`,
    INFO_COMMAND_ERROR_UNABLE_TO_FETCH_USER_OTHER: `Sorry, either that User is not a Member of this Server, or I was unable to fetch their public Discord information due to an error.`,
    
    INFO_COMMAND_ERROR_INVITE_INVALID: `Sorry, either that wasn't a valid Server Invite, or that Invite doesn't exist on Discord.`,
    INFO_COMMAND_ERROR_INVITE_TYPE_GROUP_DM_NOT_SUPPORTED: `Sorry, I don't support fetching information for Group DM Invites.`,
    INFO_COMMAND_ERROR_INVITE_TYPE_FRIEND_NOT_SUPPORTED: `Sorry, I don't support fetching information for Friend Invites.`,
    
    INFO_COMMAND_ERROR_CHANNEL_DIRECTORY_UNSUPPORTED: `Sorry, but the [Directory Channel](<https://support.discord.com/hc/en-us/articles/4406046651927>) type isn't supported by this Bot!`,
    INFO_COMMAND_ERROR_CHANNEL_DM_UNSUPPORTED: `Sorry, but this Bot cannot be used to fetch information of Direct Messages (DMs) or Group Direct Messages (GDMs)!`,



    // ******* JAIL COMMAND
    JAIL_COMMAND_SUCCESS: `**{{0}}** was sent to jail by **{{1}}**!`,

    JAIL_COMMAND_ERROR_CANNOT_JAIL_SELF: `You cannot send yourself to jail!`,
    JAIL_COMMAND_ERROR_USER_NOT_IN_GUILD: `Sorry, but you cannot send a User to jail when they are not in this Server.`,
    JAIL_COMMAND_ERROR_MISSING_ATTACH_FILES_PERMISSION: `Sorry, I seem to be missing the **Attach Files** Permission in this Channel! (I need it for this Command to work)`,



    // ******* LOCKEMOJI COMMAND
    LOCKEMOJI_COMMAND_AUDIT_LOG_EMOJI_UPLOADED: `Role-locked Custom Emoji uploaded by {{0}} using HeccBot`,
    LOCKEMOJI_COMMAND_UPLOAD_SUCCESS: `Successfully uploaded your new Role-locked Custom Emoji to this Server.\nYou can rename and/or delete your Emoji, much like others, in Server Settings > Emojis, providing you have the **Manage Expressions** Permission.`,

    //LOCKEMOJI_COMMAND_ERROR_MISSING_CREATE_EXPRESSIONS_PERMISSION: `Sorry, but I cannot upload a Custom Emoji to this Server without having the **Create Expressions** Permission.\nPlease try again, once I have been granted that Permission!`, // Unused while Discord's API still has Bots use Manage Expressions instead of Create Expressions
    LOCKEMOJI_COMMAND_ERROR_MISSING_MANAGE_EXPRESSIONS_PERMISSION: `Sorry, but I cannot upload a Custom Emoji to this Server without having the **Manage Expressions** Permission.\nPlease try again, once I have been granted that Permission!`,
    LOCKEMOJI_COMMAND_ERROR_INVALID_FILE_TYPE: `Sorry, but that Emoji file wasn't a **PNG** or **GIF** file type.\nPlease try again, ensuring you use either a \`.png\` or \`.gif\` file for your Custom Emoji.`,
    LOCKEMOJI_COMMAND_ERROR_FILE_TOO_LARGE: `Sorry, but that Emoji file is too large to be uploaded as a Custom Emoji.\nDiscord requires Custom Emojis to be smaller than 256kb in file size. Please try again, once you have a smaller file size for your Custom Emoji.`,



    // ******* SOMEONE COMMAND
    SOMEONE_COMMAND_RESPONSE: `\`@someone\` *( {{0}} )*`,

    SOMEONE_COMMAND_ERROR_PRIVATE_THREADS_UNSUPPORTED: `Sorry, this Command cannot be used inside of Private Threads.`,
    SOMEONE_COMMAND_ERROR_CHANNEL_MISSING_ACCESS: `Sorry, I do not seem to be able to randomly pick a Member of this Channel.`,
    SOMEONE_COMMAND_ERROR_CHANNEL_CHANNEL_NOT_FOUND: `Sorry, I do not seem to be able to randomly pick a Member of this Channel.\nEither I don't have "**View Channel**" Permission for this Channel, or I am not a member of this Thread or Forum Post.`,



    // ******* TEMPERATURE COMMANDS
    TEMPERATURE_COMMAND_CONVERTED: `{{0}}{{1}} is about {{2}}{{3}} or {{4}}{{5}}`,
    TEMPERATURE_COMMAND_SUCCESS_SINGLAR: `Here is your converted temperature:`,
    TEMPERATURE_COMMAND_SUCCESS_MULTIPLE: `Here are your converted temperatures:`,

    TEMPERATURE_COMMAND_ERROR_INVALID_TEMPERATURE: `:warning: {{0}}{{1}} is a temperature that cannot exist! (It is below Absolute Zero!)`,
    TEMPERATURE_COMMAND_ERROR_TEMPERATURE_NOT_FOUND: `Sorry, but I couldn't find any temperatures to convert from that Message.`,
    TEMPERATURE_COMMAND_ERROR_EXCEEDED_TEMPERATURE_LIMIT: `Sorry, but there are too many temperatures found in that Message!\nI have a maximum limit of 10 temperatures per Message that I can convert.`,



    // ******* ROLE MENUS
    ROLE_MENU_PREVIEW_EMPTY: `*Role Menu is currently empty. Please use the Select Menu below to configure this Role Menu.*`,
    ROLE_MENU_SELECT_AN_ACTION: `Please select an action`,

    ROLE_MENU_SET_MENU_TYPE: `Set Menu Type`,
    ROLE_MENU_SET_MENU_TYPE_DESCRIPTION: `Change how this Menu will behave once saved`,
    ROLE_MENU_CONFIGURE_EMBED: `Configure Embed`,
    ROLE_MENU_CONFIGURE_EMBED_DESCRIPTION: `Set the Title, Description, and Colour of the Embed`,

    ROLE_MENU_ADD_ROLE: `Add Role`,
    ROLE_MENU_ADD_ROLE_DESCRIPTION: `Add a Role to this Menu`,
    ROLE_MENU_REMOVE_ROLE: `Remove Role`,
    ROLE_MENU_REMOVE_ROLE_DESCRIPTION: `Remove a Role from this Menu`,
    ROLE_MENU_ADD_REQUIREMENT: `Add a Requirement`,
    ROLE_MENU_ADD_REQUIREMENT_DESCRIPTION: `Add a Required Role to use this Menu`,
    ROLE_MENU_REMOVE_REQUIREMENT: `Remove a Requirement`,
    ROLE_MENU_REMOVE_REQUIREMENT_DESCRIPTION: `Remove a set Required Role`,

    ROLE_MENU_SAVE_AND_POST: `Save & Post`,
    ROLE_MENU_SAVE_AND_POST_DESCRIPTION: `Saves this Menu, and posts it in chat for Members to use`,
    ROLE_MENU_SAVE_AND_UPDATE: `Save & Update`,
    ROLE_MENU_SAVE_AND_UPDATE_DESCRIPTION: `Saves this Menu, and updates it in chat for Members to use`,

    ROLE_MENU_CANCEL_CREATION: `Cancel Creation`,
    ROLE_MENU_CANCEL_CREATION_DESCRIPTION: `Cancels creation of this Role Menu`,
    ROLE_MENU_CANCEL_CONFIGURATION: `Cancel Configuration`,
    ROLE_MENU_CANCEL_CONFIGURATION_DESCRIPTION: `Cancels configuration of this Role Menu`,
    
    ROLE_MENU_ROLE_ADD_SEARCH: `Search for a Role to add`,
    ROLE_MENU_ROLE_REMOVE_SEARCH: `Search for a Role to remove`,
    ROLE_MENU_REQUIREMENT_ADD_SEARCH: `Search for a required Role to add`,
    ROLE_MENU_REQUIREMENT_REMOVE_SEARCH: `Search for a required Role to remove`,

    ROLE_MENU_SELECT_MENU_TYPE: `Select a Menu Type`,
    ROLE_MENU_MENU_TYPE_TOGGLE: `Toggle`,
    ROLE_MENU_MENU_TYPE_SWAPPABLE: `Swappable`,
    ROLE_MENU_MENU_TYPE_SINGLE: `Single-use`,
    ROLE_MENU_TYPE_FOOTER: `Menu Type: {{0}}`,

    ROLE_MENU_CONFIGURE_MENU_EMBED: `Configure Menu Embed`,
    ROLE_MENU_EMBED_TITLE: `Embed Title`,
    ROLE_MENU_EMBED_DESCRIPTION: `Embed Description`,
    ROLE_MENU_EMBED_COLOR: `Embed Colour (in hex format)`,

    ROLE_MENU_SELECT_BUTTON_COLOR: `Select a Button colour`,
    ROLE_MENU_BUTTON_BLURPLE: `Blurple`,
    ROLE_MENU_BUTTON_GREEN: `Green`,
    ROLE_MENU_BUTTON_GREY: `Grey`,
    ROLE_MENU_BUTTON_RED: `Red`,

    ROLE_MENU_SET_BUTTON_LABEL: `Set Button Label`,
    ROLE_MENU_EDIT_BUTTON_LABEL: `Edit Button Label`,
    ROLE_MENU_BUTTON_LABEL: `Button Label (Required if no Emoji)`,
    ROLE_MENU_BUTTON_EMOJI: `Button Emoji (Required if no Label)`,

    ROLE_MENU_CREATE_INTRUCTIONS: `__**Role Menu Creation**__
Use the Select Menu below to configure this Menu's Type, Embed and Role Buttons. Press an existing Role Button to edit its label and/or emoji.
If including in Buttons, please make sure to have the relevant Emoji IDs ready (such as in a notepad program); as you won't be able to copy from a Discord Message while an Input Form is open.
Additionally, both Custom Discord Emojis, and standard Unicode Emojis, are supported.

**An auto-updating preview of what your new Role Menu will look like is shown below.**`,

    ROLE_MENU_CONFIGURATION_INTRUCTIONS: `__**Role Menu Configuration**__
Use the Select Menu below to configure this Menu's Type, Embed and Role Buttons. Press an existing Role Button to edit its label and/or emoji.
If including in Buttons, please make sure to have the relevant Emoji IDs ready (such as in a notepad program); as you won't be able to copy from a Discord Message while an Input Form is open.
Additionally, both Custom Discord Emojis, and standard Unicode Emojis, are supported.

**An auto-updating preview of what your updated Role Menu will look like is shown below.**`,

    ROLE_MENU_SET_MENU_TYPE_INSTRUCTIONS: `Please use the Select Menu below to pick which type of Role Menu you want.

• **Toggle** - Your standard Role Menu Type. Behaves like a classic Reaction Role Menu, but with Buttons instead.
• **Swappable** - Users can only have 1 Role per **Swappable** Menu. Attempting to select another Role on the same **Swappable** Menu would swap the two Roles instead. Useful for Colour Role Menus!
• **Single-use** - Users can only use a **Single-use** Menu once, and are unable to revoke or swap out the selected Role from themselves. Useful for Team Roles in Events.`,

    ROLE_MENU_ROLE_ADD_INSTRUCTIONS: `Please use the Role Select Menu below to pick which Role from this Server you would like to add to your Role Menu.`,
    ROLE_MENU_ROLE_REMOVE_INSTRUCTIONS: `Please use the Role Select Menu below to pick which Role you would like to remove from your Role Menu.`,
    ROLE_MENU_BUTTON_SET_INSTRUCTIONS: `**Selected Role: {{0}}**\nNext, please use the Select Menu below to pick which [colour of Button]({{1}}) you want to use for this Role.`,
    ROLE_MENU_REQUIREMENT_ADD_INSTRUCTIONS: `Please use the Role Select Menu below to pick which Role from this Server you would like to add as a requirement to use your Role Menu.`,
    ROLE_MENU_REQUIREMENT_REMOVE_INSTRUCTIONS: `Please use the Role Select Menu below to pick which Role Requirement you would like to remove from your Role Menu.`,

    ROLE_MENU_RESTRICTION_SINGLE: `Only those with the {{0}} Role can use this Role Menu.`,
    ROLE_MENU_RESTRICTION_MULTIPLE: `Only those with one of either {{0}} Roles can use this Role Menu.`,

    ROLE_MENU_CREATION_CANCELLED: `Creation of this Role Menu has been cancelled. You may now dismiss or delete this Message.`,
    ROLE_MENU_CREATION_SUCCESS: `Successfully created and posted your new Role Menu!\n\nIf you need to, you can edit or delete your Role Menu by using my [Message Context Commands]({{0}})`,
    ROLE_MENU_CONFIGURATION_CANCELLED: `Configuration of this Role Menu has been cancelled. You may now dismiss or delete this Message.`,
    ROLE_MENU_CONFIGURATION_SUCCESS: `Successfully saved your updated Role Menu!`,

    DELETE_ROLE_MENU_COMMAND_VALIDATION: `Are you sure you want to delete this Role Menu?`,
    DELETE_ROLE_MENU_COMMAND_SUCCESS: `Successfully deleted that Role Menu.`,
    DELETE_ROLE_MENU_COMMAND_CANCELLED: `Cancelled deletion of that Role Menu.`,

    ROLE_BUTTON_AUDIT_LOG_ENTRY: `Role Menu in {{0}}`,
    ROLE_BUTTON_REVOKE_SUCCESS: `Successfully revoked the {{0}} Role from you.`,
    ROLE_BUTTON_GRANT_SUCCESS: `Successfully granted the {{0}} Role to you.`,
    ROLE_BUTTON_SWAP_SUCCESS: `Successfully swapped the {{0}} Role for the {{1}} Role for you.`,

    ROLE_MENU_ERROR_CREATION_GENERIC: `An error occurred while trying to save your new Role Menu...`,
    ROLE_MENU_ERROR_CONFIGURATION_GENERIC: `An error occurred while trying to save your updated Role Menu...`,
    DELETE_ROLE_MENU_COMMAND_ERROR_GENERIC: `Sorry, there was an error trying to delete that Role Menu...`,
    ROLE_MENU_ERROR_NO_CACHE_FOUND_CREATION: `Sorry, you'll have to restart your Role Menu creation due to a rare error.`,
    ROLE_MENU_ERROR_NO_CACHE_FOUND_CONFIGURATION: `Sorry, you'll have to restart your Role Menu configuration due to a rare error.`,

    ROLE_MENU_ERROR_INVALID_CHANNEL: `Sorry, you can only create Button Role Menus inside of standard Text Channels.`,
    ROLE_MENU_ERROR_MISSING_MANAGE_ROLES_PERMISSION: `I do not seem to have the **Manage Roles** Permission!\nPlease ensure I have been granted it in order for my Role Module to work.`,
    ROLE_MENU_ERROR_MISSING_SEND_MESSAGES_PERMISSION: `Sorry, but I cannot create a Role Menu in this Channel without having the **Send Messages** Permission!`,
    ROLE_MENU_ERROR_ACTIVE_CREATION: `Sorry, but there seems to already be an active Role Menu creation happening on this Server right now; either by yourself or someone else.\nPlease either wait for the User to finish creating their Role Menu, or wait for the inactive creation timer to expire (which is about one hour from initial use of this Slash Command).`,

    ROLE_MENU_ERROR_ACTIVE_CONFIGURATION: `Sorry, but there seems to already be an active Role Menu configuration happening on this Server right now; either by yourself or someone else.\nPlease either wait for the User to finish configuring their Role Menu, or wait for the inactive configuration timer to expire (which is about one hour from initial use of this Context Command).`,
    
    ROLE_MENU_ERROR_BUTTON_LIMIT_EXCEEDED: `Sorry, but you cannot add more than 15 Role Buttons to a single Menu.`,
    ROLE_MENU_ERROR_ROLE_NOT_ON_MENU: `{{0}} is __not__ on this Menu!`,
    ROLE_MENU_ERROR_ROLE_ALREADY_ON_MENU: `{{0}} has already been added to this Role Menu!`,
    ROLE_MENU_ERROR_REQUIREMENT_ROLE_NOT_ON_MENU: `{{0}} is __not__ on this Menu as a Requirement!`,
    ROLE_MENU_ERROR_REQUIREMENT_ROLE_ALREADY_ON_MENU: `{{0}} has already been added as a Requirement to this Role Menu!`,
    ROLE_MENU_ERROR_ROLE_TOO_HIGH: `{{0}} is higher than this Bot's own highest Role ( {{1}} ). As such, this Bot won't be able to grant or revoke it for other Members.`,
    ROLE_MENU_ERROR_CANNOT_HAVE_BLANK_BUTTON: `Sorry, but you cannot leave both the Label and the Emoji fields blank.\nPlease try again, ensuring you include at least one of either Label or Emoji (or both).`,
    ROLE_MENU_ERROR_INVALID_EMOJI: `Sorry, but there was an error trying to validate your included Emoji.\nPlease try again, ensuring you use either an [Unicode Emoji]({{0}}), or a raw Discord Custom Emoji string (example: \`<:grass_block:601353406577246208>\`)`,
    
    EDIT_ROLE_MENU_COMMAND_ERROR_MESSAGE_INVALID: `Sorry, but that Message doesn't seem to contain any of my Role Menus.`,
    EDIT_ROLE_MENU_COMMAND_ERROR_MISSING_MANAGE_ROLE_PERMISSION: `I do not seem to have the **Manage Roles** Permission!\nPlease ensure I have been granted it in order for my Button Role Module to work.`,
    EDIT_ROLE_MENU_COMMAND_ERROR_MISSING_MESSAGE_HISTORY_PERMISSION: `Sorry, but I cannot edit an existing Role Menu in this Channel without having the **Read Message History** Permission!`,

    ROLE_BUTTON_ERROR_REVOKE_FAILED: `Sorry, something went wrong while trying to revoke the {{0}} Role from you...`,
    ROLE_BUTTON_ERROR_GRANT_FAILED: `Sorry, something went wrong while trying to grant the {{0}} Role to you...`,
    ROLE_BUTTON_ERROR_SWAP_FAILED: `Sorry, something went wrong while trying to swap between the {{0}} and {{1}} Roles for you...`,
    ROLE_BUTTON_ERROR_SINGLE_USE_ONLY: `Sorry! You cannot swap or revoke Roles from yourself using Single-use Role Menus.\nThese Single-use Role Menus are designed to only be usable once per User per Menu.\n\nThe Role you already have from this Menu is the {{0}} Role.`,
    ROLE_BUTTON_ERROR_REQUIREMENTS_NOT_MET: `Sorry, you do not meet the Requirements to use this Role Menu.\nYou can see what this Menu's Requirements are above the Menu itself.`,



    // ******* HELP COMMAND
    HELP_COMMAND_INDEX_MORE_INFORMATION: `You can find HeccBot's official links in the buttons below, and more information about HeccBot's features in the Select Menu under those buttons!\n\n:information_source: **Please note: These help pages have been written prior to the addition of HeccBot adding support for being a User App. These help pages will be updated before the stable release of HeccBot v10.0.0 (which is the next update!).`,
    
    HELP_COMMAND_INDEX_BUTTON_CHANGELOG: `Changelog`,
    HELP_COMMAND_INDEX_BUTTON_PRIVACY: `Privacy Policy`,
    HELP_COMMAND_INDEX_BUTTON_TERMS: `Terms of Service`,
    HELP_COMMAND_INDEX_BUTTON_GITHUB: `GitHub`,
    HELP_COMMAND_INDEX_BUTTON_SUPPORT_SERVER: `Support Server`,
    HELP_COMMAND_INDEX_BUTTON_INVITE_BOT: `Invite HeccBot`,

    HELP_COMMAND_MENU_PLACEHOLDER: `Select a help page`,
    HELP_COMMAND_MENU_ACTION_COMMANDS: `Action Commands`,
    HELP_COMMAND_MENU_ROLE_MENU: `Role Menu Module`,
    HELP_COMMAND_MENU_LOCK_EMOJI: `Lock Emoji Command`,
    HELP_COMMAND_MENU_PUBLIC_STAGES: `Public Stage Command`,
    HELP_COMMAND_MENU_DISCORD_OUTAGE_FEED: `Discord Outage Feed Module`,
    HELP_COMMAND_MENU_INFORMATIONAL_COMMANDS: `Informational Commands`,
    HELP_COMMAND_MENU_HECCBOT_COMMANDS: `HeccBot Feed Command`,
    HELP_COMMAND_MENU_MISC_COMMANDS: `Miscellaneous Commands`,
    HELP_COMMAND_MENU_PERMISSIONS: `Command Permissions`,
    HELP_COMMAND_MENU_CONTEXT_COMMANDS: `What are "Context Commands"?`,

    HELP_COMMAND_ACTIONS_PAGE: `# __HeccBot's Action Commands__

HeccBot's Action Commands can be used either for roleplay purposes, or for a little bit of fun and/or chaos with your friends.
Currently, HeccBot offers the following Action Commands:
- \`/bonk\`
- \`/boop\`
- \`/headpat\`
- \`/hug\`
- \`/kiss\`
- \`/yeet\`
- \`/jail\`

Additionally, HeccBot also offers \`/bonk\` and \`/headpat\` in Context Command forms, if you want a quick access way of using those two Commands!`,

    HELP_COMMAND_ROLE_MENU_PAGE: `# __HeccBot's Role Menu Module__

HeccBot offers a customisable Role Menu module, so you can allow your Server Members to self-assign (or self-revoke) Roles for themselves!
- **To create a new Role Menu:** Use the \`/rolemenu create\` Command.
- **To edit an existing Role Menu:** Use the "Edit Role Menu" Context Command.
- **To delete an existing Role Menu:** You can either delete it as you would any other Message on Discord, or use the "Delete Role Menu" Context Command.

## Role Menu Types
HeccBot currently offers three different types of Role Menus you can create. These are described below:
- **Toggleable:** Behaves like a classic Role Menu. Members can grant and revoke any and all Roles for themselves on a Toggleable Menu type.
  - *Useful for Notification Roles, for example.*
- **Swappable:** Members can only grant themselves one Role from a Swappable Menu. If they want another Role on the same Menu, it will be swapped with the previous Role they had.
  - *Useful for Colour Roles, for example.*
- **Single-Use:** Members can only use these Menus once (per Menu). They cannot swap the Role, grant another Role, or revoke a Role from a Single-use Menu.
  - *Useful for Team Roles during events, for example.*

## Menu Requirements
Additionally, you can also set Requirements to your Role Menus!
This means that Members would need to have one of the set Required Role(s) before they can use the Role Menu in question. An example use would be locking Colour Role Menus to your Twitch Subscribers or Server Boosters.

Please note: The Server Owner, and those with the "Admin" Permission, will bypass any set Role Menu Requirements.`,

    HELP_COMMAND_DISCORD_FEED_PAGE: `# __HeccBot's Discord Outage Feed Module__

Want to be notified or kept up-to-date on any outages or issues Discord is having?
You can use HeccBot to subscribe your Server to a feed of Discord's Outages and status issues!

Just use \`/dstatus subscribe\` to set which Channel in your Server HeccBot should post Discord Outages in.
You can use \`/dstatus unsubscribe\` later at any time to remove the Discord Outage Feed if you wish.`,

    HELP_COMMAND_LOCK_EMOJI_PAGE: `# __HeccBot's Lock Emoji Command__
    
Don't stream to Twitch or don't want to lock all your Discord Emojis behind your Twitch Subscriber Roles?
You can use HeccBot to lock your custom Discord Emojis to other Server Roles!
**Use \`/lockemoji\` to upload a new custom Emoji**, locking it behind a specified Role in the process.

Emojis locked behind Roles can only be used by Server Members with those Roles.
Due to limitations set by Discord, even the Server Owner requires those Roles to be able to use those locked Emojis.`,

    HELP_COMMAND_INFORMATIONAL_COMMANDS_PAGE: `# __HeccBot's Informational Commands__

HeccBot offers a range of Informational Commands (found in \`/info\`), that can be used to see publicly available information (from Discord's Bot API) about the following:
- Servers (that the Command is run in. \`/info server\`)
- Users (in the Server the Command is run in. \`/info user\`)
- Server Invites (\`/info invite\`)
- Server Channels (\`/info channel\`)
- Server Roles (\`/info role\`)

To aid in preventing chat spam/advertisement with these Commands, all of them respond using a special Message Type that only the user of the Command can see.`,

    HELP_COMMAND_PUBLIC_STAGES_PAGE: `# __HeccBot's Public Stage Command__

Ever wanted your Server's Stages to appear in your Members' statuses or profiles during live Stages or events?
You can use HeccBot's \`/stagepublic\` Command to do just that!

This command will start a Public Stage Instance in the specified Stage on your Server - so that it appears on your Stage audience's statuses and/or profiles.
HeccBot uses a leftover part of Discord's API in order to achieve this.

**Since Discord's Stage Discovery was shut down years ago *(due to very high abuse of the feature)*, this Command does NOT and cannot make your Server or Stage "discoverable". Only make it appear in User statuses and profiles.**`,

    HELP_COMMAND_HECCBOT_COMMAND_PAGE: `# __HeccBot's Feed Command__

For those not in, or not wanting to join, HeccBot's Support Server - a special Command has been provided so you can still subscribe to HeccBot's announcement feeds.
**Using \`/heccbot\`**, you can either:
- Subscribe to HeccBot's news feed - where updates and announcements are posted about and for HeccBot,
- and/or subscribe to its status feed - where outages and other status issues with HeccBot are posted.

After subscribing, you can change where these feeds post, as well as unfollow them completely, in **Server Settings > Integrations > Channels Followed**.
(*Sadly, this Settings page is only available on Desktop and Web versions of Discord.*)`,

    HELP_COMMAND_MISC_COMMANDS_PAGE: `# __HeccBot's Miscellaneous Commands__
This help page covers the rest of HeccBot's Commands not included in other help pages.

## Someone Command
You can use \`/someone\` to have a random Server Member's name said in chat.
HeccBot will pick from the Server Members that have permissions to view the Channel this was used in, or are a member of the Thread/Forum Post this was used in.

## Temperature Conversion Commands
Want to quickly convert a temperature between degrees C, F, and/or K?
HeccBot offers two ways to do so:
- **\`/temperature\`** - for quickly converting a single provided Temperature for yourself
- **"Convert Temperatures" Context Command** - for converting temperatures from any Message sent in chats.

## Rating Commands
Want to rate other Users, or Servers, out of 100 for fun? Then use HeccBot's \`/rate\` Command!
:warning: Please note that ratings are not stored or tracked at all, this Command is purely for fun and WILL display publicly in chats.

## Other Commands
- **\`coin\`** - Flips a coin to pseudo-randomly get Heads or Tails.
- **\`dice\`** - Rolls the set amount of Dice to get random numbers. Supports D4, D6, D10, D12, D20, and D100.
- **\`animal\`** - Gets a random picture of the specified animal. Supports cats and dogs.`,

    HELP_COMMAND_PERMISSIONS_PAGE: `# __Command Permissions__

All custom Slash and Context Commands provided by Discord Bots (that have been added to Servers) can be restricted to be usable by specific User/Roles, to usable in specific Channels, or usable by everywhere everywhere in **Server Settings > Integrations**.
*(Note: this Settings page is only available on Desktop and Web versions of Discord)*

Additionally, HeccBot also sets default permission requirements for some of its commands - for example: \`/lockemoji\` requires the "Manage Roles" Permission by default in order to be used by Server Members.
These default permission requirements can be overridden in that same Integrations settings page mentioned above.

You can read more about Discord's App/Bot Commands Permissions system on [their support article here](<https://support.discord.com/hc/en-us/articles/10952896421783>)`,

    HELP_COMMAND_CONTEXT_COMMANDS_PAGE: `# __What are Context Commands?__
By now, most Users on Discord are aware of Slash Commands (such as \`/boop\` for example) and how to use them, but not many are aware of Context Commands. Hence, this help page to explain what they are!
There are two types of Context Commands on Discord, which are described as follows.

## Message Context Commands
These are Commands used on a specific Message in chats, and can be found:
- **on Desktop & Web versions:** Right-click any Message > Apps
- **on Mobile versions:** Long-press (press-and-hold) any Message > Apps

## User Context Commands
These are Commands used on a specific User in Servers, and can be found (providing you are in a Channel with a text chat):
- **on Desktop & Web versions:** Right-click a Username/profile picture in chat or Members list sidebar > Apps
- **on Mobile versions:** Long-press (press-and-hold) a Username in chat, or tap a profile picture in chat/Members list sidebar > Apps`,



    // ******* STAGEPUBLIC COMMAND
    STAGE_COMMAND_AUTOCOMPLETE_NO_RESULTS: `No Scheduled Events found in Server`,

    STAGE_COMMAND_SUCCESS: `Successfully started a public Stage instance in {{0}} - this Stage instance will appear in your Stage Listener's User Statuses!`,
    STAGE_COMMAND_INVALID_EVENT: `Note: This Stage instance has not been connected to a Scheduled Event, as the provided Scheduled Event either doesn't exist on this Server, or was invalid.`,

    STAGE_COMMAND_ERROR_MISSING_VIEW_CHANNELS_PERMISSION: `Sorry, but I need the "**View Channel**" Permission for that Stage in order to start public instances in it!`,
    STAGE_COMMAND_ERROR_MISSING_STAGE_MOD_PERMISSIONS: `Sorry, but due to limitations set by Discord, I cannot start a public instance in that Stage without being given Stage Moderator Permissions (namely, "**Manage Channel**", "**Mute Members**", and "**Move Members**").`,



    // ******* COIN FLIP COMMAND
    COIN_COMMAND_HEADS: `You flipped a coin and it landed on heads!`,
    COIN_COMMAND_TAILS: `You flipped a coin and it landed on tails!`,



    // ******* DICE COMMAND
    DICE_COMMAND_SINGLE_ROLL: `You rolled a {{0}} Die and it landed on: {{1}}`,
    DICE_COMMAND_MULTIPLE_ROLLS: `You rolled {{0}} {{1}} Dice and they landed on: {{2}}`,



    // ******* RATE COMMAND
    RATE_COMMAND_USER_SUCCESS: `{{0}} just gave {{1}} a rating of {{2}}/100`,
    RATE_COMMAND_SERVER_SUCCESS: `{{0}} just gave this Server ( **{{1}}** ) a rating of {{2}}/100`,

    RATE_COMMAND_ERROR_USER_NOT_IN_SERVER: `Sorry, that User is not in this Server!`,
    RATE_COMMAND_ERROR_CANNOT_RATE_SELF: `Sorry, you cannot rate yourself!`,
    RATE_COMMAND_ERROR_CANNOT_RATE_OWN_SERVER: `Sorry, you cannot rate Servers you own!`,



    // ******* ANIMAL COMMANDS
    ANIMAL_COMMAND_CAT_SOURCE_FOOTER: `Sourced from cataas.com`,
    ANIMAL_COMMAND_DOG_SOURCE_FOOTER: `Sourced from random.dog`,

    ANIMAL_COMMAND_ERROR_DOG_NOT_FOUND: `Sorry, I'm not able to fetch a random dog picture at this time.\nPlease wait a few minutes and try again later.`,



    // ******* CLOSE THREAD COMMAND
    CLOSETHREAD_COMMAND_SUCCESS_THREAD: `Successfully closed this Thread/Post.`,
    CLOSETHREAD_COMMAND_AUDIT_LOG: `Thread/Post closed by {{0}}`,

    CLOSETHREAD_COMMAND_ERROR_NOT_IN_THREAD: `Sorry, this Command can only be used inside of Threads and Forum/Media Posts.`,
    CLOSETHREAD_COMMAND_ERROR_NOT_THREAD_OWNER: `Sorry, only the owner of this Thread/Post (or those with "**Manage Threads & Posts**" Permission) can close this Thread/Post.`,
    CLOSETHREAD_COMMAND_ERROR_MISSING_MANAGE_THREADS_PERMISSION: `Sorry, HeccBot needs the "**Manage Threads & Posts** Permission in order to close Threads/Posts for you.`,



    // ******* LOCK THREAD COMMAND
    LOCKTHREAD_COMMAND_SUCCESS_THREAD: `Successfully locked this Thread/Post.`,
    LOCKTHREAD_COMMAND_AUDIT_LOG: `Thread/Post locked by {{0}}`,

    LOCKTHREAD_COMMAND_ERROR_NOT_IN_THREAD: `Sorry, this Command can only be used inside of Threads and Forum/Media Posts.`,
    LOCKTHREAD_COMMAND_ERROR_NOT_THREAD_OWNER: `Sorry, only the owner of this Thread/Post (or those with "**Manage Threads & Posts**" Permission) can lock this Thread/Post.`,
    LOCKTHREAD_COMMAND_ERROR_MISSING_MANAGE_THREADS_PERMISSION: `Sorry, HeccBot needs the "**Manage Threads & Posts** Permission in order to lock Threads/Posts for you.`,
};
