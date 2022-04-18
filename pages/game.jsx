import React from "react";
import jwt from "jsonwebtoken";

export default function Game(props) {
  return (
    <>
      <h1>Game</h1>
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
      },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }
}
