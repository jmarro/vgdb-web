import { Platform } from "./platform.model";

export interface PlatformModel {
    id?: number;
    name: string;
    main_img?: string;
    release_date: Date;
    family?: Platform;
    comments?: string;
    platform_family_id: number;
};