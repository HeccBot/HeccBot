const { RoleSelectMenuInteraction, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { Collections } = require("../../../constants");

module.exports = {
    // Select's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "create-menu-remove-role",

    // Select's Description
    Description: `Handles removing a specified Role from Role Menus during creation`,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 3,



    /**
     * Executes the Select
     * @param {RoleSelectMenuInteraction} interaction 
     */
    async execute(interaction)
    {
        // Grab Role
        const InputRole = interaction.roles.first();

        // Validate Role *IS* on this Menu
        const MenuDataCache = Collections.RoleMenuCreation.get(interaction.guildId);
        const RoleDataCache = MenuDataCache.roles;
        const ButtonDataCache = MenuDataCache.buttons;
        let doesRoleExistOnMenu = false;

        for ( let i = 0; i <= RoleDataCache.length - 1; i++ )
        {
            if ( RoleDataCache[i].id === InputRole.id )
            {
                doesRoleExistOnMenu = true; // Mark existence
                RoleDataCache.splice(i, 1); // Removes from cache
                break;
            }
        }

        // Role doesn't exist on Menu, return with ACK message
        if ( !doesRoleExistOnMenu )
        {
            await interaction.update({ content: `${localize(interaction.locale, 'ROLE_MENU_ROLE_REMOVE_INSTRUCTIONS')}\n\n:warning:${localize(interaction.locale, 'ROLE_MENU_ERROR_ROLE_NOT_ON_MENU', `<@&${InputRole.id}>`)}` });
            return;
        }

        // Role DOES exist on Menu, now to remove the Button
        for ( let j = 0; j <= ButtonDataCache.length - 1; j++ )
        {
            if ( ButtonDataCache[j].data.custom_id === `new-role-edit_${InputRole.id}` )
            {
                ButtonDataCache.splice(j, 1); // Remove from cache
                break;
            }
        }

        // Save back to Collection
        MenuDataCache.roles = RoleDataCache;
        MenuDataCache.buttons = ButtonDataCache;

        // Update Menu Message
        /** @type {Array<ActionRowBuilder>} */
        let updatedComponentsArray = [];
        let updatedMenuEmbed = MenuDataCache.embed.spliceFields(0, 3);
        let temp;
        let roleEmbedTextFieldOne = "";
        let roleEmbedTextFieldTwo = "";

        if ( ButtonDataCache.length >= 1 )
        {
            for ( let k = 0; k <= ButtonDataCache.length - 1; k++ )
            {
                if ( k === 0 )
                {
                    // First Button on first row
                    temp = new ActionRowBuilder().addComponents(ButtonDataCache[k]);
                    roleEmbedTextFieldOne += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`;
                    // push early if only Button
                    if ( ButtonDataCache.length - 1 === k ) { updatedComponentsArray.push(temp); }
                }
                else if ( k > 0 && k < 4 )
                {
                    // First row, buttons two through four
                    temp.addComponents(ButtonDataCache[k]);
                    roleEmbedTextFieldOne += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`;
                    // push early if last Button
                    if ( ButtonDataCache.length - 1 === k ) { updatedComponentsArray.push(temp); }
                }
                else if ( k === 4 )
                {
                    // First row, fifth button
                    temp.addComponents(ButtonDataCache[k]);
                    if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`; }
                    else { roleEmbedTextFieldTwo += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`; }
                    // Free up TEMP ready for second row
                    updatedComponentsArray.push(temp);
                    temp = new ActionRowBuilder();
                }
                else if ( k > 4 && k < 9 )
                {
                    // Second row, buttons one through four
                    temp.addComponents(ButtonDataCache[k]);
                    if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`; }
                    else { roleEmbedTextFieldTwo += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`; }
                    // push early if last Button
                    if ( ButtonDataCache.length - 1 === k ) { updatedComponentsArray.push(temp); }
                }
                else if ( k === 9 )
                {
                    // Second row, fifth button
                    temp.addComponents(ButtonDataCache[k]);
                    if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`; }
                    else { roleEmbedTextFieldTwo += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`; }
                    // Free up TEMP ready for third row
                    updatedComponentsArray.push(temp);
                    temp = new ActionRowBuilder();
                }
                else if ( k > 9 && k < 14 )
                {
                    // Third row, buttons one through four
                    temp.addComponents(ButtonDataCache[k]);
                    if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`; }
                    else { roleEmbedTextFieldTwo += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`; }
                    // push early if last Button
                    if ( ButtonDataCache.length - 1 === k ) { updatedComponentsArray.push(temp); }
                }
                else if ( k === 14 )
                {
                    // Third row, fifth button
                    temp.addComponents(ButtonDataCache[k]);
                    if ( roleEmbedTextFieldOne.length <= 1000 ) { roleEmbedTextFieldOne += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`; }
                    else { roleEmbedTextFieldTwo += `• <@&${RoleDataCache[k].id}> - ${RoleDataCache[k].emoji != null ? RoleDataCache[k].emoji : ""} ${RoleDataCache[k].label != null ? RoleDataCache[k].label : ""}\n`; }
                    updatedComponentsArray.push(temp);
                }
                else { break; }
            }

            // Update Embed
            updatedMenuEmbed.addFields({ name: `\u200B`, value: roleEmbedTextFieldOne });
            if ( roleEmbedTextFieldTwo.length > 5 ) { updatedMenuEmbed.addFields({ name: `\u200B`, value: roleEmbedTextFieldTwo }); }
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
        if ( MenuDataCache.roles.length > 0 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE')).setValue("remove-role").setDescription(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE_DESCRIPTION')).setEmoji(`<:RoleRemove:1201476372997079040>`)); }
        // Role Requirement options
        if ( MenuDataCache.roleRequirements.length < 5 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_ADD_REQUIREMENT')).setValue("add-requirement").setDescription(localize(interaction.locale, 'ROLE_MENU_ADD_REQUIREMENT_DESCRIPTION')).setEmoji(`<:RequirementAdd:1201477187522531348>`)); }
        if ( MenuDataCache.roleRequirements.length > 0 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_REMOVE_REQUIREMENT')).setValue("remove-requirement").setDescription(localize(interaction.locale, 'ROLE_MENU_REMOVE_REQUIREMENT_DESCRIPTION')).setEmoji(`<:RequirementRemove:1201477188306878540>`)); }
        // Final options
        MenuSelect.addOptions([
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_POST')).setValue("save").setDescription(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_POST_DESCRIPTION')).setEmoji(`<:IconActivity:815246970457161738>`),
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CANCEL_CREATION')).setValue("cancel").setDescription(localize(interaction.locale, 'ROLE_MENU_CANCEL_CREATION_DESCRIPTION')).setEmoji(`❌`)
        ]);

        MenuRow.addComponents(MenuSelect);
        updatedComponentsArray.push(MenuRow);


        MenuDataCache.embed = updatedMenuEmbed;

        // Update Menu
        await MenuDataCache.interaction.editReply({ components: updatedComponentsArray, embeds: [updatedMenuEmbed] });
        await interaction.deferUpdate();
        await interaction.deleteReply();

        // Purge interaction from cache
        MenuDataCache.interaction = null;
        // Save to cache
        Collections.RoleMenuCreation.set(interaction.guildId, MenuDataCache);

        return;
    }
}
