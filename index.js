import managerSettings from "./Manager/managerSettings";

//Chat Imports
import "./Extensions/ChatUtils/features/partyTracker"
//

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