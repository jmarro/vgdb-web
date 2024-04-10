import { PlatformType } from "../enums/platform-type.enum";
import { Company } from "./company.model";
import { Game } from "./game.model";
import { PlatformModel } from "./platformModel.model";

export interface Platform {
    id?: number;
    name: string;
    main_img?: string;
    mini_logo?: string;
    img?: string;
    color?: string;
    release_date: Date;
    wikipedia?: string;
    gen?: number;
    specs?: string;
    type?: PlatformType;
    manufacturerId?: number;
    manufacturer?: Company;
    alt_names?: string;
    models?: PlatformModel[];
    games?: Game[];
};