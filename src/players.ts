import {getRandomEntry} from "./randomizers.ts";
import {callSingleRandomize, getItemArrayType, saveSession, setClosedArrays, getClosedArrays} from "./main.ts";
import {Champion, Lane, Item, Player, Class} from "./arrayTypes.ts";
import {playerBox} from "./HTMLsource/playerCardHTML.ts";


export const users: Player[] = [];
let singleUser: number;
const maxPlayers = 10;

export function createPlayer(userList: HTMLUListElement, index: number) {
    if (users.length >= maxPlayers) {
        alert("The maximum number of players is 10.");
        return;
    }
    const name = `Player ${index + 1}`;
    if (name) {
        const newPlayer: Player = {
            index: index,
            name: name,
            champion: {
                name: "None",
                id: -1,
                iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png",
            } as Champion,
            lane: {
                name: "Fill",
                iconPath: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-banner-primary-fill.png"
            } as Lane,
            items: [],
            difficulty: 1
        };
        users.push(newPlayer);
        saveSession();
        renderPlayers(userList);
    }
}

export function renderPlayers(playerList: HTMLUListElement) {
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

    document.querySelectorAll<HTMLDivElement>('.rowPC').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index')!);
            createPlayer(playerList, index);
        });
    });

    document.querySelectorAll('#delete-player').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index')!);
            deletePlayer(playerList, index);
        });
    });

    document.querySelectorAll('#reroll-single').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index')!);
            rerollPlayer(playerList, index);
        })
    })

    document.querySelectorAll('#change-name').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index')!);
            openNameChangeModal(playerList, index);
        });
    });


    document.querySelectorAll('.card-slider').forEach(slider => {
        slider.addEventListener('input', () => {
            const index = parseInt(slider.getAttribute('data-index')!);
            const value = parseInt((slider as HTMLInputElement).value);
            changeDifficulty(index, value);
        })
    })
}

function getRowHTML(index: number): string {
    const existingPlayer = users.find(player => player.index === index);
    return existingPlayer
        ? `<div class="box-wrapper" > ${playerBox(existingPlayer, index)} </div>`
        : `<div class="box-wrapper">
                <li class="rowPC" data-index="${index}">+</li>
            </div>
        `;
}

function deletePlayer(playerList: HTMLUListElement, index: number) {
    const indexTemp = users.findIndex(player => player.index === index);
    if (indexTemp !== -1) {
        const arrays = getClosedArrays()
        let lanes1 = [...arrays[0]];
        let lanes2 = [...arrays[1]];
        const user = users[indexTemp];
        if(user.lane.name != "Fill"){
            if(indexTemp < 5){
                lanes1.push(user.lane)
            } else {
                lanes2.push(user.lane)
            }
        }
        users.splice(indexTemp, 1);
        setClosedArrays([...arrays[2]], lanes1, lanes2);
        saveSession();
    }
    renderPlayers(playerList);
}

function rerollPlayer(playerList: HTMLUListElement, index: number) {
    const foundUser= users.find(player => player.index === index);
    if (foundUser){
        singleUser = foundUser.index;
    } else {
        console.warn(`Player with index ${index} not found`)
    }
    callSingleRandomize(playerList);
}

function getVisibleName(index: number) {
    const nameElement = document.querySelector(`.visible-name[data-index="${index}"]`);
    if (!nameElement) return null;
    if (nameElement instanceof HTMLInputElement) return nameElement.value;
}

function changeDifficulty(index:number, value:number){
    const existingPlayer = users.find(player => player.index === index);
    if (existingPlayer){
        existingPlayer.difficulty = value;
    } else {
        console.warn(`Player with index ${index} not found`)
    }
    saveSession();
}

function updatePlayerName(playerList: HTMLUListElement, index: number, newName: string) {
    const existingPlayer = users.find(player => player.index === index);
    if (existingPlayer){
        existingPlayer.name = newName;
    } else {
        console.warn(`Player with index ${index} not found`)
    }
    saveSession();
    renderPlayers(playerList);
}

