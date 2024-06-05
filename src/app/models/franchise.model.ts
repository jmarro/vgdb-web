import { Character } from "./character.model";
import { Company } from "./company.model";
import { Person } from "./person.model";
import { Serie } from "./serie.model";

export interface Franchise {
    id?: number;
    name: string;
    main_img?: string;
    first_game_date?: Date;
    color?: string;
    wikipedia?: string;
    ownerId?: number;
    company_creator_id?: number;
    company?: Company;
    company_creator?: Company;
    franchises_parents?: Franchise[];
    subfranchises?: Franchise[];
    parent_id?: number;
    creators?: Person[];
    characters?: Character[];
    series?: Serie[];
    is_main?: boolean;
};