const Mongoose = require("mongoose");
const { RateLimitError, DMChannel, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Webhook, Colors, TextChannel, PartialGroupDMChannel } = require("discord.js");
const { Statuspage, StatuspageUpdates } = require("statuspage.js");
const fs = require("node:fs");
const path = require("node:path");
const { DiscordClient, Collections, DiscordStatusClient, checkPomelo, fetchDisplayName } = require("./constants.js");
const Config = require("./config.js");
const { LogWarn, LogError, LogInfo } = require("./BotModules/LoggingModule.js");



// Just so its mutable
DiscordClient.DebugMode = false;



/******************************************************************************* */
// BRING IN FILES FOR COMMANDS AND INTERACTIONS
// Text Commands
const TextCommandFiles = fs.readdirSync("./TextCommands").filter(file => file.endsWith(".js"));
for ( const File of TextCommandFiles )
{
    const TempCommand = require(`./TextCommands/${File}`);
    Collections.TextCommands.set(TempCommand.Name, TempCommand);
}

// Slash Commands
const SlashFoldersPath = path.join(__dirname, 'Interactions/SlashCommands');
const SlashCommandFolders = fs.readdirSync(SlashFoldersPath);

for ( const Folder of SlashCommandFolders )
{
    const SlashCommandsPath = path.join(SlashFoldersPath, Folder);
    const SlashCommandFiles = fs.readdirSync(SlashCommandsPath).filter(file => file.endsWith(".js"));
    
    for ( const File of SlashCommandFiles )
    {
        const FilePath = path.join(SlashCommandsPath, File);
        const TempCommand = require(FilePath);
        if ( 'execute' in TempCommand && 'registerData' in TempCommand ) { Collections.SlashCommands.set(TempCommand.Name, TempCommand); }
        else { console.warn(`[WARNING] The Slash Command at ${FilePath} is missing required "execute" or "registerData" methods.`); }
    }
}

// Context Commands
const ContextFoldersPath = path.join(__dirname, 'Interactions/ContextCommands');
const ContextCommandFolders = fs.readdirSync(ContextFoldersPath);

for ( const Folder of ContextCommandFolders )
{
    const ContextCommandsPath = path.join(ContextFoldersPath, Folder);
    const ContextCommandFiles = fs.readdirSync(ContextCommandsPath).filter(file => file.endsWith(".js"));
    
    for ( const File of ContextCommandFiles )
    {
        const FilePath = path.join(ContextCommandsPath, File);
        const TempCommand = require(FilePath);
        if ( 'execute' in TempCommand && 'registerData' in TempCommand ) { Collections.ContextCommands.set(TempCommand.Name, TempCommand); }
        else { console.warn(`[WARNING] The Context Command at ${FilePath} is missing required "execute" or "registerData" methods.`); }
    }
}

// Buttons
const ButtonFoldersPath = path.join(__dirname, 'Interactions/Buttons');
const ButtonFolders = fs.readdirSync(ButtonFoldersPath);

for ( const Folder of ButtonFolders )
{
    const ButtonPath = path.join(ButtonFoldersPath, Folder);
    const ButtonFiles = fs.readdirSync(ButtonPath).filter(file => file.endsWith(".js"));
    
    for ( const File of ButtonFiles )
    {
        const FilePath = path.join(ButtonPath, File);
        const TempFile = require(FilePath);
        if ( 'execute' in TempFile ) { Collections.Buttons.set(TempFile.Name, TempFile); }
        else { console.warn(`[WARNING] The Button at ${FilePath} is missing required "execute" method.`); }
    }
}

// Selects
const SelectFoldersPath = path.join(__dirname, 'Interactions/Selects');
const SelectFolders = fs.readdirSync(SelectFoldersPath);

for ( const Folder of SelectFolders )
{
    const SelectPath = path.join(SelectFoldersPath, Folder);
    const SelectFiles = fs.readdirSync(SelectPath).filter(file => file.endsWith(".js"));
    
    for ( const File of SelectFiles )
    {
        const FilePath = path.join(SelectPath, File);
        const TempFile = require(FilePath);
        if ( 'execute' in TempFile ) { Collections.Selects.set(TempFile.Name, TempFile); }
        else { console.warn(`[WARNING] The Select at ${FilePath} is missing required "execute" method.`); }
    }
}

// Modals
const ModalFoldersPath = path.join(__dirname, 'Interactions/Modals');
const ModalFolders = fs.readdirSync(ModalFoldersPath);

