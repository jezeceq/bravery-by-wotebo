import {Champion, Class, Item, Lane, Player} from "../arrayTypes.ts";

/**
 * Generates the HTML string for a player's card.
 * The card's appearance differs based on whether the player has been "rerolled"
 * (i.e., assigned a champion, lane, etc.) or is in an initial state.
 * @param {Player} player - The player object for whom to generate the card.
 * @param {number} index - The index of the player, used for data attributes.
 * @returns {string} The HTML string representing the player card.
 */
export function playerBox(player: Player, index: number) {
    // If champion ID is -1, player is considered "unrerolled" or in initial state.
    if (player.champion.id === -1){
        // HTML for an unrerolled player (shows name input, difficulty slider, reroll/delete buttons).
        return `
            <div class="player_box" id="unrerolled">
                <div id="name_box">
                    <input type="text" class="visible-name" value="${player.name}" data-index="${index}">   
                    <div class="slider-container">
                      <input type="range" class="card-slider" min="0" max="3" step="1" value="${player.difficulty}" data-index="${index}">
                      <div class="labels">
                        <span id="dif_easy">Easy</span>
                        <span id="dif_med">Medium</span>
                        <span id="dif_gard">Hard</span>
                        <span id="dif_ins">Insane</span>
                      </div>
                    </div>
                </div>
                <div id="buttons_pc">
                    <button class="switcher" id="reroll-single" data-index="${index}">Reroll</button>
                    <button class="switcher" id="delete-player" data-index="${index}">Delete</button>
                </div>
            </div>
        `;
    } else {
        // HTML for a rerolled player (shows assigned champion, lane, class, items, etc.).
        return `
            <div class="player_box">
                <span class="name-string">${player.name}</span> 
                
                ${completeChampionSprout(player.champion)}
                ${completeLaneSprout(player.lane)}
                ${completeClassSprout(player.class)}
                ${completeItemSprout(player.items)}
                
                <div id="buttons_pc">
                    <button class="switcher" id="reroll-single" data-index="${index}">Reroll</button>
                    <button class="switcher" id="change-name" data-index="${index}">Rename</button>
                    <button class="switcher" id="delete-player" data-index="${index}">Delete</button>
                </div>
                <div class="slider-container">
                  <input type="range" class="card-slider" min="0" max="3" step="1" value="${player.difficulty}" data-index="${index}">
                  <div class="labels">
                    <span id="dif_easy" title="One item and correct classes">Easy</span>
                    <span id="dif_med" title="Two items and correct classes">Medium</span>
                    <span id="dif_gard" title="Two items and all classes">Hard</span>
                    <span id="dif_ins" title="Three items and all classes">Insane</span>
                  </div>
                </div>
            </div>
        `;
    }
}

// Function for Champion (same as you provided)
/**
 * Generates HTML for displaying a champion's icon and name.
 * @param {Champion} champ - The champion object.
 * @returns {string} HTML string for the champion display.
 */
export function completeChampionSprout(champ: Champion): string {
    return `
        <div class="champ-sprout">
            <img src=${champ.iconPath} alt=${champ.name}>
            <span>${champ.name}</span>
        </div>
    `;
}

// Function for Class
/**
 * Generates HTML for displaying a class's icon and name.
 * @param {Class | undefined} cls - The class object, or undefined if no class is assigned.
 * @returns {string} HTML string for the class display.
 */
export function completeClassSprout(cls: Class | undefined): string {
    return `
        <div class="class-sprout">
            <img src=${cls?.iconPath} alt=${cls?.name}>
            <span>${cls?.name}</span>
        </div>
    `;
}

// Function for Item
/**
 * Generates HTML for displaying a collection of items.
 * Each item shows its icon and an adjusted name.
 * @param {Item[]} items - An array of item objects.
 * @returns {string} HTML string for the item collection display.
 */
export function completeItemSprout(items: Item[]): string {
    // Maps each item to its HTML representation and joins them.
    // If no items, displays "No Items".
    return `
        <div class="item-collection">
            ${items.map(item => `
                <div class="item-sprout">
                    <img src="${item.iconPath}" alt="${item.name}">
                    <span>${adjustTextLength(item.name)}</span>
                </div>
            `).join("") || "<span>No Items</span>"}
        </div>
    `;
}

// Function for Lane
/**
 * Generates HTML for displaying a lane's icon and name.
 * @param {Lane} lane - The lane object.
 * @returns {string} HTML string for the lane display.
 */
export function completeLaneSprout(lane: Lane): string {
    return `
        <div class="lane-sprout">
            <img src=${lane.iconPath} alt=${lane.name}>
            <span>${lane.name}</span>
        </div>
    `;
}

/**
 * Adjusts the length of a given text string for display purposes.
 * If the text contains more than two words, it is abbreviated to an acronym
 * formed by the first letter of each word, separated by periods.
 * @param {string} text - The text string to adjust.
 * @returns {string} The adjusted (potentially abbreviated) text string.
 */
function adjustTextLength(text: string) {
    const wordCount = text.split(' ').length;
    if (wordCount > 2) {
        // Create acronym if more than two words.
        text = text
            .split(' ')
            .map(word => word.charAt(0))
            .join('.');
    }
    return text;
}