import { translations } from '@prezly/theme-kit-intl';
import { useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import type { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useIntl } from 'react-intl';

import { FormattedMessage } from '@/theme-kit';
import { Button, FormInput } from '@/ui';

import styles from './SearchBar.module.scss';

interface Props extends SearchBoxProvided, SearchBoxExposed {}

const SEARCH_PAGE_URL = 'search';

function SearchBar({ currentRefinement, refine }: Props) {
    const { formatMessage } = useIntl();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const localeSlug = getLinkLocaleSlug();

    const action = localeSlug ? `/${localeSlug}/${SEARCH_PAGE_URL}` : `/${SEARCH_PAGE_URL}`;

    return (
        <form className={styles.container} method="GET" action={action}>
            <div className={styles.inputWrapper}>
                <FormInput
                    label={formatMessage(translations.search.inputLabel)}
                    type="search"
                    name="query"
                    value={currentRefinement}
                    onChange={(event) => refine(event.currentTarget.value)}
                    className={styles.input}
                    autoComplete="off"
                />
                {!currentRefinement.length && (
                    <span className={styles.inputHint}>
                        <FormattedMessage from={translations.search.inputHint} />
                    </span>
                )}
            </div>
            <Button type="submit" variation="secondary" className={styles.button}>
                <FormattedMessage from={translations.search.action} />
            </Button>
        </form>
    );
}

export default connectSearchBox(SearchBar);
