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

export default function Game() {

  const [currentTextNode, setCurrentTextNode] = useState<TextNode>(textNodes[0]); // Start at the first node

  const handleOptionClick = (nextText: number) => {
    const nextNode = textNodes.find((node) => node.id === nextText);
    if (nextNode) {
      setCurrentTextNode(nextNode);
    }
  };


  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <h1 className="block font-black text-4xl lg:text-5xl text-center mb-10">
        BAC Love Story
      </h1>

      <p>{currentTextNode.text}</p>
      <ul>
        {currentTextNode.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleOptionClick(option.nextText)}>
              {option.text}
            </button>
          </li>
        ))}
      </ul>

  </div>
  );
}