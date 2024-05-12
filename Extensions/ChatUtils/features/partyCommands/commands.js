import commandManager from "./commandManager";
import chatSettings from "../../chatSettings";
import partyData from "../../../../data/Chat/partyData";
import { removeFromArray, removeRankTag } from "../../../../utils/functions";
import { playerName } from "../../../../utils/constants";

// function test(name, params) {
//     ChatLib.chat(`I'm a command! ${params}`)
// }

// exampleCommand = {
//     "Triggers": ["test1"],      //All triggers for the command
//     "parameters": 1,            //Number of parameters for command
//     "LeaderOnly": false,        //Self explanatory
//     "MemberOnly": false,        //Self explanatory
//     "SelfTrigger": false,       //Trigger the command on self, will delay the command a bit
//     "Function": test            //Function ran when command triggered will send (name, parameters) 
// }                               //(only sends parameters if parameters has atleast 1, also only sends the ammount defined above) 
//                                 //(sends em in array form if more than 1)

// commandManager.addCommand(exampleCommand);

let lastTrigger = 0;
function baseConditions() {
    now = Date.now()
    result = (chatSettings.commands && (now > (lastTrigger + chatSettings.cooldown * 1000)))
    if(result) lastTrigger = now
    return result
}

//-----------------------Help-----------------------\\
export function help(name, parameter) {
    if(baseConditions()) {
        if(parameter) {
            parameter = parameter.toLowerCase()
            switch (parameter) {
                case "help":
                ChatLib.command(`pc (${parameter}) You are using this already!`);
                break;
                case "invite":
                case "party":
                case "inv":
                case "p":
                ChatLib.command(`pc (${parameter}) Parties someone, usage: invite/inv/party/p <username>`);
                break;
                case "warp":
                case "w":
                ChatLib.command(`pc (${parameter}) Warps the party`);
                break;
                case "togglewarp":
                case "twarp":
                case "tw":
                ChatLib.command(`pc (${parameter}) Makes it so you get kicked before the !warp command is triggered.`);
                break;
                case "transfer":
                case "t":
                case "pt":
                ChatLib.command(`pc (${parameter}) Transfers the party to someone, usage: transfer/pt <username>`);
                break;
                case "allinvite":
                case "allinv":
                case "ai":
                ChatLib.command(`pc (${parameter}) Turns allinvite on.`);
                break;
                case "coords":
                case "c":
                ChatLib.command(`pc (${parameter}) Sends my current coords, usage: coords/c <username> (optional)`);
                break;
                default:
                ChatLib.command(`pc (${parameter}) Command not valid!`);
            }
        }
        else {
            //General Help
            commands = [];
            if(chatSettings.help) commands.push("Help");
            if(partyData.PARTY["isLeader"]) {
                if(chatSettings.invite) commands.push("Invite");
                if(chatSettings.warp) commands.push("Warp");
                if(chatSettings.toggleWarp) commands.push("Togglewarp");
                if(chatSettings.transfer) commands.push("Transfer");
                if(chatSettings.allinvite) commands.push("Allinvite");
            }
            if(chatSettings.coords) commands.push("Coords");
            message = `${name}, commands available: ${commands.join(", ")}`;
            ChatLib.command(`pc ${message}`);
        }
    }
}

helpCommand = {
    "Triggers": ["help", "h"],      
    "parameters": 1,            
    "LeaderOnly": false,        
    "MemberOnly": false,        
    "SelfTrigger": true,       
    "Function": help
}

commandManager.addCommand(helpCommand)

//-----------------------Invite-----------------------\\
function invite(name, parameter) {
    if(baseConditions()) {
        if(parameter) {
            if(!partyData.PARTY["members"].includes(parameter)) {
                ChatLib.command(`p ${parameter}`);
            }   
            else {
                ChatLib.command(`pc ${parameter} is already in the party!`);
            }
        }
        else {
            ChatLib.command(`pc Usage: invite/inv/party/p <username>`);
        }
    }
}

inviteCommand = {
    "Triggers": ["invite", "inv", "party", "p"],      
    "parameters": 1,            
    "LeaderOnly": true,        
    "MemberOnly": false,        
    "SelfTrigger": true,       
    "Function": invite
}

