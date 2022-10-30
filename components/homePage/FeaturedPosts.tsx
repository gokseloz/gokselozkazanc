import React from "react";
import { IPosts } from "../../types/posts";
import PostsGrid from "../posts/PostsGrid";
import styles from "./FeaturedPosts.module.css";

const FeaturedPosts = (props: IPosts) => {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
};

export default FeaturedPosts;
