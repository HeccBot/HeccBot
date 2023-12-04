# HeccBot - Privacy Policy
Last Updated: 6th October 2023

Effective: TBC

---

## Introduction
**HeccBot** (henseforth "**The Bot**") does __not__, and will __never__, collect & store Messages, User Data, or Server Data without explicit notice & consent.
Additionally, **The Bot** will __never__ sell or give away the Data that it does store.

As of the current iteration, **The Bot** does not store any Messages. **The Bot**'s source code is viewable in **The Bot**'s GitHub Repo ( https://github.com/TwilightZebby/HeccBot ).

---

## Data Collection & Purposes
Below will be a list of what **The Bot** *does* store.

As a reminder: Server IDs, Channel IDs, Message IDs, Role IDs, and Custom Emoji IDs are all publicly accessible from Discord's public API and official Clients/Apps.

### For Server-specific Bot Settings
- Server's ID
  - *For linking the Bot Settings to that specific Server.*

Added upon first use of `/settings` Command(s) in a Server.

These can be removed from **The Bot** via use of the `/settings clear` Slash Sub-Command.

### For Polls
- Message ID of the Message containing the Poll
  - *As the unique identifier of the Poll.*
- Role ID of the set Required Role for the Poll, if given
  - *To know if the Poll should be limited to those with the specified Role ID. This is an optional field.*
- User IDs of the Server Members that have voted on the Poll
  - *To know who has already voted on the Poll (to prevent duplicate voting).*
- User-inputted Strings
  - *For the Poll's Question & Description, and Poll's Choice Names.*

Added upon creation of a Poll, for each Poll, via the `/poll` Slash Command.

These can be removed from **The Bot** via use of the `"End Poll"` Context Command for each Poll created.

### For Role Menus
- Message ID of the Message containing the Role Menu
  - *As the unique identifier of the Role Menu.*
- Role IDs of the Roles listed in the Role Menu
  - *So **The Bot** knows which Role to give or revoke to the Server Member.*
  - *Also used to know if the Role Menu should be limited to those with another specified Role ID. This bit is an optional field.*
- Custom Emoji IDs
  - *For use in displaying in the Role Menu's Buttons/Options, if provided as inclusion of Custom Emojis is optional.*
- User-inputted Strings
  - *For the Role Menu's Title, Description, and Role Option Labels.*

Added upon creation of a Role Menu, for each Role Menu, via the `/rolemenu` Slash Command.

These can be removed from **The Bot** via use of the `"Delete Role Menu"` Context Command for each Role Menu created.

### For The Server Blocklist
- Server ID of the blocked Server
  - *So **The Bot** knows which Server is blocked from using **The Bot**, and can force-remove itself from said Server.*

Added manually by **The Bot**'s Developer if a Server using **The Bot** is found to be in breach of **The Bot**'s Terms of Service, or Discord's Terms of Service / Guidelines.

The only way to remove a Server ID from **The Bot**'s Blocklist is via the Server's Owner submitting a Blocklist Appeal. Currently, this is done by getting into contact with **The Bot**'s Developer, TwilightZebby, as described at the end of this document.

### For The Server Rules Module
- Server ID
  - *So **The Bot** knows which Server's Rules to fetch.*
- Channel ID
  - *ID of the specified Channel housing the Server's Rules. Used for referencing when displaying the Server's Rules.*
- User-inputted Strings
  - *For the Rule's ID, Summary, and Rule itself.*

Added upon initial setup of the Rules Module, per Server, via the `/rules` Slash Command.

These can be removed from **The Bot** via use of the `/rules clear` Slash Sub-Command.

### For The Discord Outage Feed
- Server ID
  - *So **The Bot** knows if the Server has subscribed to its Discord Outage Feed.*
- Webhook ID
  - *So **The Bot** can send Discord Outage Updates via the Webhooks created for use in this Module.*
- Thread ID
  - *So **The Bot** can, via the above-mentioned Webhook, send the Discord Outage Updates to a specified Thread, if provided as this is optional (it is not needed if the Feed is intending to be for a Text Channel, for example).*

Added upon subscribing to the Feed via the `/dstatus subscribe` Slash Sub-Command.

Can be removed from **The Bot** via use of the `/dstatus unsubscribe` Slash Sub-Command.

---

## Use of Locale Data
**The Bot** also makes use of the publicly available locale data (i.e: what language Users and Servers have set) Discord sends to all Bots using Discord's public API for "Interactions" (e.g: Slash Commands, Context Commands, Select Menus, Buttons, Modals). This locale data is only used for knowing which language **The Bot** should send its responses in, and is __NOT__ stored or tracked in any way.

You can see the public API Documentation regarding what the locale data includes on these official Discord API Documentation Pages:
- [API Locale Reference](https://discord.com/developers/docs/reference#locales)
- [Locale field in Interaction Objects](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object)

---

## Usage of Discord API Gateway Events
Below is a list of all the public Discord API Gateway Events **The Bot** listens to, and the purposes for each.

TODO: WRITE THIS SECTION

---

## Final Notes
If you decide to stop using **The Bot**, then **The Bot** will automatically remove all data connected to a Server when it is removed or kicked from the Server in question.

If, as a User, you have left all Servers **The Bot** is in (and thus, no longer have any mutual Servers with **The Bot**), then **The Bot** will automatically remove all data connected to the User in question.

The Developer of **The Bot**, TwilightZebby, is contactable for matters regarding **The Bot** via GitHub, preferrably via opening an Issue Ticket or Discussion on **The Bot**'s [GitHub Repo](https://github.com/TwilightZebby/HeccBot).

Please also see [Discord's own Privacy Policy](https://discord.com/privacy).

*This Privacy Policy is subject to change at any time. A suitable notification system for privacy policy updates will be added to the Bot in the future.*
