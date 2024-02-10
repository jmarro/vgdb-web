import { Award } from "./award.model";
import { Game_Award } from "./game_award.model";

export interface AwardCategory {
    id?: number;
    name: string;
    award?: Award;
    is_main?: boolean;
    award_category_id: number;
    Game_Award?: Game_Award;
};