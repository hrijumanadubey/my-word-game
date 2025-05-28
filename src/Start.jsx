import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css";

function Start() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const buttonRef = useRef(null);

  const handlePlay = () => {
    const button = buttonRef.current;
    button.classList.add("bounce");

    setTimeout(() => {
      button.classList.remove("bounce");
      setFadeOut(true);
      setTimeout(() => {
        navigate("/game");
      }, 1000);
    }, 500);
  };

  return (
    <div className={`start-container ${fadeOut ? "fade-out" : ""}`}>
      <h1 className="intro">Welcome to My Word-Game!</h1>
      <button className="button" ref={buttonRef} onClick={handlePlay}>
        PLAY
      </button>
    </div>
  );
}

export default Start;
