const locales = {
    'en-GB': require('../Locales/en-GB.js'),
    'en-US': require('../Locales/en-US.js')
};

module.exports.locales = locales;


/**
 * 
 * @param {String} locale 
 * @param {String} stringId 
 * @param  {...any} params 
 * 
 * @returns {String} Localised String
 */
module.exports.localize = (locale, stringId, ...params) => {
    // Attempt to fetch localised string right away
    let localizedString = locales?.[locale]?.[stringId];

    // If no localised string is found (either because missing or language not supported yet), default to UK English
    if (!localizedString)
    {
        localizedString = locales['en-GB'][stringId];
    }

    // Edge-case check - if string is STILL not found, return error handling string instead
    if (!localizedString)
    {
        localizedString = `Error: Localisation not found.`;
    }


    // For when params are given to add to the localised strings
    if (localizedString) { if (params.length > 0) { for (let i = 0; i < params.length; i++) {
        localizedString = localizedString.replace(`{{${i}}}`, params[i]);
    } } }

    // Return localised string
    return localizedString;
};
