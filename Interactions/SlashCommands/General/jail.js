const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, PermissionFlagsBits, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');
const { localize } = require("../../../BotModules/LocalizationModule.js");
const { LogToUserInteraction } = require("../../../BotModules/LoggingModule.js");
const { IMAGE_CELL_BARS } = require("../../../Resources/Hyperlinks.js");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "jail",

    // Command's Description
    Description: `Send a naughty User to jail!`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Send a naughty User to jail!`,
        'en-US': `Send a naughty User to jail!`
    },

    // Command's Category
    Category: "GENERAL",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 10,

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
        Data.defaultMemberPermissions = PermissionFlagsBits.AttachFiles;
        Data.options = [
            {
                type: ApplicationCommandOptionType.User,
                name: "user",
                description: "User to throw in jail",
                descriptionLocalizations: {
                    'en-GB': `User to throw in jail`,
                    'en-US': `User to throw in jail`
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
        // Permission check
        if ( !interaction.appPermissions.has(PermissionFlagsBits.AttachFiles) )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'JAIL_COMMAND_ERROR_MISSING_ATTACH_FILES_PERMISSION') });
            return;
        }

        const InputMember = interaction.options.getMember("user");

        // Error if User tried putting in a different User that isn't in the Guild
        if ( (!InputMember || InputMember == null) && (interaction.options.data.length > 0) )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'JAIL_COMMAND_ERROR_USER_NOT_IN_GUILD') });
            return;
        }

        // Prevent usage on self
        if ( InputMember.id === interaction.user.id )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'JAIL_COMMAND_ERROR_CANNOT_JAIL_SELF') });
            return;
        }

        // Defer just in case
        await interaction.deferReply();


        // Create Canvas
        const JailConvas = Canvas.createCanvas(180, 135);
        const JailContext = JailConvas.getContext('2d');

        // Grab User's profile picture using undici for better performance
        const { body } = await request(InputMember.displayAvatarURL({ extension: 'png', size: 128 }));
        const MemberAvatar = await Canvas.loadImage(await body.arrayBuffer());
        JailContext.drawImage(MemberAvatar, 26, 3, 128, 128);

        // Add in Jail Cell Bars image
        const CellBarsRaw = (await request(IMAGE_CELL_BARS)).body;
        const CellBarsImage = await Canvas.loadImage(await CellBarsRaw.arrayBuffer());
        JailContext.drawImage(CellBarsImage, 0, 0, JailConvas.width, JailConvas.height);

        // Create Attachment & send!
        const JailAttachment = new AttachmentBuilder(await JailConvas.encode('png'), { name: 'jailed-user.png' });
        
        await interaction.editReply({ files: [JailAttachment], content: localize(interaction.locale, 'JAIL_COMMAND_SUCCESS', InputMember.displayName, interaction.member.displayName) })
        .catch(async err => {
            await LogToUserInteraction(interaction, null, err);
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
