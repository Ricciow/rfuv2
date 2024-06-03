import { UIText } from "../../../../Elementa";
import { GuiElement } from "./GuiElement";
const Color = Java.type("java.awt.Color");

function UIVanillaText() {
    return new JavaAdapter(UIText, {
        draw() {
            Tessellator.pushMatrix()
            let text = new Text(this.getText()).setShadow(this.getShadow())
            LongestLine = Math.max(...text.getLines().map((line) => Renderer.getStringWidth(line)))
            text.setScale(this.getWidth()/LongestLine)
            text.draw(this.getLeft(), this.getTop())
            this.setHeight(text.getHeight().pixels())
            Tessellator.popMatrix()
        }
    });
}

export class VanillaTextElement extends GuiElement {

    /**
     * Your fun text element with vanilla color codes to render stuff on screen :O
     * @param {str} saveKey 
     * @param {float} defaultX 
     * @param {float} defaultY 
     * @param {float} width 
     * @param {float} height 
     * @param {str} text 
     * @param {Color|float[]} textColor 
     */
    constructor(saveKey, defaultX = 0, defaultY = 0, width = 20, text = '') {
        super(saveKey, defaultX, defaultY, width, 10, 'x')

        this.text = text

        this.UIText = new UIVanillaText() 
        .setText(this.text)
        .setWidth((100).percent())
        .setChildOf(this.boundingBox)
    }

    setText(text) {
        this.text = text
        this.UIText.setText(text)
    }

    getText() {
        return this.text
    }
}