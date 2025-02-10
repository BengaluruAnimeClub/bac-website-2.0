'use client';

import { Metadata } from "next";
import { useState, useEffect } from "react";
import { Scenes, Scene, Option } from "./textNodes"; 

export default function Game() {

  const [currentScene, setCurrentScene] = useState<number>(0);

  const currentNode: Scene | undefined = Scenes.find(
    (node) => node.id === currentScene
  );

  if (!currentNode) {
    return <div>Error: Scene not found</div>; 
  }

  const handleOptionSelect = (nextScene: number) => {
    setCurrentScene(nextScene);
  };

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <h1 className="block font-black text-4xl lg:text-5xl text-center mb-10">
        BAC Love Story
      </h1>
      
      <div className="flex flex-col mx-auto p-5 border border-gray-300 rounded-lg">
        <div className="flex-1 overflow-y-auto mb-2">
          <b>Scene #{currentNode.id}</b>
          <p>{currentNode.text}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-2 justify-center">
          {currentNode.options.map((option: Option, index) => (
            <button
              key={`${currentNode.id}-${index}`}
              onClick={() => handleOptionSelect(option.nextScene)}
              className="px-4 py-2 bg-[#ea4167] text-white text-center text-base cursor-pointer rounded-md"
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
