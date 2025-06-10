import {getRandomEntry} from "./utility.ts";
import {callSingleRandomize, getClosedArrays, getItemArrayType, saveSession, setClosedArrays} from "./main.ts";
import {Champion, Class, Item, Lane, Player} from "./arrayTypes.ts";
import {playerBox} from "./HTMLsource/playerCardHTML.ts";


export const users: Player[] = []; // Global array storing all active player objects.
let singleUser: number; // Stores the index of the player targeted for a single reroll operation.
const maxPlayers = 10; // Maximum number of players allowed in the application.
let editingPlayerIndex: number | null = null;

/**
 * Creates a new player object with default values and adds it to the `users` array.
 * If the maximum number of players is reached, an alert is shown.
 * @param {HTMLUListElement} userList - The UL element where player cards are rendered (for re-rendering).
 * @param {number} index - The designated index for the new player (0-9).
 */
export function createPlayer(userList: HTMLUListElement, index: number) {
    if (users.length >= maxPlayers) {
        alert("The maximum number of players is 10.");
        return;
    }
    const name = `Player ${index + 1}`; // Default player name.
    if (name) {
        const newPlayer: Player = {
            index: index,
            name: name,
            champion: { // Default unassigned champion state.
                name: "None",
                id: -1,
                iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png",
            } as Champion,
            lane: { // Default unassigned lane state.
                name: "Fill",
                iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-fill.png"
            } as Lane,
            items: [],
            difficulty: 1, // Default difficulty level.
            fixedLane: false
        };
        users.push(newPlayer);
        saveSession(); // Persist changes.
        renderPlayers(userList); // Update the UI.
    }
}

/**
 * Renders all player cards into the UI, distributing them into two columns.
 * It also attaches necessary event listeners to buttons within each player card.
 * @param {HTMLUListElement} playerList - The main UL element that will contain player columns.
 */
export function renderPlayers(playerList: HTMLUListElement) {
    // Dynamically generate HTML for two columns, each capable of holding up to 5 player cards.
    playerList.innerHTML = `
    <div id="player_list_container">
        <ul class="column" id="column1">
            ${[...Array(5)].map((_, i) => getRowHTML(i)).join("")}
        </ul>
        <ul class="column" id="column2">
            ${[...Array(5)].map((_, i) => getRowHTML(i + 5)).join("")}
        </ul>
    </div>
    `;

    // Attach event listeners to "add player" (+) buttons.
    document.querySelectorAll<HTMLDivElement>('.rowPC').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index')!);
            createPlayer(playerList, index);
        });
    });

    // Attach event listeners to "delete player" buttons.
    document.querySelectorAll('#delete-player').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index')!);
            deletePlayer(playerList, index);
        });
    });

    // Attach event listeners to "reroll single player" buttons.
    document.querySelectorAll('#reroll-single').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index')!);
            rerollPlayer(playerList, index);
        })
    })

    // Attach event listeners to difficulty sliders on player cards.
    document.querySelectorAll('.card-slider').forEach(slider => {
        slider.addEventListener('input', () => {
            const index = parseInt(slider.getAttribute('data-index')!);
            const value = parseInt((slider as HTMLInputElement).value);
            changeDifficulty(index, value);
        })
    })

    document.querySelectorAll('.has-dropdown').forEach(dropdownContainer => {
        dropdownContainer.addEventListener('click', (event) => {
            event.stopPropagation();
            const content = dropdownContainer.querySelector('.lane-dropdown-content');
            document.querySelectorAll('.lane-dropdown-content.show').forEach(openDropdown => {
                if (openDropdown !== content) {
                    openDropdown.classList.remove('show');
                }
            });
            content?.classList.toggle('show');
        });
    });

    document.querySelectorAll('.lane-option').forEach(option => {
        option.addEventListener('click', (event) => {
            event.stopPropagation();
            const playerIndex = parseInt(option.getAttribute('data-index')!);
            const laneName = option.getAttribute('data-lane-name')!;
            changePlayerLane(playerIndex, laneName, playerList);
        });
    });

    window.addEventListener('click', (event) => {
        if (!(event.target as Element).closest('.has-dropdown')) {
            document.querySelectorAll('.lane-dropdown-content.show').forEach(openDropdown => {
                openDropdown.classList.remove('show');
            });
        }
    });

    // Attach event listeners to "change name" buttons.
    document.querySelectorAll('#change-name').forEach(button => {
        button.addEventListener('click', () => {
            editingPlayerIndex = parseInt(button.getAttribute('data-index')!);
            renderPlayers(playerList);
        });
    });

    document.querySelectorAll('.editing-name-input').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
        });
    });

    document.querySelectorAll('#save-name-inline').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index')!);
            const input = document.querySelector(`.editing-name-input[data-index="${index}"]`) as HTMLInputElement;
            if(updatePlayerName(input, index)){
                renderPlayers(playerList);
            }
        });
    });

    document.querySelectorAll('#cancel-name-inline').forEach(button => {
        button.addEventListener('click', () => {
            editingPlayerIndex = null;
            renderPlayers(playerList);
        });
    });
}

