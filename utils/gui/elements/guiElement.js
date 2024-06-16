import { ChildBasedSizeConstraint, UIBlock } from "../../../../Elementa";
import { guiData } from "../../../data/other/gui";
import { invisibleColor } from "../../constants";
const Color = Java.type("java.awt.Color");
import guiManager from "../guiManager";

export class GuiElement {
    /**
     * Your basic guiElement
     * @param {str} saveKey the key where the x, y and scale will be saved at
     * @param {float} defaultX 
     * @param {float} defaultY 
     * @param {float} width 
     * @param {float} height 
     * @param {boolean} scalingMode y for vertical, x for horizontal, both for both
     */
    constructor(saveKey, defaultX = 0, defaultY = 0, width = 20, height = 20, scalingMode = 'x') {

        this.key = saveKey
        if(guiData[this.key]) {
            data = guiData[this.key]
            this.x = data.x
            this.y = data.y
            this.scale = data.scale
        }
        else {
            this.x = defaultX
            this.y = defaultY
            this.scale = 1
        }

        this.isDragging = false;
        this.dragOffset = {x: 0, y: 0}
        this.width = width
        this.height = height
        this.scalingMode = scalingMode
        this.boundingBox = new UIBlock()
        .setColor(invisibleColor)
        .setX(this.x.pixels())
        .setY(this.y.pixels())
        .onMouseClick((comp, event) => {
            this.isDragging = true;
            //Get the absolute X and Y locations of the click
            this.dragOffset.x = event.absoluteX;
            this.dragOffset.y = event.absoluteY;
        })
        .onMouseRelease(() => {
            this.isDragging = false;
            guiData[this.key] = {
                x:this.x,
                y:this.y,
                scale:this.scale
            }
            guiData.save()
        })
        .onMouseDrag((comp, mx, my) => {
            if (!this.isDragging) return;
            //Get the absolute X and Y for the drag
            const absoluteX = mx + comp.getLeft();
            const absoluteY = my + comp.getTop();

            //Get the offset Value
            const dx = absoluteX - this.dragOffset.x;
            const dy = absoluteY - this.dragOffset.y;
        
            this.dragOffset.x = absoluteX;
            this.dragOffset.y = absoluteY;

            this.x = this.boundingBox.getLeft() + dx;
            this.y = this.boundingBox.getTop() + dy;

            this.updatePos()
        })
        .onMouseScroll((comp, event) => {
            this.scale = Math.max(Math.round((this.scale + (Math.max(this.scale * 0.1, 0.1)) * event.delta)*10)/10, 0.1);
            this.updatePos()
        })

        this._updateWidth()
        //Add the element to the manager
        guiManager.addElement(this)
    }

    _updateWidth() {
        switch(this.scalingMode) {
            case "x":
            case "X":
                this.boundingBox
                .setWidth((this.width * this.scale).pixels())
                .setHeight(new ChildBasedSizeConstraint)
                break;
            case "y":
            case "Y":
                this.boundingBox
                .setWidth(new ChildBasedSizeConstraint)
                .setHeight((this.height * this.scale).pixels())
                break;
            case "Both":
            case "both":
            default:
                this.boundingBox
                .setWidth((this.width * this.scale).pixels())
                .setHeight((this.height * this.scale).pixels())
                break;
        }
    }

    updatePos() {
        this.boundingBox
        .setX(this.x.pixels())
        .setY(this.y.pixels())
        this._updateWidth()
    }

    open() {
        this.boundingBox.setColor(new Color(1, 1, 1, 0.5))
    }

    close() {
        this.boundingBox.setColor(invisibleColor)
    }

    hide() {
        this.boundingBox.hide()
    }

    unhide() {
        this.boundingBox.unhide(true)
    }
}