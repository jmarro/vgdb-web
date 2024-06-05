import { Game } from "./game.model";

export interface Genre {
    id?: number;
    name: string;
    main_img?: string;
    parentId?: number;
    parent_genre?: Genre;
    sub_genre?: Genre[];
    games?: Game[];
    is_main?: boolean;
};