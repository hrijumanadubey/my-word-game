import React from "react";
import { useNavigate } from "react-router-dom";
import thumbsUp from "./images/perfect.png";
import thumbsDown from "./images/thumbs-down.png";

function Popup({ randomWord, guess, rowIndex }) {
  const navigate = useNavigate();

  if (randomWord.toUpperCase() === guess) {
    return (
      <div className="popup">
        <p className="afterMath">YOU WON!!!</p>
        <img src={thumbsUp} alt="THUMBS UP" width="130px" />
        <div>
          <button className="play-again" onClick={() => navigate("/")}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  } else if (rowIndex >= 5) {
    return (
      <div className="popup">
        <p className="afterMath">YOU LOST!!!</p>
        <img src={thumbsDown} alt="THUMBS DOWN" width="130px" />
        <div>
          <button className="play-again" onClick={() => navigate("/")}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default Popup;
