import AllPosts from '../../components/posts/all_posts';
import { getAllPosts } from '../../lib/posts_util';

const AllPostsPage = ({ posts }) => {
  return <AllPosts posts={posts} />;
};

export default AllPostsPage;

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
    revalidate: 3600,
  };
};