/**
 * Generates the HTML for a single player slot.
 * If a player exists for the given index, their card is rendered.
 * Otherwise, an "add player" button (+) is rendered.
 * @param {number} index - The index of the player slot (0-9).
 * @returns {string} The HTML string for the player slot.
 */
function getRowHTML(index: number): string {
    const existingPlayer = users.find(player => player.index === index);
    return existingPlayer
        ? `<div class="box-wrapper" > ${playerBox(existingPlayer, index, editingPlayerIndex)} </div>` // Player exists, render their card.
        : `<div class="box-wrapper">
                <li class="rowPC" data-index="${index}">+</li>
            </div>
        `; // Player slot is empty, render an "add" button.
}

/**
 * Deletes a player from the `users` array and updates the UI.
 * If the deleted player had a specific lane assigned, that lane is returned to the available pool.
 * @param {HTMLUListElement} playerList - The UL element for UI re-rendering.
 * @param {number} index - The index of the player to delete.
 */
function deletePlayer(playerList: HTMLUListElement, index: number) {
    const indexTemp = users.findIndex(player => player.index === index); // Find the actual index in the users array.
    console.warn(index + " + " + indexTemp)
    if (indexTemp !== -1) {
        const arrays = getClosedArrays(); // Get current state of unavailable entities.
        let lanes1 = [...arrays[0]];
        let lanes2 = [...arrays[1]];
        const user = users[indexTemp];

        // If the player had a specific lane (not "Fill"), add it back to the respective team's available lane pool.
        if(user.lane.name !== "Fill"){
            if(index < 5){ // Player was in Team 1 (indices 0-4).
                lanes1.push(user.lane);
                console.error("tady")
            } else { // Player was in Team 2 (indices 5-9).
                lanes2.push(user.lane);
            }
        }
        users.splice(indexTemp, 1); // Remove the player from the array.
        setClosedArrays([...arrays[2]], lanes1, lanes2); // Update the global unavailable arrays.
        saveSession();
        console.log(lanes1.length + " + " + lanes2.length)
    }
    renderPlayers(playerList); // Re-render the player list.
}

/**
 * Sets the `singleUser` global variable to the index of the player to be rerolled
 * and then calls the randomization function for that single player.
 * @param {HTMLUListElement} playerList - The UL element for UI re-rendering.
 * @param {number} index - The index of the player to reroll.
 */
function rerollPlayer(playerList: HTMLUListElement, index: number) {
    const foundUser= users.find(player => player.index === index);
    if (foundUser){
        singleUser = foundUser.index; // Target this player for the next randomize call.
    } else {
        console.warn(`Player with index ${index} not found`);
    }
    callSingleRandomize(playerList); // Initiate randomization for the targeted player.
}

/**
 * Validates the content of a player name input field.
 * Adds/removes 'input-error' class and returns validation status.
 * @param {HTMLInputElement | null} input - The input element to validate.
 * @returns {string | null} The validated and trimmed name if successful, otherwise null.
 */
function validatePlayerNameInput(input: HTMLInputElement | null): string | null {
    if (!input) return null;

    input.classList.remove('input-error');

    const newNameRaw = input.value;
    const newNameTrimmed = newNameRaw.trim();

    // Validation 1: Empty
    if (newNameTrimmed === "") {
        input.classList.add('input-error');
        input.focus();
        return null;
    }

    // Validation 2: Length
    if (newNameRaw.length > 12) {
        input.classList.add('input-error');
        input.focus();
        return null;
    }

    // Validation: Name characters (allows spaces, letters from various scripts, and numbers).
    const nameValidationRegex = /^[ \p{L}\p{N}]+$/u;
    if (!nameValidationRegex.test(newNameTrimmed)) {
        input.classList.add('input-error');
        input.focus();
        return null;
    }

    // All checks passed
    return newNameTrimmed;
}

function updatePlayerName(input: HTMLInputElement, index: number): boolean {
    const validatedName = validatePlayerNameInput(input);

    if (validatedName) {
        const player = users.find(p => p.index === index);
        if (player) {
            player.name = validatedName;
            saveSession();
        }
        editingPlayerIndex = null;
        return true; // Success
    }

    return false; // Failure
}

/**
 * Updates the difficulty setting for a specific player.
 * @param {number} index - The index of the player whose difficulty is to be changed.
 * @param {number} value - The new difficulty value (0-3).
 */
