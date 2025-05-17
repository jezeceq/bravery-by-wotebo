import './style.css';
import './HTMLsource/playerCards.css';
import { deleteAll, randomize, renderPlayers, users as playerUsers } from './players.ts';
import { fetchChampions, fetchItems, fetchLanes, fetchClasses } from './jsonHandling.ts';
import { itemClassification } from './randomizers.ts';
import { Champion, Class, Item, Lane, Player } from './arrayTypes.ts';
//hello

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <div>
    <div class="main-cont">
        <div class="all-effect-buttons">
            <button class="button" type="button" id="all_randomizer">Randomize all</button>
            <button class="button" type="button" id="all_delete">Delete all</button>
        </div>
        <ul id="player_list"></ul>
        <div class="test">Row 100</div>
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
const randomizeAllButton = document.querySelector<HTMLButtonElement>('#all_randomizer')!;
const deleteAllButton = document.querySelector<HTMLButtonElement>('#all_delete')!;
const clearAllChampsButton = document.querySelector<HTMLButtonElement>('#clear_champs')!;
const resetAllChampsButton = document.querySelector<HTMLButtonElement>('#reset_champs')!;
const changeNameBlock = document.querySelector<HTMLDivElement>('#change_name_block')!;
const champList = document.getElementById('champ_list')!;
const searchInput = document.getElementById('champSearch') as HTMLInputElement;

let classesArray: Class[] = [];

let lanesArrayTeam1: Lane[] = [];
let lanesArrayTeam1Closed: Lane[] = [];
let lanesArrayTeam2: Lane[] = [];
let lanesArrayTeam2Closed: Lane[] = [];

let champArray: Champion[] = [];
let champArrayClosed: Champion[] = [];

let itemArray: Item[] = [];
let fighterItems: Item[] = [];
let mageItems: Item[] = [];
let enchanterItems: Item[] = [];
let tankItems: Item[] = [];
let marksmanItems: Item[] = [];
let assassinItems: Item[] = [];

const SESSION_STORAGE_KEY = 'lolRandomizerSession_v1';

let tempHolder: Champion = {
    name: "None",
    id: -1,
    iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png",
    roles: []
};


randomizeAllButton.addEventListener('click', () => {
    randomize(playerList, champArrayClosed, lanesArrayTeam1, lanesArrayTeam2, classesArray, true);
    displayChampions();
});

deleteAllButton.addEventListener('click', () => {
    deleteAll(playerList);
});

resetAllChampsButton.addEventListener('click', () => {
    resetAvailableChampions()
})

clearAllChampsButton.addEventListener('click', () => {
    clearAvailableChampions()
})

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const champs = champList.querySelectorAll('li');

    champs.forEach(li => {
        const champName = li.querySelector('img')?.getAttribute('title')?.toLowerCase() ?? "";
        if (searchTerm && champName.includes(searchTerm)) {
            li.classList.add('highlight');
        } else {
            li.classList.remove('highlight');
        }
    });
});

changeNameBlock.innerHTML = `
    <div id="nameChangeModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Change Player Name</h2>
            <input type="text" id="nameInput" value="New Name">
            <button id="saveName">Save</button>
        </div>
    </div>
`;

