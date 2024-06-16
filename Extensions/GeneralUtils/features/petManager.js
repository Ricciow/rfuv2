import { petData } from "../../../data/General/petData";
import { sendModMessage } from "../../../utils/functions";
import { PetDisplayElement } from "../../../utils/gui/elements/PetDisplayElement";
import generalSettings from "../generalSettings";

const MCItemStack = Java.type("net.minecraft.item.ItemStack");
// FIGURE THIS OUT LATER
// const NEUQuery = Java.type("io.github.moulberry.notenoughupdates.util.ItemResolutionQuery")
// const NEUItemUtils = Java.type("io.github.moulberry.notenoughupdates.util.ItemUtils")

// const ColorNumber = {
//     "b": 6,
//     "d": 5,
//     '6': 4,
//     '5': 3,
//     '9': 2,
//     'a': 1,
//     'f': 0
// }


// function estimatePet(name) {
//     AllCandidates = NEUQuery.findInternalNameCandidatesForDisplayName(name).filter((value) => value.includes(";"))
//     formattedName = name.replace(/ /g, "_").toUpperCase()
//     possibleItems = AllCandidates.filter((value) => formattedName.includes(value.slice(0,-2)))
//     color = name.split("").reverse().join("").split("§")[0].slice(-1).toLowerCase()
//     number = ColorNumber[color]
//     if(possibleItems.length > 0) {
//         let longest = 0
//         possibleItems.forEach((item) => {
//             if(longest < item.length) longest = item.length
//         })
//         possibleItems = possibleItems.filter((item) => item.length == longest)
//         probable = possibleItems.find((item) => item.slice(-1) == number)
//         if(!probable) return
//         nbttag = JSON.parse(FileLib.read(`./config/notenoughupdates/repo/items/${probable}.json`)).nbttag
//         try {
//             return net.minecraft.nbt.JsonToNBT.func_180713_a(nbttag)
//         }
//         catch (error) {
//             console.error("petManager.js - JSON parse NEU nbt - rfuv2")
//             console.error(error)
//         }
//     }
// }

class PetManager {
    constructor() {
        this.pets = petData['existingPets'] ?? []
        register('guiOpened', (event) => {
            setTimeout(() => {
                this.getPetsOnScreen()
            }, 100);
        })
        register('guiMouseClick', (x, y , button, gui, event) => {
            if((/Pets \(\d\/\d\)/).test(Player?.getContainer()?.getName())) {
                let slot = Client.currentGui.getSlotUnderMouse();
                let item = slot?.getItem();
                if(item?.getID() == 397 && !item?.getName()?.includes("Autopet")) {
                    if(button == 0 || button == 2) {
                        this.setEquippedPet(item)
                    }
                    else if(button == 1) {
                        this.removePet(item)
                    }
                }
            }
        })
        this.display = new PetDisplayElement('petDisplay', 0, 0)
        this.updateDisplay()
    }

    removePet(item) {
        itemObj = item.getNBT().toObject()
        uuid = itemObj.tag.ExtraAttributes.uuid
        if(!uuid) {
            this.removePetByName(itemObj.tag.display.Name)
            return
        }
        this.pets = this.pets.filter((pet, index) => {
            result = uuid != pet.tag.ExtraAttributes.uuid
            if(index == petData['equipped'] && !result) petData['equipped'] == -1;
            return result
        })
        petData['existingPets'] = this.pets
        petData.save()
    }

    removePetByName(name) {
        this.pets = this.pets.filter((pet, index) => {
            result = pet.tag.display.Name != name
            if(index == petData['equipped'] && !result) petData['equipped'] == -1;
            return result
        })
        petData['existingPets'] = this.pets
        petData.save()
    }

    getPetsOnScreen() {
        try {
            let inventory = Player?.getContainer()
            if((/Pets \(\d\/\d\)/).test(inventory?.getName())) {
                this.pets.push(...inventory.getItems().slice(0,54).filter((item) => item?.getID() == 397 && /\[Lvl \d+\]/.test(ChatLib.removeFormatting(item.getName()))).map((item) => item?.getNBT()?.toObject()))
                //Remove duplicates
                this.pets = this.pets.reverse()
                const seen = new Set()
                this.pets = this.pets.filter(item => {
                    const uuid = item.tag.ExtraAttributes.uuid
                    if(!uuid) return true
                    if (seen.has(uuid)) return false
                    seen.add(uuid)
                    return true
                });
                petData['existingPets'] = this.pets
                petData.save()
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    setEquippedPet(item) {
        itemObj = item.getNBT().toObject()
        uuid = itemObj.tag.ExtraAttributes.uuid
        if(!uuid) {
            this.setEquippedPetByName(itemObj.tag.display.Name)
            return
        }
        else petData['equipped'] = this.pets.findIndex((pet) => uuid === pet.tag.ExtraAttributes.uuid)
        petData.save()
        this.updateDisplay()
    }

    setEquippedPetByName(name) {
        petData['equipped'] = this.pets.findIndex((pet) => pet.tag.display.Name === name)
        petData.save()
        this.updateDisplay()
    }

    updateDisplay() {
        if(petData.equipped != -1) {
            if(generalSettings.petDisplay) {
                this.display.unhide()
                let petNBT = petData.existingPets[petData.equipped]
                name = petNBT.tag.display.Name
                // NEED TO FIGURE THIS OUT LATER
                // newNbt = estimatePet(name)
                // if(newNbt) {
                //     itemStack = new Item("minecraft:skull").itemStack
                //     itemStack.func_77982_d(newNbt)
                // }
                itemStack = MCItemStack.func_77949_a(NBT.parse(petNBT).rawNBT)
                console.log(new Item(itemStack).getNBT())
                this.display.setItem(new Item(itemStack))
            }
            else {
                this.display.hide()
            }
        }
        else {
            sendModMessage("&4&lUnknown pet encountered! &c&lOpen pet menu and scroll all pages, then re-equip it.")
        }
    }
}

export default new PetManager()