for ( const Folder of ModalFolders )
{
    const ModalPath = path.join(ModalFoldersPath, Folder);
    const ModalFiles = fs.readdirSync(ModalPath).filter(file => file.endsWith(".js"));
    
    for ( const File of ModalFiles )
    {
        const FilePath = path.join(ModalPath, File);
        const TempFile = require(FilePath);
        if ( 'execute' in TempFile ) { Collections.Modals.set(TempFile.Name, TempFile); }
        else { console.warn(`[WARNING] The Modal at ${FilePath} is missing required "execute" method.`); }
    }
}








/******************************************************************************* */
// DISCORD - READY EVENT
DiscordClient.once('ready', () => {
    DiscordClient.user.setPresence({ status: 'online' });
    console.log(`${checkPomelo(DiscordClient.user) ? `${DiscordClient.user.username}` : `${DiscordClient.user.username}#${DiscordClient.user.discriminator}`} is online and ready!`);
});








/******************************************************************************* */
// DEBUGGING AND ERROR LOGGING
// Warnings
process.on('warning', async (warning) => { await LogWarn(null, warning); return; });
DiscordClient.on('warn', async (warning) => { await LogWarn(null, warning); return; });

// Unhandled Promise Rejections
process.on('unhandledRejection', async (err) => { await LogError(err); return; });

// Discord Errors
DiscordClient.on('error', async (err) => { await LogError(err); return; });

// Discord Rate Limit - Only uncomment when debugging
//DiscordClient.rest.on('rateLimited', async (RateLimitError) => { return console.log("***DISCORD RATELIMIT HIT: ", RateLimitError); });

// Mongoose Errors
Mongoose.connection.on('error', async err => { await LogError(err); return; });








/******************************************************************************* */
// DISCORD - MESSAGE CREATE EVENT
const TextCommandHandler = require("./BotModules/Handlers/TextCommandHandler.js");

DiscordClient.on('messageCreate', async (message) => {
    // Partials
    if ( message.partial ) { return; }

    // Bots
    if ( message.author.bot ) { return; }

    // System Messages
    if ( message.system || message.author.system ) { return; }

    // DM Channel Messages
    if ( message.channel instanceof DMChannel ) { return; }
    if ( message.channel instanceof PartialGroupDMChannel ) { return; }

    // If no content (because none was provided or because Bot was not mentioned due to not having Message Content Intent) - ignore
    if ( message.content == null ) { return; }

    // Safe-guard against Discord Outages
    if ( !message.guild.available ) { return; }



    // Check for (and handle) Commands
    let textCommandStatus = await TextCommandHandler.Main(message);
    if ( textCommandStatus === false )
    {
        // No Command detected
        return;
    }
    else if ( textCommandStatus === null )
    {
        // Prefix was detected, but wasn't a command on the bot
        return;
    }
    else
    {
        // Command failed or successful
        return;
    }
});








/******************************************************************************* */
// DISCORD - INTERACTION CREATE EVENT
const SlashCommandHandler = require("./BotModules/Handlers/SlashCommandHandler.js");
const ContextCommandHandler = require("./BotModules/Handlers/ContextCommandHandler.js");
const ButtonHandler = require("./BotModules/Handlers/ButtonHandler.js");
const SelectHandler = require("./BotModules/Handlers/SelectHandler.js");
const AutocompleteHandler = require("./BotModules/Handlers/AutocompleteHandler.js");
const ModalHandler = require("./BotModules/Handlers/ModalHandler.js");

DiscordClient.on('interactionCreate', async (interaction) => {
    if ( interaction.isChatInputCommand() )
    {
        // Slash Command
        await SlashCommandHandler.Main(interaction);
    }
    else if ( interaction.isContextMenuCommand() )
    {
        // Context Command
        await ContextCommandHandler.Main(interaction);
    }
    else if ( interaction.isButton() )
    {
        // Button
        await ButtonHandler.Main(interaction);
    }
    else if ( interaction.isAnySelectMenu() )
    {
        // Select
        await SelectHandler.Main(interaction);
    }
    else if ( interaction.isAutocomplete() )
    {
        // Autocomplete
        await AutocompleteHandler.Main(interaction);
    }
    else if ( interaction.isModalSubmit() )
    {
        // Modal
        await ModalHandler.Main(interaction);
    }
    else
    {
        // Unknown or unhandled new type of Interaction
        await LogInfo(`****Unrecognised or new unhandled Interaction type triggered:\n${interaction.type}\n${interaction}`);
    }

    return;
});








/******************************************************************************* */
// STATUSPAGE - INCIDENT UPDATE EVENT
/* DiscordStatusClient.on("incident_update", async (incident) => {
    // TODO
}); */








/******************************************************************************* */

DiscordClient.login(Config.TOKEN); // Login to and start the Discord Bot Client
DiscordStatusClient.start(); // Start listening for Discord Status Page Updates
Mongoose.connect(Config.MongoString).catch(console.error);
