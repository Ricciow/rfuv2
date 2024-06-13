import { UIText , UIBlock, UICircle, UIRoundedRectangle, UIContainer, AspectConstraint, CenterConstraint, FillConstraint, AdditiveConstraint, SubtractiveConstraint} from "../../../../Elementa";
import { GuiElement } from "./GuiElement";
const Color = Java.type("java.awt.Color");

function UIVanillaText() {
    return new JavaAdapter(UIText, {
        draw() {
            Tessellator.pushMatrix()
            let text = new Text(this.getText()).setShadow(this.getShadow())
            text.setScale(this.getHeight()/text.getHeight())
            LongestLine = Math.max(...text.getLines().map((line) => Renderer.getStringWidth(line) * text.getScale()))
            if(LongestLine > this.getWidth()) {
                LongestLine = Math.max(...text.getLines().map((line) => Renderer.getStringWidth(line)))
                text.setScale(this.getWidth()/LongestLine)
            }
            LongestLine = Math.max(...text.getLines().map((line) => Renderer.getStringWidth(line) * text.getScale()))
            text.draw(this.getLeft()+(this.getWidth()/2)-(LongestLine/2), this.getTop()+(this.getHeight()/2)-(text.getHeight()/2)+(1*text.getScale()))
            Tessellator.popMatrix()
        }
    });
}

import { UIItem } from "../UIItem";

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
        .setColor(new Color(1,1,1,1))
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
        this.itemDisplay.setItem(item)
    }
}