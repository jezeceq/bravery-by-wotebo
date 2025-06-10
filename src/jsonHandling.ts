import {Champion, Item, Class, Lane} from "./arrayTypes.ts";

/**
 * Fetches item data from a specified URL, filters it according to predefined criteria,
 * and transforms it into an array of `Item` objects.
 * @param {string} url - The URL from which to fetch the item data (JSON).
 * @returns {Promise<Item[]>} A promise that resolves to an array of `Item` objects,
 * or an empty array if an error occurs.
 */
export async function fetchItems(url: string): Promise<Item[]> {
    const BASE_URL = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const itemsArray: any[] = await response.json();

        // Chain of filters to select relevant items and map them to the Item structure.
        return itemsArray
            .filter(item => item.id !== 3172) // Exclude specific item (Zephyr, ID 3172).
            .filter(item => !item.categories.includes("Boots")) // Exclude items categorized as "Boots".
            .filter(item => item.inStore === true) // Include only items available in the store.
            .filter(item => item.displayInItemSets === true) // Include only items meant to be displayed in item sets.
            .filter(item => item.priceTotal > 1600) // Include only items with a total price over 1600.
            .map(item => ({
                name: item.name,
                id: item.id,
                iconPath: `${BASE_URL}/${item.iconPath.split('/').pop()?.toLowerCase()}`, // Construct full icon path.
                categories: item.categories,
                price: item.priceTotal
            })) as Item[];

    } catch (error) {
        console.error("Error fetching or transforming items:", error);
        return [];
    }
}

/**
 * Fetches champion data from a specified URL, filters out invalid entries,
 * and transforms it into an array of `Champion` objects.
 * @param {string} url - The URL from which to fetch the champion data (JSON).
 * @returns {Promise<Champion[]>} A promise that resolves to an array of `Champion` objects,
 * or an empty array if an error occurs.
 */
export async function fetchChampions(url: string): Promise<Champion[]> {
    const BASE_URL = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const champsArray: any[] = await response.json();

        return champsArray
            .filter(champ => champ.id !== -1) // Filter out champions with an ID of -1 (often placeholders).
            .map(champ => ({
                name: champ.name,
                id: champ.id,
                iconPath: `${BASE_URL}/${champ.squarePortraitPath.split('/').pop()?.toLowerCase()}`, // Construct full icon path.
                roles: champ.roles,
                title: champ.description
            })) as Champion[];

    } catch (error) {
        console.error("Error fetching or transforming champions:", error);
        return [];
    }
}


/**
 * Asynchronously returns a predefined list of game lanes.
 * This function currently returns a hardcoded list and does not fetch external data.
 * @returns {Promise<Lane[]>} A promise that resolves to an array of `Lane` objects.
 */
export async function fetchLanes(): Promise<Lane[]> {
    return [
        { name: 'Toplane', iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png" },
        { name: 'Jungle', iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-jungle.png" },
        { name: 'Midlane', iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-middle.png" },
        { name: 'Botlane', iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-bottom.png" },
        { name: 'Support', iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-utility.png" },
        { name: "Fill", iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-fill.png"}
    ] as Lane[];
}

/**
 * Asynchronously returns a predefined list of champion classes.
 * This function currently returns a hardcoded list and does not fetch external data.
 * @returns {Promise<Class[]>} A promise that resolves to an array of `Class` objects.
 */
export async function fetchClasses(): Promise<Class[]> {
    return [
        { name: 'support', iconPath: "https://wiki.leagueoflegends.com/en-us/images/Controller_icon.png?728f3&20181117143552",type: 3 },
        { name: 'fighter', iconPath: "https://wiki.leagueoflegends.com/en-us/images/thumb/Fighter_icon.png/96px-Fighter_icon.png?e3f07", type: 1 },
        { name: 'mage', iconPath: "https://wiki.leagueoflegends.com/en-us/images/thumb/Mage_icon.png/96px-Mage_icon.png?c4c84", type: 2 },
        { name: 'marksman', iconPath: "https://wiki.leagueoflegends.com/en-us/images/thumb/Marksman_icon.png/96px-Marksman_icon.png?c4c84", type: 5 },
        { name: 'assassin', iconPath: "https://wiki.leagueoflegends.com/en-us/images/thumb/Slayer_icon.png/96px-Slayer_icon.png?dde86", type: 6 },
        { name: 'tank', iconPath: "https://wiki.leagueoflegends.com/en-us/images/thumb/Tank_icon.png/96px-Tank_icon.png?d2561", type: 4 }
    ] as Class[];
}