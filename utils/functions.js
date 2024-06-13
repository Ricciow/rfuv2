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

const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour
const week = 7 * day
const month = 30.4375 * day
const year = 365.25 * day

/**
 * Adds a suffix to a value and an s if it is more than one
 * @param {int} value 
 * @param {str} suffix 
 * @returns 
 */
function makeTime(value, suffix, hide = false, ignore = false) {
    if(value == 0 || hide) return ''
    else if(value > 1 && !ignore) return ` ${value}${suffix}s`
    else return ` ${value}${suffix}`
}   

/**
 * Converts milisseconds to a readable time string
 * @param {int} time in milisseconds
 * @param {boolean} milisseconds wether or not milisseconds are in the final string
 */
export function readableTime(time, milisseconds = false) {
    let years = Math.floor(time/year)
    time -= years*year
    let months = Math.floor(time/month)
    time -= months*month
    let weeks = Math.floor(time/week)
    time -= weeks*week
    let days = Math.floor(time/day)
    time -= days*day
    let hours = Math.floor(time/hour)
    time -= hours*hour
    let minutes = Math.floor(time/minute)
    time -= minutes*minute
    let seconds = Math.floor(time/second)
    milisseconds = seconds*second
    return `${makeTime(years, 'Year')}${makeTime(months, 'Month')}${makeTime(weeks, 'Week')}${makeTime(days, 'Day')}${makeTime(hours, 'h', false, true)}${makeTime(minutes,'m',false,true)}${makeTime(seconds,'s',false,true)}${makeTime(milisseconds,'ms', milisseconds, true)}`
}