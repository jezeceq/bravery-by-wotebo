import {saveSession} from "../main.ts";
import {renderPlayers, users} from "../players.ts";

const modalContainer = document.querySelector<HTMLDivElement>('#change_name_block');

if (!modalContainer) {
    console.error("#change_name_block container not found in your HTML! Make sure it exists.");
}

modalContainer.innerHTML = `
    <div id="nameChangeModal" class="modal" style="display: none;">
        <div class="modal-content">
            <span class="close-modal">×</span>
            <h2>Change Player Name</h2>
            <input type="text" id="nameInput" placeholder="New Name (max 12 char.)">
            <div class="modal-buttons">
                <button id="saveName">Save</button>
                <button id="cancel-modal">Cancel</button>
            </div>
        </div>
    </div>
`;

const modal = document.getElementById("nameChangeModal") as HTMLDivElement;
const input = document.getElementById("nameInput") as HTMLInputElement;
const saveButton = document.getElementById("saveName") as HTMLButtonElement;
const closeButton = document.querySelector(".close-modal") as HTMLSpanElement;
const cancelButton = document.getElementById("cancel-modal") as HTMLButtonElement;

input.addEventListener('input', () => {
    input.classList.remove('input-error');
});
closeButton.addEventListener("click", () => {
    input.classList.remove('input-error'); // Clear error on close
    modal.style.display = "none";
});

cancelButton.addEventListener("click", () => {
    input.classList.remove('input-error'); // Clear error on cancel
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        input.classList.remove('input-error');
        modal.style.display = "none";
    }
});


export function openNameChangeModal(playerList: HTMLUListElement, index: number, currentName: string) {

    input.value = currentName;
    input.classList.remove('input-error');
    modal.style.display = "block";
    input.focus();

    const newSaveButton = saveButton.cloneNode(true) as HTMLButtonElement;
    saveButton.parentNode!.replaceChild(newSaveButton, saveButton);
    (window as any).saveButton = newSaveButton;

    newSaveButton.addEventListener("click", () => {
        input.classList.remove('input-error');

        const newNameRaw = input.value;
        const newNameTrimmed = newNameRaw.trim();

        if (newNameTrimmed === "") {
            input.classList.add('input-error');
            input.focus();
            return;
        }

        if (newNameRaw.length > 12) {
            input.classList.add('input-error');
            input.focus();
            return;
        }

        const nameValidationRegex = /^[ \p{L}\p{N}]+$/u;
        if (!nameValidationRegex.test(newNameTrimmed)) {
            input.classList.add('input-error');
            input.focus();
            return;
        }

        updatePlayerName(playerList, index, newNameTrimmed);
        modal.style.display = "none";
    });
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