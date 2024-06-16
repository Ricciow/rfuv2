import { UIText , UIBlock, UICircle, UIRoundedRectangle, UIContainer, AspectConstraint, CenterConstraint, FillConstraint, AdditiveConstraint, SubtractiveConstraint} from "../../../../Elementa";
import { GuiElement } from "./GuiElement";
const Color = Java.type("java.awt.Color");

import { UIItem } from "../UIItem";
import { UIVanillaText } from "../UIVanillaText";

const ColorNumber = {
    "b": new Color(85/255, 1, 1, 1),
    "d": new Color(1, 85/255, 1, 1),
    '6': new Color(1, 170/255, 0, 1),
    '5': new Color(170/255, 0, 170/255, 1),
    '9': new Color(85/255, 85/255, 1, 1),
    'a': new Color(85/255, 1, 85/255, 1),
    'f': new Color(1, 1, 1, 1)
}

export class PetDisplayElement extends GuiElement {

    /**
     * Your fun text element with vanilla color codes to render stuff on screen :O
     * @param {str} saveKey 
     * @param {float} defaultX 
     * @param {float} defaultY 
     * @param {Item} pet
     */
    constructor(saveKey, defaultX = 0, defaultY = 0, pet) {
        super(saveKey, defaultX, defaultY, 100, 30, 'both')
        this.bgSquare = new UIRoundedRectangle(10)
        .setColor(new Color(0.5,0.5,0.5,1))
        .setX((0).pixels(true))
        .setY(new CenterConstraint)
        .setWidth(new AdditiveConstraint(new FillConstraint, new AspectConstraint(1)))
        .setHeight((50).percent())
        .setChildOf(this.boundingBox)

        this.bgSquare2 = new UIRoundedRectangle(10)
        .setColor(new Color(0.25, 0.25, 0.25, 1))
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth((96).percent())
        .setHeight((80).percent())
        .setChildOf(this.bgSquare)

        this.bgSquareBoundingBox = new UIContainer()
        .setX(new SubtractiveConstraint((0).pixels(true), (5.5).percent()))
        .setY(new CenterConstraint)
        .setWidth(new SubtractiveConstraint((100).percent(), new AdditiveConstraint(new AspectConstraint(1), (12).percent())))
        .setHeight((75).percent())
        .setChildOf(this.bgSquare)

        this.text = new UIVanillaText()
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth((100).percent())
        .setHeight((100).percent())
        .setChildOf(this.bgSquareBoundingBox)
        .setText("&7[Lvl 100] &dFlying Fish")

        this.bgCircleBoundingBox = new UIContainer()
        .setX((0).pixels())
        .setY((0).pixels())
        .setHeight((100).percent())
        .setWidth(new AspectConstraint(1))
        .setChildOf(this.boundingBox)

        this.bgCircle = new UICircle()
        .setColor(new Color(0.5,0.5,0.5,1))
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setRadius((100).percent())
        .setChildOf(this.bgCircleBoundingBox)

        this.rarityCircle = new UICircle()
        .setColor(new Color(0.25,0.25,0.25,1))
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setRadius((90).percent())
        .setChildOf(this.bgCircleBoundingBox)

        this.itemDisplay = new UIItem()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth((70).percent())
        .setHeight((70).percent())
        .setChildOf(this.rarityCircle)
    }

    /**
     * Set the item for the pet display
     * @param {Item} item 
     */
    setItem(item) {
        name = item.getName()
        color = name.split("").reverse().join("").replace(/§[abcdef0123456789]\s*✦/, "").split("§")[0].slice(-1).toLowerCase()
        this.bgCircle.setColor(ColorNumber[color]??new Color(0.5,0.5,0.5,1))
        this.text.setText(name)
        this.itemDisplay.setItem(item)
    }

    hide() {
        super.hide()
        this.text.hide()
        this.itemDisplay.hide()
    }

    unhide() {
        super.unhide()
        this.text.unhide()
        this.itemDisplay.unhide()
    }
}