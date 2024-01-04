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
    ownerId?: number;
    company?: Company;
    franchises_parents?: Franchise[];
    subfranchises?: Franchise[];
    parent_id?: number;
    creators?: Person[];
    characters?: Character[];
    series?: Serie[];
};