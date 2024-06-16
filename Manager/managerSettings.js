import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @NumberProperty,
    @ColorProperty,
    @SliderProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @ParagraphProperty
} from "../../Vigilance";

import chatSettings from "../Extensions/ChatUtils/chatSettings";
import generalSettings from "../Extensions/GeneralUtils/generalSettings";

@Vigilant('rfuv2/data/Manager', 'RiccioFishingUtils V2.0.0', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Introduction'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class ManagerSettings {

    @ButtonProperty({
        name: "Welcome to rfu!",
        description: "This is the version 2 of my fishing mod, now with toggleable extensions!",
        category: "Introduction",
        subcategory: '=== Welcome ===',
        placeholder: "   &9&lDiscord"
    })
    openDiscord() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://discord.gg/JfrXm6TqXz"));
    }

    @SwitchProperty({
        name: 'Toggle load messages',
        description: 'Enable/Disable the loading messages',
        category: 'Introduction',
        subcategory: '=== Welcome ===',
    })
    loadMessages = true;

    //Chat Utils
    @SwitchProperty({
        name: 'Toggle Chat Utils',
        description: 'Enable/Disable the chat utils features',
        category: 'Introduction',
        subcategory: 'Extensions',
    })
    chatUtils = true;

    @ButtonProperty({
        name: "Open Chat Utils Settings",
        description: "Opens the chat settings\n/rfu chat\n&eKeywords: commands,warp,invite,togglewarp,transfer,pt",
        category: "Introduction",
        subcategory: 'Access Extensions',
        placeholder: "Open"
    })
    openChatUtils() {
        chatSettings.openGUI()
    }

    //Cishing Utils
    @SwitchProperty({
        name: 'Toggle Cishing Utils',
        description: 'Enable/Disable the cishing utils features',
        category: 'Introduction',
        subcategory: 'Extensions',
    })
    cishingUtils = true;

    @ButtonProperty({
        name: "Open Cishing Utils Settings",
        description: "Opens the cishing settings\n/rfu cishing\n&eKeywords: ",
        category: "Introduction",
        subcategory: 'Access Extensions',
        placeholder: "Open"
    })
    openCishingUtils() {
        //cishingUtils.openHere
    }

    //Fishing Utils
    @SwitchProperty({
        name: 'Toggle Fishing Utils',
        description: 'Enable/Disable the fishing utils features',
        category: 'Introduction',
        subcategory: 'Extensions',
    })
    fishingUtils = true;

    @ButtonProperty({
        name: "Open Fishing Utils Settings",
        description: "Opens the fishing settings\n/rfu fishing\n&eKeywords: ",
        category: "Introduction",
        subcategory: 'Access Extensions',
        placeholder: "Open"
    })
    openFishingUtils() {
        //fishingUtils.openHere
    }

    //General Utils
    @SwitchProperty({
        name: 'Toggle General Utils',
        description: 'Enable/Disable the general utils features',
        category: 'Introduction',
        subcategory: 'Extensions',
    })
    generalUtils = true;

    @ButtonProperty({
        name: "Open General Utils Settings",
        description: "Opens the general settings\n/rfu general\n&eKeywords: ",
        category: "Introduction",
        subcategory: 'Access Extensions',
        placeholder: "Open"
    })
    openGeneralUtils() {
        generalSettings.openGUI()
    }

    //Hollows Utils
    @SwitchProperty({
        name: 'Toggle Hollows Utils',
        description: 'Enable/Disable the hollows utils features',
        category: 'Introduction',
        subcategory: 'Extensions',
    })
    hollowsUtils = true;

    @ButtonProperty({
        name: "Open Hollows Utils Settings",
        description: "Opens the hollows settings\n/rfu hollows\n&eKeywords: ",
        category: "Introduction",
        subcategory: 'Access Extensions',
        placeholder: "Open"
    })
    openHollowsUtils() {
        //hollowsUtils.openHere
    }

    //Ink Utils
    @SwitchProperty({
        name: 'Toggle Ink Utils',
        description: 'Enable/Disable the ink utils features',
        category: 'Introduction',
        subcategory: 'Extensions',
    })
    hollowsUtils = true;

    @ButtonProperty({
        name: "Open Ink Utils Settings",
        description: "Opens the ink settings\n/rfu ink\n&eKeywords: ",
        category: "Introduction",
        subcategory: 'Access Extensions',
        placeholder: "Open"
    })
    openInkUtils() {
        //inkUtils.openHere
    }

    constructor() {
        this.initialize(this);
        this.addDependency("Open Chat Utils Settings", "Toggle Chat Utils");
        this.addDependency("Open Cishing Utils Settings", "Toggle Cishing Utils");
        this.addDependency("Open General Utils Settings", "Toggle General Utils");
    }
}

export default new ManagerSettings()