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
        description: "Opens the chat settings\n&0Keywords: commands,warp,invite,togglewarp,transfer,pt",
        category: "Introduction",
        subcategory: 'Acess Extensions',
        placeholder: "Open"
    })
    openChatUtils() {
        Client.currentGui.close()
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
        description: "Opens the cishing settings\n&0Keywords: ",
        category: "Introduction",
        subcategory: 'Acess Extensions',
        placeholder: "Open"
    })
    openCishingUtils() {
        Client.currentGui.close()
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
        description: "Opens the fishing settings\n&0Keywords: ",
        category: "Introduction",
        subcategory: 'Acess Extensions',
        placeholder: "Open"
    })
    openFishingUtils() {
        Client.currentGui.close()
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
        description: "Opens the general settings\n&0Keywords: ",
        category: "Introduction",
        subcategory: 'Acess Extensions',
        placeholder: "Open"
    })
    openGeneralUtils() {
        Client.currentGui.close()
        //generalUtils.openHere
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
        description: "Opens the hollows settings\n&0Keywords: ",
        category: "Introduction",
        subcategory: 'Acess Extensions',
        placeholder: "Open"
    })
    openHollowsUtils() {
        Client.currentGui.close()
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
        description: "Opens the ink settings\n&0Keywords: ",
        category: "Introduction",
        subcategory: 'Acess Extensions',
        placeholder: "Open"
    })
    openInkUtils() {
        Client.currentGui.close()
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