commandManager.addCommand(inviteCommand)

//-----------------------ToggleWarp-----------------------\\
function Togglewarp(name) {
    if(baseConditions()) {
        if(partyData.PARTY['warpExcluded'].includes(name)) {
            removeFromArray(partyData.PARTY['warpExcluded'], name)
            ChatLib.command("pc You can now be warped.")
        }
        else {
            partyData.PARTY['warpExcluded'].push(name)
            ChatLib.command("pc You can not be warped until you leave or the party is disbanded.")
        }
    }
}

toggleWarpCommand = {
    "Triggers": ["togglewarp", "twarp", "tw"],      
    "parameters": 0,            
    "LeaderOnly": true,        
    "MemberOnly": false,        
    "SelfTrigger": false,       
    "Function": Togglewarp
}

commandManager.addCommand(toggleWarpCommand)
//-----------------------Warp-----------------------\\
let needJoin = [];
export function warp(name) {
    if(baseConditions()) {
        if(partyData.PARTY['warpExcluded'].length == 0) {
            ChatLib.command('p warp')
        }
        else {
            timeout = 0
            partyData.PARTY['warpExcluded'].forEach(person => {
                needJoin.push(person)
                setTimeout(() => {
                    ChatLib.command(`p kick ${person}`)
                }, timeout);
                timeout += 500;
            });
            setTimeout(() => {
                ChatLib.command(`p warp`)
            }, timeout);
            timeout += 500
            needJoin.forEach(person => {
                setTimeout(() => {
                    ChatLib.command(`p ${person}`)
                }, timeout);
                timeout += 500;
            });
        }
    }
}

register("chat", (user) => {
    user = removeRankTag(user);
    if(needJoin.includes(user)) {
        removeFromArray(needJoin, user)
    }
}).setCriteria("The party invite to ${user} has expired.");

register("chat", (user) => {
    user = removeRankTag(user);
    if(needJoin.includes(user)) {
        removeFromArray(needJoin, user)
    }
}).setCriteria("${user} joined the party.");

warpCommand = {
    "Triggers": ["warp", "w"],      
    "parameters": 0,            
    "LeaderOnly": true,        
    "MemberOnly": false,        
    "SelfTrigger": false,       
    "Function": warp
}

commandManager.addCommand(warpCommand)

//-----------------------Transfer-----------------------\\
function transfer(name, parameter) {
    if(baseConditions()) {
        if(parameter) {
            if(parameter != playerName) {
                if(partyData.PARTY["members"].includes(parameter)) {
                    ChatLib.command(`p transfer ${parameter}`);
                }   
                else {
                    ChatLib.command(`pc ${parameter} is not in the party!`);
                }
            }
        }
        else {
            if(name != playerName) ChatLib.command(`p transfer ${name}`);
        }
    }
}

transferCommand = {
    "Triggers": ["transfer", "pt", "t"],      
    "parameters": 1,            
    "LeaderOnly": true,        
    "MemberOnly": false,        
    "SelfTrigger": true,       
    "Function": transfer
}

commandManager.addCommand(transferCommand)

//-----------------------AllInvite-----------------------\\
function allinvite(name) {
    if(baseConditions()) {
        ChatLib.command('p settings allinvite')
    }
}

allinviteCommand = {
    "Triggers": ["allinvite", "allinv", "ai"],      
    "parameters": 0,            
    "LeaderOnly": true,        
    "MemberOnly": false,        
    "SelfTrigger": true,       
    "Function": allinvite
}

commandManager.addCommand(allinviteCommand)

//-----------------------Coords-----------------------\\
function coords(name, parameter) {
    if(baseConditions()) {
        if(parameter) if(parameter != playerName) return
        ChatLib.command(`pc x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`)
    }
}

coordsCommand = {
    "Triggers": ["coords", "c"],      
    "parameters": 1,            
    "LeaderOnly": false,        
    "MemberOnly": false,        
    "SelfTrigger": true,       
    "Function": coords
}

commandManager.addCommand(coordsCommand)