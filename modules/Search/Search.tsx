/* eslint-disable @typescript-eslint/no-use-before-define */

'use client';

import type { Locale } from '@prezly/theme-kit-intl';
import algoliasearch from 'algoliasearch';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Configure, InstantSearch } from 'react-instantsearch-dom';

import type { AlgoliaSettings } from '@/theme-kit';

import AlgoliaStateContextProvider from './components/AlgoliaStateContext';
import { Results } from './components/Results';
import { SearchBar } from './components/SearchBar';
import { Subtitle } from './components/Subtitle';
import { Title } from './components/Title';
import type { SearchState } from './types';
import { createUrl, queryToSearchState, searchStateToQuery } from './utils';

const DEBOUNCE_TIME_MS = 300;

interface Props {
    localeCode: Locale.Code;
    algoliaSettings: AlgoliaSettings;
}

export function Search({ localeCode, algoliaSettings }: Props) {
    const query = useSearchParams();
    const { push } = useRouter();
    const [searchState, setSearchState] = useState<SearchState>(queryToSearchState(query));

    const { appId, apiKey, index } = algoliaSettings;

    const searchClient = useMemo(() => algoliasearch(appId, apiKey), [appId, apiKey]);

    const scheduleUrlUpdate = useDebounce(DEBOUNCE_TIME_MS, (updatedSearchState: SearchState) => {
        if (typeof window === 'undefined') {
            return;
        }

        push(`?${searchStateToQuery(updatedSearchState)}`);
    });

    function onSearchStateChange(updatedSearchState: SearchState) {
        setSearchState(updatedSearchState);
        scheduleUrlUpdate(searchState);
    }

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={index}
            searchState={searchState}
            onSearchStateChange={onSearchStateChange}
            createURL={createUrl}
        >
            <Configure hitsPerPage={6} filters={`attributes.culture.code:${localeCode}`} />
            <AlgoliaStateContextProvider>
                <Title />
                <SearchBar />
                <Subtitle />
                <Results />
            </AlgoliaStateContextProvider>
        </InstantSearch>
    );
}

function useDebounce<T extends (...params: never[]) => void>(milliseconds: number, fn: T) {
    const fnRef = useRef<T>(fn);

    // TODO: This can potentially lead to bus in future React versions [DEV-11206]
    // @see https://github.com/facebook/react/issues/16956#issuecomment-536636418
    fnRef.current = fn;

    const timer = useRef<number>();

    return useCallback<T>(
        ((...params) => {
            clearTimeout(timer.current);
            setTimeout(() => fnRef.current(...params), milliseconds);
        }) as T,
        [fnRef, timer, milliseconds],
    );
}
