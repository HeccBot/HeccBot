> [!IMPORTANT]
> HeccBot has been replaced by TwiLite - Zebby's new vision for his multipurpose Discord App.
> 
> You can find TwiLite's source [linked here](https://github.com/TwilightZebby/TwiLite).

---

# HeccBot

A general-purpose Discord Bot made by TwilightZebby.

- [Invite HeccBot to your Server](https://discord.com/api/oauth2/authorize?client_id=784058687412633601&permissions=274878221312&scope=applications.commands%20bot)
- [Add HeccBot as a User App to your Account](https://discord.com/api/oauth2/authorize?client_id=784058687412633601&scope=applications.commands&integration_type=1)

---

# THE LICENSE
The License for this Project, and all of TwilightZebby's Projects, can be [found here](https://github.com/TwilightZebby/license/blob/main/license.md).

---

# Notes
### Command Permissions
All of these Slash and Context Commands can be restricted to only be used by specific Users/Roles, in specific Channels, or by everyone everywhere in Server Settings > Integerations.

Sadly, though, this Settings Page is only viewable on Desktop and Web Browser versions of Discord, not Mobile App versions.

Furthermore, some of these Commands, such as `/lockemoji`, have default Permission requirements set - meaning that they won't be viewable or usable in the Command Pickers unless you have the relevant Permission (or are Server Owner, or have Admin Permission); unless an override has been set on the Command itself by the Server's Admins/Owner.

### Context Commands & Where to Find Them
By now, most Users are aware of Slash Commands (`/boop` for example) and how to use them - but not many are aware of Context Commands. Hence, this section here to explain where they are!

__Message Context Commands__ are Commands used on a specific Message in Chat, and can be found:
- **Desktop/Web:** Right-click a Message -> Apps
- **Mobile:** Long-press (press-and-hold) a Message -> Apps

__User Context Commands__ are Commands used on a specific User in Servers, and can be found:
- **Desktop/Web:** Right-click a Username or profile picture either in Chat or Member List -> Apps
- **Mobile:** Long-press (press-and-hold) a Username or profile picture in Chat or Member List -> Apps

---

# Features List

## General Features
| Feature | Command | Description |
|---------|------------|-------------|
| Discord Outage Feed | `/dstatus` | Posts in the specified Channel whenever a new outage notice is made on [Discord's Status Page](https://discordstatus.com) |
| Information Commands | `/info` | Displays information about the specified Server, User, Channel, Role, or Server Invite |
| Jail Command | `/jail` | Throws the specified User into jail |
| Someone Command | `/someone` | Picks a random User in that Channel or Thread, and says their username in chat |
| Temperature Conversions | `/temperature` \* | *(Slash Command)* Converts the given temperature. *(Message Command)* Converts the temperatures found in the selected Message |
| Coin Flip Command | `/coin` | Flips a coin to pseudo-randomly get Heads or Tails |
| Dice Command | `/dice` | Rolls a set of specified Dice (or just 1 Die) to get random numbers. Supports D4, D6, D10, D12, D20, and D100 Die types |
| Rating Commands | `/rate` | Give a specific User, or the Server this is used in, a rating out of 100. These ratings are not stored or tracked! |
| Animal Commands | `/animal` | Get a random picture of the specified animal. Currently supports: Cats, Dogs |

\* *These Commands also have Message Context Command forms.*

## Action Commands
| Command | Description |
|------------|-------------|
| `/bonk` \* | Bonks the specified User, Role, or everyone |
| `/boop` | Boops the specified User, Role, or everyone |
| `/headpat` \* | Gives the specified User, Role, or everyone a headpat |
| `/hug` | Gives the specified User, Role, or everyone a hug |
| `/kiss` | Gives a kiss to the specified User, Role, or everyone |

\* *These Commands also have User Context Command forms.*

## Management Features
| Feature | Command | Description |
|---------|------------|-------------|
| Role-lockable Emojis | `/lockemoji` | Upload a new custom Emoji to your Server, locking its usage behind a specified Role |
| Role Menus \* | `/rolemenu` | Create self-assignable Role Menus that your Server Members can use to grant or revoke Roles for themselves |
| Make Stages Public | `/stagepublic` | Allows making a public Stage instance, which shows on your Stage Audience's statuses and profiles |

\* *Role Menus also have added Message Context Commands for ease in either editing or deleting already existing Role Menus made with HeccBot.*

## HeccBot Informational Commands
| Command | Description |
|------------|-------------|
| `/heccbot` | Used to subscribe to one or both of HeccBot's announcement feeds |
| `/help` | Provides information on HeccBot; also shows HeccBot's support server link, invite link, and extra information on HeccBot's Commands and Modules |
| `/invite` | Shows the invite link to invite HeccBot to your own Server |
| `/support` | Shows HeccBot's Support Server invite link |

---

# Questions
## Why did you make this Bot?
> This Bot was born from a mixture of "felt like it" and a want to bring back some of the commands from the Kawaii Bot (that was discontinued when I originally made this Bot, but apparently has made a return in 2022?).
> 
> Now, TwilightZebby aims to make this a *real* general purpose Discord Bot - focusing on actual 'general' features (meaning, no music functions, no levelling, no moderation).
> 
> The Bot, with its original name of "Actions Bot", was originally first added to [Dr1fterX's](https://www.twitch.tv/Dr1fterX) Server in January 2021. The Bot was later renamed to "MooBot" in March 2022; and renamed again to "HeccBot" in May 2023.

## Why was the Bot renamed from "Actions Bot" to "MooBot"?
> The original name, "Actions Bot", was picked because of the simple nature of the bot - to add action-based Slash Commands.
> Now that the Bot is being used for more features, which are less action-based (such as Button-Roles or the Temperature Convertor), TwilightZebby thought a name change was in order since "Actions Bot" isn't accurate anymore.
>
> "MooBot" became the name picked as a reference to an *old* meme in [Dr1fterX's](https://www.twitch.tv/Dr1fterX) community, in which TwilightZebby was a cow (yes, as in the animal).
> That meme has long since vanished as per TwilightZebby's request. He humbly requests no one refer to him as a cow anymore because of the expiry of that meme. :)

## Why was the Bot renamed from "MooBot" to "HeccBot"?
> Due to Discord changing their [Username System](https://dis.gd/usernames) in early 2023, it was thought that the name "MooBot" could not be used for this Bot anymore, since it is already taken by a verified Discord & Twitch Bot.
> 
> Thus, TwilightZebby renamed this Bot to "HeccBot". However, Discord has since allowed Bots to stay on the old username system (with "username#0000" style names including discrims) - but TwilightZebby will keep the Bot named as "HeccBot" to help reduce conflicting names with the aforementioned Twitch Bot.
