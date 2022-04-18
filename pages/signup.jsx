import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import styles from "../styles/SignInAndUp.module.css";
import { useWindowSize } from "../libs/windowSize";
import Link from "next/link";
import {
  validEmail,
  validPassword,
  validPhoneNumber,
} from "../utils/validation";

export default function Home() {
  const size = useWindowSize();
  const router = useRouter();
  const [serverMessage, setserverMessage] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formProps),
    });
    const res = await response.json();
    if (res.token == undefined) {
      setserverMessage(res.msg);
    } else {
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
              <h1>Sign Up</h1>
              <span
                style={{
                  display: serverMessage == "" ? "none" : "block",
                }}
              >
                {serverMessage}
              </span>
              <input type="text" name="name" placeholder="Name"></input>
              <Email />
              <PhoneNumber />
              <input
                type="text"
                name="college"
                placeholder="College Name (if any)"
              ></input>
              <Password />
              <ConfirmPassword />
              <input type="submit" value="Sign Up"></input>
            </form>
            <div className={styles.Already}>
              <span>Aldready Have An account?</span>
              <Link href="/signin">
                <button>Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function PhoneNumber() {
  const [hint, setHint] = useState(false);
  const validatePhoneNumber = (e) => {
    if (validPhoneNumber(e.target.value)) {
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
        type="tel"
        placeholder="Contact Number"
        name="number"
        autoComplete="on"
        onChange={(e) => validatePhoneNumber(e)}
        required
      ></input>
      <span style={{ display: hint ? "" : "none" }}>
        Invalid Contact Number{" "}
      </span>
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
        autoComplete="on"
        name="email"
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
        id={"password"}
        placeholder="Password"
        name="password"
        autoComplete="on"
        onChange={(e) => validatePassword(e)}
        required
      ></input>
      <span style={{ display: hint ? "" : "none" }}>Minimum 8 Characters </span>
    </>
  );
}

function ConfirmPassword(props) {
  const [hint, setHint] = useState(false);
  const validatePassword = (e) => {
    if (document.getElementById("password").value == e.target.value) {
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
        placeholder="Confirm Password"
        autoComplete="on"
        onChange={(e) => validatePassword(e)}
        required
      ></input>
      <span style={{ display: hint ? "" : "none" }}>Minimum 8 Characters </span>
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
      props: {},
    };
  }
}
