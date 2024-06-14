import SingleInputWindow from "../../utils/InputWindows/singleInputWindow";

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

const Color = Java.type("java.awt.Color");

class RemovalListWindow extends SingleInputWindow{

    constructor() {
        values = chatData["hide"] ?? [];
        super(values)
    }

    saveFunction() {
        chatData["hide"] = this.inputs
        chatData.save()
    }
}

export default new RemovalListWindow()