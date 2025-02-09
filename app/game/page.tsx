'use client';

import { Metadata } from "next";
import { useState, useEffect } from "react";
import { textNodes, TextNode, Option } from "./textNodes"; 

export default function Game() {

  const [currentText, setCurrentText] = useState<number>(1);
  const currentNode: TextNode | undefined = textNodes.find(
    (node) => node.id === currentText
  );

  if (!currentNode) {
    return <div>Error: Node not found</div>; 
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
      
      <div className="flex flex-col mx-auto p-5 border border-gray-300">
        <div className="flex-1 overflow-y-auto mb-2">
          <p>{currentNode.text}</p>
        </div>
        <div className="flex flex-col gap-2">
          {currentNode.options.map((option: Option) => (
            <button
              key={option.nextText}
              onClick={() => handleOptionSelect(option.nextText)}
              className="px-4 py-2 bg-green-500 text-white text-center text-base cursor-pointer"
            >
              {option.text}
            </button>
          ))}
          {currentNode.options.length === 0 && <p>Game Over</p>}
        </div>
      </div>
    </div>
  );
}