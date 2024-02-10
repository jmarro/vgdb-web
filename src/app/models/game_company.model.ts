import { CompanyType } from "../enums/company-type.enum";

export interface Game_Company {
    CompanyId: number;
    GameId: number;
    country?: string;
    is_main_for_company?: boolean;
    type: CompanyType;
};