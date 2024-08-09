import { GameRelation } from "../enums/game-relation.enum";

export interface Game_Game {
    parentGameId: number;
    subGameId: number;
    type: GameRelation;
};