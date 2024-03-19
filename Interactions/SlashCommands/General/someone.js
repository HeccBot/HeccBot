const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, PermissionFlagsBits, GuildMember, ThreadMember, ThreadChannel, ChannelType, Collection, PermissionsBitField } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "someone",

    // Command's Description
    Description: `Simulates an @someone mention, just like Discord's old April Fools feature!`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Simulates an @someone mention, just like Discord's old April Fools feature!`,
        'en-US': `Simulates an @someone mention, just like Discord's old April Fools feature!`
    },

    // Command's Category
    Category: "GENERAL",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 60,

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
        Data.default_member_permissions = new PermissionsBitField(PermissionFlagsBits.MentionEveryone).bitfield.toString();

        return Data;
    },



    /**
     * Executes the Slash Command
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction)
    {
        /** @type {GuildMember|ThreadMember} */
        let randomMember;
        // Just in case interaction.channel is null due to cache or not having access to that Channel (such as Threads)
        if ( interaction.channel === null ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SOMEONE_COMMAND_ERROR_CHANNEL_CHANNEL_NOT_FOUND') }); return; }

        // If Command used in Public Threads
        if ( interaction.channel.type === ChannelType.PublicThread )
        {
            // Fetch & grab a random Member of the Thread
            const ThreadMembers = await interaction.channel.members.fetch()
            .catch(async err => {
                // Just in case of "Missing Access" error for SOME REASON IDK WHAT
                await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SOMEONE_COMMAND_ERROR_CHANNEL_MISSING_ACCESS') });
                return;
            });
            if ( !(ThreadMembers instanceof Collection) ) { return; }
            randomMember = ThreadMembers.random();
        }
        // Private Threads not supported
        else if ( interaction.channel.type === ChannelType.PrivateThread )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'SOMEONE_COMMAND_ERROR_PRIVATE_THREADS_UNSUPPORTED') });
            return;
        }
        // If Command used in literally any other Guild-based Channel Type
        else
        {
            // Fetch & grab a random Server Member who also has access to this Channel (or is connected to the Channel in case of Voice/Stage Channels)
            randomMember = interaction.channel.members.random();
        }

        // Send in chat!
        await interaction.reply({
            allowedMentions: { parse: [] },
            content: localize(interaction.guildLocale, 'SOMEONE_COMMAND_RESPONSE', randomMember.displayName)
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
