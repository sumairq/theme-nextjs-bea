import { Menu } from '@headlessui/react';
import { Category } from '@prezly/sdk/dist/types';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import CategoryLink from './CategoryLink';

import styles from './Category.module.scss';

type Props = {
    category: Category;
};

const CategoryComponent: FunctionComponent<Props> = ({ category }) => {
    // Use first available locale with a slug
    // Change this for multilang support
    const locales = Object.keys(category.i18n);
    const locale = locales.find((localeCode) => !!category.i18n[localeCode].slug) || locales[0];

    return (
        <Menu.Item as="li" className={styles.category} key={category.id}>
            {({ active }) => (
                <CategoryLink
                    href={`/category/${category.i18n[locale].slug}`}
                    className={classNames(styles.link, {
                        [styles.active]: active,
                    })}
                >
                    <span className={styles.title}>{category.display_name}</span>
                    {category.display_description && (
                        <span className={styles.description}>{category.display_description}</span>
                    )}
                </CategoryLink>
            )}
        </Menu.Item>
    );
};

export default CategoryComponent;
