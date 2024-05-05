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
    if(rankTagRegex.test(username)) {
        username = removeRankTag(username)
    }
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