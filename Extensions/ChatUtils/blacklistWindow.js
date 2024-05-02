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
   
import blacklist from "../../data/Chat/blacklist"

const Color = Java.type("java.awt.Color");

class BlackListWindow {
    /**
     * @param ChatSettings The chat settings window
     */
    constructor() {
        this.values = blacklist["List"] ? blacklist["List"] : [];
        this.ChatSettings = null;
        this.textInputs = [];

        this.Screen = new JavaAdapter(WindowScreen, {
            init() {
                return this.getWindow()
            }
        }, true, false);
        this.Window = this.Screen.init()
        this._CreateMainArea()
        this._loadValues()
    }

    setSettingsGui(gui) {
        this.ChatSettings = gui
        return this
    }

    leaveFunction() {
        blacklist["List"] = this.inputs
        blacklist.save()
        if(this.ChatSettings) {
            this.ChatSettings.openGUI()
        }
    }

    _CreateMainArea() {
        const createBackground = new UIRoundedRectangle(10)
        .setColor(new Color(21 / 255, 45 / 255, 69 / 255, 100 / 255))
        .setX(new CenterConstraint())
        .setY(new RelativeWindowConstraint(0.1))
        .setWidth(new RelativeWindowConstraint(0.3))
        .setHeight(new RelativeWindowConstraint(0.8))
        .setChildOf(this.Window);

        const ScrollContainer = new UIContainer()
        .setX((5).pixels())
        .setY((5).pixels())
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setChildOf(createBackground)

        const scrollbar = new UIRoundedRectangle(10)
        .setColor(Color.BLACK)
        .setX((0).pixels(true))
        .setY((0).pixels())
        .setWidth((6).pixels())
        .setHeight((20).pixels())
        .setChildOf(ScrollContainer)

        const scrollbarColor = new UIRoundedRectangle(10)
        .setColor(new Color(21 / 255, 45 / 255, 69 / 255))
        .setX((1).pixels())
        .setY((0).pixels())
        .setWidth((4).pixels())
        .setHeight((100).percent())
        .setChildOf(scrollbar)

        this.Scroll = new ScrollComponent()
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new SubtractiveConstraint((100).percent(), (8).pixels()))
        .setHeight((100).percent())
        .setChildOf(ScrollContainer);

        this.Scroll.setVerticalScrollBarComponent(scrollbar);

