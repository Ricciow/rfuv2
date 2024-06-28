export const playerName = Player.getName();

const Color = Java.type("java.awt.Color");
export const invisibleColor = new Color(0,0,0,0)

const MCItemStack = Java.type("net.minecraft.item.ItemStack");
export const NoPet = new Item(MCItemStack.func_77949_a(NBT.parse({
    id: "minecraft:wool",
    Count: 1,
    tag: {
        HideFlags: 254,
        display: {
            Name: "§cNo Pet"
        },
        ExtraAttributes: {
            id: "WOOL:15"
        }
    },
    "Damage": 15
}).rawNBT))