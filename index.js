import managerSettings from "./Manager/managerSettings";
if(managerSettings.loadMessages) ChatLib.chat(`&8&l[&9&lRFU&8&l] &c&lLoading...`);

//Chat Imports
import "./Extensions/ChatUtils/partyTracker"
import "./Extensions/ChatUtils/features/partyCommands/commands";
import "./Extensions/ChatUtils/features/partyCommands/other"
import "./Extensions/ChatUtils/features/chat"
//

//Manager Imports
import moduleData from "./data/Manager/moduleData";
metadata = JSON.parse(FileLib.read("rfuv2", 'metadata.json'))
//Utils Imports
import { sendModMessage } from "./utils/functions";

const extensions = {
    "chat": managerSettings.openChatUtils,
    "cishing": managerSettings.openCishingUtils,
    "fishing": managerSettings.openFishingUtils,
    "general": managerSettings.openGeneralUtils,
    "hollows": managerSettings.openHollowsUtils,
    "ink": managerSettings.openInkUtils
}
register("command", (extension) => {
    if(extension) extensions[extension] ? extensions[extension]() : managerSettings.openGUI()
    else managerSettings.openGUI();
}).setName("rfuv2"); //Add rfu alias on final release

if(managerSettings.loadMessages) ChatLib.chat(`&8&l[&9&lRFU&8&l] &2&lLoaded!`);

//Message upon first time and also message upon update
let message = undefined;
if(moduleData.version == '0.0.0') {
    message = '&a&lIt seems like this is your first install!\n&f&lA few bits of info:\n&e&l/rfu&f&l to open settings\n&e&l/rfumove&f&l to move gui';
    sender = register('worldLoad', () => {
        sendModMessage(message)
        sender.unregister()
    });
}
else if(moduleData.version != metadata.version) {
    message = '&f&lIt seems like rfu has been updated! /patchnotes to see patchnotes';
    sender = register('worldLoad', () => {
        sendModMessage(message)
        sender.unregister()
    });
}
moduleData.version = metadata.version;
moduleData.save();
