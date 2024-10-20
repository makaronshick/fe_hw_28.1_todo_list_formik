import React, { useState } from "react";
import "./smileVoting.styles.css";

export default () => {
  const savedVotes = JSON.parse(localStorage.getItem("emoticonsVotes"));
  const votes = savedVotes ? savedVotes : [
        { id: '1', src: "./emoticons/1.png", votes: 0 },
        { id: '2', src: "./emoticons/2.png", votes: 0 },
        { id: '3', src: "./emoticons/3.png", votes: 0 },
        { id: '4', src: "./emoticons/4.png", votes: 0 },
        { id: '5', src: "./emoticons/5.png", votes: 0 },
      ];


  const [emoticons, setEmoticons] = useState(votes);
  const [showResults, setShowResults] = useState(false);

  const handleVote = ({target}) => {
    if (target.nodeName !== 'BUTTON' && target.parentElement.nodeName !== 'LI') {
      return;
    }

    const updatedEmojis = emoticons.map((emoji) => {
      if (emoji.id === target.parentElement.id) {
        return { ...emoji, votes: emoji.votes + 1 };
      }
      return emoji;
    });

    setEmoticons(updatedEmojis);
    localStorage.setItem("emoticonsVotes", JSON.stringify(updatedEmojis));
  };

  const renderResults = () => {
    setShowResults(true);
  };

  const clearResults = () => {
    localStorage.removeItem("emoticonsVotes");
    setEmoticons(emoticons.map((emoji) => ({ ...emoji, votes: 0 })));
    setShowResults(false);
  };

  const getWinners = () => {
    const maxVotes = Math.max(...emoticons.map((emoji) => emoji.votes));
    if (maxVotes === 0) {
      return "There is no winner";
    }

    return emoticons.filter((emoji) => emoji.votes === maxVotes);
  };

  return <>
    <div>
      <ul>
        {emoticons.map((emoji) => (
          <li key={emoji.id} id={emoji.id} className="emoji_item">
            <img src={emoji.src} className="emoji_image" /> {emoji.votes} - Votes
            <button className="custom_btn" onClick={handleVote}> Vote </button>
          </li>
        ))}
      </ul>
      <button className="custom_btn" onClick={renderResults}> Show Results </button>
      <button className="custom_btn" onClick={clearResults}> Clear Results </button>

      {showResults && typeof getWinners() === "object" && (
        <div>
          <h2>WINNER IS:</h2>
          <ul>
            {getWinners().map((emoji) => (
              <li key={emoji.id} className="emoji_item">
                <img src={emoji.src} className="emoji_image" /> {emoji.votes} -
                Votes
              </li>
            ))}
          </ul>
        </div>
      )}

      {showResults && typeof getWinners() === "string" && (
        <div>
          <h2>{getWinners()}</h2>
        </div>
      )}
    </div>
    </>
};
