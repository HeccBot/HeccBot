import { ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, ApplicationCommandOptionType } from 'discord-api-types/v10';
import { API, MessageFlags } from '@discordjs/core';
import { request } from 'undici';
import { localize } from '../../../Utility/localizeResponses.js';
import { DISCORD_APP_USER_ID } from '../../../config.js';
import { EmbedBuilder } from '@discordjs/builders';


export const SlashCommand = {
    /** Command's Name, in fulllowercase (can include hyphens)
     * @type {String}
     */
    name: "animal",

    /** Command's Description
     * @type {String}
     */
    description: "Shows you a random picture of a specified animal",

    /** Command's Localised Descriptions
     * @type {import('discord-api-types/v10').LocalizationMap}
     */
    localizedDescriptions: {
        'en-GB': 'Shows you a random picture of a specified animal',
        'en-US': 'Shows you a random picture of a specified animal'
    },

    /** Command's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 30,

    /**
     * Cooldowns for specific Subcommands
     */
    // Where "exampleName" is either the Subcommand's Name, or a combo of both Subcommand Group Name and Subcommand Name
    //  For ease in handling cooldowns, this should also include the root Command name as a prefix
    // In either "rootCommandName_subcommandName" or "rootCommandName_groupName_subcommandName" formats
    subcommandCooldown: {
        "cat": 30,
        "dog": 30
    },
    

    /** Get the Command's data in a format able to be registered with via Discord's API
     * @returns {import('discord-api-types/v10').RESTPostAPIApplicationCommandsJSONBody}
     */
    getRegisterData() {
        /** @type {import('discord-api-types/v10').RESTPostAPIApplicationCommandsJSONBody} */
        const CommandData = {};

        CommandData.name = this.name;
        CommandData.description = this.description;
        CommandData.description_localizations = this.localizedDescriptions;
        CommandData.type = ApplicationCommandType.ChatInput;
        // Integration Types - 0 for GUILD_INSTALL, 1 for USER_INSTALL.
        //  MUST include at least one. 
        CommandData.integration_types = [ ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall ];
        // Contexts - 0 for GUILD, 1 for BOT_DM (DMs with the App), 2 for PRIVATE_CHANNEL (DMs/GDMs that don't include the App).
        //  MUST include at least one. PRIVATE_CHANNEL can only be used if integration_types includes USER_INSTALL
        CommandData.contexts = [ InteractionContextType.Guild, InteractionContextType.PrivateChannel ];
        // Options
        CommandData.options = [
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "cat",
                description: "Shows a random picture of cats",
                description_localizations: {
                    'en-GB': "Shows a random picture of cats",
                    'en-US': "Shows a random picture of cats"
                },
                options: [{
                    type: ApplicationCommandOptionType.Boolean,
                    name: "display-publicly",
                    description: "Should the image be sent publicly in chat? (Default: false)",
                    description_localizations: {
                        'en-GB': "Should the image be sent publicly in chat? (Default: false)",
                        'en-US': "Should the image be sent publicly in chat? (Default: false)"
                    },
                    required: false
                }]
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "dog",
                description: "Shows a random picture of dogs",
                description_localizations: {
                    'en-GB': "Shows a random picture of dogs",
                    'en-US': "Shows a random picture of dogs"
                },
                options: [{
                    type: ApplicationCommandOptionType.Boolean,
                    name: "display-publicly",
                    description: "Should the image be sent publicly in chat? (Default: false)",
                    description_localizations: {
                        'en-GB': "Should the image be sent publicly in chat? (Default: false)",
                        'en-US': "Should the image be sent publicly in chat? (Default: false)"
                    },
                    required: false
                }]
            }
        ];

        return CommandData;
    },

    /** Handles given Autocomplete Interactions, should this Command use Autocomplete Options
     * @param {import('discord-api-types/v10').APIApplicationCommandAutocompleteInteraction} interaction 
     * @param {API} api
     * @param {import('discord-api-types/v10').APIUser} interactionUser 
     */
    async handleAutoComplete(interaction, api, interactionUser) {
        await api.interactions.createAutocompleteResponse(interaction.id, interaction.token, { choices: [ {name: "Not implemented yet!", value: "NOT_IMPLEMENTED"} ] });

        return;
    },

    /** Runs the Command
     * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
     * @param {API} api
     * @param {import('discord-api-types/v10').APIUser} interactionUser 
     * @param {String} usedCommandName 
     */
    async executeCommand(interaction, api, interactionUser, usedCommandName) {
        // Grab Subcommand used & params inputted
        const InputSubcommand = interaction.data.options.find(option => option.type === ApplicationCommandOptionType.Subcommand);
        const InputDisplayPublicly = InputSubcommand.options?.find(option => option.name === "display-publicly");

        // Just in case (ephemeral status depends on input)
        if ( InputDisplayPublicly != undefined && InputDisplayPublicly.value === true ) { await api.interactions.defer(interaction.id, interaction.token); }
        else { await api.interactions.defer(interaction.id, interaction.token, { flags: MessageFlags.Ephemeral }); }

        // Ready Embed for construction
        const AnimalEmbed = new EmbedBuilder();


        // CATS (Far better than dogs tehe)
        if ( InputSubcommand.name === "cat" ) {
            // Grab image into embed
            AnimalEmbed
                .setImage(`https://cataas.com/cat?${interaction.id}`) // Including interaction ID just for cache reasons
                .setFooter({ text: localize(interaction.locale, 'ANIMAL_COMMAND_CAT_SOURCE_FOOTER') });
            
            await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, { embeds: [AnimalEmbed] });
            return;
        }
        // DOGS
        else if ( InputSubcommand.name === "dog" ) {
            // Due to how random.dog API works, we need to fetch a random file name FIRST, THEN fetch the actual image
            let randomDog = await request(`https://random.dog/woof?include=png,jpeg,jpg`);

            // Ensure a response was given
            if ( randomDog.statusCode != 200 ) {
                await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, { content: localize(interaction.locale, 'ANIMAL_COMMAND_ERROR_DOG_NOT_FOUND') });
                return;
            }

            // Grab image into embed
            AnimalEmbed
                .setImage(`https://random.dog/${await randomDog.body.text()}`)
                .setFooter({ text: localize(interaction.locale, 'ANIMAL_COMMAND_DOG_SOURCE_FOOTER') });

            await api.interactions.editReply(DISCORD_APP_USER_ID, interaction.token, { embeds: [AnimalEmbed] });
            return;
        }

        return;
    }
}
