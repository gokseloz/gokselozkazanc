import Head from "next/head";
import React from "react";
import PostContent from "../../components/posts/post-detail/PostContent";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import { IPostItem } from "../../types/posts";

const PostDetailPage = (props: { post: IPostItem }) => {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />;
    </>
  );
};

export function getStaticPaths() {
  const postFileNames = getPostsFiles();

  const slugs = postFileNames.map((filename) => filename.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export function getStaticProps(context: { params: any }) {
  const slug = context.params.slug;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export default PostDetailPage;
