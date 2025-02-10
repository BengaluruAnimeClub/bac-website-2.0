export interface Option {
  text: string;
  nextScene: number;
}

export interface Scene {
  id: number;
  text: string;
  options: Option[];
}

export const Scenes: Scene[] = [
  {
    id: 0,
    text: `Title Screen`, 
    options: [
      { text: `Start Game`, nextScene: 1 },
    ],
  },
  {
    id: 1,
    text: `Welcome to the game.
    Choose your path wisely.`,
    options: [
      { text: `Option 1`, nextScene: 3 },
      { text: `Option 2`, nextScene: 4 },
      { text: `Option 3`, nextScene: 12 },
    ],
  },
  {
    id: 2,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 6 },
      { text: `Option 2`, nextScene: 5 },
      { text: `Option 3`, nextScene: 8 },
    ],
  },
  {
    id: 3,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 7 },
      { text: `Option 2`, nextScene: 8 },
    ],
  },
  {
    id: 4,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 9 },
      { text: `Option 2`, nextScene: 2 },
    ],
  },
  {
    id: 5,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 28 },
      { text: `Option 2`, nextScene: 3 },
    ],
  },
  {
    id: 6,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 7,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 11 },
    ],
  },
  {
    id: 8,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 10 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 9,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 12 },
      { text: `Option 2`, nextScene: 10 },
      { text: `Option 3`, nextScene: 28 },
    ],
  },
  {
    id: 10,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 11 },
      { text: `Option 2`, nextScene: 27 },
      { text: `Option 3`, nextScene: 21 },
    ],
  },
  {
    id: 11,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 104 },
      { text: `Option 2`, nextScene: 103 },
    ],
  },
  {
    id: 12,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 13 },
      { text: `Option 2`, nextScene: 14 },
    ],
  },
  {
    id: 13,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 2 },
      { text: `Option 2`, nextScene: 6 },
    ],
  },
  {
    id: 14,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 15 },
      { text: `Option 2`, nextScene: 16 },
    ],
  },
  {
    id: 15,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 16 },
      { text: `Option 2`, nextScene: 17 },
    ],
  },
  {
    id: 16,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 104 },
      { text: `Option 2`, nextScene: 18 },
    ],
  },
  {
    id: 17,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 18 },
      { text: `Option 2`, nextScene: 20 },
    ],
  },
  {
    id: 18,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 19 },
      { text: `Option 2`, nextScene: 20 },
    ],
  },
  {
    id: 19,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 21 },
      { text: `Option 2`, nextScene: 22 },
    ],
  },
  {
    id: 20,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 23 },
      { text: `Option 2`, nextScene: 24 },
    ],
  },
  {
    id: 21,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 25 },
    ],
  },
  {
    id: 22,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 26 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 23,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 24,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 22 },
    ],
  },
  {
    id: 25,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 104 },
      { text: `Option 2`, nextScene: 103 },
    ],
  },
  {
    id: 26,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 101 },
      { text: `Option 2`, nextScene: 102 },
    ],
  },
  {
    id: 27,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 28,
    text: `Passage`,
    options: [
      { text: `Option 1`, nextScene: 17 },
      { text: `Option 2`, nextScene: 104 },
    ],
  },
  {
    id: 101,
    text: `Happy ending (medha): “A Love Fulfilled”`,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 102,
    text: `Awkward ending (medha): “A Love Unspoken” `,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 103,
    text: `Twist ending (Manas): “An Unexpected Love” `,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 104,
    text: `Rival ending (Manas): “A Love That Got Away”`,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
];
