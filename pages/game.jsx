import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import styles from "../styles/Game.module.css";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { useWindowSize } from "../libs/windowSize";
import {
  MobileQuestionBar,
  DesktopAnswerBar,
  MobileAnswerBar,
  DesktopQuestionBar,
} from "../components/Game";
import configuration from "../config";

export default function Game(props) {
  const size = useWindowSize();
  const [pointer, setPointer] = useState(0);

  if (size.width < 1024) {
    function increasePointer() {
      if (pointer >= props.response.imgs.length - 1) {
        setPointer(0);
      } else {
        setPointer(pointer + 1);
      }
    }
    function decreasePointer() {
      if (pointer < 0) {
        setPointer(props.response.imgs.length - 2);
      } else {
        setPointer(pointer - 1);
      }
    }
    return (
      <>
        <Header />

        <main className={styles.main}>
          <Menu loggedIn={true} desktop={size.width > 1024} />
          <div className={styles.wrapper}>
            <MobileQuestionBar
              increasePointer={increasePointer}
              decreasePointer={decreasePointer}
              pointer={pointer}
              imgs={props.response.imgs}
            />
            <MobileAnswerBar />
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />

        <main className={styles.main}>
          <Menu loggedIn={true} desktop={size.width > 1024} />
          <div className={styles.wrapper}>
            <DesktopQuestionBar imgs={props.response.imgs} />
            <DesktopAnswerBar />
          </div>
        </main>
      </>
    );
  }
}

export async function getServerSideProps(ctx) {
  let result;
  try {
    result = jwt.verify(ctx.req.cookies.jwt, process.env.SECRET_KEY);
    const response = await fetch("http://localhost:3000/api/question", {
      headers: {
        Cookie: "jwt=" + ctx.req.cookies.jwt,
      },
    });
    const res = await response.json();
    return {
      props: {
        authenticated: true,
        email: result.email,
        response: res,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }
}
