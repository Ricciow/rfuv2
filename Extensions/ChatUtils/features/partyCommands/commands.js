import commandManager from "./commandManager";
import chatSettings from "../../chatSettings";
import partyData from "../../../../data/Chat/partyData";
import { removeFromArray, removeRankTag, sendModMessage } from "../../../../utils/functions";
import { playerName } from "../../../../utils/constants";
import skyblock from "../../../../utils/skyblock";

// function test(name, params) {
//     ChatLib.chat(`I'm a command! ${params}`)
// }

// exampleCommand = {
//     "Triggers": ["test1"],      //All triggers for the command (must be lowercased)
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
export function help(name, parameter = undefined) {
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
    name = name.toLowerCase();
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

register("command", (name) => {
    name = name.toLowerCase()
    if(partyData.PARTY['warpExcluded'].includes(name)) {
        removeFromArray(partyData.PARTY['warpExcluded'], name)
        sendModMessage(`&c&lDisabled &f&ltogglewarp for &e&l${name}`);
    }
    else {
        partyData.PARTY['warpExcluded'].push(name)
        sendModMessage(`&a&lEnabled &f&ltogglewarp for &e&l${name}`);
    }
}).setName("rfutogglewarp")

commandManager.addCommand(toggleWarpCommand)
//-----------------------Warp-----------------------\\
let ignoreNext = false;
function warpParty() {
    ignoreNext = true;
    ChatLib.command('p warp')
}

let needJoin = [];
let lastSelfTrigger = false;
export function warp(name, ignoreConditions = false) {
    if(name == playerName && !lastSelfTrigger && !ignoreConditions) {
        lastSelfTrigger = true;
        ChatLib.chat(new Message("&c&lAre you sure? (You're leader) ", new TextComponent("&a&l[Warp]").setClickAction("run_command").setClickValue("/rfuconfirmwarp").setHoverAction('show_text').setHoverValue("Click to warp.")));
        setTimeout(() => {
            lastSelfTrigger = false;
        }, 10000);
        return
    }
    lastSelfTrigger = false;
    if(baseConditions()) {
        if(skyblock.map != 'Private Island' || !chatSettings.warpIsland || ignoreConditions) {
            if(partyData.PARTY['warpExcluded'].length == 0) {
                warpParty()
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
                partyData.PARTY['warpExcluded'] = []
                setTimeout(() => {
                    warpParty()
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
        else {
            ChatLib.command("pc I'm currently on a private island! (Not Warping)")
        }
    }
}

register("chat", (user) => {
    user = removeRankTag(user).toLowerCase();
    if(needJoin.includes(user)) {
        removeFromArray(needJoin, user)
    }
}).setCriteria("The party invite to ${user} has expired.");

register("chat", (user) => {
    user = removeRankTag(user).toLowerCase();
    if(needJoin.includes(user)) {
        removeFromArray(needJoin, user)
        partyData.PARTY['warpExcluded'].push(user)
    }
}).setCriteria("${user} joined the party.");

register('command', () => {
    warp(playerName, true)
}).setName("rfuconfirmwarp")

register('messageSent', (message, event) => {
    if((message.startsWith("/p warp") || message.startsWith("/party warp")) && chatSettings.customWarp && !ignoreNext) {
        cancel(event)
        warp(playerName, true);
        return
    }
    ignoreNext = false;
})

warpCommand = {
    "Triggers": ["warp", "w"],      
    "parameters": 0,            
    "LeaderOnly": true,        
    "MemberOnly": false,        
    "SelfTrigger": true,       
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