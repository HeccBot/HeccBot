//const { OutageFeedModel } = require("../Mongoose/Models")
const fs = require('node:fs');
const { LogError } = require('./LoggingModule');


module.exports = {
    /**
     * Removes everything connected to the provided Guild Id from the Database
     * @param {String} serverId 
     */
    async removeGuildFromDatabase(serverId)
    {
        // ********* PLACEHOLDER FOR WHEN I HAVE THE MONEY TO PAY FOR A FLUFFING DATABASE BECAUSE HOLY FLUFF DIGITALOCEAN ISN'T THE CHEAPEST WHEN IT COMES TO DATABASES
        // Check Tables
        //let checkOutageFeedTable = await OutageFeedModel.exists({ guildId: serverId });

        // Delete entries if existing
        //if ( checkOutageFeedTable != null ) { await OutageFeedModel.deleteMany({ guildId: serverId }); }


        // ********* JSON VERSION OF CODE
        const OutageFeedJson = require("../JsonFiles/Hidden/StatusSubscriptions.json");

        if ( OutageFeedJson[`${serverId}`] ) { delete OutageFeedJson[`${serverId}`]; }

        fs.writeFile('./JsonFiles/Hidden/StatusSubscriptions.json', JSON.stringify(OutageFeedJson, null, 4), async (err) => {
            if ( err ) { await LogError(err); return; }
        });

        return;
    }
}
