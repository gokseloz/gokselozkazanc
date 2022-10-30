import Image from "next/image";
import React from "react";
import { IPostHeader } from "../../../types/posts";
import styles from "./PostHeader.module.css";

const PostHeader = (props: IPostHeader) => {
  const { title, image } = props;
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
};

export default PostHeader;
