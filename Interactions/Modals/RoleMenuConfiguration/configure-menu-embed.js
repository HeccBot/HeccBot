const { ModalMessageModalSubmitInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { Collections } = require("../../../constants");
const { localize } = require("../../../BotModules/LocalizationModule");

const HexColourRegex = new RegExp(/#[0-9a-fA-F]{6}/);

module.exports = {
    // Modal's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "configure-menu-embed",

    // Modal's Description
    Description: `Handles input for Role Menu embeds during configuration`,



    /**
     * Executes the Modal
     * @param {ModalMessageModalSubmitInteraction} interaction 
     */
    async execute(interaction)
    {
        const MenuSelectNoRoles = new ActionRowBuilder().addComponents([
            new StringSelectMenuBuilder().setCustomId(`configure-role-menu`).setMinValues(1).setMaxValues(1).setPlaceholder(localize(interaction.locale, 'PLEASE_SELECT_AN_ACTION')).setOptions([
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE')).setValue("set-type").setDescription(localize(interaction.locale, 'ROLE_MENU_SET_MENU_TYPE_DESCRIPTION')).setEmoji(`🔧`),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CONFIGURE_EMBED')).setValue("configure-embed").setDescription(localize(interaction.locale, 'ROLE_MENU_CONFIGURE_EMBED_DESCRIPTION')).setEmoji(`<:StatusRichPresence:842328614883295232>`),
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_ADD_ROLE')).setValue("add-role").setDescription(localize(interaction.locale, 'ROLE_MENU_ADD_ROLE_DESCRIPTION')).setEmoji(`<:RoleAdd:1201474746810904607>`), 
                new StringSelectMenuOptionBuilder().setLabel(localize(interaction.locale, 'ROLE_MENU_CANCEL_CONFIGURATION')).setValue("cancel").setDescription(localize(interaction.locale, 'ROLE_MENU_CANCEL_CONFIGURATION_DESCRIPTION')).setEmoji(`❌`)
            ])
        ]);

        // Grab Inputs
        const InputTitle = interaction.fields.getTextInputValue("title");
        const InputDescription = interaction.fields.getTextInputValue("description");
        const InputColour = interaction.fields.getTextInputValue("hex-colour");

        let originalComponents = interaction.message.components;

        let menuEmbed = Collections.RoleMenuConfiguration.get(interaction.guildId)?.embed;
        if ( !menuEmbed ) { menuEmbed = new EmbedBuilder(); }

        // Set data, if given, and also do validation checks if need be
        if ( InputTitle != "" && InputTitle != " " && InputTitle != null && InputTitle != undefined ) { menuEmbed.setTitle(InputTitle); }
        else { menuEmbed.setTitle(null); }

        if ( InputDescription != "" && InputDescription != " " && InputDescription != null && InputDescription != undefined ) { menuEmbed.setDescription(InputDescription); }
        else { menuEmbed.setDescription(null); }

        if ( InputColour != "" && InputColour != " " && InputColour != null && InputColour != undefined )
        {
            // Validate
            if ( !HexColourRegex.test(InputColour) )
            {
                await interaction.update({ components: originalComponents });
                await interaction.followUp({ ephemeral: true, content: localize(interaction.locale, 'ERROR_INVALID_COLOR_HEX') });
                return;
            }
            else { menuEmbed.setColor(InputColour); }
        }
        else { menuEmbed.setColor(null); }

        // Update stored Embed
        let fetchedData = Collections.RoleMenuConfiguration.get(interaction.guildId);
        fetchedData.embed = menuEmbed;
        Collections.RoleMenuConfiguration.set(interaction.guildId, fetchedData);

        // Update Component to "no roles" one, if it was the first Embed edit
        if ( originalComponents[originalComponents.length - 1].components[originalComponents[originalComponents.length - 1].components.length - 1].options.length === 3 )
        {
            await interaction.update({ embeds: [menuEmbed], components: [MenuSelectNoRoles] });
            return;
        }
        else
        {
            await interaction.update({ embeds: [menuEmbed] });
            return;
        }
    }
}
