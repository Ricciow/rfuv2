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

export class textElement extends guiElement {

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
    constructor(saveKey, defaultX = 0, defaultY = 0, width = 20, height = 4, text = '', textColor = new Color(1,1,1,1)) {
        super(saveKey, defaultX, defaultY, width, height, 'x')

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