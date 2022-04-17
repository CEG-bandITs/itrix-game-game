import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import styles from "../styles/SignInAndUp.module.css";
import Link from "next/link";
import jsCookie from "js-cookie";

export default function Home(props) {
  const size = useWindowSize();
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formProps),
    });
    const res = await response.json();
    if (res.token == undefined) {
      console.log("Invalid Email Or Pasword");
    } else {
      jsCookie.set("jwt", res.token);
      console.log(res.token);
    }
  }
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Menu loggedIn={true} desktop={size.width > 1024} />
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <form onSubmit={(e) => onSubmit(e)} method={"POST"}>
              <h1>Sign In</h1>
              <Email />
              <Password placeHolder="Password" />
              <input type="submit" value="Sign In"></input>
            </form>
            <div className={styles.Already}>
              <span>Don{"'"}t have an account?</span>
              <Link href="/signup">
                <button>Sign up</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Email() {
  const [hint, setHint] = useState(false);
  const validateEmail = (e) => {
    if (
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      )
    ) {
      e.target.style.border = "0.1rem solid green";
      setHint(false);
    } else {
      e.target.style.border = "0.1rem solid red";
      setHint(true);
    }
    if (e.target.value == "") {
      setHint(false);
      e.target.style.border = "";
    }
  };

  return (
    <>
      <input
        type="email"
        placeholder="Email"
        name="email"
        autoComplete="on"
        onChange={(e) => validateEmail(e)}
      ></input>
      <span style={{ display: hint ? "" : "none" }}> Invalid Email </span>
    </>
  );
}

function Password(props) {
  const [hint, setHint] = useState(false);
  const validatePassword = (e) => {
    if (e.target.value.length >= 8) {
      e.target.style.border = "0.1rem solid green";
      setHint(false);
    } else {
      e.target.style.border = "0.1rem solid red";
      setHint(true);
    }
    if (e.target.value == "") {
      setHint(false);
      e.target.style.border = "";
    }
  };

  return (
    <>
      <input
        type="password"
        placeholder={props.placeHolder}
        name="password"
        autoComplete="on"
        onChange={(e) => validatePassword(e)}
      ></input>
      <span style={{ display: hint ? "" : "none" }}>
        {" "}
        Minimum 8 Characters{" "}
      </span>
    </>
  );
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
