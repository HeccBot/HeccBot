const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, PermissionFlagsBits, ChannelType } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { fetchDisplayName } = require("../../../constants");
const { LogToUserInteraction } = require("../../../BotModules/LoggingModule");

// Just to make it easy for me lol
const ThreadTypes = [ ChannelType.AnnouncementThread, ChannelType.PrivateThread, ChannelType.PublicThread ];

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "closethread",

    // Command's Description
    Description: `Close the Thread/Post this Command is used in`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Close the Thread/Post this Command is used in`,
        'en-US': `Close the Thread/Post this Command is used in`
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
        Data.descriptionLocalizations = this.LocalisedDescriptions;
        Data.type = ApplicationCommandType.ChatInput;
        Data.dmPermission = false;

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
        if ( !ThreadTypes.includes(interaction.channel.type) ) { await interaction.editReply({ content: localize(interaction.locale, 'CLOSETHREAD_COMMAND_ERROR_NOT_IN_THREAD') }); return; }

        // Ensure HeccBot has permissions
        if ( !interaction.appPermissions.has(PermissionFlagsBits.ManageThreads) ) { await interaction.editReply({ content: localize(interaction.locale, 'CLOSETHREAD_COMMAND_ERROR_MISSING_MANAGE_THREADS_PERMISSION') }); return; }

        // Ensure Command User is Thread Owner
        if ( interaction.channel.ownerId !== interaction.user.id )
        {
            // If not Thread Owner, check for "Manage Threads" Permission
            if ( !interaction.memberPermissions.has(PermissionFlagsBits.ManageThreads) )
            {
                await interaction.editReply({ content: localize(interaction.locale, 'CLOSETHREAD_COMMAND_ERROR_NOT_THREAD_OWNER') });
                return;
            }
        }


        // Attempt to close Thread
        await interaction.channel.setArchived(true, localize(interaction.guildLocale, 'CLOSETHREAD_COMMAND_AUDIT_LOG', fetchDisplayName(interaction.user, true)))
        .then(async () => {
            // Success, ACK
            await interaction.editReply({ content: localize(interaction.locale, 'CLOSETHREAD_COMMAND_SUCCESS_THREAD') });
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
