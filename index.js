import { GatewayDispatchEvents, PresenceUpdateStatus } from '@discordjs/core';
import { InteractionType, MessageType } from 'discord-api-types/v10';
import { isChatInputApplicationCommandInteraction, isContextMenuApplicationCommandInteraction, isMessageComponentButtonInteraction, isMessageComponentSelectMenuInteraction } from 'discord-api-types/utils';
import * as fs from 'node:fs';

import { DiscordClient, UtilityCollections } from './Utility/utilityConstants.js';
import { handleTextCommand } from './Handlers/Commands/textCommandHandler.js';
import { handleSlashCommand } from './Handlers/Commands/slashCommandHandler.js';
import { handleContextCommand } from './Handlers/Commands/contextCommandHandler.js';
import { handleButton } from './Handlers/Interactions/buttonHandler.js';
import { handleSelect } from './Handlers/Interactions/selectHandler.js';
import { handleAutocomplete } from './Handlers/Interactions/autocompleteHandler.js';
import { handleModal } from './Handlers/Interactions/modalHandler.js';
import { logInfo } from './Utility/loggingModule.js';










// *******************************
//  Bring in files for Commands & Interactions

//  Text Commands
const TextCommandFiles = fs.readdirSync('./Commands/TextCommands').filter(file => file.endsWith('.js'));

for ( const File of TextCommandFiles ) {
    const TempFile = await import(`./Commands/TextCommands/${File}`);
    UtilityCollections.TextCommands.set(TempFile.TextCommand.name, TempFile.TextCommand);
}

// Slash Commands
const SlashFolders = fs.readdirSync('./Commands/SlashCommands');

for ( const Folder of SlashFolders ) {
    const SlashCommandFiles = fs.readdirSync(`./Commands/SlashCommands/${Folder}`).filter(file => file.endsWith(".js"));

    for ( const File of SlashCommandFiles ) {
        const TempFile = await import(`./Commands/SlashCommands/${Folder}/${File}`);
        if ( 'executeCommand' in TempFile.SlashCommand && 'getRegisterData' in TempFile.SlashCommand ) { UtilityCollections.SlashCommands.set(TempFile.SlashCommand.name, TempFile.SlashCommand); }
        else { console.warn(`[WARNING] The Slash Command at ./Commands/SlashCommands/${Folder}/${File} is missing required "executeCommand" or "getRegisterData" methods.`); }
    }
}

// Context Commands
const ContextFolders = fs.readdirSync(`./Commands/ContextCommands`);

for ( const Folder of ContextFolders ) {
    const ContextCommandFiles = fs.readdirSync(`./Commands/ContextCommands/${Folder}`).filter(file => file.endsWith(".js"));

    for ( const File of ContextCommandFiles ) {
        const TempFile = await import(`./Commands/ContextCommands/${Folder}/${File}`);
        if ( 'executeCommand' in TempFile && 'getRegisterData' in TempFile ) { UtilityCollections.ContextCommands.set(TempFile.ContextCommand.name, TempFile.ContextCommand); }
        else { console.warn(`[WARNING] The Context Command at ./Commands/ContextCommands/${Folder}/${File} is missing required "executeCommand" or "getRegisterData" methods.`); }
    }
}

// Buttons
const ButtonFolders = fs.readdirSync(`./Interactions/Buttons`);

for ( const Folder of ButtonFolders ) {
    const ButtonFiles = fs.readdirSync(`./Interactions/Buttons/${Folder}`).filter(file => file.endsWith(".js"));

    for ( const File of ButtonFiles ) {
        const TempFile = await import(`./Interactions/Buttons/${Folder}/${File}`);
        if ( 'executeButton' in TempFile ) { UtilityCollections.Buttons.set(TempFile.Button.name, TempFile.Button); }
        else { console.warn(`[WARNING] The Button at ./Interactions/Buttons/${Folder}/${File} is missing required "executeButton" method.`); }
    }
}

// Selects
const SelectFolders = fs.readdirSync(`./Interactions/Selects`);

for ( const Folder of SelectFolders ) {
    const SelectFiles = fs.readdirSync(`./Interactions/Selects/${Folder}`).filter(file => file.endsWith(".js"));

    for ( const File of SelectFiles ) {
        const TempFile = await import(`./Interactions/Selects/${Folder}/${File}`);
        if ( 'executeSelect' in TempFile ) { UtilityCollections.Selects.set(TempFile.Select.name, TempFile.Select); }
        else { console.warn(`[WARNING] The Select at ./Interactions/Selects/${Folder}/${File} is missing required "executeSelect" method.`); }
    }
}

