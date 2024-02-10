export interface Theme {
    id?: number;
    name: string;
    main_img?: string;
    parentId?: number;
    parent_theme?: Theme;
};