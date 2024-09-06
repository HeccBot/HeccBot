import { PermissionFlagsBits } from 'discord-api-types/v10';


// *******************************
//  Exports

/**
 * Checks the Tag/Discrim of the given APIUser, to see if they're on the new Username System or not.
 * 
 * Note: This shouldn't be used as much now that all non-App/Bot Users HAVE been fully migrated at this point
 * @param {import('discord-api-types/v10').APIUser} user 
 * 
 * @returns {Boolean} True if on the new Username System
 */
export function checkPomelo(user) {
    if ( user.discriminator === '0' ) { return true; }
    else { return false; }
}

/**
 * Gets the highest-level display name for the provided User or Member
 * @param {import('discord-api-types/v10').APIUser|import('discord-api-types/v10').APIGuildMember} userMember 
 * @param {Boolean?} ignoreNicknames Set as True to ignore Guild Nicknames, if using APIGuildMember
 * 
 * @returns {String} The highest-level display name - be it the Guild Nickname, User's Display Name, or User's Username
 */
export function getHighestName(userMember, ignoreNicknames) {
    let highestName = "";
    let isPomelo = true;

    // Pomelo checks. Basically, if an App, they're not on Pomelo!
    if ( (userMember instanceof APIUser) && userMember.bot ) { isPomelo = false; }
    if ( (userMember instanceof APIGuildMember) && userMember.user?.bot ) { isPomelo = false; }

    // Usernames
    highestName = userMember instanceof APIGuildMember ? `@${userMember.user?.username}${isPomelo ? '' : `#${userMember.user?.discriminator}`}`
        : `@${userMember.username}${isPomelo ? '' : `#${userMember.discriminator}`}`;

    // Display Names override Usernames
    if ( (userMember instanceof APIUser) && (userMember.global_name != null) ) { highestName = userMember.global_name; }
    if ( (userMember instanceof APIGuildMember) && (userMember.user.global_name != null) ) { highestName = userMember.user.global_name; }

    // Guild Nicknames override Display Names, if a Guild Member was provided
    if ( !ignoreNicknames && (userMember instanceof APIGuildMember) && (userMember.nick != null) ) { highestName = userMember.nick; }

    return highestName;
}

/**
 * Checks if the App can use External Server Emojis in its Interaction responses
 * @param {import('discord-api-types/v10').APIInteraction} interaction 
 * 
 * @returns {Boolean} True if App does have USE_EXTERNAL_EMOJIS Permission
 */
export function checkExternalEmojiPermission(interaction) {
    let hasPermission = false;

    if ( (interaction.app_permissions & PermissionFlagsBits.UseExternalEmojis) == PermissionFlagsBits.UseExternalEmojis ) { hasPermission = true; }

    return hasPermission;
}

/**
 * Convert raw Guild Feature Flags into title case
 * @param {String} featureFlag
 * 
 * @returns {String}
 */
export function titleCaseGuildFeature(featureFlag) {
    return featureFlag.toLowerCase()
    .replace(/guild/, "server")
    .split("_")
    .map(subString => subString.charAt(0).toUpperCase() + subString.slice(1))
    .join(" ");
}
