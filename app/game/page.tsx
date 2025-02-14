'use client';

import { Metadata } from "next";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { Scenes, Scene, Option } from "./textNodes"; 
import ReactMarkdown from "react-markdown";

const imagePaths: { [key: number]: string } = {
  101: "/images/game/happy.webp",
  102: "/images/game/awkward.webp",
  103: "/images/game/twist.webp",
  104: "/images/game/rival.webp",
};

const musicPaths = [
  "/music/game/take-me-anywhere.mp3",
  "/music/game/to_the_moon.mp3",
  "/music/game/to_zanarkand_64.mp3",
];

export default function Game() {
  // Single variable for fade duration in ms
  const fadeDuration = 700;
  
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [previousOptionText, setPreviousOptionText] = useState<string>('');
  // Only store opacity state; transition properties are defined inline
  const [fade, setFade] = useState("opacity-100");
  // New state to track mute status
  const [isMuted, setIsMuted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Add a ref for background audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Add a cleanup effect to stop music when leaving the webpage
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const currentNode: Scene | undefined = Scenes.find(
    (node) => node.id === currentScene
  );

  if (!currentNode) {
    return <div>Error: Scene not found</div>; 
  }

  const handleOptionSelect = (nextScene: number, optionText: string) => {
    if (optionText === "Play Again") {
      // Cycle to next song on "Play Again"
      const newIndex = (currentSongIndex + 1) % musicPaths.length;
      setCurrentSongIndex(newIndex);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(musicPaths[newIndex]);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.05; // set lower volume
      audioRef.current.muted = isMuted;
      audioRef.current.play().catch((error) => console.error("Audio play error:", error));
    } else if (!audioRef.current) {
      // Initialize audio if not already set
      audioRef.current = new Audio(musicPaths[currentSongIndex]);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.05;
      audioRef.current.muted = isMuted;
      audioRef.current.play().catch((error) => console.error("Audio play error:", error));
    }
    setFade("opacity-0");
    setTimeout(() => {
      setPreviousOptionText(optionText);
      setCurrentScene(nextScene);
      setFade("opacity-100");
    }, fadeDuration);
  };

  // Determine the flex direction based on the current scene id
  const flexDirection = currentNode.id >= 1 && currentNode.id <= 100 ? "flex-col" : "flex-row";

  return (
    <div className="container px-4 max-w-5xl py-6 md:py-10">
      
      <div className="flex flex-col mx-auto p-4 border-4 border-solid border-[#f05a78] rounded-xl md:w-3/4">
        <div 
          className={`flex-1 overflow-y-auto mb-2 transition-opacity ${fade}`} 
          style={{ transitionDuration: `${fadeDuration}ms` }}
        >

          {currentNode.id > 0 && (
            <>
              <div className="mb-2">
                <center>
                  {/* <b>Scene #{currentNode.id}</b> */}
                  {previousOptionText && currentNode.id < 100 && currentNode.id > 1 && (
                    <p className="px-2 md:px-8">
                      <b>
                      <i className="text-[#f05a78]">Previously selected: </i>
                      <i>{previousOptionText}</i>
                      </b>
                    </p>
                  )}
                </center>
              </div>

              {currentNode.prefix && (
                currentNode.id > 100 ? 
                  <div className="flex justify-center">
                    <b>
                      <ReactMarkdown className="prose dark:prose-invert text-center text-xl">
                        {currentNode.prefix}
                      </ReactMarkdown>
                    </b>
                  </div>
                :
                  <ReactMarkdown className="prose dark:prose-invert text-justify">
                    {currentNode.prefix}
                  </ReactMarkdown>
              )}

              {currentNode.id > 100 && (
                  <Image 
                    src={imagePaths[currentNode.id]} 
                    alt="Scene Image" 
                    width={600} 
                    height={360}
                    className="mt-4 mb-0 rounded-xl mx-auto w-full md:w-3/4" 
                  />
              )}

              <div id="text-mobile-view" className="mx-auto block md:hidden px-0">
                {currentNode.prefix && currentNode.id < 100 && <hr className="border-[#f05a78] my-4 mt-4 mb-4" />}
                {currentNode.prefix && currentNode.id > 100 && <br/>}
                {currentNode.text && 
                  <ReactMarkdown className="prose dark:prose-invert text-justify">
                    {currentNode.text}
                  </ReactMarkdown>
                }
                {currentNode.author && 
                <div className="mt-2">
                <p style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>— <i>{currentNode.author}</i></p>
                </div>
                }
                {currentNode.suffix && <hr className="border-[#f05a78] my-4 mt-4 mb-4" />}
              </div>

              <div id="text-desktop-view" className={currentNode.id > 100 || (currentNode.prefix === "" && currentNode.suffix === "") ? "mx-auto px-4 py-4 hidden md:block" : "mx-auto px-4 p-4 mt-4 mb-4 border-2 border-[#fbd3d6] rounded-xl hidden md:block"}>
                {currentNode.text && 
                  <ReactMarkdown className="prose dark:prose-invert text-justify">
                    {currentNode.text}
                  </ReactMarkdown>
                }
                {currentNode.author && 
                <div className="mt-2">
                <p style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>— <i>{currentNode.author}</i></p>
                </div>
                }
              </div>

              {currentNode.suffix && 
                <ReactMarkdown className="prose dark:prose-invert text-justify">
                  {currentNode.suffix}
                </ReactMarkdown>
              }

            </>
          )}

          {currentNode.id === 0 && (
            <video autoPlay muted loop className="mt-2 mb-2 rounded-xl mx-auto w-full md:w-3/4">
              <source src="/images/game/title.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

        </div>
        
        {/* Options logic, for each scene category */} 
        
        <div 
          className={`flex flex-col md:${flexDirection} gap-2 justify-center transition-opacity ${fade}`} 
          style={{ transitionDuration: `${fadeDuration}ms` }}
        >

          {currentNode.options.map((option: Option, index) => (
            <button
              key={`${currentNode.id}-${index}`}
              onClick={() => handleOptionSelect(option.nextScene, option.text)}
              className="px-4 py-2 bg-[#ea4167] text-white text-center text-base cursor-pointer rounded-md transition-colors hover:bg-[#d03457] active:scale-90"
            >
              {option.text}
            </button>
          ))}

          {currentNode.id === 0 && (
            <button
              onClick={() => {
                const newMuted = !isMuted;
                setIsMuted(newMuted);
                if (audioRef.current) {
                  audioRef.current.muted = newMuted;
                }
              }}
              className="px-4 py-2 bg-gray-600 text-white text-center text-base cursor-pointer rounded-md transition-colors hover:bg-gray-700 active:scale-90"
            >
              {`Music: ${isMuted ? "OFF" : "ON"}`}
            </button>
          )}

          {[101, 102, 103, 104].includes(currentNode.id) && (
            <a
              href="https://example.com/credits"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-600 text-white text-center text-base cursor-pointer rounded-md transition-colors hover:bg-purple-700 active:scale-90"
            >
              Game Credits
            </a>
          )}

          {currentNode.options.length === 0 && <p>Game Over</p>}
        </div>
      </div>
    </div>
  );
}
