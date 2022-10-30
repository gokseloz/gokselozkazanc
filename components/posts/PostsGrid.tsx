import React from "react";
import PostItem from "./PostItem";
import styles from "./PostsGrid.module.css";
import { IPosts } from "../../types/posts";

const PostsGrid = (props: IPosts) => {
  const { posts } = props;
  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
