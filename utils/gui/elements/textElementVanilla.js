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
    UIWrappedText,
    TextAspectConstraint
} from "../../../../Elementa";
import { guiElement } from "./guiElement";
const Color = Java.type("java.awt.Color");

function UIVanillaText() {
    return new JavaAdapter(UIText, {
        draw() {
            let text = new Text(this.getText()).setShadow(this.getShadow())
            LongestLine = Math.max(...text.getLines().map((line) => Renderer.getStringWidth(line)))
            text.setScale(this.getWidth()/LongestLine)
            text.draw(this.getLeft(), this.getTop())
            this.setHeight(text.getHeight().pixels())
        }
    });
}

export class textElementVanilla extends guiElement {

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
    constructor(saveKey, defaultX = 0, defaultY = 0, width = 20, height = 4, text = '', textColor = new Color(1,1,1,1)) {
        super(saveKey, defaultX, defaultY, width, height, 'x')

        this.text = text
        if(textColor.constructor === Array) textColor = new Color(textColor[0], textColor[1], textColor[2], textColor[3])
        this.color = textColor

        this.UIText = new UIvanillaText() 
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