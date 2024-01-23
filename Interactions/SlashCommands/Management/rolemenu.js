const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, PermissionFlagsBits, ApplicationCommandOptionType, ChannelType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { Collections } = require("../../../constants");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "rolemenu",

    // Command's Description
    Description: `Use to create Button Role Menus`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Use to create Button Role Menus`,
        'en-US': `Use to create Button Role Menus`
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
        Data.descriptionLocalizations = this.LocalisedDescriptions;
        Data.type = ApplicationCommandType.ChatInput;
        Data.dmPermission = false;
        Data.defaultMemberPermissions = PermissionFlagsBits.ManageRoles;
        Data.options = [
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "create",
                description: "Create a new Button Role Menu",
                descriptionLocalizations: {
                    'en-GB': `Create a new Button Role Menu`,
                    'en-US': `Create a new Button Role Menu`
                },
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
        // Ensure only used in Text Channels
        if ( interaction.channel.type !== ChannelType.GuildText )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ROLE_MENU_ERROR_INVALID_CHANNEL') });
            return;
        }

        // Ensure HeccBot has MANAGE_ROLES Permission
        if ( !interaction.appPermissions.has(PermissionFlagsBits.ManageRoles) )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ROLE_MENU_ERROR_MISSING_MANAGE_ROLES_PERMISSION') });
            return;
        }

        const SubcommandName = interaction.options.getSubcommand(true);

        if ( SubcommandName === "create" )
        {
            // Ensure HeccBot has SEND_MESSAGES Permission
            if ( !interaction.appPermissions.has(PermissionFlagsBits.SendMessages) )
            {
                await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ROLE_MENU_ERROR_MISSING_SEND_MESSAGES_PERMISSION') });
                return;
            }

            // Ensure there isn't already an active Role Menu Creation happening in this Server
            if ( Collections.RoleMenuCreation.has(interaction.guildId) )
            {
                await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ROLE_MENU_ERROR_ACTIVE_CREATION') });
                return;
            }


            // Create the localised Embed/Selects
            const EmptyMenuEmbed = new EmbedBuilder().setDescription(localize(interaction.locale, 'ROLE_MENU_PREVIEW_EMPTY'));

            const InitialSelectMenu = new ActionRowBuilder().addComponents([
                new StringSelectMenuBuilder().setCustomId(`create-role-menu`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'ROLE_MENU_SELECT_AN_ACTION')).setOptions([
                    new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE')).setValue("set-type").setDescription(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE_DESCRIPTION')).setEmoji(`🔧`),
                    new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CANCEL_CREATION')).setValue("cancel").setDescription(localize(interaction.locale, 'ROLE_MENU_CANCEL_CREATION_DESCRIPTION')).setEmoji(`❌`)
                ])
            ]);

            // ACK to User
            await interaction.reply({ ephemeral: true, components: [InitialSelectMenu], embeds: [EmptyMenuEmbed], content: localize(interaction.locale, 'ROLE_MENU_CREATE_INTRUCTIONS') });

            // Auto-expire cache after 1 hour
            let timeoutExpiry = setTimeout(() => { Collections.RoleMenuCreation.delete(interaction.guildId); }, 3.6e+6);

            // Create empty placeholder
            let newDataObject = {
                type: "TOGGLE",
                embed: new EmbedBuilder(),
                roles: [],
                buttons: [],
                interaction: null,
                timeout: timeoutExpiry
            };

            // Save placeholder in cache
            Collections.RoleMenuCreation.set(interaction.guildId, newDataObject);
        }

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
