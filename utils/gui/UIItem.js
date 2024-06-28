import { UIBlock } from "../../../Elementa"

export class UIItem {
    /**
     * An ui item
     * @param {Item} item 
     * @param {UIComponent} parent 
     */
    constructor(item) {
        this.x = (0).pixels()
        this.y = (0).pixels()
        this.width = (10).pixels()
        this.height = (10).pixels()
        this.component = undefined
        this.parent = undefined
        this.item = item??new Item('minecraft:dirt')
        this.createDisplay()
    }

    /**
     * Creates the item to be displayed
     */
    createDisplay() {
        const Item = this.item
        this.component = new JavaAdapter(UIBlock, {
            draw() {
                Tessellator.pushMatrix()
                Item.draw(this.getLeft(), this.getTop(), this.getHeight() / 16);
                Tessellator.popMatrix()
            }
        })
        return this
    }

    /**
     * Sets the X constraint
     * @param {Constraint} x 
     */
    setX(x) {
        this.x = x
        this.component?.setX(this.x)
        return this
    }

    /**
     * Sets the Y constraint
     * @param {Constraint} y 
     */
    setY(y) {
        this.y = y
        this.component?.setY(this.y)
        return this
    }

    /**
     * Sets the width constraint
     * @param {Constraint} width 
     */
    setWidth(width) {
        this.width = width
        this.component?.setWidth(this.width)
        return this
    }

    /**
     * Sets the height constraint
     * @param {Constraint} height 
     */
    setHeight(height) {
        this.height = height
        this.component?.setHeight(this.height)
        return this
    }

    setChildOf(parent) {
        this.parent = parent
        this.component?.setChildOf(parent)
        return this
    }

    /**
     * Deletes the currently displayed item
     */
    deleteDisplay() {
        this.component?.getParent()?.removeChild(this.component);
        this.component = undefined
        return this
    }

    /**
     * Sets the item in the display
     * @param {Item} item 
     */
    setItem(item) {
        this.item = item
        this.hide()
        this.unhide()
        return this
    }

    /**
     * Hides the display
     */
    hide() {
        this.deleteDisplay()
        return this
    }

    /**
     * Unhides the display
     */
    unhide() {
        if(!this.component) {
            this.createDisplay()
            this.setX(this.x)
            this.setY(this.y)
            this.setWidth(this.width)
            this.setHeight(this.height)
            this.setChildOf(this.parent)
        }
        return this
    }
}