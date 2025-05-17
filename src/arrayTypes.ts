export interface Player {
    index: number;
    name: string;
    champion: Champion;
    lane: Lane;
    class?: Class;
    items: Item[];
    difficulty: number;
}

export type Item = {
    id?: number;
    name: string;
    iconPath?: string;
    categories?: string[];
};

export type Class = {
    name: string;
    iconPath?: string;
    type: number;
    //1 - fighter
    //2 - mage
    //3 - enchanter
    //4 - tank
    //5 - marksman
    //6 - assassin
};

export type Lane = {
    name: string;
    iconPath?: string;
};

export type Champion = {
    id?: number;
    name: string;
    iconPath: string;
    roles: string[];
};