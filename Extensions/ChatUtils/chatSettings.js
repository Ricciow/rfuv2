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

import BlackListWindow from "./blacklistWindow";
import chatRemovalWindow from "./chatRemovalWindow";
import chatReplacementWindow from "./chatReplacementWindow";

@Vigilant('rfuv2/data/Chat', 'RiccioFishingUtils V2.0.0', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Navigation', 'Party Commands', 'Chat Utilities', 'Hiding'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class ChatSettings {

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
        name: "Open General Utils Settings",
        description: "Opens the general settings",
        category: 'Navigation',
        placeholder: "Open"
    })
    openGeneralUtils() {
        ChatLib.command("rfuv2 general", true) 
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

     //Party Commands Tab
     @SwitchProperty({
        name: 'Toggle Party Commands',
        description: 'Enable the party commands',
        category: 'Party Commands',
        subcategory: '== Configuration ==',
    })
    commands = true;

    @SliderProperty({
        name: 'Command Cooldown',
        description: 'Cooldown between commands in seconds, default: 1s',
        category: 'Party Commands',
        subcategory: '== Configuration ==',
        min: 0,
        max: 60
    })
    cooldown = 1;

    @TextProperty({
        name: 'Command Prefix',
        description: 'The prefix used for commands, default: !',
        category: 'Party Commands',
        subcategory: '== Configuration ==',
    })
    prefix = '!';

    @ButtonProperty({
        name: 'Command Blacklist',
        description: 'players who wont be able to use chat commands',
        category: 'Party Commands',
        subcategory: '== Configuration ==',
        placeholder: "Modify"
    })
    openBlacklistGui() {
        BlackListWindow.setSettingsGui(this).open()
    }

    @CheckboxProperty({
        name: 'help',
        description: 'Enable the help command',
        category: 'Party Commands',
        subcategory: 'Commands',
    })
    help = true;

    @CheckboxProperty({
        name: 'invite',
        description: 'Enable the invite command',
        category: 'Party Commands',
        subcategory: 'Commands',
    })
    invite = true;

    @CheckboxProperty({
        name: 'warp',
        description: 'Enable the warp command',
        category: 'Party Commands',
        subcategory: 'Commands',
    })
    warp = true;

    @CheckboxProperty({
        name: 'togglewarp',
        description: 'Enable the togglewarp command, which allows a player in the party to get kicked before warping and repartied',
        category: 'Party Commands',
        subcategory: 'Commands',
    })
    toggleWarp = true;

    @CheckboxProperty({
        name: 'transfer',
        description: 'Enable the transfer and pt command',
        category: 'Party Commands',
        subcategory: 'Commands',
    })
    transfer = true;

    @CheckboxProperty({
        name: 'allinvite',
        description: 'Enable the allinvite command',
        category: 'Party Commands',
        subcategory: 'Commands',
    })
    allinvite = true;

    @CheckboxProperty({
        name: 'coords',
        description: 'Enable the coords command',
        category: 'Party Commands',
        subcategory: 'Commands',
    })
    coords = true;

    @CheckboxProperty({
        name: 'pick',
        description: 'Enable the pick command',
        category: 'Party Commands',
        subcategory: 'Commands',
    })
    pick = true;

    @SwitchProperty({
        name: 'New Member Help Command',
        description: 'Runs the help command whenever a new player joins',
        category: 'Party Commands',
        subcategory: 'Extras',
    })
    joinHelp = false;

    @SwitchProperty({
        name: '● Leader Only New Member Help',
        description: 'Only triggers the New Member Help if you`re party leader',
        category: 'Party Commands',
        subcategory: 'Extras',
    })
    joinHelpLeader = true;

    @SwitchProperty({
        name: 'Warp on Im muted!',
        description: 'Makes it so the im muted message warps the party (only works with people on party)',
        category: 'Party Commands',
        subcategory: 'Extras',
    })
    warpMuted = true;

    @SwitchProperty({
        name: 'Auto rejoin party on togglewarp',
        description: 'Automatically joins back the party',
        category: 'Party Commands',
        subcategory: 'Extras',
    })
    autoRejoin = true;

    @SwitchProperty({
        name: 'Prevent Warping on Private Island',
        description: 'Makes it so !warp doesnt warp if on a priv island',
        category: 'Party Commands',
        subcategory: 'Extras',
    })
    warpIsland = true;

    @SwitchProperty({
        name: 'Replace default /p warp command',
        description: 'Replaces the /p warp command so it follows the same rules as !warp',
        category: 'Party Commands',
        subcategory: 'Extras',
    })
    customWarp = true;

    @SwitchProperty({
        name: 'Enable Text Replacements',
        description: 'Allows you to make words get switched when you send a message',
        category: 'Chat Utilities',
        subcategory: 'Your Messages'
    })
    chatReplacements = true;

    @ButtonProperty({
        name: 'Text replacements',
        description: 'Text that will be replaced when you send a message! left side is what will be replaced, right side is what it is replaced by',
        category: 'Chat Utilities',
        subcategory: 'Your Messages',
        placeholder: "Modify"
    })
    openReplacementGui() {
        chatReplacementWindow.setSettingsGui(this).open()
    }

    @SwitchProperty({
        name: 'Enable Text Hiders',
        description: 'Hides the text messages set on here',
        category: 'Chat Utilities',
        subcategory: 'All Messages'
    })
    chatHiders = false;

    @ButtonProperty({
        name: 'Hidden texts',
        description: 'Texts that will be hidden',
        category: 'Chat Utilities',
        subcategory: 'All Messages',
        placeholder: "Modify"
    })
    openHiderGui() {
        chatRemovalWindow.setSettingsGui(this).open()
    }

    constructor() {
        this.initialize(this);
        this.addDependency("● Leader Only New Member Help", "New Member Help Command");
        this.addDependency("Text replacements", "Enable Text Replacements");
        this.addDependency("Hidden texts", "Enable Text Hiders");
    }
}

export default new ChatSettings()
