# Bravery by wotEBO - League of Legends Team Randomizer

"Bravery by wotEBO" is a web application designed for League of Legends players who want to add an element of randomness and challenge to their games. It allows users to generate random champions, lanes, classes, and items for up to 10 players, distributed into two teams. The application offers features such as player management, champion pool customization, difficulty settings for item generation, and session persistence.

## Features

*   **Player Management:** Add up to 10 players, assign them to two teams.
*   **Randomization:**
    *   Random champion assignment for each player.
    *   Random lane (Top, Jungle, Mid, Bot, Support) assignment for each player within their team.
    *   Random class (Fighter, Mage, Tank, etc.) assignment, influenced by champion roles on lower difficulties.
    *   Random item generation based on assigned class and selected difficulty.
*   **Champion Pool Customization:**
    *   View all available champions.
    *   Enable/disable specific champions from being included in the randomization pool.
    *   Search for champions.
    *   Quickly clear or reset the champion pool to all enabled/disabled.
*   **Difficulty Settings:** Each player can have an individual difficulty setting (Easy, Medium, Hard, Insane) which affects the number and type of items generated.
*   **All-affecting Actions:**
    *   Fill all player slots.
    *   Reroll all players simultaneously.
    *   Delete all players.
*   **Individual Player Actions:**
    *   Reroll a single player.
    *   Rename a player.
    *   Delete a single player.
    *   Adjust individual player difficulty.
*   **Session Persistence:** The application state (players, champion pool, settings) is saved in the browser's localStorage, allowing users to continue where they left off.

## Technologies Used

*   **TypeScript:** For type safety and improved code maintainability.
*   **Vite:** As the build tool and development server.
*   **HTML5 & CSS3:** For structure and styling.
*   **No external UI frameworks:** Custom-built components.
*   **Data Source:** Item and champion data is fetched from [CommunityDragon Raw Data](https://raw.communitydragon.org/).

## Getting Started

### Prerequisites

*   Node.js (v16.x or later recommended)
*   npm (comes with Node.js) or yarn

### Installation & Running (Development Mode)

1.  **Clone the repository (or download the source code):**
    ```bash
    git clone <repository-url>
    cd wotebos-bravery
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    (or `yarn install` if you prefer yarn)

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

    This will open the application in your default web browser at `http://localhost:5173` (the port may vary if 5173 is in use).

    Alternatively, you can use the provided scripts:
    *   On Windows: `start.bat`
    *   On Linux/macOS: `sh start.sh`

  
### Building for Production

To create an optimized production build:

1.  **Run the build command:**
    ```bash
    npm run build
    ```
    This will generate a `dist` folder containing the static assets for deployment.

2.  **Serving the production build (example):**
    You can serve the `dist` folder using any static file server. A simple way is using `serve`:
    ```bash
    npx serve dist
    ```
