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
const Color = Java.type("java.awt.Color");

import { partyData }  from "../../data/Chat/chatData"
import SingleInputWindow from "../../utils/InputWindows/singleInputWindow";

class BlackListWindow extends SingleInputWindow{
    constructor() {
        values = partyData["blacklist"] ? partyData["blacklist"] : {};
        super(values)
    }

    saveFunction() {
        partyData["blacklist"] = this.inputs
        partyData.save()
    }
}

export default new BlackListWindow()