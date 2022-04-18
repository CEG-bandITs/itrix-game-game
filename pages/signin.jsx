import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import styles from "../styles/SignInAndUp.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import { validEmail, validPassword } from "../utils/validation";

export default function Home(props) {
  const router = useRouter();
  const size = useWindowSize();
  const [serverResonse, setserverResonse] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: "jwt=" + jsCookie.get("jwt"),
      },
      body: JSON.stringify(formProps),
    });
    const res = await response.json();
    if (res.token == undefined) {
      setserverResonse(res.msg);
    } else {
      setserverResonse("");
      jsCookie.set("jwt", res.token);
      router.push("/");
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
              <span
                style={{
                  display: serverResonse != "" ? "block" : "none",
                  color: "red",
                }}
              >
                {serverResonse}
              </span>
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
    if (validEmail(e.target.value)) {
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
        required
      ></input>
      <span style={{ display: hint ? "" : "none" }}> Invalid Email </span>
    </>
  );
}

function Password(props) {
  const [hint, setHint] = useState(false);
  const validatePassword = (e) => {
    if (validPassword(e.target.value)) {
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
        required
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
