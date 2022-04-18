import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import styles from "../styles/SignInAndUp.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import { validEmail, validPassword } from "../utils/validation";
import { useWindowSize } from "../libs/windowSize";

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
      console.log(res);
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
