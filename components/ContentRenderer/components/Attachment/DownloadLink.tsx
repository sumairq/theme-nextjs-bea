import { translations } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';

import { FormattedMessage } from '@/adapters/client';
import { IconDownload } from '@/icons';

import styles from './DownloadLink.module.scss';

interface Props {
    className: string;
}

export function DownloadLink({ className }: Props) {
    return (
        <div className={classNames(styles.link, className)}>
            <FormattedMessage for={translations.actions.download} />
            <IconDownload width={16} height={16} className={styles.icon} />
        </div>
    );
}
