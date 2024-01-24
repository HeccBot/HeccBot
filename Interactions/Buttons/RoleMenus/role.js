const { ButtonInteraction } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");
const { LogError } = require("../../../BotModules/LoggingModule");

module.exports = {
    // Button's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "role",

    // Button's Description
    Description: `Handles granting or revoking Roles via Role Menus`,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 5,



    /**
     * Executes the Button
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction)
    {
        // Just in case
        await interaction.deferReply({ ephemeral: true });

        // Fetch Role ID
        const RoleID = interaction.customId.split("_").pop();

        // Check what Menu Type this is
        const MessageEmbed = interaction.message.embeds.shift();
        const MenuType = MessageEmbed.footer.text.split(": ").pop();

        switch (MenuType)
        {
            // Classic Role Menu. Grants Role if User doesn't have it, revokes Role if User does have it.
            case "TOGGLE":
                await toggleRole(interaction, RoleID);
                break;


            // Swappable Role Menu. Users can only have ONE Role at a time per SWAPPABLE Menu. Example use case: Colour Roles.
            case "SWAP":
                await swapRole(interaction, RoleID);
                break;
                

            // Single-use Role Menu. Users can only use a SINGLE-USE Menu once, and cannot remove the Role they get nor swap it. Example use case: Team Roles for events.
            case "SINGLE":
                await singleRole(interaction, RoleID);
                break;


            default:
                interaction.editReply({ content: `${localize(interaction.locale, 'BUTTON_ERROR_GENERIC')}` });
                break;
        }

        return;
    }
}






/**
 * Handles Role Button Interactions from TOGGLE Menu Types
 * @param {ButtonInteraction} interaction 
 * @param {String} RoleID
 */
async function toggleRole(interaction, RoleID)
{
    // Check if Member already has the Role
    // Using forced Fetches to ensure updated Role Caches for the Member
    const Member = await interaction.guild.members.fetch({ user: interaction.user.id, force: true });

    if ( Member.roles.cache.has(RoleID) )
    {
        // Member DOES already have this Role, so REVOKE it instead
        try
        {
            await Member.roles.remove(RoleID, `${localize(interaction.guildLocale, 'ROLE_BUTTON_AUDIT_LOG_ENTRY', `#${interaction.channel.name}`)}`)
            .then(async Member => {
                await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_REVOKE_SUCCESS', `<@&${RoleID}>`)}` });
                return;
            });
        }
        catch (err)
        {
            await LogError(err);
            await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_ERROR_REVOKE_FAILED', `<@&${RoleID}>`)}` });
        }

        return;
    }
    else
    {
        // Member does NOT have Role, so GRANT it
        try
        {
            await Member.roles.add(RoleID, `${localize(interaction.guildLocale, 'ROLE_BUTTON_AUDIT_LOG_ENTRY', `#${interaction.channel.name}`)}`)
            .then(async Member => {
                await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_GRANT_SUCCESS', `<@&${RoleID}>`)}` });
                return;
            });
        }
        catch (err)
        {
            await LogError(err);
            await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_ERROR_GRANT_FAILED', `<@&${RoleID}>`)}` });
        }

        return;
    }
}






/**
 * Handles Role Button Interactions from SWAP Menu Types
 * @param {ButtonInteraction} interaction 
 * @param {String} RoleID
 */
async function swapRole(interaction, RoleID)
{
    // Using forced Fetches to ensure updated Role Caches for the Member
    const Member = await interaction.guild.members.fetch({ user: interaction.user.id, force: true });

    // Grab all the Role IDs on that Menu, to check if the Member already has a Role from this Menu
    const MenuButtons = interaction.message.components;
    let menuRoleIds = [];
    MenuButtons.forEach(row => {
        row.components.forEach(button => {
            menuRoleIds.push(button.customId.split("_").pop());
        });
    });

    let memberHasRole = false;
    let roleAlreadyHave = null;
    menuRoleIds.forEach(Id => {
        if ( Member.roles.cache.has(Id) )
        {
            memberHasRole = true;
            roleAlreadyHave = Id;
            return;
        }
    });


    // Member does NOT have any Roles from this Menu, so grant the selected Role
    if ( !memberHasRole )
    {
        try
        {
            await Member.roles.add(RoleID, `${localize(interaction.guildLocale, 'ROLE_BUTTON_AUDIT_LOG_ENTRY', `#${interaction.channel.name}`)}`)
            .then(async Member => {
                await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_GRANT_SUCCESS', `<@&${RoleID}>`)}` });
                return;
            });
        }
        catch (err)
        {
            await LogError(err);
            await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_ERROR_GRANT_FAILED', `<@&${RoleID}>`)}` });
        }
    }
    // Member DOES have a Role from this Menu already
    else
    {
        // If selecting Role Member already has, revoke it
        if ( Member.roles.cache.has(RoleID) )
        {
            try
            {
                await Member.roles.remove(RoleID, `${localize(interaction.guildLocale, 'ROLE_BUTTON_AUDIT_LOG_ENTRY', `#${interaction.channel.name}`)}`)
                .then(async Member => {
                    await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_REVOKE_SUCCESS', `<@&${RoleID}>`)}` });
                    return;
                });
            }
            catch (err)
            {
                await LogError(err);
                await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_ERROR_REVOKE_FAILED', `<@&${RoleID}>`)}` });
            }
        }
        // Otherwise, swap the two Roles
        else
        {
            try
            {
                await Member.roles.remove(roleAlreadyHave, `${localize(interaction.guildLocale, 'ROLE_BUTTON_AUDIT_LOG_ENTRY', `#${interaction.channel.name}`)}`)
                .then(async TempMember => {
                    await Member.roles.add(RoleID, `${localize(interaction.guildLocale, 'ROLE_BUTTON_AUDIT_LOG_ENTRY', `#${interaction.channel.name}`)}`)
                    .then(async TempMemberTheSecond => {
                        await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_SWAP_SUCCESS', `<@&${roleAlreadyHave}>`, `<@&${RoleID}>`)}` });
                        return;
                    });
                });
            }
            catch (err)
            {
                await LogError(err);
                await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_ERROR_SWAP_FAILED', `<@&${roleAlreadyHave}>`, `<@&${RoleID}>`)}` });
            }
        }
    }

    return;
}






/**
 * Handles Role Button Interactions from SINGLE Menu Types
 * @param {ButtonInteraction} interaction 
 * @param {String} RoleID
 */
async function singleRole(interaction, RoleID)
{
    // Using forced Fetches to ensure updated Role Caches for the Member
    const Member = await interaction.guild.members.fetch({ user: interaction.user.id, force: true });

    // Grab all the Role IDs on that Menu, to check if the Member already has a Role from this Menu
    const MenuButtons = interaction.message.components;
    let menuRoleIds = [];
    MenuButtons.forEach(row => {
        row.components.forEach(button => {
            menuRoleIds.push(button.customId.split("_").pop());
        });
    });

    let memberHasRole = false;
    let roleAlreadyHave = null;
    menuRoleIds.forEach(Id => {
        if ( Member.roles.cache.has(Id) )
        {
            memberHasRole = true;
            roleAlreadyHave = Id;
            return;
        }
    });


    // Member does NOT have any Roles from this Menu, so grant the selected Role
    if ( !memberHasRole )
    {
        try
        {
            await Member.roles.add(RoleID, `${localize(interaction.guildLocale, 'ROLE_BUTTON_AUDIT_LOG_ENTRY', `#${interaction.channel.name}`)}`)
            .then(async Member => {
                await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_GRANT_SUCCESS', `<@&${RoleID}>`)}` });
                return;
            });
        }
        catch (err)
        {
            await LogError(err);
            await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_ERROR_GRANT_FAILED', `<@&${RoleID}>`)}` });
        }
    }
    // Member DOES have a Role from this Menu already
    else
    {
        // Reject because this is a single-use Menu and Members can't even self-revoke Roles from this type of Menu
        await interaction.editReply({ content: `${localize(interaction.locale, 'ROLE_BUTTON_ERROR_SINGLE_USE_ONLY', `<@&${roleAlreadyHave}>`)}` });
        return;
    }
}
