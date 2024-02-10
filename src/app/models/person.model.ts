import { Character } from "./character.model";
import { Franchise } from "./franchise.model";
import { Game } from "./game.model";

export interface Person {
    id?: number;
    name: string;
    main_img?: string;
    birthday?: Date;
    nationality?: string;
    franchises?: Franchise[];
    characters?: Character[];
    games?: Game[];
};