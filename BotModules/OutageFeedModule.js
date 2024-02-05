const { Incident } = require("statuspage.js")
//const { OutageFeedModel } = require("../Mongoose/Models");
const { Collections, DiscordClient } = require("../constants");
const { EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection } = require("discord.js");
const { LogDebug } = require("./LoggingModule");

module.exports = {
    /**
     * Handles sending Discord Outage Updates
     * @param {Incident} incident 
     */
    async main(incident)
    {
        // ***************
        //    PLACEHOLDER JSON CODE FOR WHEN I HAVE THE MONEY TO PAY FOR A FLUFFING DATABASE BECAUSE HOLY FLUFF DIGITALOCEAN ISN'T THE CHEAPEST WHEN IT COMES TO DATABASES
        // ***************
        const OutageFeedJson = require('../JsonFiles/Hidden/StatusSubscriptions.json');
        const OutageFeedObject = Object.values(OutageFeedJson);        

        // Check there is at least 1 DB entry, so that we aren't performing this on empty values
        if ( OutageFeedObject.length < 1 ) { return; }
        //if ( await OutageFeedModel.exists() == null ) { return; }

        // Fetch all DB entries
        //let allDbEntries = await OutageFeedModel.find();

        // Create Embed
        const OutageEmbed = new EmbedBuilder()
        .setColor(incident.impact === "none" ? Colors.Default : incident.impact === "minor" ? '#13b307' : incident.impact === "major" ? '#e8e409' : '#940707')
        .setTitle(incident.name)
        .setDescription(`Impact: ${incident.impact}`)
        .addFields(incident.incident_updates.reverse().map(incidentUpdate => { return { name: `${incidentUpdate.status.charAt(0).toUpperCase() + incidentUpdate.status.slice(1)} ( <t:${Math.floor(incidentUpdate.updated_at.getTime() / 1000)}:R> )`, value: (incidentUpdate.body || "No information available.") } }).slice(-5))
        .setFooter({ text: `Posted by ${DiscordClient.user.username}#${DiscordClient.user.discriminator} ` })
        .setTimestamp(incident.created_at);

        // Create URL button
        const OutagePageLinkButton = new ActionRowBuilder().addComponents([
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("View Full Status Page").setURL(incident.shortlink)
        ]);
        
        
        // Is this a new Outage, or an update to an ongoing one?
        const OutageCollection = Collections.DiscordStatusUpdates.get(incident.id);
        if ( !OutageCollection )
        {
            // New Outage

            // Fetch webhooks, send message via said webhooks, then store sent message IDs for editing later updates into
            const SentMessageCollection = new Collection();

            OutageFeedObject.forEach(async item => {
                // Ensure outage doesn't affect fetching webhooks or posting messages
                if ( (await DiscordClient.guilds.fetch(item["SERVER_ID"])).available != false )
                {
                    // Fetch webhook
                    await DiscordClient.fetchWebhook(item["DISCORD_FEED_WEBHOOK_ID"])
                    .then(async fetchedWebhook => {
                        await fetchedWebhook.send({
                            allowedMentions: { parse: [] },
                            threadId: item["DISCORD_FEED_THREAD_ID"] instanceof String ? item["DISCORD_FEED_THREAD_ID"] : null,
                            content: `**Discord Outage:**`,
                            embeds: [OutageEmbed],
                            components: [OutagePageLinkButton]
                        })
                        .then(sentMessage => { SentMessageCollection.set(fetchedWebhook.id, sentMessage.id); })
                        .catch(async err => {
                            await LogDebug(err);
                            return;
                        });
                    })
                    .catch(async err => {
                        await LogDebug(err);
                        return;
                    });
                }
            });

            /* allDbEntries.forEach(async document => {
                // Ensure outage doesn't affect fetching webhooks or posting messages
                if ( (await DiscordClient.guilds.fetch(document.serverId)).available != false )
                {
                    // Fetch webhook
                    await DiscordClient.fetchWebhook(document.webhookId)
                    .then(async fetchedWebhook => {
                        await fetchedWebhook.send({
                            allowedMentions: { parse: [] },
                            threadId: document.threadId instanceof String ? document.threadId : null,
                            content: `**Discord Outage:**`,
                            embeds: [OutageEmbed],
                            components: [OutagePageLinkButton]
                        })
                        .then(sentMessage => { SentMessageCollection.set(fetchedWebhook.id, sentMessage.id); })
                        .catch(async err => {
                            await LogDebug(err);
                            return;
                        });
                    })
                    .catch(async err => {
                        await LogDebug(err);
                        return;
                    });
                }
            }); */

            // Store
            Collections.DiscordStatusUpdates.set(incident.id, SentMessageCollection);
        }
        else
        {
            // Ongoing Outage

            // Fetch webhooks, edit messages via said webhooks
            OutageFeedObject.forEach(async item => {
                // Ensure outage doesn't affect fetching webhooks or posting messages
                if ( (await DiscordClient.guilds.fetch(item["SERVER_ID"])).available != false )
                {
                    // Fetch webhook
                    await DiscordClient.fetchWebhook(item["DISCORD_FEED_WEBHOOK_ID"])
                    .then(async fetchedWebhook => {
                        await fetchedWebhook.editMessage(Collections.DiscordStatusUpdates.get(item["DISCORD_FEED_WEBHOOK_ID"]), {
                            allowedMentions: { parse: [] },
                            embeds: [OutageEmbed],
                            components: [OutagePageLinkButton]
                        })
                        .catch(async err => {
                            await LogDebug(err);
                            return;
                        });
                    })
                    .catch(async err => {
                        await LogDebug(err);
                        return;
                    });
                }
            });


            /* allDbEntries.forEach(async document => {
                // Ensure outage doesn't affect fetching webhooks or posting messages
                if ( (await DiscordClient.guilds.fetch(document.serverId)).available != false )
                {
                    // Fetch webhook
                    await DiscordClient.fetchWebhook(document.webhookId)
                    .then(async fetchedWebhook => {
                        await fetchedWebhook.editMessage(OutageCollection.get(fetchedWebhook.id), {
                            allowedMentions: { parse: [] },
                            embeds: [OutageEmbed],
                            components: [OutagePageLinkButton]
                        })
                        .catch(async err => {
                            await LogDebug(err);
                            return;
                        });
                    })
                    .catch(async err => {
                        await LogDebug(err);
                        return;
                    });
                }
            }); */
        }

        return;
    }
}
