import React from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/me.png"
          alt="An image showing Goksel"
          width={300}
          height={300}
        />
      </div>
      <h1>I am Goksel</h1>
      <p>I blog about web development - especially frontend</p>
    </section>
  );
};

export default Hero;
