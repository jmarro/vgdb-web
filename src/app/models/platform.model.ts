import { Company } from "./company.model";
import { PlatformModel } from "./platformModel.model";

export interface Platform {
    id?: number;
    name: string;
    main_img?: string;
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
    models?: PlatformModel[];
};