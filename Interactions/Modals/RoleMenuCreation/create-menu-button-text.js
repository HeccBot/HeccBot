const { ModalMessageModalSubmitInteraction, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { EMOJIPEDIA } = require("../../../Resources/Hyperlinks");
const { Collections } = require("../../../constants");
const EmojiRegex = require("emoji-regex")();

const DiscordEmojiRegex = new RegExp(/<a?:(?<name>[a-zA-Z0-9\_]+):(?<id>\d{15,21})>/);

module.exports = {
    // Modal's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "create-menu-button-text",

    // Modal's Description
    Description: `Handles setting the new Role Button's Label/Emoji for Role Menus`,



    /**
     * Executes the Modal
     * @param {ModalMessageModalSubmitInteraction} interaction 
     */
    async execute(interaction)
    {
        // Grab inputs
        const SplitCustomID = interaction.customId.split("_");
        const ButtonType = SplitCustomID.pop();
        const RoleID = SplitCustomID.pop();
        const InputLabel = interaction.fields.getTextInputValue("label");
        const InputEmoji = interaction.fields.getTextInputValue("emoji");

        // Validate *an* input was included
        if ( (InputLabel == "" && InputLabel == " " && InputLabel == null && InputLabel == undefined) && (InputEmoji == "" && InputEmoji == " " && InputEmoji == null && InputEmoji == undefined) )
        {
            await interaction.update({ content: `${localize(interaction.locale, 'ROLE_MENU_BUTTON_SET_INSTRUCTIONS', `<@&${InputRole.id}>`)}\n\n${localize(interaction.locale, 'ROLE_MENU_ERROR_CANNOT_HAVE_BLANK_BUTTON')}` });
            return;
        }

        // Validate Emoji
        if ( InputEmoji == "" && InputEmoji == " " && InputEmoji == null && InputEmoji == undefined )
        {
            if ( !DiscordEmojiRegex.test(InputEmoji) && !EmojiRegex.test(InputEmoji) )
            {
                await interaction.update({ content: `${localize(interaction.locale, 'ROLE_MENU_BUTTON_SET_INSTRUCTIONS', `<@&${InputRole.id}>`)}\n\n${localize(interaction.locale, 'ROLE_MENU_ERROR_INVALID_EMOJI', `<${EMOJIPEDIA}>`)}` });
                return;
            }
        }


        // Update Cache & create new Button
        let menuData = Collections.RoleMenuCreation.get(interaction.guildId);
        let roleCache = menuData.roles;
        if ( !roleCache ) { roleCache = []; }
        let newRoleData = { id: RoleID, style: ButtonType, emoji: null, label: null };

        let newRoleButton = new ButtonBuilder().setCustomId(`new-role-edit_${RoleID}`)
        .setStyle(ButtonType === 'blurple' ? ButtonStyle.Primary : ButtonType === 'green' ? ButtonStyle.Success : ButtonType === 'grey' ? ButtonStyle.Secondary : ButtonStyle.Danger);

        if ( InputLabel != "" && InputLabel != " " && InputLabel != null && InputLabel != undefined )
        {
            newRoleData.label = InputLabel;
            newRoleButton.setLabel(InputLabel);
        }

        if ( InputEmoji != "" && InputEmoji != " " && InputEmoji != null && InputEmoji != undefined )
        {
            newRoleData.emoji = InputEmoji;
            newRoleButton.setEmoji(InputEmoji);
        }

        // Fetch existing Buttons, if any
        let buttonCache = menuData.buttons;
        if ( !buttonCache || buttonCache.length < 1 ) { buttonCache = [newRoleButton]; }
        else { buttonCache.push(newRoleButton); }

        // Save Buttons & Roles
        menuData.buttons = buttonCache;
        roleCache.push(newRoleData);
        menuData.roles = roleCache;


        // Construct Arrays for Buttons to go into the Menu, and add to Embed
        let menuEmbed = menuData.embed.spliceFields(0, 3);
        /** @type {Array<ActionRowBuilder>} */
        let updatedButtonsArray = [];
        let temp;
        let roleEmbedTextFieldOne = "";
        let roleEmbedTextFieldTwo = "";

        for ( let i = 0; i <= buttonCache.length - 1; i++ )
        {
            if ( i === 0 )
            {
                // First Button on first row
                temp = new ActionRowBuilder().addComponents(buttonCache[i]);
                roleEmbedTextFieldOne += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`;
                // push early if only Button
                if ( buttonCache.length - 1 === i ) { updatedButtonsArray.push(temp); }
            }
            else if ( i > 0 && i < 4 )
            {
                // First row, buttons two through four
                temp.addComponents(buttonCache[i]);
                roleEmbedTextFieldOne += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`;
                // push early if last Button
                if ( buttonCache.length - 1 === i ) { updatedButtonsArray.push(temp); }
            }
            else if ( i === 4 )
            {
                // First row, fifth button
                temp.addComponents(buttonCache[i]);
                if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`; }
                else { roleEmbedTextFieldTwo += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`; }
                // Free up TEMP ready for second row
                updatedButtonsArray.push(temp);
                temp = new ActionRowBuilder();
            }
            else if ( i > 4 && i < 9 )
            {
                // Second row, buttons one through four
                temp.addComponents(buttonCache[i]);
                if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`; }
                else { roleEmbedTextFieldTwo += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`; }
                // push early if last Button
                if ( buttonCache.length - 1 === i ) { updatedButtonsArray.push(temp); }
            }
            else if ( i === 9 )
            {
                // Second row, fifth button
                temp.addComponents(buttonCache[i]);
                if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`; }
                else { roleEmbedTextFieldTwo += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`; }
                // Free up TEMP ready for third row
                updatedButtonsArray.push(temp);
                temp = new ActionRowBuilder();
            }
            else if ( i > 9 && i < 14 )
            {
                // Third row, buttons one through four
                temp.addComponents(buttonCache[i]);
                if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`; }
                else { roleEmbedTextFieldTwo += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`; }
                // push early if last Button
                if ( buttonCache.length - 1 === i ) { updatedButtonsArray.push(temp); }
            }
            else if ( i === 14 )
            {
                // Third row, fifth button
                temp.addComponents(buttonCache[i]);
                if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`; }
                else { roleEmbedTextFieldTwo += `• <@&${roleCache[i].id}> - ${roleCache[i].emoji != null ? roleCache[i].emoji : ""} ${roleCache[i].label != null ? roleCache[i].label : ""}\n`; }
                updatedButtonsArray.push(temp);
            }
            else { break; }
        }

        // Add Select Menu
        const MenuRow = new ActionRowBuilder();
        
        // Initial options
        const MenuSelect = new StringSelectMenuBuilder().setCustomId(`create-role-menu`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'PLEASE_SELECT_AN_ACTION')).addOptions([
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE')).setValue("set-type").setDescription(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE_DESCRIPTION')).setEmoji(`🔧`),
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CONFIGURE_EMBED')).setValue("configure-embed").setDescription(localize(interaction.locale, 'ROLE_MENU_CONFIGURE_EMBED_DESCRIPTION')).setEmoji(`<:StatusRichPresence:842328614883295232>`)
        ]);
        // "Add Roles" option
        if ( menuData.roles.length < 15 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_ADD_ROLE')).setValue("add-role").setDescription(localize(interaction.locale, 'ROLE_MENU_ADD_ROLE_DESCRIPTION')).setEmoji(`<:RoleAdd:1201474746810904607>`)); }
        // "Remove Roles" option
        MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE')).setValue("remove-role").setDescription(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE_DESCRIPTION')).setEmoji(`<:RoleRemove:1201476372997079040>`));
        // Role Requirement options
        if ( menuData.roleRequirements.length < 5 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_ADD_REQUIREMENT')).setValue("add-requirement").setDescription(localize(interaction.locale, 'ROLE_MENU_ADD_REQUIREMENT_DESCRIPTION')).setEmoji(`<:RequirementAdd:1201477187522531348>`)); }
        if ( menuData.roleRequirements.length > 0 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_REMOVE_REQUIREMENT')).setValue("remove-requirement").setDescription(localize(interaction.locale, 'ROLE_MENU_REMOVE_REQUIREMENT_DESCRIPTION')).setEmoji(`<:RequirementRemove:1201477188306878540>`)); }
        // Final options
        MenuSelect.addOptions([
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_POST')).setValue("save").setDescription(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_POST_DESCRIPTION')).setEmoji(`<:IconActivity:815246970457161738>`),
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CANCEL_CREATION')).setValue("cancel").setDescription(localize(interaction.locale, 'ROLE_MENU_CANCEL_CREATION_DESCRIPTION')).setEmoji(`❌`)
        ]);

        MenuRow.addComponents(MenuSelect);
        updatedButtonsArray.push(MenuRow);

        // Add to Embed
        menuEmbed.addFields({ name: `\u200B`, value: roleEmbedTextFieldOne });
        if ( roleEmbedTextFieldTwo.length > 3 ) { menuEmbed.addFields({ name: `\u200B`, value: roleEmbedTextFieldTwo }); }
        menuData.embed = menuEmbed;

        // Update Menu
        await menuData.interaction.editReply({ components: updatedButtonsArray, embeds: [menuEmbed] });
        await interaction.deferUpdate();
        await interaction.deleteReply();

        // Purge interaction from cache
        menuData.interaction = null;
        // Save to cache
        Collections.RoleMenuCreation.set(interaction.guildId, menuData);

        return;
    }
}
