export interface Company {
    id?: number;
    name: string;
    country: string;
    logo?: string;
    color?: string;
    founding_year: number;
    active?: boolean;
    defunct_year?: number;
    defunct_reason?: string;
    ownerId?: number;
    parent_company?: Company;
    previous_names?: string;
};