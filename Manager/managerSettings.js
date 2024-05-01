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

@Vigilant('rfuv2/data/settings/Manager', 'RiccioFishingUtils V2.0.0', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Introduction'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {

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
        description: "Opens the chat settings\n&0Keywords: ",
        category: "Introduction",
        subcategory: 'Acess Extensions',
        placeholder: "Open"
    })
    openChatUtils() {
        Client.currentGui.close()
        //cishingUtils.openHere
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

    constructor() {
        this.initialize(this);
        this.addDependency("Open Chat Utils Settings", "Toggle Chat Utils");
        this.addDependency("Open Cishing Utils Settings", "Toggle Cishing Utils");
        this.addDependency("Open General Utils Settings", "Toggle General Utils");
    }
}

export default new Settings()