import { API, MessageFlags } from '@discordjs/core';
import { GuildVerificationLevel, GuildExplicitContentFilter, GuildDefaultMessageNotifications, GuildMFALevel, GuildOnboardingMode, ChannelType } from 'discord-api-types/v10';
import { EmbedBuilder } from '@discordjs/builders';
import { localize } from '../../../Utility/localizeResponses.js';
import { titleCaseGuildFeature } from '../../../Utility/utilityMethods.js';
import { DISCORD_APP_USER_ID } from '../../../config.js';
import { readableNSFWLevel } from '../../../Modules/InfoCmdModule.js';



// Methods needed

/**
 * Readable Guild verification Level
 * @param {GuildVerificationLevel} verificationLevel 
 * @param {String} locale 
 * 
 * @returns {String}
 */
function _readableVerificationLevel(verificationLevel, locale) {
    switch (verificationLevel) {
        case GuildVerificationLevel.None:
            return localize(locale, 'INFO_READABLE_GUILD_VERIFICATION_NONE');

        case GuildVerificationLevel.Low:
            return localize(locale, 'INFO_READABLE_GUILD_VERIFICATION_LOW');

        case GuildVerificationLevel.Medium:
            return localize(locale, 'INFO_READABLE_GUILD_VERIFICATION_MEDIUM');

        case GuildVerificationLevel.High:
            return localize(locale, 'INFO_READABLE_GUILD_VERIFICATION_HIGH');

        case GuildVerificationLevel.VeryHigh:
            return localize(locale, 'INFO_READABLE_GUILD_VERIFICATION_VERY_HIGH');
    }
}


/**
 * Readable Guild Explicit Level
 * @param {GuildExplicitContentFilter} explicitLevel 
 * @param {String} locale 
 * 
 * @returns {String}
 */
function _readableExplicitFilter(explicitLevel, locale) {
    switch (explicitLevel) {
        case GuildExplicitContentFilter.Disabled:
            return localize(locale, 'INFO_READABLE_GUILD_EXPLICIT_FILTER_DISABLED');

        case GuildExplicitContentFilter.MembersWithoutRoles:
            return localize(locale, 'INFO_READABLE_GUILD_EXPLICIT_FILTER_ROLELESS');

        case GuildExplicitContentFilter.AllMembers:
            return localize(locale, 'INFO_READABLE_GUILD_EXPLICIT_FILTER_EVERYONE');
    }
}


/**
 * Readable Guild Default Notification Setting
 * @param {GuildDefaultMessageNotifications} notificationDefaults 
 * @param {String} locale 
 * 
 * @returns {String}
 */
function _readableDefaultNotifications(notificationDefaults, locale) {
    switch (notificationDefaults) {
        case GuildDefaultMessageNotifications.AllMessages:
            return localize(locale, 'INFO_READABLE_DEFAULT_NOTIFICATIONS_ALL_MESSAGES');

        case GuildDefaultMessageNotifications.OnlyMentions:
            return localize(locale, 'INFO_READABLE_DEFAULT_NOTIFICATIONS_ONLY_MENTIONS');
    }
}


/**
 * Readable Guild Moderation MFA Setting
 * @param {GuildMFALevel} mfaLevel 
 * @param {String} locale 
 * 
 * @returns {String}
 */
function _readableMFALevel(mfaLevel, locale) {
    switch (mfaLevel) {
        case GuildMFALevel.None:
            return localize(locale, 'INFO_READABLE_GUILD_MFA_NONE');

        case GuildMFALevel.Elevated:
            return localize(locale, 'INFO_READABLE_GUILD_MFA_ENABLED');
    }
}


/**
 * Readable Guild Onboarding Mode
 * @param {GuildOnboardingMode} onboardingMode
 * @param {String} locale 
 * 
 * @returns {String}
 */
function _readableOnboardingMode(onboardingMode, locale) {
    switch (onboardingMode) {
        case GuildOnboardingMode.OnboardingDefault:
            return localize(locale, 'INFO_SERVER_ONBOARDING_MODE_DEFAULT');

        case GuildOnboardingMode.OnboardingAdvanced:
            return localize(locale, 'INFO_SERVER_ONBOARDING_MODE_ADVANCED');
    }
}


