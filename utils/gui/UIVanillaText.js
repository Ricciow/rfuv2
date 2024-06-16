import { UIText } from "../../../Elementa"

export class UIVanillaText {
    constructor() {
        this.x = undefined
        this.y = undefined
        this.width = undefined
        this.height = undefined
        this.parent = undefined
        this.element = undefined
        this.createElement()
    }
    
    /**
     * Create the element
     */
    createElement() {
        let text = new Text("")
        this.element = new JavaAdapter(UIText, {
            draw() {
                Tessellator.pushMatrix()
                text.setString(this.getText()).setShadow(this.getShadow()).setScale(1)
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
        return this
    }

    /**
     * Delete the element
     */
    deleteElement() {
        this.element?.getParent().removeChild(this.element)
        this.element = undefined
        return this
    }

    /**
     * Set the X of the element
     * @param {Constraint} x
     */
    setX(x) {
        this.x = x
        this.element.setX(x)
        return this
    }

    /**
     * Set the Y of the element
     * @param {Constraint} y 
     */
    setY(y) {
        this.y = y
        this.element.setY(y)
        return this
    }

    /**
     * Set the width of the element
     * @param {Constraint} width 
     */
    setWidth(width) {
        this.width = width
        this.element.setWidth(width)
        return this
    }

    /**
     * Set the height of the element
     * @param {Constraint} height 
     */
    setHeight(height) {
        this.height = height
        this.element.setHeight(height)
        return this
    }

    /**
     * Set the parent of the component
     * @param {UIComponent} parent 
     */
    setChildOf(parent) {
        this.parent = parent
        this.element.setChildOf(parent)
        return this
    }

    /**
     * Set the text of the component
     * @param {String} text 
     */
    setText(text) {
        this.text = text
        this.element.setText(text)
        return this
    }

    /**
     * Hides the element
     */
    hide() {
        this.deleteElement()
        return this
    }

    /**
     * Unhides the element
     */
    unhide() {
        if(!this.element) {
            this.createElement()
            this.setX(this.x)
            this.setY(this.y)
            this.setWidth(this.width)
            this.setHeight(this.height)
            this.setChildOf(this.parent)
            this.setText(this.text)
        }
        return this
    }
}