function changeDifficulty(index:number, value:number){
    const existingPlayer = users.find(player => player.index === index);
    if (existingPlayer){
        existingPlayer.difficulty = value;
    } else {
        console.warn(`Player with index ${index} not found`);
    }
    saveSession();
}

function changePlayerLane(index: number, newLaneName: string, playerList: HTMLUListElement) {
    const arrays = getClosedArrays();
    let lanesTeam1 = [...arrays[0]];
    let lanesTeam2 = [...arrays[1]];

    const player = users.find(u => u.index === index);
    let newLane: Lane | undefined
    if(player){
        if (index < 5) {
            newLane = lanesTeam1.find(lane => lane.name === newLaneName);
            if(newLane){
                if (player.lane.name !== "Fill"){
                    lanesTeam1.push(player.lane)
                }
                player.lane = newLane;
                if (newLane.name !== "Fill"){
                    lanesTeam1 = lanesTeam1.filter(entry => entry !== newLane);
                }
            }
        } else if (index >= 5) {
            newLane = lanesTeam2.find(lane => lane.name === newLaneName);
            if (newLane) {
                if (player.lane.name !== "Fill") {
                    lanesTeam2.push(player.lane)
                }
                player.lane = newLane;
                if (newLane.name !== "Fill") {
                    lanesTeam2 = lanesTeam2.filter(entry => entry !== newLane);
                }
            }
        }
        player.fixedLane = newLane?.name !== "Fill";
        setClosedArrays( arrays[2] , lanesTeam1, lanesTeam2)
        saveSession();
        renderPlayers(playerList);
    }
}


/**
 * Randomizes champion, lane, class, and items for players.
 * Can operate on all players or a single specified player.
 * Updates the global "available" arrays based on selections.
 * @param {HTMLUListElement} userList - The UL element for UI re-rendering.
 * @param {Champion[]} champArray - The current array of available champions.
 * @param {Lane[]} laneArrayTeam1 - The current array of available lanes for Team 1.
 * @param {Lane[]} laneArrayTeam2 - The current array of available lanes for Team 2.
 * @param {Class[]} classesArray - The master array of all available classes.
 * @param {boolean} all - If true, randomizes for all players. If false, randomizes only for the `singleUser`.
 */