export const Button = {
    /** The Button's name - set as the START of the Button's Custom ID, with extra data being separated with a "_" AFTER the name
     * @example "buttonName_extraData"
     * @type {String}
     */
    name: "info-server",

    /** Button's Description, mostly for reminding me what it does!
     * @type {String}
     */
    description: "Displays either extra info about the Server, or its feature flags",

    /** Button's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 10,

    /** Runs the Button
     * @param {import('discord-api-types/v10').APIMessageComponentButtonInteraction} interaction 
     * @param {API} api
     * @param {import('discord-api-types/v10').APIUser} interactionUser 
     */
    async executeButton(interaction, api, interactionUser) {
        await api.interactions.defer(interaction.id, interaction.token, { flags: MessageFlags.Ephemeral });

        // Check what extra info was requested
        const ExtraInfoKey = interaction.data.custom_id.split("_").pop();

        if ( ExtraInfoKey === "feature-flags" ) {
            // Show Server's Feature Flags (when used in a Guild Context)
            let fetchedGuild = await api.guilds.get(interaction.guild_id, { with_counts: false });
            let featureFlags = [];
            fetchedGuild.features.forEach(flag => featureFlags.push(titleCaseGuildFeature(flag)));

            // Make Embed for these to display in
            const FeatureFlagEmbed = new EmbedBuilder().setTitle(localize(interaction.locale, 'INFO_SERVER_HEADER_FEATURE_FLAGS')).setDescription(`${featureFlags.sort().join(', ').slice(0, 4095)}`);

            // ACK
            await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, { embeds: [FeatureFlagEmbed] }, '@original');



        }
        else if ( ExtraInfoKey === "extra-info" ) {
            // Show other general information about the Server (when used in a Guild Context)
            let fetchedGuild = await api.guilds.get(interaction.guild_id, { with_counts: false });

            // Misc Information
            let miscInformation = ``;
            miscInformation += `**${localize(interaction.locale, 'INFO_SERVER_VERIFICATION_LEVEL')}** ${_readableVerificationLevel(fetchedGuild.verification_level, interaction.locale)}`;
            miscInformation += `\n**${localize(interaction.locale, 'INFO_SERVER_EXPLICIT_FILTER')}** ${_readableExplicitFilter(fetchedGuild.explicit_content_filter, interaction.locale)}`;
            miscInformation += `\n**${localize(interaction.locale, 'INFO_SERVER_MFA_MODERATION')}** ${_readableMFALevel(fetchedGuild.mfa_level, interaction.locale)}`;
            miscInformation += `\n**${localize(interaction.locale, 'INFO_SERVER_NSFW_LEVEL')}** ${readableNSFWLevel(fetchedGuild.nsfw_level, interaction.locale)}`;
            miscInformation += `\n**${localize(interaction.locale, 'INFO_SERVER_DEFAULT_NOTIFICATIONS')}** ${_readableDefaultNotifications(fetchedGuild.default_message_notifications, interaction.locale)}`;

            // Onboarding Info - ONLY IF ENABLED
            let onboardingInformation = ``;
            if ( fetchedGuild.features.includes("COMMUNITY") ) {
                const FetchedOnboarding = await api.guilds.getOnboarding(interaction.guild_id);
                onboardingInformation += `**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_IS_ENABLED')}** ${FetchedOnboarding.enabled ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}`;

                if ( FetchedOnboarding.enabled ) {
                    onboardingInformation += `\n**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_MODE')}** ${_readableOnboardingMode(FetchedOnboarding.mode, interaction.locale)}`;
                    onboardingInformation += `\n**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_TOTAL_DEFAULT_CHANNELS')}** ${FetchedOnboarding.default_channel_ids.length}`;

                    let prejoinPrompts = FetchedOnboarding.prompts.filter(questionPrompt => questionPrompt.in_onboarding === true);
                    let postjoinPrompts = FetchedOnboarding.prompts.filter(questionPrompt => questionPrompt.in_onboarding === false);

                    onboardingInformation += `\n**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_TOTAL_PROMPTS')}** ${FetchedOnboarding.prompts.length}`;
                    onboardingInformation += `\n**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_TOTAL_PREJOIN_PROMPTS')}** ${prejoinPrompts.length}`;
                    onboardingInformation += `\n**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_TOTAL_POSTJOIN_PROMPTS')}** ${postjoinPrompts.length}`;
                }
            }

            // Thread Info
            let threadInformation = ``;
            let publicThreadCount = 0;
            let newsThreadCount = 0;
            // let forumThreadCount = 0; // Sadly not able to do this one anymore since Discord's raw API doesn't provide the Channel Type of a Channel's Parent Channel. Is it so much to ask for a channel.parent object that includes both the parent's ID *and* channel type?
            let totalThreadCount = 0;
            const FetchedThreads = (await api.guilds.getActiveThreads(interaction.guild_id)).threads;

            FetchedThreads.forEach(thread => {
                // Threads in Announcement Channels
                if ( thread.type === ChannelType.AnnouncementThread ) { newsThreadCount += 1; totalThreadCount += 1; }
                else if ( thread.type === ChannelType.PublicThread ) { publicThreadCount += 1; totalThreadCount += 1; }
            })

            if ( totalThreadCount > 0 ) {
                threadInformation += `**${localize(interaction.locale, 'INFO_SERVER_THREADS_FULL_TOTAL')}** ${totalThreadCount}`;
                if ( publicThreadCount > 0 ) { threadInformation += `${threadInformation.length > 2 ? `\n` : ''}**${localize(interaction.locale, 'INFO_SERVER_THREADS_PUBLIC_TOTAL')}** ${publicThreadCount}`; }
                if ( newsThreadCount > 0 ) { threadInformation += `${threadInformation.length > 2 ? `\n` : ''}**${localize(interaction.locale, 'INFO_SERVER_THREADS_NEWS_TOTAL')}** ${newsThreadCount}`; }
                threadInformation += `${threadInformation.length > 2 ? `\n` : ''}-# ${localize(interaction.locale, 'INFO_SERVER_THREADS_DISCLAIMER')}`;
            }

            // Make Embed
            const ExtraInfoEmbed = new EmbedBuilder();
            if ( threadInformation.length > 1 ) { ExtraInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_SERVER_HEADER_THREADS'), value: threadInformation }); }
            if ( onboardingInformation.length > 1 ) { ExtraInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_SERVER_HEADER_ONBOARDING'), value: onboardingInformation }); }
            ExtraInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_SERVER_HEADER_MISCELLANEOUS'), value: miscInformation });

            await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, { embeds: [ExtraInfoEmbed] }, '@original');



        }

        return;
    }
}
