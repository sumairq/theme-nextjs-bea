import Image from '@prezly/uploadcare-image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import CategoriesDropdown from '@/components/CategoriesDropdown';
import LanguagesDropdown from '@/components/LanguagesDropdown';
import { useCategories } from '@/hooks/useCategories';
import { useCompanyInformation } from '@/hooks/useCompanyInformation';
import { useNewsroom } from '@/hooks/useNewsroom';

import styles from './Header.module.scss';

const Header: FunctionComponent = () => {
    const newsroom = useNewsroom();
    const categories = useCategories();
    const companyInformation = useCompanyInformation();
    const { newsroom_logo } = newsroom || {};
    const { name } = companyInformation || {};

    return (
        <header className={styles.container}>
            <div className="container">
                <div className={styles.header}>
                    <Link href="/" passHref>
                        <a>
                            {newsroom_logo ? (
                                <Image
                                    layout="fill"
                                    objectFit="contain"
                                    imageDetails={newsroom_logo}
                                    alt={name}
                                    className={styles.logo}
                                />
                            ) : (
                                name
                            )}
                        </a>
                    </Link>

                    <div className={styles.navigation}>
                        <CategoriesDropdown categories={categories} />
                        <LanguagesDropdown />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
