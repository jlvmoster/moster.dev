import clsx from 'clsx';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';

import { getCurrentBlogPosts } from '../lib/api';
import { getEstimatedReadingTime } from '../lib/utils';
import Layout from '@/components/layout';
import SEO from '@/components/seo';
import BlogCard from '@/components/blog-card';

const Blog = ({ router, posts, preview }) => (
  <>
    <SEO title='Blog' pathname={router.pathname} />
    <Layout pathname={router.pathname} preview={preview}>
      <div className='max-w-3xl mx-auto sm:max-w-5xl lg:max-w-7xl'>
        <section className='py-16 px-3 sm:py-24 sm:px-6'>
          <div className='px-3 text-center'>
            <h1 className='text-4xl sm:text-5xl text-gray-900 dark:text-white font-semibold tracking-wider leading-tight'>
              Welcome to my blog!
            </h1>
          </div>
        </section>
        <section className='mx-auto px-6 grid gap-6 sm:grid-cols-2 sm:max-w-5xl'>
          {posts.map(post => (
            <BlogCard key={post.fields.slug} post={post} />
          ))}
        </section>
        <section className='mt-16 py-16 px-3 sm:py-24 sm:px-6'>
          <div className='px-3 text-center'>
            <Link href='/archive'>
              <a
                className={clsx(
                  'px-6 py-3 inline-flex items-center rounded-md border border-transparent',
                  'bg-blue-500 text-base font-medium text-white hover:bg-blue-600',
                  'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
                )}
              >
                <ArchiveBoxIcon className='-ml-1 mr-3 h-5 w-5' aria-hidden='true' />
                Archived Posts
              </a>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  </>
);

export default withRouter(Blog);

export const getStaticProps = async ({ preview = false }) => {
  const posts = (await getCurrentBlogPosts(preview)) ?? [];
  const enrichedPosts = posts.map(post => {
    post['readingTime'] = getEstimatedReadingTime(post);
    return post;
  });
  return {
    props: { posts: enrichedPosts, preview },
  };
};
