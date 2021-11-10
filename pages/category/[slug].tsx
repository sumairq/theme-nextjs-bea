import { Category } from '@prezly/sdk/dist/types';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';

import { NewsroomContextProvider } from '@/contexts/newsroom';
import type { StoryWithImage } from '@/modules/Stories';
import { getPrezlyApi } from '@/utils/prezly';
import { DEFAULT_PAGE_SIZE } from '@/utils/prezly/constants';
import { BasePageProps, PaginationProps } from 'types';

const CategoryHeader = dynamic(() => import('@/modules/Stories/CategoryHeader'));
const InfiniteStories = dynamic(() => import('@/modules/Stories/InfiniteStories'));
const Layout = dynamic(() => import('@/modules/Layout'));

interface Props extends BasePageProps {
    stories: StoryWithImage[];
    category: Category;
    slug: string;
    pagination: PaginationProps;
}

const IndexPage: FunctionComponent<Props> = ({
    category,
    stories,
    categories,
    slug,
    newsroom,
    companyInformation,
    languages,
    locale,
    pagination,
}) => (
    <NewsroomContextProvider
        categories={categories}
        newsroom={newsroom}
        companyInformation={companyInformation}
        languages={languages}
        locale={locale}
        selectedCategory={category}
    >
        <Layout
            title={category.display_name}
            description={category.display_description || undefined}
            url={`/category/${slug}`}
        >
            <CategoryHeader category={category} />

            <InfiniteStories initialStories={stories} pagination={pagination} category={category} />
        </Layout>
    </NewsroomContextProvider>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const api = getPrezlyApi(context.req);
    const { slug } = context.params as { slug: string };

    const category = await api.getCategoryBySlug(slug);

    if (!category) {
        return {
            notFound: true,
        };
    }

    const basePageProps = await api.getBasePageProps(context.locale);

    const page =
        context.query.page && typeof context.query.page === 'string'
            ? Number(context.query.page)
            : undefined;

    const { stories, storiesTotal } = await api.getStoriesFromCategory(category, {
        page,
        include: ['header_image'],
        locale: basePageProps.locale,
    });

    return {
        props: {
            ...basePageProps,
            // TODO: This is temporary until return types from API are figured out
            stories: stories as StoryWithImage[],
            category,
            slug,
            pagination: {
                itemsTotal: storiesTotal,
                currentPage: page ?? 1,
                pageSize: DEFAULT_PAGE_SIZE,
            },
        },
    };
};

export default IndexPage;
