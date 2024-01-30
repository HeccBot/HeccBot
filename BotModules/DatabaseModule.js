const { OutageFeedModel } = require("../Mongoose/Models")


module.exports = {
    /**
     * Removes everything connected to the provided Guild Id from the Database
     * @param {String} serverId 
     */
    async removeGuildFromDatabase(serverId)
    {
        // Check Tables
        let checkOutageFeedTable = await OutageFeedModel.exists({ guildId: serverId });

        // Delete entries if existing
        if ( checkOutageFeedTable != null ) { await OutageFeedModel.deleteMany({ guildId: serverId }); }

        return;
    }
}
