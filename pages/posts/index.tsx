import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../lib/posts-util";
import { IPostItem } from "../../types/posts";

const AllPostsPage: NextPage<{ posts: IPostItem[] }> = (props) => {
  return (
    <>
      <Head>
        <title>All posts</title>
        <meta name="description" content="A list of all posts" />
      </Head>
      <AllPosts posts={props.posts} />;
    </>
  );
};

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
