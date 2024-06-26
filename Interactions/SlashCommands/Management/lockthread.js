const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, PermissionFlagsBits, ChannelType, PermissionsBitField } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { fetchDisplayName } = require("../../../constants");
const { LogToUserInteraction } = require("../../../BotModules/LoggingModule");

// Just to make it easy for me lol
const ThreadTypes = [ ChannelType.AnnouncementThread, ChannelType.PrivateThread, ChannelType.PublicThread ];

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "lockthread",

    // Command's Description
    Description: `Lock the Thread/Post this Command is used in, preventing non-Moderators from reopening it`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Lock the Thread/Post this Command is used in, preventing non-Moderators from reopening it`,
        'en-US': `Lock the Thread/Post this Command is used in, preventing non-Moderators from reopening it`
    },

    // Command's Category
    Category: "MANAGEMENT",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 15,

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
        Data.default_member_permissions = new PermissionsBitField(PermissionFlagsBits.ManageThreads).bitfield.toString();

        return Data;
    },



    /**
     * Executes the Slash Command
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction)
    {
        await interaction.deferReply({ ephemeral: true });

        // Reject if used outside of Threads/Posts
        if ( !ThreadTypes.includes(interaction.channel.type) ) { await interaction.editReply({ content: localize(interaction.locale, 'LOCKTHREAD_COMMAND_ERROR_NOT_IN_THREAD') }); return; }

        // Ensure HeccBot has permissions
        if ( !interaction.appPermissions.has(PermissionFlagsBits.ManageThreads) ) { await interaction.editReply({ content: localize(interaction.locale, 'LOCKTHREAD_COMMAND_ERROR_MISSING_MANAGE_THREADS_PERMISSION') }); return; }

        // Ensure Command User is Thread Owner
        if ( interaction.channel.ownerId !== interaction.user.id )
        {
            // If not Thread Owner, check for "Manage Threads" Permission
            if ( !interaction.memberPermissions.has(PermissionFlagsBits.ManageThreads) )
            {
                await interaction.editReply({ content: localize(interaction.locale, 'LOCKTHREAD_COMMAND_ERROR_NOT_THREAD_OWNER') });
                return;
            }
        }


        // Attempt to close Thread
        await interaction.channel.setLocked(true, localize(interaction.guildLocale, 'LOCKTHREAD_COMMAND_AUDIT_LOG', fetchDisplayName(interaction.user, true)))
        .then(async () => {
            // Success, ACK
            await interaction.editReply({ content: localize(interaction.locale, 'LOCKTHREAD_COMMAND_SUCCESS_THREAD') });
            return;
        })
        .catch(async err => {
            // Error
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