export function getItemArrayType(which: number): Item[] {
    switch (which) {
        case 1: return [...fighterItems]; // Return copies to prevent mutation
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

export function setClosedArrays(champs: Champion[], lanesTeam1: Lane[], lanesTeam2: Lane[]) {
    lanesArrayTeam1Closed = [...lanesTeam1];
    lanesArrayTeam2Closed = [...lanesTeam2];
    champArrayClosed = [...champs];
}

export function callSingleRandomize(userList: HTMLUListElement) {
    randomize(userList, champArrayClosed, lanesArrayTeam1Closed, lanesArrayTeam2Closed, classesArray, false);
    displayChampions()
}

export function saveSession() {
    const sessionData = {
        users: playerUsers, // from players.ts
        champArrayClosed: champArrayClosed,
        lanesArrayTeam1Closed: lanesArrayTeam1Closed,
        lanesArrayTeam2Closed: lanesArrayTeam2Closed,
    };
    try {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
        console.log("Session saved!");
    } catch (e) {
        console.error("Error saving session to localStorage:", e);
    }
}

function loadSessionFromLocalStorage(): boolean { // Returns true if session loaded
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (savedSession) {
        try {
            const sessionData = JSON.parse(savedSession);

            if (sessionData.users && Array.isArray(sessionData.users)) {
                playerUsers.length = 0;
                sessionData.users.forEach((player: Player) => playerUsers.push(player));
            }

            if (sessionData.champArrayClosed && Array.isArray(sessionData.champArrayClosed)) {
                champArrayClosed = sessionData.champArrayClosed;
            } else {
                champArrayClosed = []; // Default if not in session
            }

            if (sessionData.lanesArrayTeam1Closed && Array.isArray(sessionData.lanesArrayTeam1Closed)) {
                lanesArrayTeam1Closed = sessionData.lanesArrayTeam1Closed;
            } else {
                lanesArrayTeam1Closed = []; // Default
            }

            if (sessionData.lanesArrayTeam2Closed && Array.isArray(sessionData.lanesArrayTeam2Closed)) {
                lanesArrayTeam2Closed = sessionData.lanesArrayTeam2Closed;
            } else {
                lanesArrayTeam2Closed = []; // Default
            }
            console.log("Session loaded!");
            return true;
        } catch (e) {
            console.error("Error parsing session data from localStorage:", e);
            localStorage.removeItem(SESSION_STORAGE_KEY);
        }
    }
    return false;
}
async function loadData() {
    try {
        const sessionLoaded = loadSessionFromLocalStorage();
        const [items, champions, lanes, classes]: [Item[], Champion[], Lane[], Class[]] = await Promise.all([
            fetchItems("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json"),
            fetchChampions("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"),
            fetchLanes(),
            fetchClasses()
        ]);

        itemArray = items;
        champArray = champions;
        champArray.sort((a, b) => a.name.localeCompare(b.name));
        lanesArrayTeam2 = lanes;
        lanesArrayTeam1 = lanes;
        classesArray = classes;

        fighterItems = itemClassification(itemArray, 1);
        mageItems = itemClassification(itemArray, 2);
        enchanterItems = itemClassification(itemArray, 3);
        tankItems = itemClassification(itemArray, 4);
        marksmanItems = itemClassification(itemArray, 5);
        assassinItems = itemClassification(itemArray, 6);

        if (!sessionLoaded) {
            setClosedArrays(champArray, lanesArrayTeam1, lanesArrayTeam2);
            saveSession();
        }

        displayChampions();

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

loadData().then(r => renderPlayers(playerList));

function displayChampions() {
    const champList = document.querySelector<HTMLUListElement>('#champ_list')!;
    champList.innerHTML = "";

    const searchTerm = searchInput?.value.toLowerCase().trim() || "";

    champArray.forEach(champ => {
        const li = document.createElement('li');
        const isHighlighted = searchTerm !== "" && champ.name.toLowerCase().includes(searchTerm);
        const isDisabled = champArrayClosed.some(champion => champion.id === champ.id);

        li.innerHTML = `
            <li class="champ-wrapper ${isHighlighted ? "highlight" : ""}">
              <img 
                src="${champ.iconPath}" 
                alt="${champ.name}" 
                title="${champ.name}" 
                class="champ-icon ${isDisabled ? "" : "disabled"}" 
                data-id="${champ.id}"
              />
            </li>
        `;

        const img = li.querySelector('img')!;
        img.addEventListener('click', () => {
            const index = champArrayClosed.findIndex(champion => champion.id === champ.id);
            if (index > -1) {
                champArrayClosed.splice(index, 1);
            } else {
                champArrayClosed.push(champ);
            }

            displayChampions();
        });

        champList.appendChild(li);
    });
}

function  resetAvailableChampions() {
    champArrayClosed = champArray;
    saveSession()
    displayChampions()
}

function clearAvailableChampions(){
    champArrayClosed = [];
    saveSession()
    displayChampions()
}


