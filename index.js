import managerSettings from "./Manager/managerSettings";

register("command", () => {
    managerSettings.openGUI();
}).setName("test");