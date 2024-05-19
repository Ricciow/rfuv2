import { partyData }  from "../../../../data/Chat/chatData"
import { removeRankTag } from "../../../../utils/functions"
import chatSettings from "../../chatSettings"
import managerSettings from "../../../../Manager/managerSettings"
import { help, warp } from "./commands"

let UserTime = {}
register('chat', (user) => {
    if(!managerSettings.chatUtils) return
    if(chatSettings.autoRejoin) {
        user = removeRankTag(user)
        UserTime[user] = Date.now()
    }
}).setCriteria("You have been kicked from the party by ${user} ")

register('chat', (user) => {
    if(!managerSettings.chatUtils) return
    if(chatSettings.autoRejoin) {
        user = removeRankTag(user)
        if(UserTime[user]) if((Date.now() - UserTime[user]) < 10000) ChatLib.command(`p join ${user}`)
    }
}).setCriteria("-----------------------------------------------------\n${user} has invited you to join their party!\nYou have 60 seconds to accept. Click here to join!\n-----------------------------------------------------")

register("chat", (user, message) => {
    if(!managerSettings.chatUtils) return
    if(user.includes(":")) {
        tempName = name.split(": ");
        user = tempName.shift();
        message = tempName.reduce((accumulator, currentValue) => accumulator + currentValue + ": ", "") + message;
    }
    user = removeRankTag(user)
    
    if(message == "Hey! I'm currently muted and am unable to message right now." && chatSettings.warpMuted && partyData.PARTY['isLeader'] && chatSettings.commands) {
        if(partyData.PARTY['members'].includes(user)) warp(user)
        else ChatLib.command("r You're not on the party smh.")
    }
}).setCriteria("From ${user}: ${message}")


register("chat", (user) => {
    if(!managerSettings.chatUtils) return
    if(!chatSettings.joinHelp || (chatSettings.joinHelpLeader && !partyData.PARTY['isLeader'])) return
    help(removeRankTag(user))
}).setCriteria("${user} joined the party.");