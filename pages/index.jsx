import styles from "../styles/Home.module.css";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { useWindowSize } from "../libs/windowSize";
import React from "react";

export default function Home(props) {
  const size = useWindowSize();

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Menu loggedIn={props.authenticated} desktop={size.width > 1024} />
        <div className={styles.wrapper}>
          {!props.authenticated ? <UnAuthenticated /> : <Authenticated />}
        </div>
      </main>
    </>
  );
}

function UnAuthenticated() {
  return (
    <>
      <RoundBox link="/signin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
          />
          <path
            fillRule="evenodd"
            d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
          />
        </svg>
        Sign In
      </RoundBox>
      <RoundBox link="/signup">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
          <path
            fillRule="evenodd"
            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
          />
        </svg>
        Sign Up
      </RoundBox>
    </>
  );
}

function Authenticated() {
  return (
    <>
      <RoundBox link="/game">
        <div className={styles.authenticatedHome}>
          <p>Play</p>
          <span>Level10</span>
        </div>
      </RoundBox>
    </>
  );
}

function RoundBox(props) {
  return (
    <Link href={props.link}>
      <div className={styles.roundBox}>{props.children}</div>
    </Link>
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
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
}
