import 'server-only';
import { createPrezlyClient } from '@prezly/sdk';

import { env } from '../env';

import { createFetch } from './cache';
import { createContentDeliveryClient } from './lib';

/**
 * TS2352: Conversion of type `FetchCache` to type `(input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>`
 * may be a mistake because neither type sufficiently overlaps with the other.
 * Type `Promise<NFCResponse>` is not comparable to type `Promise<Response>`
 * Property `formData` is missing in type `NFCResponse` but required in type `Response`.
 */

export function api() {
    const { PREZLY_ACCESS_TOKEN, PREZLY_NEWSROOM_UUID, PREZLY_API_BASEURL } = env();

    const client = createPrezlyClient({
        fetch: createFetch({ ttl: process.env.NODE_ENV === 'production' ? 10000 : Infinity }),
        accessToken: PREZLY_ACCESS_TOKEN,
        baseUrl: PREZLY_API_BASEURL,
    });

    return {
        api: client,
        contentDelivery: createContentDeliveryClient(client, PREZLY_NEWSROOM_UUID),
    };
}