export function randomize(userList: HTMLUListElement, champArray: any[], laneArrayTeam1: any[], laneArrayTeam2: any[], classesArray: any[], all: boolean) {
    // Create local copies of the "closed" arrays to modify during this randomization pass.
    // These represent the pool of *available* entities for this specific randomization run.
    let cA = [...champArray];
    let lA1 = [...laneArrayTeam1];
    let lA2 = [...laneArrayTeam2];
    let classType: number | undefined;
    let difficulty: number;
    let tempItem: Item[]; // Temporary array for item selection.
    let breakCycle: boolean = false;

    if(all){
        users.forEach(player => {
            if(player.lane.name !== "Fill" && player.fixedLane == false) {
                if (player.index < 5) lA1.push(player.lane); // Team 1
                else lA2.push(player.lane); // Team 2
            }
            if (player.champion.id === -1) {
                const input = document.querySelector(`.visible-name[data-index="${player.index}"]`) as HTMLInputElement;
                const validatedName = validatePlayerNameInput(input);
                if (!validatedName) {
                    player.name = `Player ${player.index + 1}`;
                    return;
                }
                player.name = validatedName;
            }
        })
    } else {
        const player = users.find(p => p.index === singleUser);
        if (player && player.champion.id === -1) {
            const input = document.querySelector(`.visible-name[data-index="${player.index}"]`) as HTMLInputElement;
            const validatedName = validatePlayerNameInput(input);
            if (!validatedName) {
                player.name = `Player ${player.index + 1}`;
                return;
            }
            player.name = validatedName;
        }
        if(player && player.lane.name !== "Fill" && player.fixedLane == false){
            if (player.index < 5) lA1.push(player.lane); // Team 1
            else lA2.push(player.lane); // Team 2
        }
    }

    users.forEach(player => {

        // Check for sufficient champions.
        if(cA.length < 1 && !breakCycle){
            alert("Not enough champions in pool!");
            breakCycle = true; // Stop processing further players if no champions left.
        } else if (cA.length > 0 && breakCycle){
            breakCycle = false; // Reset flag if champions somehow become available (unlikely in one pass).
        }
        if(breakCycle){ // Skip this player if the cycle is broken.
            return;
        }

        // If not randomizing all players, only process the 'singleUser'.
        if(!all && player.index != singleUser){
           return;
        }
        difficulty = player.difficulty;

        // Assign a random champion.
        let champion = getRandomEntry(cA);
        player.champion = champion;
        cA = cA.filter(entry => entry !== champion); // Remove assigned champion from available pool.

        // Assign a random lane based on the player's team.
        if (player.fixedLane == false){
            if (player.index < 5){ // Player is in Team 1 (indices 0-4).
                let lane: Lane = getRandomEntry(lA1);
                while (lane.name === "Fill"){
                    lane = getRandomEntry(lA1);
                }
                player.lane = lane;
                lA1 = lA1.filter(entry => entry !== lane); // Remove assigned lane from Team 1's available pool.
            }
            else { // Player is in Team 2 (indices 5-9).
                let lane: Lane = getRandomEntry(lA2);
                while (lane.name === "Fill"){
                    lane = getRandomEntry(lA2);
                }
                player.lane = lane;
                lA2 = lA2.filter(entry => entry !== lane); // Remove assigned lane from Team 2's available pool.
            }
        }

        // Assign a class based on difficulty.
        if(difficulty === 0 || difficulty === 1){ // Easy or Medium difficulty.
            // Attempt to assign a class that matches one of the champion's roles.
            let classesTemp: Class[] = classesArray.filter(cls =>
                player.champion.roles.includes(cls.name)
            );
            // Special handling for mages vs. enchanters if champion fits both.
            if (classesTemp.some(cls => cls.type === 2) && !classesTemp.some(cls => cls.type === 3)){
                classesTemp = classesTemp.filter(cls => cls.type === 2); // Prefer non-enchanter mage if possible.
            }
            player.class = getRandomEntry(classesTemp.length > 0 ? classesTemp : classesArray); // Pick from matching roles, or any class if no match.
        } else { // Hard or Insane difficulty.
            player.class = getRandomEntry(classesArray); // Assign any random class.
        }
        classType = player.class?.type;

        // Assign items based on class and difficulty.
        player.items = [];
        if (classType != null) {
            tempItem = [...getItemArrayType(classType)]; // Get items suitable for the assigned class.
            let item: Item;

            // Number of items depends on difficulty.
            switch (difficulty){
                case 0: // Easy: 1 item.
                    player.items?.push(getRandomEntry(tempItem));
                    break;
                case 1: // Medium: 2 items.
                case 2: // Hard: 2 items (class assignment differs, item count same as Medium).
                    item = getRandomEntry(tempItem);
                    player.items?.push(item);
                    tempItem = tempItem.filter(entry => entry !== item); // Ensure unique items.
                    player.items?.push(getRandomEntry(tempItem));
                    break;
                case 3: // Insane: 3 items.
                    item = getRandomEntry(tempItem);
                    player.items?.push(item);
                    tempItem = tempItem.filter(entry => entry !== item);
                    item = getRandomEntry(tempItem);
                    player.items?.push(item);
                    tempItem = tempItem.filter(entry => entry !== item);
                    player.items?.push(getRandomEntry(tempItem));
                    break;
            }
        }
    });

    // Update the global "available" arrays with the remaining available entities after this randomization pass.
    setClosedArrays(cA, lA1, lA2);
    saveSession();
    renderPlayers(userList);
}

/**
 * Fills all empty player slots up to the maximum of 10.
 * It checks existing players and creates new ones for any vacant indices.
 * @param {HTMLUListElement} playerList - The UL element for UI re-rendering.
 */
export function fillAll(playerList: HTMLUListElement){
    let existingPlayers: number[] = [];
    users.forEach(player => {
        existingPlayers.push(player.index); // Collect indices of all current players.
    });

    // Iterate through all possible player slots (0-9).
    for(let index = 0; index < 10; index++){
        if (!existingPlayers.includes(index)){ // If a slot at 'index' is not taken, create a player.
            createPlayer(playerList, index);
        }
    }
}

/**
 * Deletes all players from the application.
 * It clears the `users` array and updates the available lane pools by returning
 * any lanes that were assigned to the deleted players.
 * Champion availability (`champArrayClosed`) is not reset by this function.
 * @param {HTMLUListElement} playerList - The UL element for UI re-rendering.
 */
export function deleteAll(playerList: HTMLUListElement){
    const arrays = getClosedArrays();
    let lanes1 = [...arrays[0]]; // Current unavailable lanes for Team 1.
    let lanes2 = [...arrays[1]]; // Current unavailable lanes for Team 2.
    let champions = [...arrays[2]]; // Current unavailable champions (this state is preserved).

    // For each user being deleted, if they had a specific lane, add it back to the available pool.
    users.forEach(user => {
        if(user.lane.name != "Fill"){
            if(user.index < 5){ // Team 1
                lanes1.push(user.lane);
            } else { // Team 2
                lanes2.push(user.lane);
            }
        }
    });
    users.length = 0; // Clear all players.
    // Update the global closed arrays: champions remain as they were, lanes are updated.
    setClosedArrays(champions, lanes1, lanes2);
    saveSession();
    renderPlayers(playerList);
}