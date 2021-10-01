/**
 * @param {string} type
 * @returns {timestamp}
 */
function timestamp(type = "xsd:dateTimeStamp") {
    const date = (new Date);
    type       = type.toLowerCase();
    switch (type) {
        case "sec":
        case "second":
        case "seconds":
            return (date.valueOf() / 1000);
            break; // seconds
        case "ms":
        case "milliseconds":
            return date.valueOf();
            break; // seconds
        case "datetimestamp":
        case "xsd:datetimestamp":
        default:
            return date.toISOString();
            break; // default
    } // switch(type)
}

Object.defineProperties(timestamp, {
    'xsd:dateTimeStamp': {
        get:           () => {
            return timestamp("xsd:dateTimeStamp");
        }, enumerable: false
    },
    'dateTimeStamp':     {
        get:           () => {
            return timestamp("xsd:dateTimeStamp");
        }, enumerable: false
    },
    'seconds':           {
        get:           () => {
            return timestamp("seconds");
        }, enumerable: false
    },
    'milliseconds':      {
        get:           () => {
            return timestamp("milliseconds");
        }, enumerable: false
    }
});
Object.freeze(timestamp);
exports.timestamp = timestamp;

