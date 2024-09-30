import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord-api-types/v10';
import { Collection } from '@discordjs/collection';
import { OutageFeedModel } from '../Mongoose/Modals.js';
import { DiscordClient, UtilityCollections } from '../Utility/utilityConstants.js';


// *******************************
//  Exports

/**
 * Handles sending Discord Status updates
 * @param {import('statuspage.js').Incident} incident 
 */
export async function handleStatusUpdate(incident) {
    // Check there is at least ONE DB entry, so that we aren't performing this on empty values
    if ( await OutageFeedModel.exists() == null ) { return; }

    // Fetch all entries
    let allDbEntries = await OutageFeedModel.find();


    // Create the Embed to be used
    const OutageEmbed = new EmbedBuilder()
    .setColor(incident.impact === "none" ? '#000000' : incident.impact === "minor" ? '#13b307' : incident.impact === "major" ? '#e8e409' : '#940707')
    .setTitle(incident.name)
    .setDescription(`Impact: ${incident.impact}`)
    .addFields(
        incident.incident_updates.reverse()
        .map(incidentUpdate => { return {
            name: `${incidentUpdate.status.charAt(0).toUpperCase() + incidentUpdate.status.slice(1)} ( <t:${Math.floor(incidentUpdate.updated_at.getTime() / 1000)}:R> )`,
            value: (incidentUpdate.body || "No information avaliable.")
        }})
        .slice(-5)
    )
    .setFooter({ text: `Posted by TwiLite#8505` })
    .setTimestamp(incident.created_at);

    // Create URL button to Statuspage for Incident
    const StatusLinkButton = new ActionRowBuilder().addComponents([
        new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("View full status page").setURL(incident.shortlink)
    ]);


    // Check if ongoing or new incident
    const OutageCollection = UtilityCollections.DiscordStatusUpdates.get(incident.id);

    if ( !OutageCollection ) {
        // New incident

        // Fetch Webhook IDs, send message via said webhooks, then store sent message IDs for editing later incident updates into
        const SentMessageCollection = new Collection();

        allDbEntries.forEach(async document => {
            // Attempt to send message. If a single one fails, assume outage is affecting the endpoint and cancel this operation
            await DiscordClient.api.webhooks.execute(document.webhook_id, document.webhook_token, {
                allowed_mentions: { parse: [] },
                thread_id: document.thread_id != null ? document.thread_id : undefined,
                content: `## Discord Status Update`,
                embeds: OutageEmbed,
                components: [StatusLinkButton],
                wait: true
            })
            .then(sentMessage => { SentMessageCollection.set(document.webhook_id, sentMessage.id); })
            .catch(err => {
                throw new Error(err);
            });
        })

        // Store
        UtilityCollections.DiscordStatusUpdates.set(incident.id, SentMessageCollection);
    }
    else {
        // Ongoing incident

        // Fetch Webhook IDs, edit message via said Webhooks. If a single one fails, assume outage is affecting the endpoint and cancel this operation
        allDbEntries.forEach(async document => {
            await DiscordClient.api.webhooks.editMessage(document.webhook_id, document.webhook_token, OutageCollection.get(document.webhook_id), {
                allowed_mentions: { parse: [] },
                embeds: [OutageEmbed],
                components: [StatusLinkButton],
                thread_id: document.thread_id != null ? document.thread_id : undefined
            })
            .catch(err => {
                throw new Error(err);
            });
        });
    }

    return;
}
