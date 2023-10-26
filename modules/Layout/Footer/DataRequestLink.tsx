import { getDataRequestLink } from '@prezly/theme-kit-core';
import { translations } from '@prezly/theme-kit-intl';
import { useCurrentLocale, useNewsroom } from '@prezly/theme-kit-nextjs';

import { FormattedMessage } from '@/theme-kit';

interface Props {
    className?: string;
}

export function DataRequestLink({ className }: Props) {
    const newsroom = useNewsroom();
    const currentLocale = useCurrentLocale();

    const href = getDataRequestLink(newsroom, currentLocale);

    return (
        <a href={href} className={className}>
            <FormattedMessage for={translations.actions.privacyRequests} />
        </a>
    );
}
