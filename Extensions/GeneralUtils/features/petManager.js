import { petData } from "../../../data/General/petData";
import { NoPet } from "../../../utils/constants";
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

const levelUpMatcher = /§aYour (§[abcdef0123456789][\w\s]+) §aleveled up to level §9(\d+)§a!/
class PetManager {
    constructor() {
        this.pets = petData.existingPets ?? []
        //Verify Pet Gui Actions
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
                        if(petData.equipped == this.getIndex(item)) {
                            this.setNoPet()
                            return
                        }
                        this.setEquippedPet(item)
                    }
                    else if(button == 1) {
                        this.removePet(item)
                    }
                }
            }
        })
        //Verify Autopet Messages
        register('chat', (event) => {
            Pet = ChatLib.getChatMessage(event).split("§cAutopet §eequipped your ")[1].split("§e! §a§lVIEW RULE")[0]
            this.setEquippedPetByName(Pet)
        }).setCriteria("Autopet equipped your ${*}! VIEW RULE")
        //Verify Level Up Messages
        register('chat', (event) => {
            let message = ChatLib.getChatMessage(event, true).replace(/&r/g, "").replace(/&/g,"§")
            const matcher = message.match(levelUpMatcher)
            this.levelPet(matcher[1], matcher[2])
        }).setCriteria("Your ${*} leveled up to level ${*}!")
        this.display = new PetDisplayElement('petDisplay', 0, 0)
        this.updateDisplay()
    }

    levelPet(petName, level) {
        if(level > 200) {
            //Subtract 1 from cosmetic to find the one before leveling
            cosmetic = level - 200 - 1
            level = 200
        }
        else {
            //Subtract 1 to find the one who leveled up
            cosmetic = 0
            level = level - 1
        }
        petIndex = petData.existingPets.findIndex((pet) => {
            const re = `§7\\[Lvl \\d+\\] (§8\\[§6${cosmetic}§8§4✦§8\\] )?${petName}`
            return new RegExp(re).test(pet.tag.display.Name) && parseInt(pet.tag.display.Name.match(/§7\[Lvl (\d+)\]/)[1]??201) <= level
        })
        if(petIndex != -1) {
            petData.existingPets[petIndex].tag.display.Name = petData.existingPets[petIndex].tag.display.Name.replace(/Lvl \d+/, `Lvl ${level+1}`)
            petData.save()
            if(petData.equipped == petIndex) this.updateDisplay();
        }
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
            if(index == petData.equipped && !result) petData.equipped = -2;
            return result
        })
        petData.existingPets = this.pets
        petData.save()
        this.updateDisplay()
    }

    removePetByName(name) {
        this.pets = this.pets.filter((pet, index) => {
            result = pet.tag.display.Name != name
            if(index == petData.equipped && !result) petData.equipped = -2;
            return result
        })
        petData.existingPets = this.pets
        petData.save()
        this.updateDisplay()
    }

    getPetsOnScreen() {
        try {
            lastUUID = this.currentUUID
            let inventory = Player?.getContainer()
            if((/^Pets( \(\d\/\d\) )?$/).test(inventory?.getName())) {
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
                petData.existingPets = this.pets
                petData.save()
                if(petData.equipped != -2) this.setEquippedPetByUUID(lastUUID);
            }
        }
        catch (error) {
            console.error("PetManager - GetPetsOnScreen")
            console.error(error)
        }
    }

    setEquippedPet(item) {
        petData.equipped = this.getIndex(item)
        petData.save()
        this.updateDisplay()
    }

    setEquippedPetByName(name) {
        petData.equipped = this.getIndexByName(name)
        petData.save()
        this.updateDisplay()
    }

    setEquippedPetByUUID(uuid) {
        petData.equipped = this.getIndexByUUID(uuid)
        petData.save()
        this.updateDisplay()
    }

    setNoPet() {
        petData.equipped = -2
        petData.save()
        this.updateDisplay()
    }

    get currentUUID() {
        return petData.existingPets[petData.equipped]?.tag?.ExtraAttributes?.uuid
    }

    getIndex(item) {
        itemObj = item.getNBT().toObject()
        uuid = itemObj.tag.ExtraAttributes.uuid
        if(!uuid) {
            return this.getIndexByName(itemObj.tag.display.Name)
        }
        else return this.getIndexByUUID(uuid)
    }

    getIndexByName(name) {
        return this.pets.findIndex((pet) => pet.tag.display.Name === name)
    }

    getIndexByUUID(uuid) {
        return this.pets.findIndex((pet) => pet.tag.ExtraAttributes.uuid === uuid)
    }

    updateDisplayState() {
        if(generalSettings.petDisplay) {
            this.display.unhide()
        }
        else {
            this.display.hide()
        }
    }

    updateDisplay() {
        if(petData.equipped > -1) {
            this.updateDisplayState()
            let petNBT = petData.existingPets[petData.equipped]
            name = petNBT.tag.display.Name
            // NEED TO FIGURE THIS OUT LATER
            // newNbt = estimatePet(name)
            // if(newNbt) {
            //     itemStack = new Item("minecraft:skull").itemStack
            //     itemStack.func_77982_d(newNbt)
            // }
            itemStack = MCItemStack.func_77949_a(NBT.parse(petNBT).rawNBT)
            this.display.setItem(new Item(itemStack))
        }
        else if(petData.equipped == -2) {
            this.display.setItem(NoPet)
        }
        else {
            sendModMessage("&4&lUnknown pet encountered! &c&lOpen pet menu and scroll all pages, then re-equip it.")
        }
    }
}

export default new PetManager()