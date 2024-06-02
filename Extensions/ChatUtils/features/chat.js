import managerSettings from "../../../Manager/managerSettings";
import { chatData } from "../../../data/Chat/chatData"
import { makeSpacedRegexFromArray } from "../../../utils/functions";
import chatSettings from "../chatSettings";

const Chats = ["/ac", "/pc", "/gc", "/oc", "/cc", "/r ", "/w "]
let lastMsg = undefined
register('messageSent', (message, event) => {
    if(!managerSettings.chatUtils || !chatSettings.chatReplacements) return
    if(lastMsg == message) return
    if(message.startsWith('/') && !Chats.includes(message.substring(0,3))) return
    cancel(event);
    const replaceRegEx = makeSpacedRegexFromArray(Object.keys(chatData['replacements']), 'g')
    message = message.replace(replaceRegEx, (_match, p1, p2) => `${p1}${chatData['replacements'][[p2]]}`);
    lastMsg = message;
    ChatLib.say(message);
})