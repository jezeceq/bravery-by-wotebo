import {Item} from "./arrayTypes.ts";

/**
 * Gets a random entry from an array.
 * @param {any[]} array - The array to pick an element from.
 * @returns {any | null} A random element from the array, or null if the array is empty or undefined.
 */
export function getRandomEntry(array: any[]) {
    // Check if the array is empty or not loaded yet.
    if (!array || array.length === 0) {
        console.warn("Array is empty or not loaded yet.");
        return null;
    }

    const randomIndex = Math.floor(Math.random() * array.length); // Pick a random index
    return array[randomIndex];
}


/**
 * Classifies items based on a numeric type, typically corresponding to a champion's role.
 * Type mapping: 1 - fighter, 2 - mage, 3 - enchanter, 4 - tank, 5 - marksman, 6 - assassin.
 * @param {Item[]} array - The array of items to classify.
 * @param {number} type - The numeric type representing the desired classification.
 * @returns {Item[]} An array of items that match the classification criteria.
 */
export function itemClassification(array: Item[], type: number) {
    // 1 - fighter, 2 - mage, 3 - enchanter, 4 - tank, 5 - marksman, 6 - assassin
    let holder: Item[] = []; // Array to store items matching the criteria.

    switch (type) {
        case 1: // Fighter items
            array.forEach(item => {
                // Criteria: Item must have both "Health" and "Damage" categories.
                if (item.categories?.includes("Health") && item.categories?.includes("Damage")) {
                    holder.push(item);
                }
            });
            return holder;
        case 2: // Mage items
            array.forEach(item => {
                // Criteria: Item must have "SpellDamage" but not "ManaRegen" (typically for burst mages).
                if (item.categories?.includes("SpellDamage") && !item.categories?.includes("ManaRegen")) {
                    holder.push(item);
                }
            });
            return holder;
        case 3: // Enchanter items
            array.forEach(item => {
                // Criteria for Enchanters:
                // - Has "ManaRegen" OR
                // - Is Trailblazer (id: 3002) OR
                // - Has "SpellBlock" AND "AbilityHaste"
                // AND does NOT have "HealthRegen" AND does NOT have "Damage"
                // AND is NOT Unending Despair (id: 2502).
                if ((item.categories?.includes("ManaRegen")||
                        item.id == 3002 || //Trailblazer added id:3002
                        (item.categories?.includes("SpellBlock") && item.categories?.includes("AbilityHaste"))) &&
                    !item.categories?.includes("HealthRegen") && !item.categories?.includes("Damage") &&
                    item.id != 2502) {  //remove Unending despair id:2502
                    holder.push(item);
                }
            });
            return holder;
        case 4: // Tank items
            array.forEach(item => {
                // Criteria for Tanks:
                // - Has "Health" OR "Armor" OR "SpellBlock"
                // AND does NOT have "Damage", "SpellDamage", "ManaRegen", "Vision", "AttackSpeed"
                // AND is NOT Trailblazer (id: 3002).
                if ((item.categories?.includes("Health") || item.categories?.includes("Armor") || item.categories?.includes("SpellBlock")) &&
                    (!item.categories?.includes("Damage") && !item.categories?.includes("SpellDamage") &&
                        !item.categories?.includes("ManaRegen") && !item.categories?.includes("Vision") &&
                        !item.categories?.includes("AttackSpeed") && item.id != 3002)) { //remove Trailblazer id:3002
                    holder.push(item);
                }
            });
            return holder;
        case 5: // Marksman items
            array.forEach(item => {
                // Criteria: Item must have "CriticalStrike" OR ("AttackSpeed" AND "OnHit").
                if (item.categories?.includes("CriticalStrike") ||
                    item.categories?.includes("AttackSpeed") && item.categories?.includes("OnHit")) {
                    holder.push(item);
                }
            });
            return holder;
        case 6: // Assassin items
            array.forEach(item => {
                // Criteria for Assassins:
                // - (Has "ArmorPenetration" AND "Damage") AND no "Health", "CriticalStrike", "OnHit" OR
                // - Is one of the explicitly listed item IDs.
                if ((item.categories?.includes("ArmorPenetration") && item.categories?.includes("Damage")) &&
                    !item.categories?.includes("Health") && !item.categories?.includes("CriticalStrike") && !item.categories?.includes("OnHit") ||
                    item.id == 6609 || item.id == 3026 || item.id == 3004 || item.id == 3156 || item.id == 6676) {
                    //Assassin items are very specific, so it is needed to add a lot of them directly
                    holder.push(item);
                }
            });
            return holder;
        default: // Fallback for unknown types.
            return [{
                id: 1,
                name: "Placeholder",
                iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png",
                categories: []
            }];
    }
}