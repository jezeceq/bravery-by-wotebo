import {saveSession} from "../main.ts";
import {renderPlayers, users} from "../players.ts";

const modalContainer = document.querySelector<HTMLDivElement>('#change_name_block');

// Dynamically injects the HTML for the name change modal into the modalContainer.
// This ensures the modal structure is present in the DOM.
if (!modalContainer) {
    console.error("#change_name_block container not found in your HTML! Make sure it exists.");
} else {
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
}

const modal = document.getElementById("nameChangeModal") as HTMLDivElement;
const input = document.getElementById("nameInput") as HTMLInputElement;
const saveButton = document.getElementById("saveName") as HTMLButtonElement;
const closeButton = document.querySelector(".close-modal") as HTMLSpanElement;
const cancelButton = document.getElementById("cancel-modal") as HTMLButtonElement;

input.addEventListener('input', () => {
    input.classList.remove('input-error'); // Clear error styling on input.
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
    if (event.target === modal) { // If click is outside modal content.
        input.classList.remove('input-error');
        modal.style.display = "none";
    }
});


/**
 * Opens the player name change modal.
 * It pre-fills the input with the player's current name and sets up the save functionality
 * with proper validation for the new name.
 * @param {HTMLUListElement} playerList - The UL element for re-rendering player cards after name change.
 * @param {number} index - The index of the player whose name is to be changed.
 * @param {string} currentName - The current name of the player.
 */
export function openNameChangeModal(playerList: HTMLUListElement, index: number, currentName: string) {

    input.value = currentName; // Pre-fill input with current name.
    input.classList.remove('input-error'); // Reset any previous error styling.
    modal.style.display = "block"; // Show the modal.
    input.focus(); // Focus on the name input field.

    // Clone and replace the save button. This is a common technique to remove any
    // previously attached event listeners and ensure a fresh listener for the current context (player index).
    const newSaveButton = saveButton.cloneNode(true) as HTMLButtonElement;
    saveButton.parentNode!.replaceChild(newSaveButton, saveButton);
    (window as any).saveButton = newSaveButton; // Update global reference if used elsewhere (likely not critical here).

    newSaveButton.addEventListener("click", () => {
        input.classList.remove('input-error'); // Reset error styling.

        const newNameRaw = input.value;
        const newNameTrimmed = newNameRaw.trim();

        // Validation: Name cannot be empty.
        if (newNameTrimmed === "") {
            input.classList.add('input-error');
            input.focus();
            return;
        }

        // Validation: Name length (max 12 characters).
        if (newNameRaw.length > 12) {
            input.classList.add('input-error');
            input.focus();
            return;
        }

        // Validation: Name characters (allows spaces, letters from various scripts, and numbers).
        const nameValidationRegex = /^[ \p{L}\p{N}]+$/u;
        if (!nameValidationRegex.test(newNameTrimmed)) {
            input.classList.add('input-error');
            input.focus();
            return;
        }

        // If all validations pass, update the player's name.
        updatePlayerName(playerList, index, newNameTrimmed);
        modal.style.display = "none"; // Close the modal.
    });
}


/**
 * Updates the name of a player in the global `users` array.
 * After updating, it saves the session and re-renders the player list.
 * @param {HTMLUListElement} playerList - The UL element for re-rendering player cards.
 * @param {number} index - The index of the player whose name is to be updated.
 * @param {string} newName - The new name for the player.
 */
function updatePlayerName(playerList: HTMLUListElement, index: number, newName: string) {
    const existingPlayer = users.find(player => player.index === index);
    if (existingPlayer){
        existingPlayer.name = newName;
    } else {
        console.warn(`Player with index ${index} not found`);
    }
    saveSession(); // Persist the change.
    renderPlayers(playerList); // Update the UI.
}