        return this
    }

    _createInputLine(defaultText = "Blank") {
        const Line = new UIRoundedRectangle(5)
            .setColor(Color.BLACK)
            .setX(new CenterConstraint())
            .setY(new AdditiveConstraint(new SiblingConstraint(), (2).pixels()))
            .setWidth((100).percent())
            .setHeight((20).pixels())
            .setChildOf(this.Scroll);
    
        const InnerBox = new UIRoundedRectangle(3.3)
            .setColor(new Color(21 / 255, 45 / 255, 69 / 255))//
            .setX((1).pixels())
            .setY((1).pixels())
            .setWidth(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setHeight(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setChildOf(Line);
    
        const TextInput = new UITextInput(defaultText)
        .setX((2).pixels())
        .setY(new SubtractiveConstraint(new SubtractiveConstraint((100).percent(), (50).percent()), (5).pixels()))
        .setWidth(new SubtractiveConstraint((95).percent(), (7).pixels()))
        .setHeight((10).pixels())
        .onMouseClick((comp) => {
            comp.grabWindowFocus();
        })
        .setChildOf(InnerBox);

        const deleteButton = new UIWrappedText("X", centered = true)
        .setX((2).pixels(true))
        .setY(new SubtractiveConstraint(new SubtractiveConstraint((100).percent(), (50).percent()), (4).pixels()))
        .setWidth((5).percent())
        .onMouseClick((comp, event) => {

            const indexInput = this.textInputs.indexOf(TextInput);
            if (indexInput > -1) { 
                this.textInputs.splice(indexInput, 1);
            }

            Line.getParent().removeChild(Line);
            event.stopPropagation();
        })
        .onMouseEnter((comp) => {
            animate(comp, (animation) => {
              animation.setColorAnimation(
                Animations.OUT_EXP,
                0.5,
                new ConstantColorConstraint(Color.RED)
              );
            });
          })
          .onMouseLeave((comp) => {
            animate(comp, (anim) => {
              anim.setColorAnimation(
                Animations.OUT_EXP,
                0.5,
                new ConstantColorConstraint(Color.WHITE)
              );
            });
          })
        .setChildOf(InnerBox);

        this.textInputs.push(TextInput)
        return this;
    }
    
    _createButtons = () => {
        this.ButtonBox = new UIContainer()
        .setX(new CenterConstraint())
        .setY(new AdditiveConstraint(new SiblingConstraint(), (2).pixels()))
        .setWidth((80).percent())
        .setHeight((20).pixels())
        .setChildOf(this.Scroll); 
        
        this._createInputButton()
        this._createLeaveButton()
    }

    _createInputButton = (defaultText = "Add New") => {
        const Line = new UIRoundedRectangle(5)
            .setColor(Color.BLACK)
            .setX(new SubtractiveConstraint(new CenterConstraint(), (2).percent()))
            .setWidth((30).percent())
            .setHeight((20).pixels())
            .setChildOf(this.ButtonBox);
        
        Line.setX(new SubtractiveConstraint(new CenterConstraint(), (16).percent()))

        const InnerBox = new UIRoundedRectangle(3.3)
            .setColor(new Color(21 / 255, 45 / 255, 69 / 255))//
            .setX((1).pixels())
            .setY((1).pixels())
            .setWidth(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setHeight(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setChildOf(Line)
            .onMouseClick((comp, event) => {
                this._createInputLine("Blank");
                this.ButtonBox.getParent().removeChild(this.ButtonBox);
                this._createButtons()
                event.stopPropagation();
            });
    
        const ButtonText = new UIText(defaultText)
        .setX(new CenterConstraint())
        .setY(new SubtractiveConstraint((50).percent(), (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (4).pixels()))
        .setHeight((10).pixels())
        .setChildOf(InnerBox);
    
        return this;
    }

    _createLeaveButton = (defaultText = "  Save  ") => {
        const Line = new UIRoundedRectangle(5)
        .setColor(Color.BLACK)
        .setX(new AdditiveConstraint(new SiblingConstraint(), (2).percent()))
        .setWidth((30).percent())
        .setHeight((20).pixels())
        .setChildOf(this.ButtonBox);

        const InnerBox = new UIRoundedRectangle(3.3)
            .setColor(new Color(21 / 255, 45 / 255, 69 / 255))//
            .setX((1).pixels())
            .setY((1).pixels())
            .setWidth(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setHeight(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setChildOf(Line)
            .onMouseClick(() => {
                Client.currentGui.close()
                this.leaveFunction()
            });
    
        const ButtonText = new UIText(defaultText)
            .setX(new CenterConstraint())
            .setY(new SubtractiveConstraint((50).percent(), (5).pixels()))
            .setWidth(new SubtractiveConstraint((100).percent(), (4).pixels()))
            .setHeight((10).pixels())
            .setChildOf(InnerBox);

    return this;
    }

    //Loads the values of a given list
    _loadValues() {
        while (this.textInputs.length < this.values.length) {
            this._createInputLine();
        }
        for (let i = 0; i < this.textInputs.length; i++) {
            this.textInputs[i].setText(this.values[i] ? this.values[i] : "Blank");
        }
        this._createButtons();
    }

    open() {
        GuiHandler.openGui(this.Screen)
    }

    /**
     * @returns List containing all inputs
     */
    get inputs() {
        let texts = [];
        for (let i = 0; i < this.textInputs.length; i++) {
            text = this.textInputs[i].getText()
            if(text != "") texts.push(text);
        }
        return texts;
    }
}

export default new BlackListWindow()