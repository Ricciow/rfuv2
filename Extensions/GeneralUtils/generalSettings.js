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
} from "../../../Vigilance";

@Vigilant('rfuv2/data/General', 'RiccioFishingUtils V2.0.0', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Navigation', 'Pets'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class GeneralSettings {

    //Navigation
    @ButtonProperty({
        name: 'Return to selection menu',
        description: 'Sends you back to the first page',
        category: 'Navigation',
        placeholder: "Return"
    })
    openSelectionMenu() {
        ChatLib.command("rfuv2", true) 
    }

    @ButtonProperty({
        name: "Open Chat Utils Settings",
        description: "Opens the chat settings",
        category: 'Navigation',
        placeholder: "Open"
    })
    openChatUtils() {
        ChatLib.command("rfuv2 chat", true)
    }

    @ButtonProperty({
        name: "Open Cishing Utils Settings",
        description: "Opens the cishing settings",
        category: 'Navigation',
        placeholder: "Open"
    })
    openCishingUtils() {
        ChatLib.command("rfuv2 cishing", true)
    }

    @ButtonProperty({
        name: "Open Fishing Utils Settings",
        description: "Opens the fishing settings",
        category: 'Navigation',
        placeholder: "Open"
    })
    openFishingUtils() {
        ChatLib.command("rfuv2 fishing", true) 
    }

    @ButtonProperty({
        name: "Open Hollows Utils Settings",
        description: "Opens the hollows settings",
        category: 'Navigation',
        placeholder: "Open"
    })
    openHollowsUtils() {
        ChatLib.command("rfuv2 hollows", true)
    }

    @ButtonProperty({
        name: "Open Ink Utils Settings",
        description: "Opens the cishing settings",
        category: 'Navigation',
        placeholder: "Open"
    })
    openInkUtils() {
        ChatLib.command("rfuv2 ink", true)
    }

    //Pets Tab
    @SwitchProperty({
        name: 'Enable Pet Display',
        description: 'Shows your currently equiped pet, now with icons :D\n&4Currently you need to scroll through your pet menu on every game restart for icons to show properly, will find a fix later (hopefully)',
        category: 'Pets',
        subcategory: 'Pet Display',
    })
    petDisplay = true;

    constructor() {
        this.initialize(this);
    }
}

export default new GeneralSettings()
