const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, PermissionFlagsBits, GuildMember, ThreadMember, ThreadChannel } = require("discord.js");
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
        Data.descriptionLocalizations = this.LocalisedDescriptions;
        Data.type = ApplicationCommandType.ChatInput;
        Data.dmPermission = false;
        Data.defaultMemberPermissions = PermissionFlagsBits.MentionEveryone;

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

        // If Command used in Threads
        if ( interaction.channel instanceof ThreadChannel )
        {
            // Fetch & grab a random Member of the Thread
            const ThreadMembers = await interaction.channel.members.fetch();
            randomMember = ThreadMembers.random();
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
