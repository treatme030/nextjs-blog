import Head from 'next/head';
import { Fragment } from 'react';
import FeaturedPosts from '../components/home_page/featured_posts';
import Hero from '../components/home_page/hero';
import { getFeaturedPosts } from '../lib/posts_util';

const HomePage = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>{`Juhee'`} Blog</title>
        <meta
          name='description'
          content='I post about programming and web development'
        />
        <meta />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
};

export default HomePage;

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 3600,
  };
};
