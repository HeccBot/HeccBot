const { ChatInputCommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, PermissionFlagsBits, ApplicationCommandOptionType, ChannelType, ApplicationCommandOptionChoiceData, StageInstancePrivacyLevel } = require("discord.js");
const { DiscordClient } = require("../../../constants");
const { localize } = require("../../../BotModules/LocalizationModule");
const { LogToUserInteraction } = require("../../../BotModules/LoggingModule");

module.exports = {
    // Command's Name
    //     Use full lowercase
    Name: "stagepublic",

    // Command's Description
    Description: `Starts a public Stage instance in your Stage Channel, which will show on listener's User Statuses!`,

    // Command's Localised Descriptions
    LocalisedDescriptions: {
        'en-GB': `Starts a public Stage instance in your Stage Channel, which will show on listener's User Statuses!`,
        'en-US': `Starts a public Stage instance in your Stage Channel, which will show on listener's User Statuses!`
    },

    // Command's Category
    Category: "MANAGEMENT",

    // Cooldown, in seconds
    //     Defaults to 3 seconds if missing
    Cooldown: 60,

    // Cooldowns for specific subcommands and/or subcommand-groups
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandCooldown: {
        "example": 3
    },

    // Scope of Command's usage
    //     One of the following: DM, GUILD, ALL
    Scope: "GUILD",

    // Scope of specific Subcommands Usage
    //     One of the following: DM, GUILD, ALL
    //     IF SUBCOMMAND: name as "subcommandName"
    //     IF SUBCOMMAND GROUP: name as "subcommandGroupName_subcommandName"
    SubcommandScope: {
        "example": "GUILD"
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
        Data.descriptionLocalizations = this.LocalisedDescriptions;
        Data.type = ApplicationCommandType.ChatInput;
        Data.dmPermission = false;
        Data.defaultMemberPermissions = [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.MoveMembers]; // The Stage Mod Perms
        Data.options = [
            {
                type: ApplicationCommandOptionType.Channel,
                name: "stage",
                description: "The Stage you want to start a public instance in",
                descriptionLocalizations: {
                    'en-GB': `The Stage you want to start a public instance in`,
                    'en-US': `The Stage you want to start a public instance in`
                },
                channelTypes: [ ChannelType.GuildStageVoice ],
                required: true
            },
            {
                type: ApplicationCommandOptionType.String,
                name: "topic",
                description: "The topic or name of this Stage instance",
                descriptionLocalizations: {
                    'en-GB': `The topic or name of this Stage instance`,
                    'en-US': `The topic or name of this Stage instance`
                },
                maxLength: 120,
                minLength: 1,
                required: true
            },
            {
                type: ApplicationCommandOptionType.String,
                name: "event",
                description: "[Optional] The Scheduled Event this Stage instance should be linked to",
                descriptionLocalizations: {
                    'en-GB': `[Optional] The Scheduled Event this Stage instance should be linked to`,
                    'en-US': `[Optional] The Scheduled Event this Stage instance should be linked to`
                },
                required: false,
                autocomplete: true
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
        // Grab Inputs
        const InputStage = interaction.options.getChannel("stage", true, [ChannelType.GuildStageVoice]);
        const InputTopic = interaction.options.getString("topic", true);
        const InputEventId = interaction.options.getString("event");

        // Ensure HeccBot has perms to start live instances in selected Stage
        const HeccBotStagePermissions = InputStage.permissionsFor(DiscordClient.user.id);

        if ( !HeccBotStagePermissions.has(PermissionFlagsBits.ViewChannel) ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'STAGE_COMMAND_ERROR_MISSING_VIEW_CHANNELS_PERMISSION') }); return; }
        if ( !HeccBotStagePermissions.has([PermissionFlagsBits.ManageChannels, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.MoveMembers]) ) { await interaction.reply({ ephemeral: true, content: localize(interaction.locale, 'STAGE_COMMAND_ERROR_MISSING_STAGE_MOD_PERMISSIONS') }); return; }

        // Just in case
        await interaction.deferReply({ ephemeral: true });


        // If Event Id was given, then validate it. Use NULL for not given
        /** @type {?Boolean} */
        let isEventValid = null;
        
        if ( InputEventId != null )
        {
            const fetchEvent = interaction.guild.scheduledEvents.resolve(InputEventId);
            if ( fetchEvent != null ) { isEventValid = true; }
            else { isEventValid = false; }
        }


        // Attempt Stage start
        await InputStage.createStageInstance({
            topic: InputTopic,
            privacyLevel: StageInstancePrivacyLevel.Public,
            guildScheduledEvent: isEventValid === true ? InputEventId : undefined
        })
        .then(async () => {
            await interaction.editReply({ content: `${localize(interaction.locale, 'STAGE_COMMAND_SUCCESS', `<#${InputStage.id}>`)}${isEventValid === false ? `\n\n${localize(interaction.locale, 'STAGE_COMMAND_INVALID_EVENT')}` : ""}` });
            return;
        })
        .catch(async err => {
            LogToUserInteraction(interaction, null, err);
            return;
        });

        return;
    },



    /**
     * Handles given Autocomplete Interactions for any Options in this Slash CMD that uses it
     * @param {AutocompleteInteraction} interaction 
     */
    async autocomplete(interaction)
    {
        // Gonna be lazy and not have a check here since this Command is only got Events for an autocomplete lol

        // Fetch Server's Events
        const ServerEvents = await interaction.guild.scheduledEvents.fetch();

        // Check there are actually Scheduled Events listed
        if ( ServerEvents.size < 1 )
        {
            await interaction.respond([{ name: localize(interaction.locale, 'STAGE_COMMAND_AUTOCOMPLETE_NO_RESULTS'), value: "NO_EVENTS_FOUND" }]);
            return;
        }

        // Construct array from Collection, taking into account 25 limit for autocomplete responses
        /** @type {ApplicationCommandOptionChoiceData<String>[]} */
        let responseArray = [];

        ServerEvents.forEach(eventItem => {
            if ( responseArray.length < 25 ) { responseArray.push({ name: eventItem.name, value: eventItem.id }); }
        });

        await interaction.respond(responseArray);
        return;
    }
}
