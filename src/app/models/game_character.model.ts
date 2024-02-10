import { CharacterRole } from "../enums/character-role.enum";

export interface Game_Character {
    CharacterId: number;
    GameId: number;
    is_main_for_character?: boolean;
    type: CharacterRole;
};