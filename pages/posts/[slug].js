import React from 'react';
import PostContent from '../../components/posts/post_detail/post_content';
import { getPostData, getPostFiles } from '../../lib/posts_util';

const PostDetailPage = ({ post }) => {
  return <PostContent post={post} />;
};

export default PostDetailPage;

export const getStaticProps = (context) => {
  const { slug } = context.params;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = () => {
  const postFileNames = getPostFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};
