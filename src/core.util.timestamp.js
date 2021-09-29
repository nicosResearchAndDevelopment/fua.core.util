/**
 * @param {string} type
 * @returns {timestamp}
 */
exports.timestamp = function (type = "xsd:dateTimeStamp") {
    const date = (new Date);
    type       = type.toLowerCase();
    switch (type) {
        case "sec":
        case "second":
        case "seconds":
            return (date.valueOf() / 1000);
            break; // seconds
        case "sms":
        case "milliseconds":
            return date.valueOf();
            break; // seconds
        case "datetimestamp":
        case "xsd:datetimestamp":
        default:
            return date.toISOString();
            break; // default
    } // switch(type)
};

