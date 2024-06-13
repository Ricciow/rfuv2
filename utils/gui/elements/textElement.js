import { UIText, TextAspectConstraint } from "../../../../Elementa";
import { GuiElement } from "./GuiElement";
const Color = Java.type("java.awt.Color");

export class TextElement extends GuiElement {

    /**
     * Your fun text element to render stuff on screen :O
     * @param {str} saveKey 
     * @param {float} defaultX 
     * @param {float} defaultY 
     * @param {float} width 
     * @param {float} height 
     * @param {str} text 
     * @param {Color|float[]} textColor 
     */
    constructor(saveKey, defaultX = 0, defaultY = 0, width = 20, text = '', textColor = new Color(1,1,1,1)) {
        super(saveKey, defaultX, defaultY, width, 10, 'x')

        this.text = text
        if(textColor.constructor === Array) textColor = new Color(textColor[0], textColor[1], textColor[2], textColor[3])
        this.color = textColor

        this.UIText = new UIText() 
        .setText(this.text)
        .setColor(this.color)
        .setWidth((100).percent())
        .setHeight(new TextAspectConstraint)
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