import { CharacterRole } from "../enums/character-role.enum";
import { Franchise } from "./franchise.model";
import { Game } from "./game.model";
import { Game_Character } from "./game_character.model";
import { Person } from "./person.model";

export interface Character {
    id?: number;
    name: string;
    full_name?: string;
    alias?: string;
    alt_names?: string;
    color?: string;
    creation_year?: number;
    wikipedia?: string;
    franchise?: Franchise;
    franchise_id: number;
    role_in_franchise: CharacterRole;
    main_img?: string;
    bio?: string;
    creators?: Person[];
    Game_Character?: Game_Character;
    games?: Game[];
    is_main?: boolean;
};
