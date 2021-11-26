export interface Site {
    name: string;
    id: string;
    link: string;
    createdAt: string;
    settings?: SiteSettings;
}

export interface SiteSettings {
    ratings: boolean;
    timestamp: boolean;
    icons: boolean;
}