export enum Font {
    INTER = 'inter',
    MERRIWEATHER = 'merriweather',
    OPEN_SANS = 'open_sans',
    PT_SERIF = 'pt_serif',
    ROBOTO = 'roboto',
    SOURCE_CODE_PRO = 'source_code_pro',
}

export interface ThemeSettings {
    accent_color: string;
    font: Font;
    header_background_color: string;
    header_link_color: string;
    logo_size: string;
    show_date: boolean;
    show_subtitle: boolean;
    show_featured_categories: boolean;
}

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
    accent_color: '#3b82f6',
    font: Font.INTER,
    header_background_color: '#ffffff',
    header_link_color: '#4b5563',
    logo_size: 'medium',
    show_date: true,
    show_subtitle: false,
    show_featured_categories: true,
};

export const FONT_FAMILY = {
    [Font.INTER]: 'Inter, sans-serif',
    [Font.MERRIWEATHER]: 'Merriweather, serif',
    [Font.OPEN_SANS]: "'Open Sans', sans-serif",
    [Font.PT_SERIF]: "'PT Serif', serif",
    [Font.ROBOTO]: 'Roboto, sans-serif',
    [Font.SOURCE_CODE_PRO]: "'Source Code Pro', monospace",
};

export function getGoogleFontName(font: Font): string {
    switch (font) {
        case Font.MERRIWEATHER:
            return 'Merriweather';
        case Font.OPEN_SANS:
            return 'Open Sans';
        case Font.PT_SERIF:
            return 'PT Serif';
        case Font.ROBOTO:
            return 'Roboto';
        case Font.SOURCE_CODE_PRO:
            return 'Source Code Pro';
        default:
            return 'Inter';
    }
}
