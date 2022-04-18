import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import styles from "../styles/rules.module.css";
import { useWindowSize } from "../libs/windowSize";

export default function Home(props) {
  const size = useWindowSize();
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Menu loggedIn={true} desktop={size.width > 1024} />
        <div className={styles.wrapper}>
          <h2>Rules</h2>
          <ul>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet,
              totam?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet,
              totam?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet,
              totam?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet,
              totam?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet,
              totam?
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