// Modals
const ModalFolders = fs.readdirSync(`./Interactions/Modals`);

for ( const Folder of ModalFolders ) {
    const ModalFiles = fs.readdirSync(`./Interactions/Modals/${Folder}`).filter(file => file.endsWith(".js"));

    for ( const File of ModalFiles ) {
        const TempFile = await import(`./Interactions/Modals/${Folder}/${File}`);
        if ( 'executeModal' in TempFile ) { UtilityCollections.Modals.set(TempFile.Modal.name, TempFile.Modal); }
        else { console.warn(`[WARNING] The Modal at ./Interactions/Modals/${Folder}/${File} is missing required "executeModal" method.`); }
    }
}









// *******************************
//  Discord Ready Event
DiscordClient.once(GatewayDispatchEvents.Ready, async () => {
    // Set status
    await DiscordClient.updatePresence(0, { status: PresenceUpdateStatus.Online });

    console.log(`Online & Ready!`);
});









// *******************************
//  Debugging and Error Logging
process.on('warning', console.warn);
process.on('unhandledRejection', console.error);









// *******************************
//  Discord Message Create Event
const SystemMessageTypes = [
    MessageType.RecipientAdd, MessageType.RecipientRemove, MessageType.Call, MessageType.ChannelNameChange,
    MessageType.ChannelIconChange, MessageType.ChannelPinnedMessage, MessageType.UserJoin, MessageType.GuildBoost,
    MessageType.GuildBoostTier1, MessageType.GuildBoostTier2, MessageType.GuildBoostTier3, MessageType.ChannelFollowAdd,
    MessageType.GuildDiscoveryDisqualified, MessageType.GuildDiscoveryRequalified, MessageType.GuildDiscoveryGracePeriodInitialWarning,
    MessageType.GuildDiscoveryGracePeriodFinalWarning, MessageType.ThreadCreated, MessageType.GuildInviteReminder, MessageType.AutoModerationAction,
    MessageType.RoleSubscriptionPurchase, MessageType.InteractionPremiumUpsell, MessageType.StageStart, MessageType.StageEnd, MessageType.StageSpeaker,
    MessageType.StageTopic, MessageType.GuildApplicationPremiumSubscription, MessageType.GuildIncidentAlertModeEnabled,
    MessageType.GuildIncidentAlertModeDisabled, MessageType.GuildIncidentReportRaid, MessageType.GuildIncidentReportFalseAlarm,
    // The following haven't been added to Discord API Types yet? :thinking:
    44, // PURCHASE_NOTIFICATION
    46 // POLL_RESULT
];

DiscordClient.on(GatewayDispatchEvents.MessageCreate, async ({ data: message, api }) => {
    // Bots/Apps
    if ( message.author.bot ) { return; }

    // System Messages
    if ( message.author.system || SystemMessageTypes.includes(message.type) ) { return; }

    // No need to filter out messages from DMs since that can be controlled via the Intents system!
    // Can't even check that anyways without an API call since Discord's API doesn't provide even a partial Channel object with Messages

    // Wish I could add a safe-guard check for guild.avaliable BUT DISCORD'S API DOESN'T PROVIDE EVEN A PARTIAL GUILD OBJECT WITH MESSAGES EITHER :upside_down:


    // Check for (and handle) Commands
    await handleTextCommand(message, api);

    // Placeholder for any conditionals/extra code to run based off the result of handling Text Commands above

    return;
});









// *******************************
//  Discord Interaction Create Event
DiscordClient.on(GatewayDispatchEvents.InteractionCreate, async ({ data: interaction, api }) => {
    // Slash Commands
    if ( isChatInputApplicationCommandInteraction(interaction) ) { await handleSlashCommand(interaction, api); }
    // Context Commands
    else if ( isContextMenuApplicationCommandInteraction(interaction) ) { await handleContextCommand(interaction, api); }
    // Buttons
    else if ( isMessageComponentButtonInteraction(interaction) ) { await handleButton(interaction, api); }
    // Selects
    else if ( isMessageComponentSelectMenuInteraction(interaction) ) { await handleSelect(interaction, api); }
    // Autocomplete
    else if ( interaction.type === InteractionType.ApplicationCommandAutocomplete ) { await handleAutocomplete(interaction, api); }
    // Modals
    else if ( interaction.type === InteractionType.ModalSubmit ) { await handleModal(interaction, api); }
    // Others
    else { await logInfo(`****Unrecognised or new unhandled Interaction Type triggered: ${interaction.type}`, api); }

    return;
});
