import { translations } from '@prezly/theme-kit-nextjs';

import { ButtonLink } from '@/components/Button';
import { Error } from '@/components/Error';
import { FormattedMessage } from '@/theme/server';

import styles from './NotFound.module.scss';

export function NotFound() {
    return (
        <Error
            className={styles.error}
            action={
                <ButtonLink href={{ routeName: 'index' }} variation="primary">
                    <FormattedMessage for={translations.actions.backToHomePage} />
                </ButtonLink>
            }
            statusCode={404}
            title={<FormattedMessage for={translations.notFound.title} />}
            description={<FormattedMessage for={translations.notFound.subtitle} />}
        />
    );
}
