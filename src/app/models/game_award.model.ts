import { AwardResult } from "../enums/award-result.enum";

export interface Game_Award {
    AwardCategoryId: number;
    GameId: number;
    year: number;
    result: AwardResult;
};