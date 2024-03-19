const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { request } = require('undici');
const { localize } = require("../../../BotModules/LocalizationModule");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "animal",

    // Command's Description
    Description: `Shows you a random picture of a specified animal`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Shows you a random picture of a specified animal`,
        'en-US': `Shows you a random picture of a specified animal`
    },

    // Command's Category
    Category: "GENERAL",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 30,

    // Cooldowns for specific subcommands and/or subcommand-groups
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandCooldown: {
        "cat": 30,
        "dog": 30
    },

    // Scope of Command's usage
    //     One of the following: DM, GUILD, ALL
    Scope: "GUILD",

    // Scope of specific Subcommands Usage
    //     One of the following: DM, GUILD, ALL
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandScope: {
        "cat": "ALL",
        "dog": "ALL"
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
        Data.description_localizations = this.LocalisedDescriptions;
        Data.type = ApplicationCommandType.ChatInput;
        Data.integration_types = [ 0 ]; // 0 for GUILD_INSTALL, 1 for USER_INSTALL, can include both but must have at least one of them included
        Data.contexts = [ 0 ]; // 0 for GUILD, 1 for BOT_DM (DMs with the Bot), 2 for PRIVATE_CHANNEL (DMs/GDMs that don't include Bot). Must include at least one, PRIVATE_CHANNEL can only be used if integrationTypes includes USER_INSTALL
        Data.options = [
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "cat",
                description: "Shows a random picture of cats",
                descriptionLocalizations: {
                    'en-GB': "Shows a random picture of cats",
                    'en-US': "Shows a random picture of cats"
                }
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "dog",
                description: "Shows a random picture of dogs",
                descriptionLocalizations: {
                    'en-GB': "Shows a random picture of dogs",
                    'en-US': "Shows a random picture of dogs"
                }
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
        // Just in case
        await interaction.deferReply({ ephemeral: true });

        // Grab Subcommand
        const InputSubcommand = interaction.options.getSubcommand(true);

        // Construct Embed
        const AnimalEmbed = new EmbedBuilder();


        // CATS (the best animal ever)
        if ( InputSubcommand === "cat" )
        {
            // Grab image into Embed
            AnimalEmbed.setImage(`https://cataas.com/cat?${interaction.id}`) // Including interaction ID just for cache reasons?
            .setFooter({ text: localize(interaction.locale, 'ANIMAL_COMMAND_CAT_SOURCE_FOOTER') });

            // ACK
            await interaction.editReply({ embeds: [AnimalEmbed] });
            return;
        }
        // DOGS
        else if ( InputSubcommand === "dog" )
        {
            // Due to how the random.dog API works, HeccBot needs to fetch a random file name from API first, THEN fetch the actual image link for it
            let randomDog = await request(`https://random.dog/woof?include=png,jpeg,jpg`);

            // Ensure actually getting a response
            if ( randomDog.statusCode != 200 ) { await interaction.editReply({ content: localize(interaction.locale, 'ANIMAL_COMMAND_ERROR_DOG_NOT_FOUND') }); return; }

            // Grab image into Embed
            AnimalEmbed.setImage(`https://random.dog/${await randomDog.body.text()}`)
            .setFooter({ text: localize(interaction.locale, 'ANIMAL_COMMAND_DOG_SOURCE_FOOTER') });

            // ACK
            await interaction.editReply({ embeds: [AnimalEmbed] });
            return;
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
