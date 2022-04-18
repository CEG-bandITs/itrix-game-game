import React from "react";
import styles from "../../styles/Game.module.css";

export function MobileQuestionBar(props) {
  return (
    <div className={styles.QuestionBar}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
        onClick={() => {
          props.decreasePointer();
        }}
      >
        <path
          fillRule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
        />
      </svg>
      <img src={props.imgs[props.pointer]} alt="" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
        onClick={() => {
          props.increasePointer();
        }}
      >
        <path
          fillRule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
        />
      </svg>
    </div>
  );
}

export function DesktopQuestionBar(props) {
  return (
    <div className={styles.QuestionBar}>
      {props.imgs.map((e) => {
        return <img key={e} src={e} />;
      })}
    </div>
  );
}

export function DesktopAnswerBar() {
  return <div className={styles.AnswerBar}></div>;
}

export function MobileAnswerBar() {
  return <div className={styles.AnswerBar}></div>;
}
