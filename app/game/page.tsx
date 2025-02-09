'use client';

import { Metadata } from "next";
import { useState, useEffect } from "react";

interface Option {
  text: string;
  nextText: number;
}

interface TextNode {
  id: number;
  text: string;
  options: Option[];
}

const textNodes: TextNode[] = [
  {
    id: 1,
    text: `Passage 1`, // Your game text here
    options: [
      { text: `Go to 2`, nextText: 2 },
      { text: `Stay at 1`, nextText: 1 },
    ],
  },
  {
    id: 2,
    text: `Passage 2`, // Your game text here
    options: [
      { text: `Go to 1`, nextText: 1 },
      { text: `Stay at 2`, nextText: 2 },
    ],
  },
]

export default async function Game() {

  const [currentText, setCurrentText] = useState<number>(1);
  const currentNode: TextNode | undefined = textNodes.find(
    (node) => node.id === currentText
  );

  if (!currentNode) {
    return <div>Error: Node not found</div>; // Handle the case where the node is not found
  }

  const handleOptionSelect = (nextText: number) => {
    setCurrentText(nextText);
  };


  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <h1 className="block font-black text-4xl lg:text-5xl text-center mb-10">
        BAC Love Story
      </h1>

      <div className="columns-1 md:columns-2 lg:columns-2 w-fit gap-4 mx-auto space-y-4">
        
      </div>
      
      <div className="game-container">
      <div className="text-area">
        <p>{currentNode.text}</p>
      </div>
      <div className="options-area">
        {currentNode.options.map((option: Option) => (
          <button key={option.nextText} onClick={() => handleOptionSelect(option.nextText)}>
            {option.text}
          </button>
        ))}
        {currentNode.options.length === 0 && <p>Game Over</p>}
      </div>
       <style jsx>{`
        .game-container {
          display: flex;
          flex-direction: column;
          height: 100vh; /* Make sure the container takes up full viewport height */
          width: 80vh;
          margin: auto;
          padding: 20px;
          border: 1px solid #ccc; /* Add a border for visual separation */
        }

        .text-area {
          flex: 1; /* Allow text area to expand */
          overflow-y: auto; /* Add scroll if text overflows */
          margin-bottom: 10px;
        }

        .options-area {
          display: flex;
          flex-direction: column; /* Stack buttons vertically */
          gap: 10px; /* Space between buttons */
        }
        button {
          padding: 10px 20px;
          background-color: #4CAF50; /* Green */
          border: none;
          color: white;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>

  </div>
  );
}