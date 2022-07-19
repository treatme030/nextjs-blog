import ReactMarkdown from 'react-markdown';
import classes from './post_content.module.css';
import PostHeader from './post_header';

const DUMMY_POST = {
  slug: 'getting-started-with-nextjs',
  title: 'Getting started with nextjs',
  image: 'getting-started-nextjs.png',
  excerpt:
    'NextJS is a the React framework for production - it building fullstack React apps and sites a breeze and ships with built-in SSR',
  date: '2022-02-10',
  content: '# This is a first post',
};

const PostContent = () => {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;
  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
