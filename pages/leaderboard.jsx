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
          <h2>LeaderBoard</h2>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  let result;
  try {
    result = jwt.verify(ctx.req.cookies.jwt, process.env.SECRET_KEY);
    return {
      props: {
        authenticated: true,
        email: result.email,
        response: res,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
}
