import { AwardCategory } from "./awardCategory.model";

export interface Award {
    id?: number;
    name: string;
    is_main?: boolean;
    main_img?: string;
    categories?: AwardCategory[];
};