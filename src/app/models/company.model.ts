import { Franchise } from "./franchise.model";
import { Platform } from "./platform.model";

export interface Company {
    id?: number;
    name: string;
    country: string;
    main_img?: string;
    color?: string;
    founding_year: number;
    active?: boolean;
    defunct_year?: number;
    defunct_reason?: string;
    ownerId?: number;
    parent_company?: Company;
    platforms?: Platform[];
    previous_names?: string;
    franchises?: Franchise[];
};