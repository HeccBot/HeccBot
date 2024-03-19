const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, PermissionFlagsBits, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule.js");
const { fetchDisplayName } = require("../../../constants.js");
const { LogToUserInteraction } = require("../../../BotModules/LoggingModule.js");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "lockemoji",

    // Command's Description
    Description: `Upload a new Custom Emoji to this Server, and lock it behind a Role`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Upload a new Custom Emoji to this Server, and lock it behind a Role`,
        'en-US': `Upload a new Custom Emoji to this Server, and lock it behind a Role`
    },

    // Command's Category
    Category: "MANAGEMENT",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 30,

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
        Data.default_member_permissions = new PermissionsBitField(PermissionFlagsBits.ManageRoles).bitfield.toString();
        Data.options = [
            {
                type: ApplicationCommandOptionType.Attachment,
                name: "emoji",
                description: "PNG or GIF of your Custom Emoji",
                description_localizations: {
                    'en-GB': `PNG or GIF of your Custom Emoji`,
                    'en-US': `PNG or GIF of your Custom Emoji`
                },
                required: true
            },
            {
                type: ApplicationCommandOptionType.Role,
                name: "role",
                description: "Role to lock your Custom Emoji behind",
                description_localizations: {
                    'en-GB': `Role to lock your Custom Emoji behind`,
                    'en-US': `Role to lock your Custom Emoji behind`
                },
                required: true
            }
        ];

        return Data;
    },



    /**
     * Executes the Slash Command
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction)
    {
        // Ensure HeccBot has Permission
        if ( !interaction.appPermissions.has(PermissionFlagsBits.ManageGuildExpressions) )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'LOCKEMOJI_COMMAND_ERROR_MISSING_MANAGE_EXPRESSIONS_PERMISSION') });
            return;
        }

        // Ensure not currently in an outage
        if ( !interaction.guild.available )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ERROR_COMMAND_OUTAGE') });
            return;
        }

        // Grab Inputs
        const InputAttachment = interaction.options.getAttachment("emoji", true);
        const InputRole = interaction.options.getRole("role", true);

        // Ensure valid Attachment File Type
        if ( InputAttachment.contentType !== "image/png" && InputAttachment.contentType !== "image/gif" )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'LOCKEMOJI_COMMAND_ERROR_INVALID_FILE_TYPE') });
            return;
        }

        // Ensure valid Attachment File Size
        if ( InputAttachment.size >= 256000 )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'LOCKEMOJI_COMMAND_ERROR_FILE_TOO_LARGE') });
            return;
        }

        // Defer just in case
        await interaction.deferReply({ ephemeral: true });


        // Attempt upload to Server
        await interaction.guild.emojis.create({ attachment: InputAttachment.url, name: InputAttachment.name.slice(0, -4), roles: [InputRole.id], reason: localize(interaction.locale, 'LOCKEMOJI_COMMAND_AUDIT_LOG_EMOJI_UPLOADED', fetchDisplayName(interaction.user, true)) })
        .then(async newEmoji => {
            await interaction.editReply({ content: localize(interaction.locale, 'LOCKEMOJI_COMMAND_UPLOAD_SUCCESS') });
            return;
        })
        .catch(async err => {
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
