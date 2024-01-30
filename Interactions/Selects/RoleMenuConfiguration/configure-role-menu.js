const { StringSelectMenuInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, RoleSelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { LogError } = require("../../../BotModules/LoggingModule");
const { Collections } = require("../../../constants");

module.exports = {
    // Select's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "configure-role-menu",

    // Select's Description
    Description: `Handles processing options for configuration of a Role Menu`,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 3,



    /**
     * Executes the Select
     * @param {StringSelectMenuInteraction} interaction 
     */
    async execute(interaction)
    {
        const AddRoleSelect = new ActionRowBuilder().addComponents([
            new RoleSelectMenuBuilder().setCustomId(`configure-menu-add-role`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'ROLE_MENU_ROLE_ADD_SEARCH'))
        ]);
        
        const RemoveRoleSelect = new ActionRowBuilder().addComponents([
            new RoleSelectMenuBuilder().setCustomId(`configure-menu-remove-role`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'ROLE_MENU_ROLE_REMOVE_SEARCH'))
        ]);
        
        const SetTypeSelect = new ActionRowBuilder().addComponents([
            new StringSelectMenuBuilder().setCustomId(`configure-set-menu-type`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'ROLE_MENU_SELECT_MENU_TYPE')).setOptions([
                new StringSelectMenuOptionBuilder().setValue(`TOGGLE`).setLabel(localize(interaction.locale, 'ROLE_MENU_MENU_TYPE_TOGGLE')),
                new StringSelectMenuOptionBuilder().setValue(`SWAP`).setLabel(localize(interaction.locale, 'ROLE_MENU_MENU_TYPE_SWAPPABLE')),
                new StringSelectMenuOptionBuilder().setValue(`SINGLE`).setLabel(localize(interaction.locale, 'ROLE_MENU_MENU_TYPE_SINGLE'))
            ])
        ]);

        const AddRequirementSelect = new ActionRowBuilder().addComponents([
            new RoleSelectMenuBuilder().setCustomId(`configure-menu-add-requirement`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'ROLE_MENU_REQUIREMENT_ADD_SEARCH'))
        ]);

        const RemoveRequirementSelect = new ActionRowBuilder().addComponents([
            new RoleSelectMenuBuilder().setCustomId(`configure-menu-remove-requirement`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'ROLE_MENU_REQUIREMENT_REMOVE_SEARCH'))
        ]);



        // Grab value
        const SelectedOption = interaction.values.shift();

        switch (SelectedOption)
        {
            // Set Menu Type
            case "set-type":
                await interaction.deferUpdate();
                await interaction.followUp({ ephemeral: true, components: [SetTypeSelect], content: localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE_INSTRUCTIONS') });

                // Temp-store interaction so we can return to it
                let tempData = Collections.RoleMenuConfiguration.get(interaction.guildId);
                tempData.interaction = interaction;
                Collections.RoleMenuConfiguration.set(interaction.guildId, tempData);
                break;


            // Edit Embed
            case "configure-embed":
                let embedData = Collections.RoleMenuConfiguration.get(interaction.guildId)?.embed;

                let embedModal = new ModalBuilder().setCustomId(`configure-menu-embed`).setTitle(localize(interaction.locale, 'ROLE_MENU_CONFIGURE_MENU_EMBED')).addComponents([
                    new ActionRowBuilder().addComponents([ new TextInputBuilder().setCustomId(`title`).setLabel(localize(interaction.locale, 'ROLE_MENU_EMBED_TITLE')).setMaxLength(256).setStyle(TextInputStyle.Short).setRequired(true).setValue(!embedData?.data.title ? "" : embedData.data.title) ]),
                    new ActionRowBuilder().addComponents([ new TextInputBuilder().setCustomId(`description`).setLabel(localize(interaction.locale, 'ROLE_MENU_EMBED_DESCRIPTION')).setMaxLength(2000).setStyle(TextInputStyle.Paragraph).setRequired(false).setValue(!embedData?.data.description ? "" : embedData.data.description) ]),
                    new ActionRowBuilder().addComponents([ new TextInputBuilder().setCustomId(`hex-colour`).setLabel(localize(interaction.locale, 'ROLE_MENU_EMBED_COLOR')).setMaxLength(7).setPlaceholder("#ab44ff").setStyle(TextInputStyle.Short).setRequired(false).setValue(!embedData?.data.color ? "" : `${typeof embedData.data.color === 'number' ? `#${embedData.data.color.toString(16).padStart(6, '0')}` : embedData.data.color}`) ])
                ]);

                await interaction.showModal(embedModal);
                break;


            // Add new Role to Menu
            case "add-role":
                // Validate Menu doesn't already have self-imposed max of 10 Buttons
                let fetchedButtons = Collections.RoleMenuConfiguration.get(interaction.guildId).roles;
                if ( fetchedButtons?.length === 15 )
                {
                    await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ROLE_MENU_ERROR_BUTTON_LIMIT_EXCEEDED') });
                    break;
                }

                // Ask for which Role to add
                await interaction.deferUpdate(); // Just so the original is editable later
                await interaction.followUp({ ephemeral: true, components: [AddRoleSelect], content: localize(interaction.locale, 'ROLE_MENU_ROLE_ADD_INSTRUCTIONS') });

                // Temp-store interaction so we can return to it
                let menuData = Collections.RoleMenuConfiguration.get(interaction.guildId);
                menuData.interaction = interaction;
                Collections.RoleMenuConfiguration.set(interaction.guildId, menuData);
                break;


            // Remove Role from Menu
            case "remove-role":
                // ACK to User to choose which Role to remove from Menu
                await interaction.deferUpdate(); // So original is editable later
                await interaction.followUp({ ephemeral: true, components: [RemoveRoleSelect], content: localize(interaction.locale, 'ROLE_MENU_ROLE_REMOVE_INSTRUCTIONS') });

                // Temp-store interaction so we can return to it
                let menuDataRemove = Collections.RoleMenuConfiguration.get(interaction.guildId);
                menuDataRemove.interaction = interaction;
                Collections.RoleMenuConfiguration.set(interaction.guildId, menuDataRemove);
                break;


            // Add a Requirement to the Menu
            case "add-requirement":
                // ACK to User to choose which Role to add as a Requirement
                await interaction.deferUpdate(); // So original is editable later
                await interaction.followUp({ ephemeral: true, components: [AddRequirementSelect], content: localize(interaction.locale, 'ROLE_MENU_REQUIREMENT_ADD_INSTRUCTIONS') });

                // Temp-store interaction so we can return to it
                let menuDataRequirementAdd = Collections.RoleMenuConfiguration.get(interaction.guildId);
                menuDataRequirementAdd.interaction = interaction;
                Collections.RoleMenuConfiguration.set(interaction.guildId, menuDataRequirementAdd);
                break;


            // Remove a Requirement from the Menu
            case "remove-requirement":
                // ACK to User to choose which Role Requirement to remove
                await interaction.deferUpdate(); // So original is editable later
                await interaction.followUp({ ephemeral: true, components: [RemoveRequirementSelect], content: localize(interaction.locale, 'ROLE_MENU_REQUIREMENT_REMOVE_INSTRUCTIONS') });

                // Temp-store interaction so we can return to it
                let menuDataRequirementRemove = Collections.RoleMenuConfiguration.get(interaction.guildId);
                menuDataRequirementRemove.interaction = interaction;
                Collections.RoleMenuConfiguration.set(interaction.guildId, menuDataRequirementRemove);
                break;

            
            // Save & Display Menu
            case "save":
                await saveAndDisplay(interaction);
                break;


            // Cancel configuration
            case "cancel":
                // Clear Timeout first, just in case
                let timeoutCache = Collections.RoleMenuConfiguration.get(interaction.guildId).timeout;
                clearTimeout(timeoutCache);
                Collections.RoleMenuConfiguration.delete(interaction.guildId);
                await interaction.update({ embeds: [], components: [], content: localize(interaction.locale, 'ROLE_MENU_CONFIGURATION_CANCELLED') });
                break;
                

            default:
                await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'ERROR_GENERIC') });
                break;
        }

        return;
    }
}






