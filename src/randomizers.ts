import {Item} from "./arrayTypes.ts";

export function getRandomEntry(array: any[]) {
    if (!array || array.length === 0) {
        console.warn("Array is empty or not loaded yet.");
        return null;
    }

    const randomIndex = Math.floor(Math.random() * array.length); // Pick a random index
    return array[randomIndex];
}


//item.categories?.includes("")
export function itemClassification(array: Item[], type: number) {
    // 1 - fighter, 2 - mage, 3 - enchanter, 4 - tank, 5 - marksman, 6 - assassin
    let holder: Item[] = [];

    switch (type) {
        case 1:
            array.forEach(item => {
                if (item.categories?.includes("Health") && item.categories?.includes("Damage")) {
                    holder.push(item);
                }
            });
            return holder;
        case 2:
            array.forEach(item => {
                if (item.categories?.includes("SpellDamage") && !item.categories?.includes("ManaRegen")) {
                    holder.push(item);
                }
            });
            return holder;
        case 3:
            array.forEach(item => {
                if ((item.categories?.includes("ManaRegen")||
                    item.id == 3002 || //Trailblazer added id:3002
                    (item.categories?.includes("SpellBlock") && item.categories?.includes("AbilityHaste"))) &&
                    !item.categories?.includes("HealthRegen") && !item.categories?.includes("Damage") &&
                    item.id != 2502) {  //remove Unending despair id:2502
                    holder.push(item);
                }
            });
            return holder;
        case 4:
            array.forEach(item => {
                if ((item.categories?.includes("Health") || item.categories?.includes("Armor") || item.categories?.includes("SpellBlock")) &&
                    (!item.categories?.includes("Damage") && !item.categories?.includes("SpellDamage") &&
                        !item.categories?.includes("ManaRegen") && !item.categories?.includes("Vision") &&
                        !item.categories?.includes("AttackSpeed") && item.id != 3002)) { //remove Trailblazer id:3002
                    holder.push(item);
                }
            });
            return holder;
        case 5:
            array.forEach(item => {
                if (item.categories?.includes("CriticalStrike") ||
                    item.categories?.includes("AttackSpeed") && item.categories?.includes("OnHit")) {
                    holder.push(item);
                }
            });
            return holder;
        case 6:
            array.forEach(item => {
                if ((item.categories?.includes("ArmorPenetration") && item.categories?.includes("Damage")) &&
                    !item.categories?.includes("Health") && !item.categories?.includes("CriticalStrike") && !item.categories?.includes("OnHit") ||
                    item.id == 6609 || item.id == 3026 || item.id == 3004 || item.id == 3156 || item.id == 6676) {
                    //Assassin items are very specific, so it is needed to add a lot of them directly
                    holder.push(item);
                }
            });
            return holder;
        default:
            return [{
                id: 1,
                name: "Placeholder",
                iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png",
                categories: []
            }];
    }
}
