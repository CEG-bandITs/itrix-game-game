import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import styles from "../styles/Game.module.css";
import Header from "../components/Header";
import Menu from "../components/Menu";
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
            <div className={styles.QuestionBar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                onClick={() => {
                  decreasePointer();
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
              <img src={props.response.imgs[pointer]} alt="" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                onClick={() => {
                  increasePointer();
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
            </div>
            <div className={styles.AnswerBar}></div>
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

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
