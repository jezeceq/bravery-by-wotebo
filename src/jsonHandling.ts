// Updated function to return items as an array matching the shape of itemArray
import {Champion, Item, Class, Lane} from "./arrayTypes.ts";

export async function fetchItems(url: string): Promise<Item[]> {
    const BASE_URL = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const itemsArray: any[] = await response.json();

        return itemsArray
            .filter(item => item.id !== 3172)
            .filter(item => !item.categories.includes("Boots"))
            .filter(item => item.inStore === true)
            .filter(item => item.displayInItemSets === true)
            .filter(item => item.priceTotal > 1600)
            .map(item => ({
                name: item.name,
                id: item.id,
                iconPath: `${BASE_URL}/${item.iconPath.split('/').pop()?.toLowerCase()}`,
                categories: item.categories
            })) as Item[];

    } catch (error) {
        console.error("Error fetching or transforming items:", error);
        return [];
    }
}


// Updated function to return champions as an array matching the shape of champArrayOpen

export async function fetchChampions(url: string): Promise<Champion[]> {
    const BASE_URL = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const champsArray: any[] = await response.json();

        return champsArray
            .filter(champ => champ.id !== -1)
            .map(champ => ({
            name: champ.name,
            id: champ.id,
            iconPath: `${BASE_URL}/${champ.squarePortraitPath.split('/').pop()?.toLowerCase()}`,
            roles: champ.roles
        })) as Champion[];

    } catch (error) {
        console.error("Error fetching or transforming champions:", error);
        return [];
    }
}


// Updated function to return lanes as an array matching the shape of lanesArray
export async function fetchLanes(): Promise<Lane[]> {
    return [
        { name: 'toplane', iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-top.png" },
        { name: 'jungle', iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-jungle.png" },
        { name: 'midlane', iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-middle.png" },
        { name: 'botlane', iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-bottom.png" },
        { name: 'support', iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-utility.png" }
    ] as Lane[];
}

// Updated function to return classes as an array matching the shape of classesArray
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
