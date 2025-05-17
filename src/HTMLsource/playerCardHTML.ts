import {Champion, Class, Item, Lane, Player} from "../arrayTypes.ts";

export function playerBox(player: Player, index: number) {
    if (player.champion.id === -1){
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
                    <span id="dif_easy">Easy</span>
                    <span id="dif_med">Medium</span>
                    <span id="dif_gard">Hard</span>
                    <span id="dif_ins">Insane</span>
                  </div>
                </div>
            </div>
        `;
    }
}

// Function for Champion (same as you provided)
export function completeChampionSprout(champ: Champion): string {
    return `
        <div class="champ-sprout">
            <img src=${champ.iconPath} alt=${champ.name}>
            <span>${champ.name}</span>
        </div>
    `;
}

// Function for Class
export function completeClassSprout(cls: Class | undefined): string {
    return `
        <div class="class-sprout">
            <img src=${cls?.iconPath} alt=${cls?.name}>
            <span>${cls?.name}</span>
        </div>
    `;
}

// Function for Item
export function completeItemSprout(items: Item[]): string {
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
export function completeLaneSprout(lane: Lane): string {
    return `
        <div class="lane-sprout">
            <img src=${lane.iconPath} alt=${lane.name}>
            <span>${lane.name}</span>
        </div>
    `;
}

function adjustTextLength(text: string) {
    const wordCount = text.split(' ').length;
    if (wordCount > 2) {
        text = text
            .split(' ')
            .map(word => word.charAt(0))
            .join('.');
    }
    return text;
}
