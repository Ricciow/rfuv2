import { playerName } from "./constants";

const rankTagRegex = /\[(VIP|MVP|HELPER|MOD|ADMIN|OWNER|BUILD TEAM|YOUTUBE|MOJANG|SLOTH|APPLE|BEAM|PIG)\+{0,3}\] /g

/**
 * @param {string} username
 * @returns {string}
 */
export function removeRankTag(username) {
    username = username.replace(rankTagRegex, "");
    return username
}

/**
 * @param {string} username
 * @returns {boolean}
 */
export function checkIfUser(username) {
    username = removeRankTag(username)
    if(username == playerName) return true
    return false
}

/**
 * @param {*} array Array modified
 * @param {*} item Item removed
 */
export function removeFromArray(array, item) {
    array.splice(array.indexOf(item), 1)
}

/**
 * Sends a message in the [RFU] Message format
 * @param {String} message 
 */
export function sendModMessage(message) {
    ChatLib.chat(`&8&l[&9&lRFU&8&l] ${message}`);
}

/**
 * Makes a regExp that detects if any item on the array is present
 * @param {String[]} array - The array that will be converted 
 * @returns {RegExp}
 */
export function makeRegexFromArray(array, flags = '') {
    return new RegExp(array
        .map(s => s.replace(/[()[\]{}*+?^$|#.,\/\\\s-]/g, "\\$&"))
        .join("|"), 
        flags
    );
}

/**
 * Makes a regExp that detects if any item on the array is present with whitespaces or start/end around it
 * @param {String[]} array - The array that will be converted 
 * @returns {RegExp}
 */
export function makeSpacedRegexFromArray(array, flags = '') {
    return new RegExp(
        '(^|\\s)('+
        array
        .map(s => s.replace(/[()[\]{}*+?^$|#.,\/\\\s-]/g, "\\$&"))
        .join("|")
        +")(?=$|\\s)", 
        flags
    );
}
