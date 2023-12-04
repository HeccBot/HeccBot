module.exports = {
    // ******* GENERIC STUFF
    PLEASE_SELECT_AN_ACTION: `Please select an action`,
    CREATED: `Created`,
    DELETE: `Delete`,
    CANCEL: `Cancel`,
    TRUE_LOWERCASE: `true`,
    FALSE_LOWERCASE: `false`,
    TRUE: `True`,
    FALSE: `False`,
    NO_LIMIT: `No limit`,
    KBPS: `kbps`,
    SECONDS: `seconds`,

    JUMP_TO_SOURCE_MESSAGE: `Jump to source Message`,

    ERROR_GENERIC: `An error has occurred.`,
    ERROR_INVALID_COLOR_HEX: `That wasn't a valid hex colour code! Please try again, using a valid hex colour code, including the \`#\` (hash) at the start.`,



    // ******* FOR HECCBOT DESCRIPTIONS, ETC
    HECCBOT_DESCRIPTION_SHORT: `A general purpose Discord Bot. Features Action Commands (like {{0}}), Button Role Menus, Polls, and more.`,
    HECCBOT_DESCRIPTION_LONG: `A general purpose Discord Bot, actually focusing on "general" features.\nExamples of HeccBot's features includes: Button Role Menus, Polls, Action Commands (like {{0}}), Temperature Conversions, ability to Role-lock Custom Emojis, and more!`,



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



    // ******* FOR ACTION COMMANDS
    ACTION_COMMAND_OTHER_USER_HEADPAT: `**{{0}}** gave **{{1}}** a headpat`,
    ACTION_COMMAND_OTHER_USER_HUG: `**{{0}}** cuddled **{{1}}**`,
    ACTION_COMMAND_OTHER_USER_BONK: `**{{0}}** bonked **{{1}}**`,
    ACTION_COMMAND_OTHER_USER_BOOP: `**{{0}}** booped **{{1}}**`,
    ACTION_COMMAND_OTHER_USER_KISS: `**{{0}}** kissed **{{1}}**`,

    ACTION_COMMAND_SELF_USER_HEADPAT: `**{{0}}** gave themself a headpat`,
    ACTION_COMMAND_SELF_USER_HUG: `**{{0}}** gave themself a cuddle`,
    ACTION_COMMAND_SELF_USER_BONK: `**{{0}}** bonked themself`,
    ACTION_COMMAND_SELF_USER_BOOP: `**{{0}}** booped themself`,
    ACTION_COMMAND_SELF_USER_KISS: `**{{0}}** attempted to kiss themself`,

    ACTION_COMMAND_ROLE_HEADPAT: `**{{0}}** gave everyone with **{{1}}** headpats`,
    ACTION_COMMAND_ROLE_HUG: `**{{0}}** gave everyone with **{{1}}** a group hug`,
    ACTION_COMMAND_ROLE_BONK: `**{{0}}** collectively bonked **{{1}}**`,
    ACTION_COMMAND_ROLE_BOOP: `**{{0}}** booped everyone with **{{1}}**`,
    ACTION_COMMAND_ROLE_KISS: `**{{0}}** kissed everyone with **{{1}}**`,

    ACTION_COMMAND_EVERYONE_HEADPAT: `**{{0}}** gave \`@everyone\` a headpat`,
    ACTION_COMMAND_EVERYONE_HUG: `**{{0}}** gave \`@everyone\` a group hug`,
    ACTION_COMMAND_EVERYONE_BONK: `**{{0}}** bonked \`@everyone\``,
    ACTION_COMMAND_EVERYONE_BOOP: `**{{0}}** booped \`@everyone\``,
    ACTION_COMMAND_EVERYONE_KISS: `**{{0}}** gave \`@everyone\` a kiss`,

    ACTION_COMMAND_OTHER_BOTS_HEADPAT: `**{{0}}** gave **{{1}}** a virtual headpat`,
    ACTION_COMMAND_OTHER_BOTS_HUG: `**{{0}}** virtually cuddled **{{1}}**`,
    ACTION_COMMAND_OTHER_BOTS_BONK: `**{{0}}** bonked **{{1}}**'s code`,
    ACTION_COMMAND_OTHER_BOTS_BOOP: `**{{0}}** booped **{{1}}**`,
    ACTION_COMMAND_OTHER_BOTS_KISS: `**{{0}}** sent **{{1}}** a virtual kiss`,

    ACTION_COMMAND_HECCBOT_HEADPAT: `**{{0}}** gave me a headpat <3`,
    ACTION_COMMAND_HECCBOT_HUG: `**{{0}}** cuddled me <3`,
    ACTION_COMMAND_HECCBOT_BONK: `I bonked **{{0}}** in retaliation - nobody attempts to bonk me!`,
    ACTION_COMMAND_HECCBOT_BOOP: `**{{0}}** booped me!`,
    ACTION_COMMAND_HECCBOT_KISS: `**{{0}}** kissed...me? :flushed:`,

    ACTION_COMMAND_MEE6_HEADPAT: `***{{0}}** gave **{{1}}** a headpat...*`,
    ACTION_COMMAND_MEE6_HUG: `***{{0}}** hugged **{{1}}**...*`,
    ACTION_COMMAND_MEE6_BONK: `**{{0}}** bonked **{{1}}**!`,
    ACTION_COMMAND_MEE6_BOOP: `***{{0}}** booped **{{1}}**...*`,
    ACTION_COMMAND_MEE6_KISS: `OK, listen **{{0}}**, **{{1}}** doesn't deserve a kiss.`,

    ACTION_RETURN_BUTTON_LABEL: `Return {{0}}`,
    ACTION_RETURN_HEADPAT: `**{{0}}** gave **{{1}}** a headpat in return!`,
    ACTION_RETURN_HUG: `**{{0}}** cuddled **{{1}}** too!`,
    ACTION_RETURN_BONK: `**{{0}}** bonked **{{1}}** in retaliation!`,
    ACTION_RETURN_BOOP: `**{{0}}** revenge booped **{{1}}**!`,
    ACTION_RETURN_KISS: `**{{0}}** kissed **{{1}}** in return!`,

    ACTION_HALLOWEEN_SUCK: `***{{0}}** took a sip of **{{1}}**'s blood!*`,
    ACTION_HALLOWEEN_PIE: `***{{0}}** threw a pumpkin pie at **{{1}}**!*`,
    ACTION_HALLOWEEN_CURSE: `***{{0}}** cursed **{{1}}**!*`,
    ACTION_HALLOWEEN_HAUNT: `***{{0}}** haunts **{{1}}**!*`,
    ACTION_HALLOWEEN_BRAIN: `***{{0}}** took a nibble of **{{1}}**'s brain!*`,
    ACTION_HALLOWEEN_HUNT: `***{{0}}** hunts down **{{1}}**!*`,
    ACTION_HALLOWEEN_NIGHTMARE: `***{{0}}** haunts the nightmares of **{{1}}**!*`,

    ACTION_ERROR_RETURN_NOT_TARGETED_AT_SELF: `You cannot return an Action that wasn't aimed at you!`,
    ACTION_ERROR_CANNOT_RETURN_TO_SENDER: `You cannot return the Action you sent!`,
    ACTION_ERROR_HALLOWEEN_CANNOT_USE_ON_OWN_HOUSE: `You cannot use this Halloween Action on your own {{0}} Halloween House!`,
    ACTION_ERROR_HALLOWEEN_NOT_IN_CORRECT_HOUSE: `You cannot use this Halloween Action as you don't have the {{0}} Role!`,



    // ******* FOR TEMPERATURE STUFF
    TEMPERATURE_COMMAND_CONVERTED: `{{0}}{{1}} is about {{2}}{{3}} or {{4}}{{5}}`,
    TEMPERATURE_COMMAND_SUCCESS_SINGLAR: `Here is your converted temperature:`,
    TEMPERATURE_COMMAND_SUCCESS_MULTIPLE: `Here are your converted temperatures:`,

    TEMPERATURE_COMMAND_ERROR_INVALID_TEMPERATURE: `:warning: {{0}}{{1}} is a temperature that cannot exist! (It is below Absolute Zero!)`,
    TEMPERATURE_COMMAND_ERROR_TEMPERATURE_NOT_FOUND: `Sorry, but I couldn't find any temperatures to convert from that Message.`,
    TEMPERATURE_COMMAND_ERROR_EXCEEDED_TEMPERATURE_LIMIT: `Sorry, but there are too many temperatures found in that Message!\nI have a maximum limit of 10 temperatures per Message that I can convert.`,



    // ******* FOR SOMEONE COMMAND
    SOMEONE_COMMAND_RESPONSE: `\`@someone\` *({{0}})*`,



    // ******* ROLE MENU STUFF
    ROLE_MENU_PREVIEW_EMPTY: `*Role Menu is currently empty. Please use the Select Menu below to configure this Role Menu.*`,

    ROLE_MENU_SET_MENU_TYPE: `Set Menu Type`,
    ROLE_MENU_SET_MENU_TYPE_DESCRIPTION: `Change how this Menu will behave once saved`,
    ROLE_MENU_CONFIGURE_EMBED: `Configure Embed`,
    ROLE_MENU_CONFIGURE_EMBED_DESCRIPTION: `Set the Title, Description, and Colour of the Embed`,
    ROLE_MENU_ADD_ROLE: `Add Role`,
    ROLE_MENU_ADD_ROLE_DESCRIPTION: `Add a Role to this Menu`,
    ROLE_MENU_REMOVE_ROLE: `Remove Role`,
    ROLE_MENU_REMOVE_ROLE_DESCRIPTION: `Remove a Role from this Menu`,
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

An auto-updating preview of what your new Role Menu will look like is shown below.`,

    ROLE_MENU_CONFIGURATION_INTRUCTIONS: `__**Role Menu Configuration**__
Use the Select Menu below to configure this Menu's Type, Embed and Role Buttons. Press an existing Role Button to edit its label and/or emoji.
If including in Buttons, please make sure to have the relevant Emoji IDs ready (such as in a notepad program); as you won't be able to copy from a Discord Message while an Input Form is open.
Additionally, both Custom Discord Emojis, and standard Unicode Emojis, are supported.

An auto-updating preview of what your updated Role Menu will look like is shown below.`,

    ROLE_MENU_SET_MENU_TYPE_INSTRUCTIONS: `Please use the Select Menu below to pick which type of Role Menu you want.

• **Toggle** - Your standard Role Menu Type. Behaves like a classic Reaction Role Menu, but with Buttons instead.
• **Swappable** - Users can only have 1 Role per **Swappable** Menu. Attempting to select another Role on the same **Swappable** Menu would swap the two Roles instead. Useful for Colour Role Menus!
• **Single-use** - Users can only use a **Single-use** Menu once, and are unable to revoke or swap out the selected Role from themselves. Useful for Team Roles in Events.`,

    ROLE_MENU_ROLE_ADD_INSTRUCTIONS: `Please use the Role Select Menu below to pick which Role from this Server you would like to add to your Role Menu.`,
    ROLE_MENU_ROLE_REMOVE_INSTRUCTIONS: `Please use the Role Select Menu below to pick which Role you would like to remove from your Role Menu.`,
    ROLE_MENU_BUTTON_SET_INSTRUCTIONS: `**Selected Role: {{0}}**\nNext, please use the Select Menu below to pick which [colour of Button]({{1}}) you want to use for this Role.`,

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

    ROLE_MENU_ERROR_MISSING_MANAGE_ROLES_PERMISSION: `:warning: I do not seem to have the **Manage Roles** Permission!\nPlease ensure I have been granted it in order for my Role Module to work.`,
    ROLE_MENU_ERROR_MISSING_SEND_MESSAGES_PERMISSION: `:warning: Sorry, but I cannot create a Role Menu in this Channel without having the **Send Messages** Permission!`,
    ROLE_MENU_ERROR_ACTIVE_CREATION: `Sorry, but there seems to already be an active Role Menu creation happening on this Server right now; either by yourself or someone else.\nPlease either wait for the User to finish creating their Role Menu, or wait for the inactive creation timer to expire (which is about one hour from initial use of this Slash Command).`,
    ROLE_MENU_ERROR_ACTIVE_CONFIGURATION: `Sorry, but there seems to already be an active Role Menu configuration happening on this Server right now; either by yourself or someone else.\nPlease either wait for the User to finish creating their Role Menu, or wait for the inactive creation timer to expire (which is about one hour from initial use of this Context Command).`,
    ROLE_MENU_ERROR_BUTTON_LIMIT_EXCEEDED: `Sorry, but you cannot add more than 10 Role Buttons to a single Menu.`,
    ROLE_MENU_ERROR_CREATION_GENERIC: `An error occurred while trying to save your new Role Menu...`,
    ROLE_MENU_ERROR_ROLE_NOT_ON_MENU: `{{0}} is __not__ on this Menu!`,
    ROLE_MENU_ERROR_ROLE_ALREADY_ON_MENU: `{{0}} has already been added to this Role Menu!`,
    ROLE_MENU_ERROR_ROLE_TOO_HIGH: `{{0}} is higher than this Bot's own highest Role ({{1}}). As such, this Bot won't be able to grant or revoke it for other Members.`,
    ROLE_MENU_ERROR_CONFIGURATION_GENERIC: `An error occurred while trying to save your updated Role Menu...`,
    ROLE_MENU_ERROR_CANNOT_HAVE_BLANK_BUTTON: `Sorry, but you cannot leave both the Label and the Emoji fields blank.\nPlease try again, ensuring you include at least one of either Label or Emoji (or both).`,
    ROLE_MENU_ERROR_INVALID_EMOJI: `Sorry, but there was an error trying to validate your included Emoji.\nPlease try again, ensuring you use either an [Unicode Emoji]({{0}}), or a raw Discord Custom Emoji string (example: \`<:grass_block:601353406577246208>\`)`,
    
    EDIT_ROLE_MENU_COMMAND_ERROR_MESSAGE_INVALID: `Sorry, but that Message doesn't seem to contain any of my Role Menus.`,
    EDIT_ROLE_MENU_COMMAND_ERROR_MISSING_MANAGE_ROLE_PERMISSION: `I do not seem to have the **Manage Roles** Permission!\nPlease ensure I have been granted it in order for my Button Role Module to work.`,
    EDIT_ROLE_MENU_COMMAND_ERROR_MISSING_MESSAGE_HISTORY_PERMISSION: `Sorry, but I cannot edit an existing Role Menu in this Channel without having the **Read Message History** Permission!`,
    
    DELETE_ROLE_MENU_COMMAND_ERROR_GENERIC: `Sorry, there was an error trying to delete that Role Menu...`,

    ROLE_BUTTON_ERROR_REVOKE_FAILED: `Sorry, something went wrong while trying to revoke the {{0}} Role from you...`,
    ROLE_BUTTON_ERROR_GRANT_FAILED: `Sorry, something went wrong while trying to grant the {{0}} Role to you...`,
    ROLE_BUTTON_ERROR_SWAP_FAILED: `Sorry, something went wrong while trying to swap between the {{0}} and {{1}} Roles for you...`,
    ROLE_BUTTON_ERROR_SINGLE_USE_ONLY: `Sorry! You cannot swap or revoke Roles from yourself using Single-use Role Menus.\nThese Single-use Role Menus are designed to only be usable once per User per Menu.\n\nThe Role you already have from this Menu is the {{0}} Role.`,



    // ******* POLL STUFF
    POLL_PREVIEW_EMPTY: `*Poll is currently empty. Please use the Select Menu below to configure this Poll.*`,
    POLL_SELECT_EDIT: `Configure Poll`,
    POLL_SET_POLL_TYPE: `Set Poll Type`,
    POLL_SET_POLL_TYPE_DESCRIPTION: `Change how this Poll will behave once posted`,
    POLL_CONFIGURE_EMBED: `Configure Embed`,
    POLL_CONFIGURE_EMBED_DESCRIPTION: `Set the Question, Description, and Colour of this Poll`,
    POLL_ADD_CHOICE: `Add Choice`,
    POLL_ADD_CHOICE_DESCRIPTION: `Add a Choice to this Poll`,
    POLL_REMOVE_CHOICE: `Remove Choice`,
    POLL_REMOVE_CHOICE_DESCRIPTION: `Remove a Choice from this Poll`,
    POLL_SAVE_AND_POST: `Save & Post`,
    POLL_SAVE_AND_POST_DESCRIPTION: `Saves this Poll, and posts it in chat for Members to use`,
    POLL_CANCEL_CREATION: `Cancel Creation`,
    POLL_CANCEL_CREATION_DESCRIPTION: `Cancels creation of this Poll`,

    POLL_ANSWER_CHOICE: `Answer Choice`,
    POLL_ANSWER_LABEL: `Answer Button Label`,
    POLL_BUTTON_EMOJI: `Button Emoji`,
    POLL_EDIT_CHOICE: `Edit Choice`,
    POLL_SELECT_CHOICE_EDIT: `Edit a Choice`,
    POLL_SELECT_CHOICE_REMOVE: `Pick a Choice to remove`,

    POLL_CONFIGURE_POLL_EMBED: `Configure Poll Embed`,
    POLL_POLL_QUESTION: `Poll Question`,
    POLL_POLL_DESCRIPTION: `Poll Description`,
    POLL_POLL_COLOR: `Embed Colour (in hex format)`,

    POLL_SINGLE_VOTE: `Vote`,
    POLL_MULTIPLE_VOTES: `Votes`,
    POLL_CURRENT_RESULTS: `Current Results:`,

    POLL_RESULTS_SHOWN_WHEN_ENDED: `*Results will be shown once this Poll ends.*`,

    POLL_CREATE_INTRUCTIONS: `__**Poll Creation**__
Use the Select Menu to configure this Poll's Embed and Choices.
    
An auto-updating preview of what your new Poll will look like is shown below.`,

    POLL_REMOVE_CHOICE_INSTRUCTIONS: `Please use the Select Menu below to pick which Choice you want to remove from your Poll.`,

    POLL_CREATION_CANCELLED: `Creation of your new Poll has been cancelled. You may now dismiss or delete this Message.`,
    POLL_CREATION_SUCCESS: `Successfully created and posted your new Poll!\n\nTo end your Poll, simply right-click or long-press on the Message containing the Poll, and use the "End Poll" Command under the "Apps" section. [Image Example]({{0}})`,
    END_POLL_COMMAND_SUCCESS: `Successfully ended your Poll.`,

    POLL_BUTTON_CHOICES: `Choices:`,
    POLL_BUTTON_CURRENT_TOTAL_VOTES: `Current Total Votes: {{0}}`,
    POLL_BUTTON_VOTE_SUCCESS: `Successfully voted for {{0}}`,

    POLL_ERROR_ACTIVE_CREATION: `Sorry, but there seems to already be an active Poll creation happening on this Server right now; either by yourself or someone else.\nPlease either wait for the User to finish creating their Poll, or wait for the inactive creation timer to expire (which is about one hour from initial use of this Slash Command).`,
    POLL_ERROR_EXCEEDED_BUTTON_LIMIT: `Sorry, but you cannot add more than 25 Choices to a single Poll.`,
    POLL_ERROR_CREATION_GENERIC: `Sorry, but there was an error trying to save your new Poll...`,
    POLL_ERROR_DUPLICATE_CHOICE: `Sorry, but your new Choice was detected to be a duplicate of an existing Choice already on your Poll!`,
    
    END_POLL_COMMAND_ERROR_MESSAGE_INVALID: `Sorry, but this Command can only be used on Messages containing active Polls.`,
    END_POLL_COMMAND_ERROR_FAILED_TO_REMOVE: `Sorry, but there was an error trying to remove this Poll from the Database. Please try again, or contact HeccBot's Developers if the issue continues.`,
    END_POLL_COMMAND_ERROR_GENERIC: `An error occurred trying to end your Poll...`,

    POLL_BUTTON_ERROR_ALREADY_VOTED: `You have already voted on this Poll!\nIt is not possible to vote multiple times or to edit your vote on Polls made with this Bot.`,
    POLL_ERROR_MAXIMUM_VOTES_REACHED: `You have already reached the maximum number of Votes you can add to this Poll!\n*(Note: It is not possible to revoke or remove your prior Votes)*`,
    POLL_BUTTON_ERROR_GENERIC: `Sorry, an error occurred while trying to process your Poll vote...`,



    // ******* LOCKEMOJI COMMAND
    LOCKEMOJI_COMMAND_AUDIT_LOG_EMOJI_UPLOADED: `Role-locked Custom Emoji uploaded by {{0}}`,
    LOCKEMOJI_COMMAND_UPLOAD_SUCCESS: `Successfully uploaded your new Role-locked Custom Emoji to this Server.\nYou can rename and/or delete your EMoji, much like others, in Server Settings > Emojis, providing you have the **Manage Expressions** Permission.`,

    LOCKEMOJI_COMMAND_ERROR_MISSING_CREATE_EXPRESSIONS_PERMISSION: `Sorry, but I cannot upload a Custom Emoji to this Server without having the **Create Expressions** Permission.\nPlease try again, once I have been granted that Permission!`,
    LOCKEMOJI_COMMAND_ERROR_INVALID_FILE_TYPE: `Sorry, but that Emoji file wasn't a **PNG** or **GIF** file type.\nPlease try again, ensuring you use either a \`.png\` or \`.gif\` file for your Custom Emoji.`,
    LOCKEMOJI_COMMAND_ERROR_FILE_TOO_LARGE: `Sorry, but that Emoji file is too large to be uploaded as a Custom Emoji.\nDiscord requires Custom Emojis to be smaller than 256kb in file size. Please try again, once you have a smaller file size for your Custom Emoji.`,
    LOCKEMOJI_COMMAND_ERROR_FAILED_UPLOAD: `Sorry, but there was an error trying to upload your Custom Emoji to this Server.\nPreview of the raw error:\n\`\`\`\n{{0}}\`\`\``,



    // ******* INFO COMMAND STUFF - THERE'S A LOT HERE SO PREPARE THYSELF
    INFO_COMMAND_GUILD_VERIFICATION_NONE: `Unrestricted`,
    INFO_COMMAND_GUILD_VERIFICATION_LOW: `Low (Verified Email)`,
    INFO_COMMAND_GUILD_VERIFICATION_MEDIUM: `Medium (Account age >5 minutes)`,
    INFO_COMMAND_GUILD_VERIFICATION_HIGH: `High (Member for >10 minutes)`,
    INFO_COMMAND_GUILD_VERIFICATION_VERY_HIGH: `Highest (Verified Phone Number)`,

    INFO_COMMAND_GUILD_EXPLICIT_FILTER_DISABLED: `Disabled`,
    INFO_COMMAND_GUILD_EXPLICIT_FILTER_ROLELESS: `Only scan roleless Members content`,
    INFO_COMMAND_GUILD_EXPLICIT_FILTER_EVERYONE: `Scan content from everyone`,

    INFO_COMMAND_GUILD_DEFAULT_NOTIFICATION_ALL_MESSAGES: `All Messages`,
    INFO_COMMAND_GUILD_DEFAULT_NOTIFICATION_ONLY_MENTIONS: `Only @mentions`,

    INFO_COMMAND_GUILD_MFA_NONE: `None`,
    INFO_COMMAND_GUILD_MFA_ELEVATED: `Enabled`,

    INFO_COMMAND_GUILD_NSFW_DEFAULT: `Default`,
    INFO_COMMAND_GUILD_NSFW_SAFE: `Safe`,
    INFO_COMMAND_GUILD_NSFW_AGE_RESTRICTED: `Age Restricted`,
    INFO_COMMAND_GUILD_NSFW_EXPLICIT: `Explicit`,

    INFO_COMMAND_GUILD_BOOST_TIER_NONE: `None`,
    INFO_COMMAND_GUILD_BOOST_TIER_ONE: `Tier 1`,
    INFO_COMMAND_GUILD_BOOST_TIER_TWO: `Tier 2`,
    INFO_COMMAND_GUILD_BOOST_TIER_THREE: `Tier 3`,

    INFO_COMMAND_USER_FLAG_ACTIVE_DEVELOPER: `Active Developer`,
    INFO_COMMAND_USER_FLAG_BOT_HTTP_INTERACTIONS: `HTTP Interactions Bot`,
    INFO_COMMAND_USER_FLAG_BUG_HUNTER_TIER_ONE: `Bug Hunter Tier 1`,
    INFO_COMMAND_USER_FLAG_BUG_HUNTER_TIER_TWO: `Bug Hunter Tier 2`,
    INFO_COMMAND_USER_FLAG_CERTIFIED_MODERATOR: `Moderator Programs Alumni`,
    INFO_COMMAND_USER_FLAG_COLLABORATOR: `Collaborator`,
    INFO_COMMAND_USER_FLAG_HYPESQUAD_HOUSE_BRAVERY: `HypeSquad Bravery House`,
    INFO_COMMAND_USER_FLAG_HYPESQUAD_HOUSE_BRILLIANCE: `HypeSquad Brilliance House`,
    INFO_COMMAND_USER_FLAG_HYPESQUAD_HOUSE_BALANCE: `HypeSquad Balance House`,
    INFO_COMMAND_USER_FLAG_HYPESQUAD_EVENTS: `HypeSquad Events`,
    INFO_COMMAND_USER_FLAG_PARTNER: `Partnered Server Owner`,
    INFO_COMMAND_USER_FLAG_EARLY_SUPPORTER: `Early Nitro Supporter`,
    INFO_COMMAND_USER_FLAG_QUARANTINED: `**Quarantined**`,
    INFO_COMMAND_USER_FLAG_RESTRICTED_COLLABORATOR: `Restricted Collaborator`,
    INFO_COMMAND_USER_FLAG_SPAMMER: `**Spammer**`,
    INFO_COMMAND_USER_FLAG_STAFF: `Discord Employee`,
    INFO_COMMAND_USER_FLAG_TEAM_USER: `Team (Pseudo User)`,
    INFO_COMMAND_USER_FLAG_VERIFIED_BOT: `Verified Bot`,
    INFO_COMMAND_USER_FLAG_VERIFIED_BOT_DEVELOPER: `Early Verified Bot Developer`,

    INFO_COMMAND_MEMBER_FLAG_REJOIN: `Did Rejoin`,
    INFO_COMMAND_MEMBER_FLAG_ONBOARDING_STARTED: `Started Onboarding`,
    INFO_COMMAND_MEMBER_FLAG_ONBOARDING_COMPLETED: `Completed Onboarding`,
    INFO_COMMAND_MEMBER_FLAG_AUTOMOD_QUARANTIED_BIO: `Quarantied by AutoMod (Profile Bio Filter)`,
    INFO_COMMAND_MEMBER_FLAG_AUTOMOD_QUARANTIED_NAME: `Quarantied by AutoMod (User/Display/Nick Name Filter)`,
    INFO_COMMAND_MEMBER_FLAG_GUIDE_TODO_STARTED: `Started Guide ToDo Tasks`,
    INFO_COMMAND_MEMBER_FLAG_GUIDE_TODO_COMPLETED: `Completed Guide ToDo Tasks`,

    INFO_COMMAND_APPLICATION_FLAG_AUTOMOD_BADGE: `Uses AutoMod API`,
    INFO_COMMAND_APPLICATION_FLAG_APPLICATION_COMMANDS_BADGE: `Supports Application Commands`,
    INFO_COMMAND_APPLICATION_FLAG_EMBEDDED: `Embedded`,
    INFO_COMMAND_APPLICATION_FLAG_EMBEDDED_FIRST_PARTY: `Embedded First Party`,
    INFO_COMMAND_APPLICATION_FLAG_EMBEDDED_IAP: `Embedded IAP (In-App Purchases)`,
    INFO_COMMAND_APPLICATION_FLAG_EMBEDDED_RELEASED: `Embedded Released`,
    INFO_COMMAND_APPLICATION_FLAG_INTENT_GUILD_MEMBERS: `Has Guild Members Intent (Verified)`,
    INFO_COMMAND_APPLICATION_FLAG_INTENT_GUILD_MEMBERS_LIMITED: `Has Guild Members Intent`,
    INFO_COMMAND_APPLICATION_FLAG_INTENT_MESSAGE_CONTENT: `Has Message Content Intent (Verified)`,
    INFO_COMMAND_APPLICATION_FLAG_INTENT_MESSAGE_CONTENT_LIMITED: `Has Message Content Intent`,
    INFO_COMMAND_APPLICATION_FLAG_INTENT_PRESENCE: `Has Presence Intent (Verified)`,
    INFO_COMMAND_APPLICATION_FLAG_INTENT_PRESENCE_LIMITED: `Has Presence Intent`,
    INFO_COMMAND_APPLICATION_FLAG_GROUP_DM_CREATE: `Can create Group DMs`,
    INFO_COMMAND_APPLICATION_FLAG_MANAGED_EMOJI: `Managed Emoji`,
    INFO_COMMAND_APPLICATION_FLAG_RPC_CONNECTED: `RPC has connected`,
    INFO_COMMAND_APPLICATION_FLAG_VERIFICATION_BLOCKED_BY_GROWTH: `Verification blocked by unusual growth`,

    INFO_COMMAND_CHANNEL_DIRECTORY_UNSUPPORTED: `Sorry, but the [Directory Channel](<https://support.discord.com/hc/en-us/articles/4406046651927>) type isn't supported by this Bot!`,
    INFO_COMMAND_CHANNEL_MEDIA_UNSUPPORTED: `Sorry, but the [Media Channel](<https://creator-support.discord.com/hc/en-us/articles/14346342766743>) type isn't currently supported yet by this Bot!`,
    INFO_COMMAND_CHANNEL_DM_UNSUPPORTED: `Sorry, but this Bot cannot be used to fetch information of Direct Messages (DMs) or Group Direct Messages (GDMs)!`,

    INFO_COMMAND_ERROR_CHANNEL_FETCH_FAILED: `Sorry, there was an error trying to fetch information about that Channel.\nI may not have the **View Channels** Permission to be able to see that specified Channel, __or__ something in my code failed.`,

    INFO_COMMAND_CHANNEL_TYPE: `**Channel Type:**`,
    INFO_COMMAND_CHANNEL_MENTION: `**Channel Mention:**`,
    INFO_COMMAND_CHANNEL_PARENT: `**Parent Channel:**`,
    INFO_COMMAND_CHANNEL_CATEGORY_PARENT: `**Parent Category:**`,
    INFO_COMMAND_CHANNEL_CACHED_CHILDREN: `**Cached Child Channels:**`,
    INFO_COMMAND_CHANNEL_NSFW: `**Age-Restricted:**`,
    INFO_COMMAND_CHANNEL_DEFAULT_THREAD_AUTO_HIDE: `**Default Thread Auto-hide Duration:**`,
    INFO_COMMAND_CHANNEL_MESSAGE_SLOWMODE: `**Message Slowmode:**`,
    INFO_COMMAND_CHANNEL_AUDIO_BITRATE: `**Audio Bitrate:**`,
    INFO_COMMAND_CHANNEL_CONNECTED_MEMBERS: `**Cached Connected Members:**`,
    INFO_COMMAND_CHANNEL_VIDEO_QUALITY_MODE: `**Video Quality Mode:**`,
    INFO_COMMAND_CHANNEL_VIDEO_QUALITY_AUTOMATIC: `Automatic`,
    INFO_COMMAND_CHANNEL_VIDEO_QUALITY_720: `720p`,

    INFO_COMMAND_CHANNEL_FORUM_DEFAULT_REACTION: `**Has Set Default Reaction:**`,
    INFO_COMMAND_CHANNEL_FORUM_DEFAULT_SORT_ORDER: `**Default Sort Order:**`,
    INFO_COMMAND_CHANNEL_FORUM_SORT_CREATION: `Creation Date`,
    INFO_COMMAND_CHANNEL_FORUM_SORT_ACTIVITY: `Latest Activity`,
    INFO_COMMAND_CHANNEL_FORUM_DEFAULT_AUTO_HIDE: `**Default Post Auto-hide Duration:**`,
    INFO_COMMAND_CHANNEL_FORUM_AUTO_HIDE_DURATION_ONE_HOUR: `One Hour`,
    INFO_COMMAND_CHANNEL_FORUM_AUTO_HIDE_DURATION_ONE_DAY: `One Day`,
    INFO_COMMAND_CHANNEL_FORUM_AUTO_HIDE_DURATION_THREE_DAYS: `Three Days`,
    INFO_COMMAND_CHANNEL_FORUM_AUTO_HIDE_DURATION_ONE_WEEK: `One Week`,
    INFO_COMMAND_CHANNEL_FORUM_DEFAULT_MESSAGE_SLOWMODE: `**Default Message Slowmode:**`,
    INFO_COMMAND_CHANNEL_FORUM_POST_SLOWMODE: `**Post Creation Slowmode:**`,
    INFO_COMMAND_CHANNEL_FORUM_REQUIRES_TAGS: `**Requires Tags for Posts:**`,
    INFO_COMMAND_CHANNEL_FORUM_TAG_AMOUNT: `**Number of Tags:**`,

    INFO_COMMAND_CHANNEL_STAGE_FULL: `**Is Stage full:**`,
    INFO_COMMAND_CHANNEL_STAGE_LIMIT: `**Stage Member Limit:**`,
    INFO_COMMAND_CHANNEL_STAGE_LIVE_STARTED: `**Live Stage started:**`,
    INFO_COMMAND_CHANNEL_STAGE_EVENT_CONNECTION: `**Connected to Scheduled Event:**`,
    INFO_COMMAND_CHANNEL_STAGE_TOPIC: `**Stage Topic:**`,

    INFO_COMMAND_CHANNEL_THREAD_CREATOR: `**Thread/Post Creator:**`,
    INFO_COMMAND_CHANNEL_THREAD_APPLIED_TAGS: `**Number of Applied Tags:**`,
    INFO_COMMAND_CHANNEL_THREAD_CLOSED: `**Closed:**`,
    INFO_COMMAND_CHANNEL_THREAD_LOCKED: `**Locked:**`,
    INFO_COMMAND_CHANNEL_THREAD_AUTO_HIDE_DURATION: `**Auto-hide Duration:**`,
    INFO_COMMAND_CHANNEL_THREAD_INVITABLE: `**Can Anyone Invite to Private Thread:**`,
    INFO_COMMAND_CHANNEL_THREAD_PINNED: `**Is Post Pinned:**`,

    INFO_COMMAND_CHANNEL_VOICE_FULL: `**Is Voice full:**`,
    INFO_COMMAND_CHANNEL_VOICE_LIMIT: `**Voice Member Limit:**`,

    INFO_COMMAND_CHANNEL_FLAG_CLYDE: `ClydeAI`, // Discord please burn ClydeAI already you don't need it so stop bandwagoning :S
    INFO_COMMAND_CHANNEL_FLAG_RESOURCE: `Is Guide Resource`,
    INFO_COMMAND_CHANNEL_FLAG_SCHEDULED_DELETION: `Is Scheduled for Deletion`,
    INFO_COMMAND_CHANNEL_FLAG_SPAM: `Is Spam`,
    
    INFO_COMMAND_CHANNEL_GENERAL: `>> General Information`,
    INFO_COMMAND_CHANNEL_CATEGORY_INFO: `>> Category Information`,
    INFO_COMMAND_CHANNEL_FORUM_INFO: `>> Forum Information`,
    INFO_COMMAND_CHANNEL_FORUM_TAG_INFO: `>> Available Tags`,
    INFO_COMMAND_CHANNEL_ANNOUNCEMENT_INFO: `>> Announcement Information`,
    INFO_COMMAND_CHANNEL_STAGE_INFO: `>> Stage Information`,
    INFO_COMMAND_CHANNEL_LIVE_STAGE_INFO: `>> Live Stage Information`,
    INFO_COMMAND_CHANNEL_TEXT_INFO: `>> Text Information`,
    INFO_COMMAND_CHANNEL_THREAD_INFO: `>> Thread Information`,
    INFO_COMMAND_CHANNEL_POST_INFO: `>> Forum Post Information`,
    INFO_COMMAND_CHANNEL_VOICE_INFO: `>> Voice Information`,
    INFO_COMMAND_CHANNEL_FLAG_INFO: `>> Channel Flags`,


    INFO_COMMAND_SERVER_ERROR_OUTAGE: `Sorry, it seems I'm currently unable to read this Server's information - this could be due to an on-going [Discord outage](https://discordstatus.com).\nIf so, please wait and try again later.`,

    INFO_COMMAND_SERVER_PARTNERED: `**Is Partnered**`,
    INFO_COMMAND_SERVER_VERIFIED: `**Is Verified**`,
    INFO_COMMAND_SERVER_OWNER: `**Owner:**`,
    INFO_COMMAND_SERVER_BOOST_TIER: `**Boost Tier:**`,
    INFO_COMMAND_SERVER_BOOST_COUNT: `**Boost Count:**`,
    INFO_COMMAND_SERVER_EMOJIS: `**Emojis:**`,
    INFO_COMMAND_SERVER_STICKERS: `**Stickers:**`,
    INFO_COMMAND_SERVER_SOUNDS: `**Soundboard Sounds:**`,
    INFO_COMMAND_SERVER_ROLES: `**Roles:**`,
    INFO_COMMAND_SERVER_SCHEDULED_EVENTS: `**Scheduled Events:**`,
    INFO_COMMAND_SERVER_VANITY: `**Invite Vanity:**`,
    INFO_COMMAND_SERVER_APPROX_TOTAL_MEMBERS: `**Approximate Total Members:**`,
    INFO_COMMAND_SERVER_APPROX_ONLINE_MEMBERS: `**Appproximate Online Members:**`,

    INFO_COMMAND_SERVER_VERIFICATION_LEVEL: `**Verification Level:**`,
    INFO_COMMAND_SERVER_EXPLICIT_FILTER: `**Explicit Content Filter:**`,
    INFO_COMMAND_SERVER_MFA_MODERATION: `**MFA-enabled Moderation:**`,
    INFO_COMMAND_SERVER_NSFW_LEVEL: `**Age-restricted Level:**`,
    INFO_COMMAND_SERVER_DEFAULT_NOTIFICATIONS: `**Default Notifications:**`,

    INFO_COMMAND_SERVER_GENERAL_INFO: `>> General Information`,
    INFO_COMMAND_SERVER_CHANNEL_INFO: `>> Channels`,
    INFO_COMMAND_SERVER_SECURITY_INFO: `>> Security & Moderation`,
    INFO_COMMAND_SERVER_FEATURE_FLAG_INFO: `>> Feature Flags`,

    INFO_COMMAND_SERVER_BUTTON_ICON: `Icon`,
    INFO_COMMAND_SERVER_BUTTON_BANNER: `Banner`,
    INFO_COMMAND_SERVER_BUTTON_INVITE_SPLASH: `Invite Splash`,
    INFO_COMMAND_SERVER_BUTTON_DISCOVERY_SPLASH: `Discovery Splash`,


    INFO_COMMAND_ROLE_ERROR_ATEVERYONE_UNSUPPORTED: `Sorry, but I cannot bring up Role information about @everyone`,

    INFO_COMMAND_ROLE_CREATED: `**Role Created:**`,
    INFO_COMMAND_ROLE_COLOR: `**Colour:**`,
    INFO_COMMAND_ROLE_HOISTED: `**Hoisted:**`,
    INFO_COMMAND_ROLE_MANAGED: `**Managed by Integration:**`,
    INFO_COMMAND_ROLE_MEMBERS: `**Cached Members with Role:**`,
    INFO_COMMAND_ROLE_ICON: `**Role's Emoji Icon:**`,

    INFO_COMMAND_ROLE_BOT: `**Role for Bot:**`,
    INFO_COMMAND_ROLE_INTEGRATION: `**Role for Integration:**`,
    INFO_COMMAND_ROLE_SERVER_BOOST: `**Is Server Booster Role:**`,
    INFO_COMMAND_ROLE_MONETIZATION: `**Is a Server Subscription Role:**`,
    INFO_COMMAND_ROLE_PURCHASABLE: `**Is Purchasable:**`,
    INFO_COMMAND_ROLE_LINKED_CONNECTION: `**Is a Linked Role:**`,
    INFO_COMMAND_ROLE_FLAG_PROMPT: `In Onboarding Prompt`,

    INFO_COMMAND_ROLE_GENERAL_INFO: `>> General Information`,
    INFO_COMMAND_ROLE_TAG_INFO: `>> Role Tags`,
    INFO_COMMAND_ROLE_FLAG_INFO: `>> Role Flags`,


    INFO_COMMAND_USER_ERROR_NOT_IN_GUILD: `Sorry, but that User isn't a Member of this Server!`,

    INFO_COMMAND_USER_SERVER_OWNER: `**Is Server Owner:**`,
    INFO_COMMAND_USER_DISPLAY_NAME: `**Display Name:**`,
    INFO_COMMAND_USER_JOINED_SERVER: `**Joined Server:**`,
    INFO_COMMAND_USER_HIGHEST_ROLE: `**Highest Role:**`,
    INFO_COMMAND_USER_ROLE_COUNT: `**Role Count:**`,
    INFO_COMMAND_USER_BOOSTING_SERVER: `**Boosting Server Since:**`,
    INFO_COMMAND_USER_PENDING: `Yet to pass Rules Screening`,
    INFO_COMMAND_USER_TIMED_OUT: `Currently Timed-out (expires {{0}})`,

    INFO_COMMAND_USER_MENTION: `**Mention:**`,
    INFO_COMMAND_USER_CREATED: `**Account Created:**`,
    INFO_COMMAND_USER_BOT: `**Is Bot:**`,
    INFO_COMMAND_USER_HECCBOT_CREATOR: `**Is Creator of HeccBot**`,

    INFO_COMMAND_USER_BOT_INVITABLE: `**Is Publicly Invitable:**`,
    INFO_COMMAND_USER_BOT_OAUTH: `**Requires OAuth Grant:**`,

    INFO_COMMAND_USER_MEMBER_INFO: `>> Member Information`,
    INFO_COMMAND_USER_USER_INFO: `>> User Information`,
    INFO_COMMAND_USER_USER_FLAGS: `>> User Flags`,
    INFO_COMMAND_USER_MEMBER_FLAGS: `>> Server Member Flags`,
    INFO_COMMAND_USER_BOT_INFO: `>> Bot Information`,
    INFO_COMMAND_USER_BOT_FLAGS: `>> Bot Flags`,
    INFO_COMMAND_USER_ROLES: `{{0}} Roles`,

    INFO_COMMAND_USER_BUTTON_ROLES: `Roles`,
    INFO_COMMAND_USER_BUTTON_MEMBER_AVATAR: `Member Avatar`,
    INFO_COMMAND_USER_BUTTON_GLOBAL_AVATAR: `Global Avatar`,
    INFO_COMMAND_USER_BUTTON_GLOBAL_BANNER: `Global Banner`,
    INFO_COMMAND_USER_AVATAR_DECORATION: `Avatar Decoration`,


    INFO_COMMAND_INVITE_ERROR_INVALID_INVITE: `Sorry, either that wasn't a valid Server Invite, or the Invite doesn't exist on Discord!`,

    INFO_COMMAND_INVITE_DATA: `Data for Invite Code:`,
    INFO_COMMAND_INVITE_CREATOR: `**Inviter:**`,
    INFO_COMMAND_INVITE_CREATOR_IS_BOT: `**Inviter is Bot:**`,
    INFO_COMMAND_INVITE_CREATED: `**Created:**`,
    INFO_COMMAND_INVITE_EXPIRES: `**Expires:**`,

    INFO_COMMAND_INVITE_CHANNEL_TYPE: `**Channel Type:**`,
    INFO_COMMAND_INVITE_CHANNEL_NAME: `**Channel Name:**`,
    INFO_COMMAND_INVITE_TARGET_TYPE: `**Target Type:**`,
    INFO_COMMAND_INVITE_TARGET_STREAM: `Screenshare`,
    INFO_COMMAND_INVITE_TARGET_ACTIVITY: `Voice Activity`,
    INFO_COMMAND_INVITE_TARGET_ACTIVITY_NAME: `**Activity Name:**`,

    INFO_COMMAND_INVITE_SERVER_NAME: `**Server Name:**`,
    INFO_COMMAND_INVITE_SERVER_PARTNERED: `**Is Partnered:**`,
    INFO_COMMAND_INVITE_SERVER_VERIFIED: `**Is Verified:**`,
    INFO_COMMAND_INVITE_SERVER_BOOST_COUNT: `**Boost Count:**`,
    INFO_COMMAND_INVITE_SERVER_TOTAL_MEMBERS: `**Approximate Total Members:**`,
    INFO_COMMAND_INVITE_SERVER_ONLINE_MEMBERS: `**Approximate Online Members:**`,

    INFO_COMMAND_INVITE_GENERAL_INFO: `>> General Information`,
    INFO_COMMAND_INVITE_TARGET_INFO: `>> Target Information`,
    INFO_COMMAND_INVITE_SERVER_INFO: `>> Server Information`,
    INFO_COMMAND_INVITE_SERVER_FLAG_INFO: `>> Server Feature Flags`,

    INFO_COMMAND_INVITE_BUTTON_JOIN: `Join Server`,


    INFO_COMMAND_BOT_INFO: `HeccBot Information`,
    INFO_COMMAND_BOT_DEVELOPER: `Developer`,
    INFO_COMMAND_BOT_BOT_VERSION: `Bot's Version`,
    INFO_COMMAND_BOT_DISCORDJS_VERSION: `Discord.JS Version`,
    INFO_COMMAND_BOT_GLOBAL_COMMANDS: `Global Commands`,
    INFO_COMMAND_BOT_SERVER_COMMANDS: `Server Commands`,
    INFO_COMMAND_BOT_TOTAL_COMMANDS: `Total Commands`,
    INFO_COMMAND_BOT_SERVER_COUNT: `Approximate Server Count`,

    INFO_COMMAND_BOT_BUTTON_PRIVACY: `Privacy Policy`,
    INFO_COMMAND_BOT_BUTTON_LICENSE: `License`,
    INFO_COMMAND_BOT_BUTTON_GITHUB: `GitHub`,
    INFO_COMMAND_BOT_BUTTON_CHANGELOG: `Changelogs`,


    // Yay! That's it for INFO command! Now to move on to everything else...
    
    // ******* DSTATUS COMMAND
    DSTATUS_COMMAND_ERROR_THREAD_INVALID: `Sorry, but a Thread cannot be selected if its within a Text or Announcement Channel.\nIf you want to subscribe a Thread to the Discord Outage Feed, please pick a Thread that is within a Forum Channel.\nOtherwise, you can select a standard Text Channel instead.`,
    DSTATUS_COMMAND_ERROR_MISSING_PERMISSIONS: `Sorry, but my Discord Outage Feed cannot be subscribed to Channels (or Forum Posts) in which I do not have *both* the **View Channel** and **Manage Webhooks** Permissions for!\nPlease try again, once I have been granted those Permissions in that Channel.`,
    DSTATUS_COMMAND_ERROR_SUBSCRIPTION_GENERIC: `Sorry, but something went wrong while trying to subscribe to the Discord Outage Feed...`,
    DSTATUS_COMMAND_ERROR_ALREADY_SUBSCRIBED: `This Server is already subscribed to the Discord Outage Feed!\nIf you want to remove an existing Feed in this Server, please use the {{0}} Command.`,
    DSTATUS_COMMAND_ERROR_NOT_CURRENTLY_SUBSCRIBED: `There is no found Discord Outage Feed for this Server - as such, you cannot unsubscribe from a non-existent Feed subscription!`,
    DSTATUS_COMMAND_ERROR_WEBHOOK_DELETION_FAILED: `An error occurred while I was trying to delete the Webhook for this Feed.\nYou will have to delete the Webhook manually in Server Settings > Integrations.`,
    DSTATUS_COMMAND_ERROR_UNSUBSCRIPTION_GENERIC: `Sorry, something went wrong while trying to unsubscribe from the Discord Outage Feed...`,

    DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS_AUDIT_LOG: `{{0}} subscribed to the Discord Outage Feed`,
    DSTATUS_COMMAND_SUBSCRIPTION_SUCCESS: `Successfully subscribed this Server to the Discord Outage Feed!\nAny Discord Outages will be notified about in the {{0}} Channel.`,
    DSTATUS_COMMAND_UNSUBSCRIPTION_SUCCESS_AUDIT_LOG: `{{0}} unsubscribed from the Discord Outage Feed`,
    DSTATUS_COMMAND_UNSUBSCRIPTION_SUCCESS: `Successfully unsubscribed from the Discord Outage Feed.\nThis Server will no longer receive notifications from this Bot about Discord's Outages.{{0}}`,



    // ******* JAIL COMMAND
    JAIL_COMMAND_SUCCESS: `**{{0}}** was sent to jail by **{{1}}**!`,
    JAIL_COMMAND_ERROR_CANNOT_JAIL_SELF: `You cannot send yourself to jail!`
};
