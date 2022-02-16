import type { Newsroom, NewsroomThemePreset } from '@prezly/sdk';
import { getNewsroomFaviconUrl } from '@prezly/theme-kit-nextjs';
import Head from 'next/head';

import { getCssVariables, getGoogleFontName, getHeaderBackgroundColor } from './utils';

interface Props {
    newsroom: Newsroom;
    themePreset: NewsroomThemePreset | null;
}

function Branding({ newsroom, themePreset }: Props) {
    const variables = getCssVariables(themePreset);
    const googleFontName = getGoogleFontName(themePreset?.settings?.font);
    const faviconUrl = getNewsroomFaviconUrl(newsroom, 180);

    const headerBackgroundColor = getHeaderBackgroundColor(themePreset);

    return (
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
                href={`https://fonts.googleapis.com/css2?family=${googleFontName}:wght@400;500;600&display=swap`}
                rel="stylesheet"
            />
            {variables.length > 0 && (
                <style
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: `:root {${variables.map((variable) => variable).join(';')}}`,
                    }}
                />
            )}
            {faviconUrl && (
                <>
                    <link rel="shortcut icon" href={faviconUrl} />
                    <link rel="apple-touch-icon" href={faviconUrl} />
                    <meta name="msapplication-TileImage" content={faviconUrl} />
                    <meta name="msapplication-TileColor" content={headerBackgroundColor} />
                    <meta name="theme-color" content={headerBackgroundColor} />
                </>
            )}
        </Head>
    );
}
export default Branding;
