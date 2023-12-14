const { Incident } = require("statuspage.js")
const { OutageFeedModel } = require("../Mongoose/Models");
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
        // Check there is at least 1 DB entry, so that we aren't performing this on empty values
        if ( await OutageFeedModel.exists() == null ) { return; }

        // Fetch all DB entries
        let allDbEntries = await OutageFeedModel.find();
        
        
        // Is this a new Outage, or an update to an ongoing one?
        const OutageCollection = Collections.DiscordStatusUpdates.get(incident.id);
        if ( !OutageCollection )
        {
            // New Outage
            // Create new Embed
            const OutageEmbedNew = new EmbedBuilder()
            .setColor(incident.impact === "none" ? Colors.Default : incident.impact === "minor" ? '#13b307' : incident.impact === "major" ? '#e8e409' : '#940707')
            .setTitle(incident.name)
            .setDescription(`Impact: ${incident.impact}`)
            .addFields(incident.incident_updates.reverse().map(incidentUpdate => { return { name: `${incidentUpdate.status.charAt(0).toUpperCase() + incidentUpdate.status.slice(1)} ( <t:${Math.floor(incidentUpdate.updated_at.getTime() / 1000)}:R> )`, value: (incidentUpdate.body || "No information available.") } }).slice(-5))
            .setFooter({ text: `Posted by ${DiscordClient.user.username}#${DiscordClient.user.discriminator} ` })
            .setTimestamp(incident.created_at);

            // Create URL button
            const OutagePageLinkButton = new ActionRowBuilder().addComponents([
                new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("View Status Page").setURL(incident.shortlink)
            ]);

            // Fetch webhooks, send message via said webhooks, then store sent message IDs for editing later updates into
            const SentMessageCollection = new Collection();

            allDbEntries.forEach(async document => {
                // Fetch webhook
                await DiscordClient.fetchWebhook(document.webhookId)
                .then(async fetchedWebhook => {
                    await fetchedWebhook.send({
                        allowedMentions: { parse: [] },
                        threadId: document.threadId instanceof String ? document.threadId : null,
                        content: `**Discord Outage:**`,
                        embeds: [OutageEmbedNew],
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
            });

            // Store
            Collections.DiscordStatusUpdates.set(incident.id, SentMessageCollection);
        }
        else
        {
            // Ongoing Outage
            // Create updated Embed
            const OutageEmbedUpdate = new EmbedBuilder()
            .setColor(incident.impact === "none" ? Colors.Default : incident.impact === "minor" ? '#13b307' : incident.impact === "major" ? '#e8e409' : '#940707')
            .setTitle(incident.name)
            .setDescription(`Impact: ${incident.impact}`)
            .addFields(incident.incident_updates.reverse().map(incidentUpdate => { return { name: `${incidentUpdate.status.charAt(0).toUpperCase() + incidentUpdate.status.slice(1)} ( <t:${Math.floor(incidentUpdate.updated_at.getTime() / 1000)}:R> )`, value: (incidentUpdate.body || "No information available.") } }).slice(-5))
            .setFooter({ text: `Posted by ${DiscordClient.user.username}#${DiscordClient.user.discriminator} ` })
            .setTimestamp(incident.created_at);

            // Create URL button
            const OutagePageLinkButton = new ActionRowBuilder().addComponents([
                new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("View Status Page").setURL(incident.shortlink)
            ]);

            // Fetch webhooks, edit messages via said webhooks
            allDbEntries.forEach(async document => {
                // Fetch webhook
                await DiscordClient.fetchWebhook(document.webhookId)
                .then(async fetchedWebhook => {
                    await fetchedWebhook.editMessage(OutageCollection.get(fetchedWebhook.id), {
                        allowedMentions: { parse: [] },
                        embeds: [OutageEmbedUpdate],
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
            });
        }

        return;
    }
}
