import chatSettings from "../../chatSettings";
import managerSettings from "../../../../Manager/managerSettings";
import { partyData } from "../../../../data/Chat/chatData";
import { removeRankTag } from "../../../../utils/functions"
import { playerName } from "../../../../utils/constants";

function verifyBlacklist(username) {
    return (partyData["blacklist"]?.find(blacklisted => blacklisted === removeRankTag(username)) ? true : false);
}

//
class commandManager {
    constructor() {
        this.commands = [];
        register('chat', (name, message, event) => {
            if(!managerSettings.chatUtils) return
            if(name.includes(":")) {
                tempName = name.split(": ");
                name = tempName.shift();
                message = tempName.reduce((accumulator, currentValue) => accumulator + currentValue + ": ", "") + message;
            }
            this.verifyCommand(removeRankTag(name), message)
        }).setCriteria("Party > ${name}: ${message}");
    }

    /**
     * Verifies if the command is one of the existing commands and sends it to the execution
     * @param {string} name Player who triggered the command
     * @param {string} message Message from the player
     */
    verifyCommand(name, message) {
        if(message.startsWith(chatSettings.prefix)) {
            parameters = message.split(" ")
            commandText = parameters?.shift()?.substr(1)?.toLowerCase()
            command = this.commands.find(({ Triggers }) => Triggers?.some(trigger => trigger === commandText));
            if(command) this.executeCommand(name, command, parameters);
        }
    }

    /**
     * Checks for blacklist, leaderonly/memberonly/selftrigger conditions
     * @param {String} name Player who triggered the command
     * @param {string} command Command triggered
     * @param {Array} parameters Parameters sent in
     */
    executeCommand(name, command, parameters) {
        if(!verifyBlacklist(name)) {
            //Verify SelfTrigger
            if((!command.SelfTrigger && name != playerName) || command.SelfTrigger) {
                timeout = 0;
                if(command.SelfTrigger && name == playerName) timeout = 250; 
                setTimeout(() => {
                    //Verify memberOnly and LeaderOnly
                    if((command.LeaderOnly && partyData.PARTY["isLeader"]) || (command.MemberOnly && !partyData.PARTY["isLeader"]) || (!command.MemberOnly && !command.LeaderOnly)) {
                        //Verify parameters
                        if(command.parameters > 0) {
                            if(command.parameters == 1) command.Function(name, parameters[0]);
                            else command.Function(name, ...parameters.slice(0, command.parameters));
                        }
                        else if(command.parameters != -1){
                            command.Function(name);
                        }
                        else {
                            command.Function(name, ...parameters);
                        }
                    }         
                }, timeout);
            }
        }
    }

    /**
     * Add a command to be verified
     * @param {Object} command Object in a specific format, see commands.js for example
     */
    addCommand(command) {
        this.commands.push(command);
    }

    /**
     * Adds a bunch of commands
     * @param {Array} commands Array of commands in the same format in commands.js
     */
    setCommands(commands) {
        this.commands = commands
    }
}

export default new commandManager()