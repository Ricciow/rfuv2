import {
    AdditiveConstraint,
    animate,
    Animations,
    CenterConstraint,
    ChildBasedMaxSizeConstraint,
    ChildBasedSizeConstraint,
    ConstantColorConstraint,
    FillConstraint,
    ScissorEffect,
    SiblingConstraint,
    SubtractiveConstraint,
    UIBlock,
    UIMultilineTextInput,
    UIText,
    WindowScreen,
    MarkdownComponent,
    Inspector,
    UITextInput,
    RelativeWindowConstraint,
    RelativeConstraint,
    UIRoundedRectangle,
    ScrollComponent,
    UIContainer,
    UIWrappedText
} from "../../../Elementa";
import { invisibleColor } from "../constants";

const Color = Java.type("java.awt.Color");

class guiManager {
    /**
     * Manager for the guis of the mod
     * @param {Color} bgColor color of the move background
     * @param {str} commandName
     * @param {str} aliases
     */
    constructor(bgColor = new Color(0, 0, 0, 120/255), commandName = 'rfuv2move', ...aliases) {
        this.Screen = new JavaAdapter(WindowScreen, {
            init() {
                return this.getWindow()
            }
        }, true, false);
        this.window = this.Screen.init()
        this.moving = false
        this.bgColor = bgColor
        this.background = new UIBlock()
        .setColor(invisibleColor)
        .setWidth((100).percent())
        .setHeight((100).percent())
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setChildOf(this.window)

        this.elements = []
        
        register("command", () => {
            this.open()
        }).setName(commandName)//.setAliases(...aliases)
        register('renderOverlay', () => {
            if(!this.moving) {
                this.window.draw()
            }
        })
        register("guiClosed", (gui) => {
            if(gui.toString() == this.Screen.toString()) {
                this.close()
            }
        })
    }

    open() {
        this.moving = true
        this.background.setColor(this.bgColor)
        this.elements.forEach((element) => {
            element.open()
        })
        GuiHandler.openGui(this.Screen)
    }

    close() {
        this.moving = false
        this.elements.forEach((element) => {
            element.close()
        })
        this.background.setColor(invisibleColor)
    }

    /**
     * Add an element to the gui system
     * @param {guiElement} element 
     */
    addElement(element) {
        this.elements.push(element)
        element.boundingBox.setChildOf(this.background)
    }
}

export default new guiManager()