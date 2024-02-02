const { ButtonInteraction, EmbedBuilder } = require("discord.js");
const { localize } = require("../../../BotModules/LocalizationModule");

module.exports = {
    // Button's Name
    //     Used as its custom ID (or at least the start of it)
    Name: "info-user-role",

    // Button's Description
    Description: `Shows what Roles the Member has, part of /info user Command`,

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 30,



    /**
     * Executes the Button
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction)
    {
        await interaction.deferReply({ ephemeral: true });

        // Grab Target Member
        const TargetMemberId = interaction.customId.split("_").pop();
        const FetchedMember = await interaction.guild.members.fetch(TargetMemberId);
        const MemberRoles = FetchedMember.roles.cache.filter(role => role.id !== interaction.guildId); // Filter out atEveryone

        // Sort Roles by position
        const SortedMemberRoles = MemberRoles.sort((roleA, roleB) => roleB.rawPosition - roleA.rawPosition);

        // Role Mention Strings
        let roleStrings = [];
        SortedMemberRoles.forEach(role => roleStrings.push(`<@&${role.id}>`));

        // Construct Embed
        const RoleInfoEmbed = new EmbedBuilder().setColor(FetchedMember.displayHexColor)
        .setAuthor({ name: `${localize(interaction.locale, 'INFO_USER_HEADER_ROLES', FetchedMember.displayName)}`, iconURL: FetchedMember.displayAvatarURL({ extension: 'png' }) })
        .setDescription(roleStrings.join(', '));

        // Send
        interaction.editReply({ ephemeral: true, embeds: [RoleInfoEmbed] });
        return;
    }
}