function openNameChangeModal(playerList: HTMLUListElement, index: number) {
    const modal = document.getElementById("nameChangeModal") as HTMLDivElement;
    const input = document.getElementById("nameInput") as HTMLInputElement;
    const saveButton = document.getElementById("saveName") as HTMLButtonElement;
    const closeButton = document.querySelector(".close") as HTMLSpanElement;

    modal.style.display = "block";

    const newSaveButton = saveButton.cloneNode(true) as HTMLButtonElement;
    saveButton.replaceWith(newSaveButton);

    newSaveButton.addEventListener("click", () => {
        const newName = input.value.trim();
        if (newName !== "") {
            updatePlayerName(playerList, index, newName);
            console.log("here")
            modal.style.display = "none";
        }
    });


    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Ensure clicking outside the modal closes it
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}






export function randomize(userList: HTMLUListElement, champArray: any[], laneArrayTeam1: any[], laneArrayTeam2: any[], classesArray: any[], all: boolean) {
    // Create clones of the original arrays
    let cA = [...champArray];
    let lA1 = [...laneArrayTeam1];
    let lA2 = [...laneArrayTeam2];
    //Clones of item and classes array are not needed since we don't remove chosen entries
    let classType: number | undefined;
    let difficulty: number;
    let tempItem: Item[];
    let breakCycle: boolean = false;

    users.forEach(player => {
        let name = getVisibleName(player.index);
        if (name){
            player.name = name;
        }

        if(cA.length < 1 && !breakCycle){
            alert("Not enough champions in pool!");
            breakCycle = true;
        } else if (cA.length > 0 && breakCycle){
            breakCycle = false;
        }
        if(breakCycle){
            return;
        }

        if(!all){
            if(player.index != singleUser){
                return;
            } else {
                if(player.lane.name != "Fill"){
                    if (player.index < 5) lA1.push(player.lane);
                    else lA2.push(player.lane);
                }
            }
        }
        difficulty = player.difficulty;

        //find random champion
        let champion = getRandomEntry(cA);
        player.champion = champion;
        cA = cA.filter(entry => entry !== champion);

        //find random lane depending on lanes taken in team
        if (player.index < 5){
            let lane = getRandomEntry(lA1);
            player.lane = lane;
            lA1 = lA1.filter(entry => entry !== lane);
        }
        else {
            let lane = getRandomEntry(lA2);
            player.lane = lane;
            lA2 = lA2.filter(entry => entry !== lane);
        }

        //find random class or set class for difficulty = 0 = Easy
        if(difficulty === 0 || difficulty === 1){
            console.info("Roles => " + player.champion.roles + " , Champion => " + player.champion.name)
            let classesTemp: Class[] = classesArray.filter(cls =>
                player.champion.roles.includes(cls.name)
            );
            if (classesTemp.some(cls => cls.type === 2) && !classesTemp.some(cls => cls.type === 3)){
                classesTemp.filter(cls => cls.type === 2);
            }
            player.class = getRandomEntry(classesTemp.length > 0 ? classesTemp : classesArray);
        } else {
            player.class = getRandomEntry(classesArray);
        }
        classType = player.class?.type;

        //find random items depending on champion class
        player.items = [];
        if (classType != null) {
            tempItem = [...getItemArrayType(classType)];
            let item: Item;

            switch (difficulty){
                case 0:
                    player.items?.push(getRandomEntry(tempItem));
                    break;
                case 1:
                case 2:
                    item = getRandomEntry(tempItem);
                    player.items?.push(item);
                    tempItem = tempItem.filter(entry => entry !== item);
                    player.items?.push(getRandomEntry(tempItem));
                    break;
                case 3:
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

    setClosedArrays(cA, lA1, lA2);
    saveSession();
    renderPlayers(userList);
}

export function deleteAll(userList: HTMLUListElement){
        const arrays = getClosedArrays()
        let lanes1 = [...arrays[0]];
        let lanes2 = [...arrays[1]];
        let champions = [...arrays[2]];

        users.forEach(user => {
            if(user.lane.name != "Fill"){
                if(user.index < 5){
                    lanes1.push(user.lane)
                } else {
                    lanes2.push(user.lane)
                }
            }
        })
        users.length = 0;
        setClosedArrays(champions, lanes1, lanes2);
        saveSession();
        renderPlayers(userList);
}


