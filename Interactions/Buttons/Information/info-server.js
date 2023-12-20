const { ButtonInteraction, GuildNSFWLevel, GuildMFALevel, GuildDefaultMessageNotifications, GuildExplicitContentFilter, GuildVerificationLevel, GuildOnboardingMode, EmbedBuilder } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule.js");


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
 * Readable Onboarding Mode
 * @param {GuildOnboardingMode} onboardingMode 
 * @param {String} locale Locale from Command
 * @returns {String}
 */
function readableOnboardingMode(onboardingMode, locale)
{
    let readableString = "";
    switch(onboardingMode)
    {
        case GuildOnboardingMode.OnboardingDefault:
            readableString = localize(locale, 'INFO_SERVER_ONBOARDING_MODE_DEFAULT');
            break;

        case GuildOnboardingMode.OnboardingAdvanced:
            readableString = localize(locale, 'INFO_SERVER_ONBOARDING_MODE_ADVANCED');
            break;
    }
    return readableString;
}



module.exports = {
    // Button's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "info-server",

    // Button's Description
    Description: `Handles showing extra information for the Info Server Subcommand`,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 15,



    /**
     * Executes the Button
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction)
    {
        await interaction.deferReply({ ephemeral: true });

        const CurrentGuild = interaction.guild;

        // Miscellaneous Info
        let miscInfoString = `**${localize(interaction.locale, 'INFO_SERVER_VERIFICATION_LEVEL')}** ${readableVerificationLevel(CurrentGuild.verificationLevel, interaction.locale)}
**${localize(interaction.locale, 'INFO_SERVER_EXPLICIT_FILTER')}** ${readableExplicitFilter(CurrentGuild.explicitContentFilter, interaction.locale)}
**${localize(interaction.locale, 'INFO_SERVER_MFA_MODERATION')}** ${readableMFALevel(CurrentGuild.mfaLevel, interaction.locale)}
**${localize(interaction.locale, 'INFO_SERVER_NSFW_LEVEL')}** ${readableNSFWLevel(CurrentGuild.nsfwLevel, interaction.locale)}
**${localize(interaction.locale, 'INFO_SERVER_DEFAULT_NOTIFICATIONS')}** ${readableDefaultNotification(CurrentGuild.defaultMessageNotifications, interaction.locale)}`;


        // Onboarding Info - ONLY IF SERVER IS COMMUNITY ENABLED
        let onboardingInfoString = "";

        if ( CurrentGuild.features.includes("COMMUNITY") )
        {
            const FetchedOnboarding = await CurrentGuild.fetchOnboarding();
            onboardingInfoString += `**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_IS_ENABLED')}** ${FetchedOnboarding.enabled ? localize(interaction.locale, 'TRUE') : localize(interaction.locale, 'FALSE')}`;
            
            // Do the rest only if Onboarding is actually enabled!
            if ( FetchedOnboarding.enabled )
            {
                onboardingInfoString += `\n**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_MODE')}** ${readableOnboardingMode(FetchedOnboarding.mode, interaction.locale)}`;
                onboardingInfoString += `\n**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_TOTAL_DEFAULT_CHANNELS')}** ${FetchedOnboarding.defaultChannels.size}`;

                let onboardingPrompts = FetchedOnboarding.prompts;
                let prejoinPrompts = onboardingPrompts.filter(prompt => prompt.inOnboarding === true);
                let postjoinPrompts = onboardingPrompts.filter(prompt => prompt.inOnboarding === false);

                onboardingInfoString += `\n**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_TOTAL_PREJOIN_PROMPTS')}** ${prejoinPrompts.size}`;
                onboardingInfoString += `\n**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_TOTAL_POSTJOIN_PROMPTS')}** ${postjoinPrompts.size}`;
                onboardingInfoString += `\n**${localize(interaction.locale, 'INFO_SERVER_ONBOARDING_TOTAL_PROMPTS')}** ${onboardingPrompts.size}`;
            }
        }


        // Embed time!
        const ExtraInfoEmbed = new EmbedBuilder();
        
        if ( CurrentGuild.icon != null ) { ExtraInfoEmbed.setAuthor({ name: CurrentGuild.name, iconURL: CurrentGuild.iconURL() }); }
        else { ExtraInfoEmbed.setAuthor({ name: CurrentGuild.name }); }

        if ( onboardingInfoString.length > 1 ) { ExtraInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_SERVER_HEADER_ONBOARDING'), value: onboardingInfoString }); }
        ExtraInfoEmbed.addFields({ name: localize(interaction.locale, 'INFO_SERVER_HEADER_MISCELLANEOUS'), value: miscInfoString });

        await interaction.editReply({ embeds: [ExtraInfoEmbed] });
        return;
    }
}
