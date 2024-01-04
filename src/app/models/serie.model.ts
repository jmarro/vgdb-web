import { Franchise } from "./franchise.model";

export interface Serie {
    id?: number;
    name: string;
    is_main?: boolean;
    franchise?: Franchise;
    franchise_id: number;
};