import { CompanyOwnerRelation } from "../enums/company-owner-relation.enum";
import { Franchise } from "./franchise.model";
import { Game } from "./game.model";
import { Game_Company } from "./game_company.model";
import { Platform } from "./platform.model";
import { Person } from "./person.model";

export interface Company {
    id?: number;
    name: string;
    country: string;
    main_img?: string;
    color?: string;
    founding_year: number;
    active?: boolean;
    wikipedia?: string;
    defunct_year?: number;
    defunct_reason?: string;
    owner_relation?: CompanyOwnerRelation,
    ownerId?: number;
    parent_company?: Company;
    sub_companies?: Company[];
    people?: Person[];
    platforms?: Platform[];
    previous_names?: string;
    notes?: string;
    franchises?: Franchise[];
    franchises_created?: Franchise[];
    games_developed?: Game[];
    games_published?: Game[];
    Game_Company?: Game_Company;
    is_main?: boolean;
    total_games_developed?: number;
    total_games_published?: number;
};
