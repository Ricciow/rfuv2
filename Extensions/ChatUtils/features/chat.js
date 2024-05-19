import managerSettings from "../../../Manager/managerSettings";
import { chatData } from "../../../data/Chat/chatData"
import { makeRegexFromArray } from "../../../utils/functions";

const Chats = ["/ac", "/pc", "/gc", "/oc", "/cc", "/r ", "/w "]

register('messageSent', (message, event) => {
    if(!managerSettings.chatUtils) return
    if(Object.keys(chatData['replacements']).length == 0) return
    if(message.startsWith('/') && !Chats.includes(message.substring(0,3))) return
    if(!makeRegexFromArray(Object.keys(chatData['replacements']), 'g').test(message)) return
    cancel(event);
    for (let i in chatData['replacements']) {
        message = message.replace(i,chatData['replacements'][i]);
    }
    ChatLib.say(message);
})