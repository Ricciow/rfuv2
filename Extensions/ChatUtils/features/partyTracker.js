//This code is responsible for tracking the party joins/leave/transfers etc.

import partyData from "../../../data/Chat/partyData";
import { checkIfUser, removeFromArray, removeRankTag } from "../../../utils/functions";
import { playerName } from "../../../utils/constants";

register("chat", () => {
    partyData.PARTY['inParty'] = true;
}).setCriteria("Party > ${*}: ${*}");

register("chat", (user) => {
    partyData.PARTY['members'] = [removeRankTag(user)]
}).setCriteria("You have joined ${user}'s party!");

register("chat", (user) => {
    partyData.PARTY['members'] = [removeRankTag(user)]
}).setCriteria("You have joined ${user}' party!");

register("chat", (people) => {
    if(people.includes(", ")) people = people.split(", ").map((name) => {return removeRankTag(name)})
    else people = [removeRankTag(people)]
    people.forEach((person) => {
        partyData.PARTY['members'].push(person)  
    })
}).setCriteria("You'll be partying with: ${people}");

//[MVP+] Kryze__ was removed from your party because they disconnected.

register("chat", (user) => {
    partyData.PARTY['members'] = [removeRankTag(user)]
}).setCriteria("Party Leader: ${user} ●");

register("chat", (people) => {
    people = people.split(" ● ").map((name) => {return removeRankTag(name)})
    people.forEach((person) => {
        if(person != "")partyData.PARTY['members'].push(person)    
    })
}).setCriteria("Party Moderators: ${people}");

register("chat", (people) => {
    people = people.split(" ● ").map((name) => {return removeRankTag(name)})
    people.forEach((person) => {
        if(person != "")partyData.PARTY['members'].push(person)  
    })
}).setCriteria("Party Members: ${people}");

register("chat", (user) => {
    partyData.PARTY['inParty'] = true;
    if(checkIfUser(user)) {
        partyData.PARTY['isLeader'] = true;
        return
    }
    partyData.PARTY['isLeader'] = false;
}).setCriteria("${user} invited ${*} to the party! They have 60 seconds to accept.");

register("chat", (user) => {
    partyData.PARTY['inParty'] = true;
    partyData.PARTY['members'].push(removeRankTag(user))
}).setCriteria("${user} joined the party.");

register("chat", (user) => {
    partyData.PARTY['inParty'] = true;
    partyData.PARTY['isLeader'] = true;
}).setCriteria("Created a public party! Players can join with /party join ${user}");

register("chat", () => {
    partyData.PARTY['inParty'] = true;
    partyData.PARTY['isLeader'] = false;
}).setCriteria("You are not this party's leader!");

register("chat", () => {
    partyData.PARTY['inParty'] = false;
    partyData.PARTY['isLeader'] = false;
    partyData.PARTY['members'] = [];
}).setCriteria("You left the party.");

register("chat", () => {
    partyData.PARTY['inParty'] = false;
    partyData.PARTY['isLeader'] = false;
    partyData.PARTY['members'] = [];
}).setCriteria("The party was disbanded because all invites expired and the party was empty.");

register("chat", () => {
    partyData.PARTY['inParty'] = false;
    partyData.PARTY['isLeader'] = false;
    partyData.PARTY['members'] = [];
}).setCriteria("The party was disbanded because the party leader disconnected.");

register("chat", () => {
    partyData.PARTY['inParty'] = false;
    partyData.PARTY['isLeader'] = false;
    partyData.PARTY['members'] = [];
}).setCriteria("${*} has disbanded the party!");

register("chat", () => {
    partyData.PARTY['inParty'] = false;
    partyData.PARTY['isLeader'] = false;
    partyData.PARTY['members'] = [];
}).setCriteria("You are not in a party right now.");

register("chat", (user, user2) => {
    partyData.PARTY['inParty'] = true;
    if(checkIfUser(user)) {
        partyData.PARTY['isLeader'] = true;
    }
    else if (checkIfUser(user2)) {
        partyData.PARTY['isLeader'] = false;
    }
}).setCriteria("The party was transferred to ${user} by ${user2}");

register("chat", (user, user2) => {
    if(checkIfUser(user)) {
        partyData.PARTY['isLeader'] = true;
        partyData.PARTY['inParty'] = true;
    }
    else if (checkIfUser(user2)) {
        partyData.PARTY['isLeader'] = false;
        partyData.PARTY['inParty'] = false;
        partyData.PARTY['members'] = [];
        return
    }
    removeFromArray(partyData.PARTY['members'], removeRankTag(user2))
}).setCriteria("The party was transferred to ${user} because ${user2} left");

register("chat", (user) => {
    removeFromArray(partyData.PARTY['members'], removeRankTag(user))
}).setCriteria("${user} has left the party.");

register("chat", (user) => {
    removeFromArray(partyData.PARTY['members'], removeRankTag(user))
}).setCriteria("${user} has been removed from the party.");

register("worldunload", () => {
    partyData.PARTY["logOff"] = Date.now();
});

register("gameunload", () => {
    partyData.save();
});

register("worldload", () => {
    if (partyData.PARTY['inParty']){
        if (partyData.PARTY["logOff"] + 300000 < Date.now()){
            partyData.PARTY['inParty'] = false;
            partyData.PARTY['isLeader'] = false;
            partyData.PARTY['members'] = [];
        }
    }
});

register("command", () => {
    console.log(partyData.PARTY["logOff"]);
    console.log(partyData.PARTY['inParty']);
    console.log(partyData.PARTY['isLeader']);
    console.log(partyData.PARTY['members']);
    console.log("-----------------------------------------")
}).setName("testcommand")