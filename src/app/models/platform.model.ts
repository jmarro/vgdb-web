import { Company } from "./company.model";

export interface Platform {
    id?: number;
    name: string;
    logo?: string;
    mini_logo?: string;
    img?: string;
    color?: string;
    release_date: Date;
    gen?: number;
    specs?: string;
    type?: string;
    manufacturerId?: number;
    manufacturer?: Company;
    alt_names?: string;
};