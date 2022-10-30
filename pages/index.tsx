import type { NextPage } from "next";
import FeaturedPosts from "../components/homePage/FeaturedPosts";
import Hero from "../components/homePage/Hero";
import { IPostItem } from "../types/posts";
import { getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";

const HomePage: NextPage<{ posts: IPostItem[] }> = (props) => {
  return (
    <>
      <Head>
        <title>Goksels Blog</title>
        <meta
          name="description"
          content="Hi! I am Goksel, Frontend Developer. I post about programming and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
};

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;
