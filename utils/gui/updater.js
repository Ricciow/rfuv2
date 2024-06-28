//Made just to show/hide the gui elements when the settings are closed.
import petManager from "../../Extensions/GeneralUtils/features/petManager"


const SettingsGui = Java.type("gg.essential.vigilance.gui.SettingsGui")

register('guiClosed', (gui) => {
    if (gui instanceof SettingsGui) {
        petManager.updateDisplayState()
    }
})