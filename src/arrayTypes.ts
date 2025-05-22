/**
 * Represents a player in the application.
 * Contains details about the player's name, assigned champion, lane, class,
 * items, and selected difficulty level.
 */
export interface Player {
    /** The unique index of the player slot (0-9). */
    index: number;
    /** The display name of the player. */
    name: string;
    /** The champion assigned to the player. */
    champion: Champion;
    /** The lane assigned to the player. */
    lane: Lane;
    /**
     * The class assigned to the player.
     * This can be undefined if no class is specifically assigned or relevant.
     */
    class?: Class;
    /** An array of items assigned to the player. */
    items: Item[];
    /** The difficulty setting chosen for this player (0-3). */
    difficulty: number;
}

/**
 * Represents a game item.
 * Includes its ID, name, path to its icon, and associated categories.
 */
export type Item = {
    /** The unique identifier of the item, if available. */
    id?: number;
    /** The display name of the item. */
    name: string;
    /** The URL path to the item's icon, if available. */
    iconPath?: string;
    /** An array of strings representing the categories the item belongs to (e.g., "Damage", "Health"). */
    categories?: string[];
};

/**
 * Represents a champion class or role (e.g., Fighter, Mage).
 * Includes its name, path to its icon, and a numeric type identifier.
 * The numeric type is used internally for classification logic.
 * - 1: fighter
 * - 2: mage
 * - 3: enchanter
 * - 4: tank
 * - 5: marksman
 * - 6: assassin
 */
export type Class = {
    /** The display name of the class. */
    name: string;
    /** The URL path to the class's icon, if available. */
    iconPath?: string;
    /** A numeric identifier for the class type. */
    type: number;
};

/**
 * Represents a game lane (e.g., Toplane, Jungle).
 * Includes its name and path to its icon.
 */
export type Lane = {
    /** The display name of the lane. */
    name: string;
    /** The URL path to the lane's icon, if available. */
    iconPath?: string;
};

/**
 * Represents a game champion.
 * Includes its ID, name, path to its icon, and an array of roles the champion can fulfill.
 */
export type Champion = {
    /** The unique identifier of the champion, if available. */
    id?: number;
    /** The display name of the champion. */
    name: string;
    /** The URL path to the champion's icon. */
    iconPath: string;
    /** An array of strings representing the primary roles of the champion (e.g., "fighter", "mage"). */
    roles: string[];
};