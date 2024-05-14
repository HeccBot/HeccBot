# HeccBot - Privacy Policy
Last Updated: 14th May 2024

Effective: 14th May 2024

---

## Introduction
**HeccBot** does __not__, and will __never__, collect & store Messages, User Data, or Server Data without explicit notice & consent.
Additionally, **HeccBot** will __never__ sell or give away the Data that it does store.

The developers of **HeccBot** firmly believes in a "we don't want your data keep it away from us" process - thus, **HeccBot** will be developed as "stateless" as possible (i.e: without needing to store any information or data at all). If features and functions are not possible to develop "stateless", we will explicitly include them in this **Privacy Policy**, covering exactly what is needed to be stored, for what purpose, and how that data can be removed from **HeccBot** on request.

**HeccBot**'s source code is viewable in **HeccBot**'s GitHub Repo ( https://github.com/HeccBot/HeccBot ).

---

## Data Collection & Purposes
Below will be a list of what **HeccBot** *does* store.

As a reminder: User IDs, Server IDs, Channel IDs, Message IDs, Role IDs, and Custom Emoji IDs are all publicly accessible from Discord's public API and official Clients/Apps.

### For The Discord Outage Feed
- Server ID
  - *So **HeccBot** knows if the Server has subscribed to its Discord Outage Feed.*
- Webhook ID
  - *So **HeccBot** can send Discord Outage Updates via the Webhooks created for use in this Module.*
- Thread ID
  - *So **HeccBot** can, via the above-mentioned Webhook, send the Discord Outage Updates to a specified Thread, if provided as this is optional (it is not needed if the Feed is intending to be for a Text Channel, for example).*

Added upon subscribing to the Feed via the `/dstatus subscribe` Slash Sub-Command.

Can be removed from **HeccBot** via use of the `/dstatus unsubscribe` Slash Sub-Command.

---

## Use of Locale Data
**HeccBot** also makes use of the publicly available locale data (i.e: what language Users and Servers have set) Discord sends to all Server/User Apps using Discord's public API for "Interactions" (e.g: Slash Commands, Context Commands, Select Menus, Buttons, Modals). This locale data is only used for knowing which language **HeccBot** should send its responses in, and is __NOT__ stored or tracked in any way.

You can see the public API Documentation regarding what the locale data includes on these official Discord API Documentation Pages:
- [API Locale Reference](https://discord.com/developers/docs/reference#locales)
- [Locale field in Interaction Objects](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object)

---

## Final Notes
If you decide to stop using **HeccBot** as a Server App, then **HeccBot** will automatically remove all data connected to a Server when it is removed or kicked from the Server in question.

If, as a User, you have left all Servers **HeccBot** is in as a Server App (and thus, no longer have any mutual Servers with **HeccBot**), then **HeccBot** will automatically remove all data connected to the User in question.

If you have added **HeccBot** to your Discord Account as a User App, and you no longer want it as a User App, you can freely remove it again at any time by navigating to Discord's User Settings -> Authorized Apps, and revoking **HeccBot** from that page.

The Developer of **HeccBot**, TwilightZebby, is contactable for matters regarding **HeccBot** via GitHub, preferrably via opening an Issue Ticket or Discussion on **HeccBot**'s [GitHub Repo](https://github.com/HeccBot/HeccBot). You can also contact TwilightZebby via **HeccBot**'s [Support Server](https://discord.gg/4bFgUyWUMY) on Discord.

Please also see [Discord's own Privacy Policy](https://discord.com/privacy).

*This Privacy Policy is subject to change at any time.*
