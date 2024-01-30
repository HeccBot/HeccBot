const { RoleSelectMenuInteraction, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { Collections } = require("../../../constants");
const { localize } = require("../../../BotModules/LocalizationModule");

module.exports = {
    // Select's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "configure-menu-remove-requirement",

    // Select's Description
    Description: `Handles Role Select for removing a Requirement from a Menu during configuration`,

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

        // Validate Role *has* already been added to this menu as a requirement
        let menuCache = Collections.RoleMenuConfiguration.get(interaction.guildId);
        let requirementCache = menuCache.roleRequirements;
        const OriginalInteraction = menuCache.interaction;

        let isRequirementAdded = requirementCache.includes(InputRole.id);
        if ( !isRequirementAdded )
        {
            await interaction.update({ content: `${localize(interaction.locale, 'ROLE_MENU_REQUIREMENT_REMOVE_INSTRUCTIONS')}\n\n:warning: ${localize(interaction.locale, 'ROLE_MENU_ERROR_REQUIREMENT_ROLE_NOT_ON_MENU', `<@&${InputRole.id}>`)}` });
            return;
        }

        // Remove from cache
        for ( let i = 0; i <= requirementCache.length - 1; i++ )
        {
            if ( requirementCache[i] === InputRole.id ) { requirementCache.splice(i, 1); break; }
        }
        menuCache.roleRequirements = requirementCache;

        // Update String
        let requirementString = `\n\n`;

        if ( requirementCache.length === 1 )
        {
            requirementString += localize(interaction.locale, 'ROLE_MENU_RESTRICTION_SINGLE', `<@&${requirementCache[0]}>`);
        }
        else if ( requirementCache.length > 1 )
        {
            requirementString += localize(interaction.locale, 'ROLE_MENU_RESTRICTION_MULTIPLE', `<@&${requirementCache.join("> / <@&")}>`);
        }

        // Just in case we've now removed all set Requirements, reconstruct the Select
        const MenuRow = new ActionRowBuilder();

        // Initial options
        const MenuSelect = new StringSelectMenuBuilder().setCustomId(`configure-role-menu`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'PLEASE_SELECT_AN_ACTION')).addOptions([
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE')).setValue("set-type").setDescription(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE_DESCRIPTION')).setEmoji(`🔧`),
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CONFIGURE_EMBED')).setValue("configure-embed").setDescription(localize(interaction.locale, 'ROLE_MENU_CONFIGURE_EMBED_DESCRIPTION')).setEmoji(`<:StatusRichPresence:842328614883295232>`)
        ]);
        // "Add Roles" option
        if ( menuCache.roles.length < 15 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_ADD_ROLE')).setValue("add-role").setDescription(localize(interaction.locale, 'ROLE_MENU_ADD_ROLE_DESCRIPTION')).setEmoji(`<:RoleAdd:1201474746810904607>`)); }
        // "Remove Roles" option
        if ( menuCache.roles.length > 0 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE')).setValue("remove-role").setDescription(localize(interaction.locale, 'ROLE_MENU_REMOVE_ROLE_DESCRIPTION')).setEmoji(`<:RoleRemove:1201476372997079040>`)); }
        // Role Requirement options
        if ( requirementCache.length < 5 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_ADD_REQUIREMENT')).setValue("add-requirement").setDescription(localize(interaction.locale, 'ROLE_MENU_ADD_REQUIREMENT_DESCRIPTION')).setEmoji(`<:RequirementAdd:1201477187522531348>`)); }
        if ( requirementCache.length > 0 ) { MenuSelect.addOptions(new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_REMOVE_REQUIREMENT')).setValue("remove-requirement").setDescription(localize(interaction.locale, 'ROLE_MENU_REMOVE_REQUIREMENT_DESCRIPTION')).setEmoji(`<:RequirementRemove:1201477188306878540>`)); }
        // Final options
        MenuSelect.addOptions([
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_UPDATE')).setValue("save").setDescription(localize(interaction.locale, 'ROLE_MENU_SAVE_AND_UPDATE_DESCRIPTION')).setEmoji(`<:IconActivity:815246970457161738>`),
            new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CANCEL_CONFIGURATION')).setValue("cancel").setDescription(localize(interaction.locale, 'ROLE_MENU_CANCEL_CONFIGURATION_DESCRIPTION')).setEmoji(`❌`)
        ]);
        
        MenuRow.addComponents(MenuSelect);

        // Grab original components so we can update the Select
        let updateComponents = OriginalInteraction.message.components;
        updateComponents.splice(updateComponents.length - 1, 1, MenuRow);

        // ACK Update
        OriginalInteraction.editReply({ content: `${localize(interaction.locale, 'ROLE_MENU_CONFIGURATION_INTRUCTIONS')}${requirementString}`, components: updateComponents });

        // Clean up
        await interaction.deferUpdate();
        await interaction.deleteReply();

        menuCache.interaction = null;
        // Save to cache
        Collections.RoleMenuConfiguration.set(interaction.guildId, menuCache);
        
        return;
    }
}
