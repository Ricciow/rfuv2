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

import { chatData }  from "../../data/Chat/chatData"
import DoubleInputWindow from "../../utils/InputWindows/doubleInputWindow";

const Color = Java.type("java.awt.Color");

class ReplacementListWindow extends DoubleInputWindow{

    constructor() {
        values = chatData["replacements"] ? chatData["replacements"] : {};
        super(values)
    }

    saveFunction() {
        chatData["replacements"] = this.inputs
        chatData.save()
    }
}

export default new ReplacementListWindow()