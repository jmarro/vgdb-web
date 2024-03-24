import { Game } from "./game.model";

export interface Theme {
    id?: number;
    name: string;
    main_img?: string;
    parentId?: number;
    parent_theme?: Theme;
    sub_theme?: Theme[];
    games?: Game[];
};