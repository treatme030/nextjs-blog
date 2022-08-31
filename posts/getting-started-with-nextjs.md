---
title: '<Image> 사용하여 react-markdown에 이미지 오버라이드'
date: '2022-08-16'
image: getting-started-nextjs.png
excerpt: Next.js에서는 Next.js에서 제공하는 <Image> 컴포넌트를 사용하여 이미지를 최적화 해준다.
isFeatured: true
---

Next.js에서는
Next.js에서 제공하는 <Image> 컴포넌트를 사용하여
이미지를 최적화 해준다.

react-markdown을 사용하게되면
해당 컴포넌트가 적용되지 않아
정상적으로 작동은 하지만,
원본 이미지 파일의 크기가 그대로 불러와져서
이미지의 최적화가 이루어지지 않는다.

해결방법은
기존의 이미지 부분을 <Image> 컴포넌트를 작성하여 오버라이드 하는 것이다.

먼저,
마크다운으로 작성된 이미지 부분에서
경로는 지우고 이미지 파일명만 남긴다.

```js
// 마크다운으로 작성한 파일
...

## File-based Routing

![Create routes via your file + folder structure](nextjs-routes.png) // 이미지 파일명만 작성

... More content ...
```

오버라이드 하기 위해선 react-markdown에 'components' 속성이 필요하다.

```js
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
...
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
...
```

components에 전달되는 값은 리액트 컴포넌트에 맵핑할 객체로
그 객체 안에 img로 메서드를 만들어 <Image> 컴포넌트를 react-markdown에 전달하게 된다.

​react-markdown은 이미지를 찾았을 때 기본 이미지 요소를 사용하지 않고 해당 img 메서드를 호출해서 기존 이미지를 오버라이드 하게 된다.

```js
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
...
  const customRenderers = {
    img(image){
       return (
              <Image
              src={image.src} // 이미지 경로, 예:src={`/images/posts/${post.slug}/${image.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          )
         }
      }
...
```

위와 같이 작성하면 <Image> 컴포넌트도 잘 적용되고, 잘 작동한다.

크게 문제되는 부분은 없지만,  
react-markdown은 이미지를 <p> 태그로 단락화해서
HTML에서의 시맨틱 마크업에서 벗어나게 된다.

![](next-image-ui.png)

그래서 이미지를 오버라이드 할 때

<p> 태그의 자식으로 이미지를 찾고
css를 적용한 <div> 태그로 감싼 <Image> 컴포넌트를 전달하는 
메서드를  객체로 전달한다.

```js
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
...
 const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },

};
return (

<article className={classes.content}>
<PostHeader title={post.title} image={imagePath} />
<ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
</article>
);
};

export default PostContent;

```

![](next-image-ui-after.png)

<참고>
[react-markdown](https://github.com/remarkjs/react-markdown)
