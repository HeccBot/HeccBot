const { ModalMessageModalSubmitInteraction, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const EmojiRegex = require("emoji-regex")();
const { localize } = require("../../../BotModules/LocalizationModule");
const { Collections } = require("../../../constants");
const { EMOJIPEDIA } = require("../../../Resources/Hyperlinks");

const DiscordEmojiRegex = new RegExp(/<a?:(?<name>[a-zA-Z0-9\_]+):(?<id>\d{15,21})>/);

module.exports = {
    // Modal's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "create-menu-edit-button",

    // Modal's Description
    Description: `Handles editing a Button on a Role Menu during Menu creation`,



    /**
     * Executes the Modal
     * @param {ModalMessageModalSubmitInteraction} interaction 
     */
    async execute(interaction)
    {
        // Grab inputs, Role ID, and Cache
        const MenuDataCache = Collections.RoleMenuCreation.get(interaction.guildId);
        const RoleDataCache = MenuDataCache.roles;
        const ButtonDataCache = MenuDataCache.buttons;
        const EmbedDataCache = MenuDataCache.embed.spliceFields(0, 3);
        const RoleID = interaction.customId.split("_").pop();
        const InputLabel = interaction.fields.getTextInputValue("label").trim();
        const InputEmoji = interaction.fields.getTextInputValue("emoji").trim();

        // Validate existence of Label/Emoji
        if ( (InputLabel == null && InputLabel !== "") && (InputEmoji == null && InputEmoji !== "") )
        {
            await interaction.update({ content: `${localize(interaction.locale, 'ROLE_MENU_BUTTON_SET_INSTRUCTIONS', `<@&${InputRole.id}>`)}\n\n${localize(interaction.locale, 'ROLE_MENU_ERROR_CANNOT_HAVE_BLANK_BUTTON')}` });
            return;
        }

        // Validate Emoji (if included)
        if ( InputEmoji == null && InputEmoji !== "" )
        {
            if ( !DiscordEmojiRegex.text(InputEmoji) && !EmojiRegex.test(InputEmoji) )
            {
                await interaction.update({ content: `${localize(interaction.locale, 'ROLE_MENU_BUTTON_SET_INSTRUCTIONS', `<@&${InputRole.id}>`)}\n\n${localize(interaction.locale, 'ROLE_MENU_ERROR_INVALID_EMOJI', EMOJIPEDIA)}` });
                return;
            }
        }

        // Update cache objects
        // ROLE CACHE
        for ( let i = 0; i <= RoleDataCache.length - 1; i++ )
        {
            if ( RoleDataCache[i].id === RoleID )
            {
                if ( InputLabel !== null && InputLabel !== "" ) { RoleDataCache[i].label = InputLabel; }
                else { RoleDataCache[i].label = ""; }

                if ( InputEmoji !== null && InputEmoji !== "" ) { RoleDataCache[i].emoji = InputEmoji; }
                else { RoleDataCache[i].emoji = ""; }

                break;
            }
        }

        // BUTTON CACHE
        for ( let i = 0; i <= ButtonDataCache.length - 1; i++ )
        {
            if ( ButtonDataCache[i].data.custom_id === `new-role-edit_${RoleID}` )
            {
                if ( InputLabel !== null && InputLabel !== "" ) { ButtonDataCache[i].setLabel(InputLabel); }
                else { ButtonDataCache[i].data.label = undefined; }

                if ( InputEmoji !== null && InputEmoji !== "" ) { ButtonDataCache[i].setEmoji(InputEmoji); }
                else { ButtonDataCache[i].data.emoji = undefined; }

                break;
            }
        }

        // Save Buttons & Roles
        MenuDataCache.roles = RoleDataCache;
        MenuDataCache.buttons = ButtonDataCache;

        // Update Components & Embed
        /** @type {Array<ActionRowBuilder>} */
        let updatedButtonsArray = [];
        let temp;
        let roleEmbedTextFieldOne = "";
        let roleEmbedTextFieldTwo = "";

        for ( let i = 0; i <= ButtonDataCache.length - 1; i++ )
        {
            if ( i === 0 )
            {
                // First Button on first row
                temp = new ActionRowBuilder().addComponents(ButtonDataCache[i]);
                roleEmbedTextFieldOne += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`;
                // push early if only Button
                if ( ButtonDataCache.length - 1 === i ) { updatedButtonsArray.push(temp); }
            }
            else if ( i > 0 && i < 4 )
            {
                // First row, buttons two through four
                temp.addComponents(ButtonDataCache[i]);
                roleEmbedTextFieldOne += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`;
                // push early if last Button
                if ( ButtonDataCache.length - 1 === i ) { updatedButtonsArray.push(temp); }
            }
            else if ( i === 4 )
            {
                // First row, fifth button
                temp.addComponents(ButtonDataCache[i]);
                if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`; }
                else { roleEmbedTextFieldTwo += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`; }
                // Free up TEMP ready for second row
                updatedButtonsArray.push(temp);
                temp = new ActionRowBuilder();
            }
            else if ( i > 4 && i < 9 )
            {
                // Second row, buttons one through four
                temp.addComponents(ButtonDataCache[i]);
                if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`; }
                else { roleEmbedTextFieldTwo += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`; }
                // push early if last Button
                if ( ButtonDataCache.length - 1 === i ) { updatedButtonsArray.push(temp); }
            }
            else if ( i === 9 )
            {
                // Second row, fifth button
                temp.addComponents(ButtonDataCache[i]);
                if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`; }
                else { roleEmbedTextFieldTwo += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`; }
                // Free up TEMP ready for third row
                updatedButtonsArray.push(temp);
                temp = new ActionRowBuilder();
            }
            else if ( i > 9 && i < 14 )
            {
                // Third row, buttons one through four
                temp.addComponents(ButtonDataCache[i]);
                if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`; }
                else { roleEmbedTextFieldTwo += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`; }
                // push early if last Button
                if ( ButtonDataCache.length - 1 === i ) { updatedButtonsArray.push(temp); }
            }
            else if ( i === 14 )
            {
                // Third row, fifth button
                temp.addComponents(ButtonDataCache[i]);
                if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`; }
                else { roleEmbedTextFieldTwo += `• <@&${RoleDataCache[i].id}> - ${RoleDataCache[i].emoji != null ? RoleDataCache[i].emoji : ""} ${RoleDataCache[i].label != null ? RoleDataCache[i].label : ""}\n`; }
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
        if ( MenuDataCache.roles.length < 15 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_ADD_ROLE')).setValue("add-role").setDescription(localize(interaction.locale, 'ROLE_MENU_ADD_ROLE_DESCRIPTION')).setEmoji(`<:RoleAdd:1201474746810904607>`)); }
        // "Remove Roles" option
        MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE')).setValue("remove-role").setDescription(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE_DESCRIPTION')).setEmoji(`<:RoleRemove:1201476372997079040>`));
        // Role Requirement options
        if ( MenuDataCache.roleRequirements.length < 5 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_ADD_REQUIREMENT')).setValue("add-requirement").setDescription(localize(interaction.locale, 'ROLE_MENU_ADD_REQUIREMENT_DESCRIPTION')).setEmoji(`<:RequirementAdd:1201477187522531348>`)); }
        if ( MenuDataCache.roleRequirements.length > 0 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_REMOVE_REQUIREMENT')).setValue("remove-requirement").setDescription(localize(interaction.locale, 'ROLE_MENU_REMOVE_REQUIREMENT_DESCRIPTION')).setEmoji(`<:RequirementRemove:1201477188306878540>`)); }
        // Final options
        MenuSelect.addOptions([
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_POST')).setValue("save").setDescription(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_POST_DESCRIPTION')).setEmoji(`<:IconActivity:815246970457161738>`),
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CANCEL_CREATION')).setValue("cancel").setDescription(localize(interaction.locale, 'ROLE_MENU_CANCEL_CREATION_DESCRIPTION')).setEmoji(`❌`)
        ]);

        MenuRow.addComponents(MenuSelect);
        updatedButtonsArray.push(MenuRow);

        // Add to Embed
        EmbedDataCache.addFields({ name: `\u200B`, value: roleEmbedTextFieldOne });
        if ( roleEmbedTextFieldTwo.length > 5 ) { EmbedDataCache.addFields({ name: `\u200B`, value: roleEmbedTextFieldTwo }); }
        MenuDataCache.embed = EmbedDataCache;

        // Update Menu
        await interaction.update({ components: updatedButtonsArray, embeds: [EmbedDataCache] });

        // Save to cache
        Collections.RoleMenuCreation.set(interaction.guildId, MenuDataCache);
        return;
    }
}