/**
 * Saves & Displays the updated Menu for Members to use
 * @param {StringSelectMenuInteraction} interaction 
 */
async function saveAndDisplay(interaction)
{
    // Defer
    await interaction.deferUpdate();

    // Fetch data
    const MenuDataCache = Collections.RoleMenuConfiguration.get(interaction.guildId);
    if ( !MenuDataCache ) { await interaction.editReply({ embeds: [], components: [], content: localize(interaction.locale, 'ROLE_MENU_ERROR_NO_CACHE_FOUND_CONFIGURATION') }); return; }

    const EmbedDataCache = MenuDataCache.embed.setFooter({ text: localize(interaction.guildLocale, 'ROLE_MENU_TYPE_FOOTER', `${MenuDataCache.type}`) });
    const ButtonDataCache = MenuDataCache.buttons;

    // Construct Component Row(s)
    let temp;
    /** @type {Array<ActionRowBuilder>} */
    let buttonsArray = [];

    for ( let i = 0; i <= ButtonDataCache.length - 1; i++ )
    {
        // So that the Custom IDs of the Buttons can be updated from the "during creation" one to the "assign role" one
        let tempRoleID = ButtonDataCache[i].data.custom_id.split("_").pop();

        if ( i === 0 )
        {
            // First Button on first row
            temp = new ActionRowBuilder().addComponents(ButtonDataCache[i].setCustomId(`role_${tempRoleID}`));
            // push early if only Button
            if ( ButtonDataCache.length - 1 === i ) { buttonsArray.push(temp); }
        }
        else if ( i > 0 && i < 4 )
        {
            // First row, buttons two through four
            temp.addComponents(ButtonDataCache[i].setCustomId(`role_${tempRoleID}`));
            // push early if last Button
            if ( ButtonDataCache.length - 1 === i ) { buttonsArray.push(temp); }
        }
        else if ( i === 4 )
        {
            // First row, fifth button
            temp.addComponents(ButtonDataCache[i].setCustomId(`role_${tempRoleID}`));
            // Free up TEMP ready for second row
            buttonsArray.push(temp);
            temp = new ActionRowBuilder();
        }
        else if ( i > 4 && i < 9 )
        {
            // Second row, buttons one through four
            temp.addComponents(ButtonDataCache[i].setCustomId(`role_${tempRoleID}`));
            // push early if last Button
            if ( ButtonDataCache.length - 1 === i ) { buttonsArray.push(temp); }
        }
        else if ( i === 9 )
        {
            // Second row, fifth button
            temp.addComponents(ButtonDataCache[i].setCustomId(`role_${tempRoleID}`));
            // Free up TEMP ready for third row
            buttonsArray.push(temp);
            temp = new ActionRowBuilder();
        }
        else if ( i > 9 && i < 14 )
        {
            // Third row, buttons one through four
            temp.addComponents(ButtonDataCache[i].setCustomId(`role_${tempRoleID}`));
            // push early if last Button
            if ( ButtonDataCache.length - 1 === i ) { buttonsArray.push(temp); }
        }
        else if ( i === 14 )
        {
            // Third row, fifth button
            temp.addComponents(ButtonDataCache[i].setCustomId(`role_${tempRoleID}`));
            buttonsArray.push(temp);
        }
        else { break; }
    }


    // Check for set Role Requirements
    let requirementString = "";

    if ( MenuDataCache.roleRequirements.length === 1 )
    {
        requirementString = localize(interaction.locale, 'ROLE_MENU_RESTRICTION_SINGLE', `<@&${MenuDataCache.roleRequirements[0]}>`);
    }
    else if ( MenuDataCache.roleRequirements.length > 1 )
    {
        requirementString = localize(interaction.locale, 'ROLE_MENU_RESTRICTION_MULTIPLE', `<@&${MenuDataCache.roleRequirements.join("> / <@&")}>`);
    }


    // Update Message with menu on
    await interaction.channel.messages.fetch(MenuDataCache.originMessageId)
    .then(async fetchedMessage => {

        await fetchedMessage.edit({
            embeds: [EmbedDataCache],
            components: buttonsArray,
            content: MenuDataCache.roleRequirements.length > 0 ? requirementString : undefined,
            allowedMentions: { parse: [] }
        })
        .then(async sentMessage => {
            // Clean up
            clearTimeout(MenuDataCache.timeout);
            Collections.RoleMenuConfiguration.delete(interaction.guildId);
            await interaction.editReply({ components: [], embeds: [], content: localize(interaction.locale, 'ROLE_MENU_CONFIGURATION_SUCCESS') });
            return;
        })
        .catch(async err => {
            await LogError(err);
            return;
        });

    });

    return;
}
