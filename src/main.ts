import {deleteAll, fillAll, randomize, renderPlayers, users as playerUsers} from './players.ts';
import { fetchChampions, fetchItems, fetchLanes, fetchClasses } from './jsonHandling.ts';
import { itemClassification } from './utility.ts';
import { Champion, Class, Item, Lane, Player } from './arrayTypes.ts';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <div>
    <div class="main-cont">
        <div class="all-effect-buttons">
        <button class="button" type="button" id="all_fill">Fill all</button>
            <button class="button" type="button" id="all_randomizer">Reroll all</button>
            <button class="button" type="button" id="all_delete">Delete all</button>
        </div>
        <ul id="player_list"></ul>
        <div id="showcase">
            <div class="champ_display_settings">
                <button class="button" type="button" id="clear_champs">Clear All</button>
                <input type="text" id="champSearch" placeholder="Search champion..." />
                <button class="button" type="button" id="reset_champs">Reset All</button>    
            </div>
            <ul id="champ_list"></ul>
        </div>
    </div>
  </div>
`;

const playerList = document.querySelector<HTMLUListElement>('#player_list')!;
const fillAllButton = document.querySelector<HTMLButtonElement>('#all_fill')!;
const randomizeAllButton = document.querySelector<HTMLButtonElement>('#all_randomizer')!;
const deleteAllButton = document.querySelector<HTMLButtonElement>('#all_delete')!;
const clearAllChampsButton = document.querySelector<HTMLButtonElement>('#clear_champs')!;
const resetAllChampsButton = document.querySelector<HTMLButtonElement>('#reset_champs')!;
const champList = document.getElementById('champ_list')!;
const searchInput = document.getElementById('champSearch') as HTMLInputElement;

let classesArray: Class[] = [];

let lanesArray: Lane[] = [];
let lanesArrayTeam1Available: Lane[] = []; // Lanes currently available for selection for Team 1.
let lanesArrayTeam2Available: Lane[] = []; // Lanes currently available for selection for Team 2.

let champArray: Champion[] = []; // Master list of all champions.
let champArrayAvailable: Champion[] = []; // Champions currently available for selection (banned/picked).

let itemArray: Item[] = []; // Master list of all items after initial filtering.
// Categorized item arrays for specific roles.
let fighterItems: Item[] = [];
let mageItems: Item[] = [];
let enchanterItems: Item[] = [];
let tankItems: Item[] = [];
let marksmanItems: Item[] = [];
let assassinItems: Item[] = [];

const SESSION_STORAGE_KEY = 'Session_v1'; // Key used for storing session data in localStorage.

fillAllButton.addEventListener('click', () => {
    fillAll(playerList);
    //clearSession()
});
randomizeAllButton.addEventListener('click', () => {
    randomize(playerList, champArrayAvailable, lanesArrayTeam1Available, lanesArrayTeam2Available, classesArray, true);
    displayChampions();
});

deleteAllButton.addEventListener('click', () => {
    deleteAll(playerList);
});


resetAllChampsButton.addEventListener('click', () => {
    resetAvailableChampions();
});

clearAllChampsButton.addEventListener('click', () => {
    clearAvailableChampions();
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const champs = champList.querySelectorAll('li');

    // Iterates through displayed champions and highlights those matching the search term.
    champs.forEach(li => {
        const champName = li.querySelector('img')?.getAttribute('title')?.toLowerCase() ?? "";
        if (searchTerm && champName.includes(searchTerm)) {
            li.classList.add('highlight');
        } else {
            li.classList.remove('highlight');
        }
    });
});

/**
 * Retrieves a copy of a pre-categorized item array based on a numeric type.
 * @param {number} which - A number identifying the desired item category (1-fighter, 2-mage, etc.).
 * @returns {Item[]} A copy of the requested item array, or a copy of the full itemArray if the type is invalid.
 */
export function getItemArrayType(which: number): Item[] {
    switch (which) {
        case 1: return [...fighterItems];
        case 2: return [...mageItems];
        case 3: return [...enchanterItems];
        case 4: return [...tankItems];
        case 5: return [...marksmanItems];
        case 6: return [...assassinItems];
        default:
            console.warn("Non-existing item array type requested:", which);
            return [...itemArray];
    }
}

/**
 * Updates the global arrays that track unavailable ("closed") champions and lanes for both teams.
 * @param {Champion[]} champs - Array of champions to be marked as unavailable.
 * @param {Lane[]} lanesTeam1 - Array of lanes for Team 1 to be marked as unavailable.
 * @param {Lane[]} lanesTeam2 - Array of lanes for Team 2 to be marked as unavailable.
 */
export function setClosedArrays(champs: Champion[], lanesTeam1: Lane[], lanesTeam2: Lane[]) {
    lanesArrayTeam1Available = [...lanesTeam1];
    lanesArrayTeam2Available = [...lanesTeam2];
    champArrayAvailable = [...champs];
}

/**
 * Retrieves the current arrays of unavailable ("closed") lanes and champions.
 * @returns {[Lane[], Lane[], Champion[]]} A tuple containing:
 *          - Array of unavailable lanes for Team 1.
 *          - Array of unavailable lanes for Team 2.
 *          - Array of unavailable champions.
 */
export function getClosedArrays():[Lane[], Lane[], Champion[]]{
    return [lanesArrayTeam1Available, lanesArrayTeam2Available, champArrayAvailable];
}

/**
 * Triggers the randomization process for a single player.
 * It uses the currently "closed" arrays for randomization constraints.
 * @param {HTMLUListElement} playerList - The UL element where player cards are rendered, used for re-rendering.
 */
export function callSingleRandomize(playerList: HTMLUListElement) {
    randomize(playerList, champArrayAvailable, lanesArrayTeam1Available, lanesArrayTeam2Available, classesArray, false);
    displayChampions();
}

/**
 * Saves the current application state to localStorage.
 * This includes player data and the lists of unavailable champions and lanes.
 */

 export function saveSession() {
    const sessionData = {
        users: playerUsers, // from players.ts
        champArrayClosed: champArrayAvailable,
        lanesArrayTeam1Closed: lanesArrayTeam1Available,
        lanesArrayTeam2Closed: lanesArrayTeam2Available,
    };
    try {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
        console.info("Session saved!");
    } catch (e) {
        console.error("Error saving session to localStorage:", e);
    }
}


/**
 * Attempts to load application state from localStorage.
 * If successful, it populates the relevant global arrays with the saved data.
 * @returns {boolean} True if a session was successfully loaded, false otherwise.
 */
function loadSessionFromLocalStorage(): boolean { // Returns true if session loaded
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (savedSession) {
        try {
            const sessionData = JSON.parse(savedSession);

            // Restore player users if present and valid in saved data.
            if (sessionData.users && Array.isArray(sessionData.users)) {
                playerUsers.length = 0; // Clear existing users before loading.
                sessionData.users.forEach((player: Player) => playerUsers.push(player));
            }

            // Restore the list of closed champions.
            if (sessionData.champArrayClosed && Array.isArray(sessionData.champArrayClosed)) {
                champArrayAvailable = sessionData.champArrayClosed;
            } else {
                champArrayAvailable = []; // Default to empty if not found or invalid.
            }

            // Restore closed lanes for Team 1.
            if (sessionData.lanesArrayTeam1Closed && Array.isArray(sessionData.lanesArrayTeam1Closed)) {
                lanesArrayTeam1Available = sessionData.lanesArrayTeam1Closed;
            } else {
                lanesArrayTeam1Available = []; // Default.
            }

            // Restore closed lanes for Team 2.
            if (sessionData.lanesArrayTeam2Closed && Array.isArray(sessionData.lanesArrayTeam2Closed)) {
                lanesArrayTeam2Available = sessionData.lanesArrayTeam2Closed;
            } else {
                lanesArrayTeam2Available = []; // Default.
            }
            console.log("Session loaded!");
            return true;
        } catch (e) {
            console.error("Error parsing session data from localStorage:", e);
            localStorage.removeItem(SESSION_STORAGE_KEY); // Remove corrupted data.
        }
    }
    return false;
}

/**
function clearSession(): void {
    try {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        console.log("Session removed from localStorage.");
    } catch (e) {
        console.error("Error removing session from localStorage:", e);
    }
    if (playerUsers && typeof playerUsers.length !== 'undefined') {
        playerUsers.length = 0;
    } else {
    }

    champArrayAvailable = [];
    lanesArrayTeam1Available = [];
    lanesArrayTeam2Available = [];

    console.log("In-memory session data cleared.");
}
    */


/**
 * Asynchronously loads all necessary initial data for the application.
 * This includes fetching items, champions, lanes, and classes,
 * then categorizing items and initializing session state if not already loaded.
 */
async function loadData() {
    try {
        const sessionLoaded = loadSessionFromLocalStorage(); // Attempt to load an existing session.

        // Fetch all remote and local data sources concurrently.
        const [items, champions, lanes, classes]: [Item[], Champion[], Lane[], Class[]] = await Promise.all([
            fetchItems("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json"),
            fetchChampions("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"),
            fetchLanes(),
            fetchClasses()
        ]);

        // Populate global arrays with fetched data.
        itemArray = items;
        champArray = champions;
        champArray.sort((a, b) => a.name.localeCompare(b.name)); // Sort champions alphabetically by name.
        lanesArray = lanes;
        classesArray = classes;

        // Classify items into role-specific arrays.
        fighterItems = itemClassification(itemArray, 1);
        mageItems = itemClassification(itemArray, 2);
        enchanterItems = itemClassification(itemArray, 3);
        tankItems = itemClassification(itemArray, 4);
        marksmanItems = itemClassification(itemArray, 5);
        assassinItems = itemClassification(itemArray, 6);

        // If no session was loaded from localStorage, initialize the "closed" arrays
        // (e.g., making all champions/lanes initially available) and save this initial state.
        if (!sessionLoaded) {
            setClosedArrays(champArray, lanesArray, lanesArray);
            saveSession();
        }

        displayChampions(); // Render the initial list of champions.

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// Initial data load sequence.
loadData().then(_r => renderPlayers(playerList)); // After data is loaded, render the player list.


/**
 * Renders the list of champions in the UI.
 * Each champion is displayed as an image, which can be clicked to toggle its availability.
 * The list also reflects search highlighting and disabled state for unavailable champions.
 */
function displayChampions() {
    const champList = document.querySelector<HTMLUListElement>('#champ_list')!;
    champList.innerHTML = ""; // Clear existing champion list items.

    const searchTerm = searchInput?.value.toLowerCase().trim() || "";

    champArray.forEach(champ => {
        const li = document.createElement('li');
        // Determine if the champion should be highlighted based on the search term.
        const isHighlighted = searchTerm !== "" && champ.name.toLowerCase().includes(searchTerm);
        const isDisabled = champArrayAvailable.some(champion => champion.id === champ.id);

        const tooltipContent = `
        <strong>${champ.name}:</strong> ${champ.title}
        <hr>
        <strong>Roles:</strong> ${champ.roles.join(', ')}
        `;

        li.innerHTML = `
            <li class="champ-wrapper has-tooltip ${isHighlighted ? "highlight" : ""}">
              <img 
                src="${champ.iconPath}" 
                alt="${champ.name}"
                class="champ-icon ${isDisabled ? "" : "disabled"}" 
                data-id="${champ.id}"
              />
              <div class="tooltip-box">${tooltipContent}</div>
            </li>
        `;

        const img = li.querySelector('img')!;
        // Add click event listener to toggle champion's inclusion in the "closed" list.
        img.addEventListener('click', () => {
            const index = champArrayAvailable.findIndex(champion => champion.id === champ.id);
            if (index > -1) { // If champion is currently in the closed list, remove it (making it available for randomizer).
                champArrayAvailable.splice(index, 1);
            } else { // If champion is not in the closed list, add it (making it unavailable for randomizer).
                champArrayAvailable.push(champ);
            }
            saveSession();
            displayChampions();
        });

        champList.appendChild(li);
    });
}

/**
 * Resets the available champions by adding all champions from the master list
 * to the `champArrayAvailable`, effectively making them unavailable for the randomizer
 * unless individually re-enabled.
 */
function  resetAvailableChampions() {
    champArrayAvailable = [...champArray]; // Mark all champions as "closed".
    saveSession();
    displayChampions();
}

/**
 * Clears the list of unavailable champions (`champArrayAvailable`),
 * making all champions available for the randomizer.
 */
function clearAvailableChampions(){
    champArrayAvailable = []; // No champions are "closed".
    saveSession();
    displayChampions();
}