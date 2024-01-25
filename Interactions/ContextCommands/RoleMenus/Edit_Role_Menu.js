const { ApplicationCommandType, ApplicationCommandData, ContextMenuCommandInteraction, PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { DiscordClient, Collections } = require("../../../constants");

// Role Menu Types
const RoleMenuTypes = [ "TOGGLE", "SWAP", "SINGLE" ];

module.exports = {
    // Command's Name
    //     Can use sentence casing and spaces
    Name: "Edit Role Menu",

    // Command's Description
    Description: `Edit an existing Role Menu`,

    // Command's Category
    Category: "MANAGEMENT",

    // Context Command Type
    //     One of either ApplicationCommandType.Message, ApplicationCommandType.User
    CommandType: ApplicationCommandType.Message,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 30,

    // Scope of Command's usage
    //     One of the following: DM, GUILD, ALL
    Scope: "GUILD",



    /**
     * Returns data needed for registering Context Command onto Discord's API
     * @returns {ApplicationCommandData}
     */
    registerData()
    {
        /** @type {ApplicationCommandData} */
        const Data = {};

        Data.name = this.Name;
        Data.description = "";
        Data.type = this.CommandType;
        Data.dmPermission = false;
        Data.defaultMemberPermissions = PermissionFlagsBits.ManageRoles;

        return Data;
    },



    /**
     * Executes the Context Command
     * @param {ContextMenuCommandInteraction} interaction 
     */
    async execute(interaction)
    {
        const MenuSelect = new ActionRowBuilder().addComponents([
            new StringSelectMenuBuilder().setCustomId(`configure-role-menu`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'PLEASE_SELECT_AN_ACTION')).setOptions([
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE')).setValue("set-type").setDescription(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE_DESCRIPTION')).setEmoji(`🔧`),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CONFIGURE_EMBED')).setValue("configure-embed").setDescription(localize(interaction.locale, 'ROLE_MENU_CONFIGURE_EMBED_DESCRIPTION')).setEmoji(`<:StatusRichPresence:842328614883295232>`),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_ADD_ROLE')).setValue("add-role").setDescription(localize(interaction.locale, 'ROLE_MENU_ADD_ROLE_DESCRIPTION')).setEmoji(`<:plusGrey:997752068439818280>`),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE')).setValue("remove-role").setDescription(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE_DESCRIPTION')).setEmoji(`<:IconDeleteTrashcan:750152850310561853>`),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_UPDATE')).setValue("save").setDescription(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_UPDATE_DESCRIPTION')).setEmoji(`<:IconActivity:815246970457161738>`),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CANCEL_CONFIGURATION')).setValue("cancel").setDescription(localize(interaction.locale, 'ROLE_MENU_CANCEL_CONFIGURATION_DESCRIPTION')).setEmoji(`❌`)
            ])
        ]);

        const MenuSelectRemoveRole = new ActionRowBuilder().addComponents([
            new StringSelectMenuBuilder().setCustomId(`configure-role-menu`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'PLEASE_SELECT_AN_ACTION')).setOptions([
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE')).setValue("set-type").setDescription(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE_DESCRIPTION')).setEmoji(`🔧`),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CONFIGURE_EMBED')).setValue("configure-embed").setDescription(localize(interaction.locale, 'ROLE_MENU_CONFIGURE_EMBED_DESCRIPTION')).setEmoji(`<:StatusRichPresence:842328614883295232>`),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE')).setValue("remove-role").setDescription(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE_DESCRIPTION')).setEmoji(`<:IconDeleteTrashcan:750152850310561853>`),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_UPDATE')).setValue("save").setDescription(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_UPDATE_DESCRIPTION')).setEmoji(`<:IconActivity:815246970457161738>`),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CANCEL_CONFIGURATION')).setValue("cancel").setDescription(localize(interaction.locale, 'ROLE_MENU_CANCEL_CONFIGURATION_DESCRIPTION')).setEmoji(`❌`)
            ])
        ]);

        await interaction.deferReply({ ephemeral: true });

        // Check Message *is* a Role Menu with this Bot
        const SourceMessage = interaction.options.getMessage('message', true);
        const SourceEmbed = SourceMessage.embeds.shift();
        const SourceMenuType = SourceEmbed?.footer?.text.split(": ").pop();
        const SourceComponents = SourceMessage.components;

        if ( SourceMessage.author.id !== DiscordClient.user.id )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'EDIT_ROLE_MENU_COMMAND_ERROR_MESSAGE_INVALID') });
            return;
        }

        if ( SourceMenuType == undefined || !RoleMenuTypes.includes(SourceMenuType) )
        {
            await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'EDIT_ROLE_MENU_COMMAND_ERROR_MESSAGE_INVALID') });
            return;
        }

        // Ensure Bot has MANAGE_ROLES Permission
        if ( !interaction.appPermissions.has(PermissionFlagsBits.ManageRoles) )
        {
            await interaction.editReply({ context: localize(interaction.locale, 'EDIT_ROLE_MENU_COMMAND_ERROR_MISSING_MANAGE_ROLE_PERMISSION') });
            return;
        }

        // Ensure Bot has READ_MESSAGE_HISTORY Permission to be able to edit the existing Role Menu
        if ( !interaction.appPermissions.has(PermissionFlagsBits.ReadMessageHistory) )
        {
            await interaction.editReply({ content: localize(interaction.locale, 'EDIT_ROLE_MENU_COMMAND_ERROR_MISSING_MESSAGE_HISTORY_PERMISSION') });
            return;
        }

        // Ensure there isn't already an active Role Menu Configuration happening in that Guild
        if ( Collections.RoleMenuConfiguration.has(interaction.guildId) )
        {
            await interaction.editReply({ content: localize(interaction.locale, 'ROLE_MENU_ERROR_ACTIVE_CONFIGURATION') });
            return;
        }




        // Setup for Menu Configuration
        const ConfigEmbed = EmbedBuilder.from(SourceEmbed);


        // Construct Roles & Buttons
        /** @type {Array<{id: String, style: String, emoji: ?String, label: ?String}>} */
        let roleCache = [];
        /** @type {Array<ButtonBuilder>} */
        let buttonCache = [];
        /** @type {Array<ActionRowBuilder>} */
        let componentsArray = [];

        let tempRow = new ActionRowBuilder();
        let rowCounter = 0;
        let componentCounter = 0;

        SourceComponents.forEach(row => {
            row.components.forEach(component => {
                let tempButton = ButtonBuilder.from(component);
                let tempRoleId = tempButton.data.custom_id.split("_").pop();

                tempButton.setCustomId(`configure-role-edit_${tempRoleId}`); // Set new Custom ID for Button
                // Set into Role Cache
                roleCache.push({
                    id: tempRoleId,
                    style: tempButton.data.style === ButtonStyle.Primary ? 'blurple' : tempButton.data.style === ButtonStyle.Secondary ? 'grey' : tempButton.data.style === ButtonStyle.Success ? 'green' : 'red',
                    emoji: null,
                    label: tempButton.data.label != undefined ? tempButton.data.label : null
                });
                // Set into Button Cache
                buttonCache.push(tempButton);

                // Set into Components Array
                if ( tempRow.components.length === 5 )
                {
                    componentsArray.push(tempRow);
                    tempRow = new ActionRowBuilder().addComponents(tempButton);
                }
                else if ( (SourceComponents.length === rowCounter + 1) && (row.components.length === componentCounter + 1) )
                {
                    // If the last Button
                    tempRow.addComponents(tempButton);
                    componentsArray.push(tempRow);
                }
                else { tempRow.addComponents(tempButton); }

                componentCounter++;
            });

            rowCounter++;
        });


        // Add Select Menu
        if ( roleCache.length === 15 ) { componentsArray.push(MenuSelectRemoveRole); }
        else { componentsArray.push(MenuSelect); }

        // Auto-expire cache after one hour
        let timeoutExpiry = setTimeout(() => { Collections.RoleMenuConfiguration.delete(interaction.guildId); }, 3.6e+6);

        // Save everything to cache
        let newDataObject = {
            type: SourceMenuType,
            originMessageId: SourceMessage.id,
            embed: ConfigEmbed,
            roles: roleCache,
            buttons: buttonCache,
            interaction: null,
            timeout: timeoutExpiry
        };
        Collections.RoleMenuConfiguration.set(interaction.guildId, newDataObject);

        // ACK User to begin config process
        await interaction.editReply({ components: componentsArray, embeds: [ConfigEmbed], content: localize(interaction.locale, 'ROLE_MENU_CONFIGURATION_INTRUCTIONS') });

        return;
    }
}
