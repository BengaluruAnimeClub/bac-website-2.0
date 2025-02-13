export interface Option {
  text: string;
  nextScene: number;
}

export interface Scene {
  id: number;
  prefix: string;
  text: string;
  suffix: string;
  author: string;
  options: Option[];
}

export const Scenes: Scene[] = [
  {
    id: 0,
    prefix: "",
    text: `Title Screen`,
    suffix: "",
    author: "",
    options: [
      { text: `Start Game`, nextScene: 1 },
    ],
  },
  {
    id: 1,
    prefix: "",
    text: `Welcome to the game.
    Choose your path wisely.`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 3 },
      { text: `Option 2`, nextScene: 4 },
      { text: `Option 3`, nextScene: 12 },
    ],
  },
  {
    id: 2,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 6 },
      { text: `Option 2`, nextScene: 5 },
      { text: `Option 3`, nextScene: 8 },
    ],
  },
  {
    id: 3,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 7 },
      { text: `Option 2`, nextScene: 8 },
    ],
  },
  {
    id: 4,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 9 },
      { text: `Option 2`, nextScene: 2 },
    ],
  },
  {
    id: 5,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 28 },
      { text: `Option 2`, nextScene: 3 },
    ],
  },
  {
    id: 6,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 7,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 11 },
    ],
  },
  {
    id: 8,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 10 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 9,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 12 },
      { text: `Option 2`, nextScene: 10 },
      { text: `Option 3`, nextScene: 28 },
    ],
  },
  {
    id: 10,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 11 },
      { text: `Option 2`, nextScene: 27 },
      { text: `Option 3`, nextScene: 21 },
    ],
  },
  {
    id: 11,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 104 },
      { text: `Option 2`, nextScene: 103 },
    ],
  },
  {
    id: 12,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 13 },
      { text: `Option 2`, nextScene: 14 },
    ],
  },
  {
    id: 13,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 2 },
      { text: `Option 2`, nextScene: 6 },
    ],
  },
  {
    id: 14,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 15 },
      { text: `Option 2`, nextScene: 16 },
    ],
  },
  {
    id: 15,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 16 },
      { text: `Option 2`, nextScene: 17 },
    ],
  },
  {
    id: 16,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 104 },
      { text: `Option 2`, nextScene: 18 },
    ],
  },
  {
    id: 17,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 18 },
      { text: `Option 2`, nextScene: 20 },
    ],
  },
  {
    id: 18,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 19 },
      { text: `Option 2`, nextScene: 20 },
    ],
  },
  {
    id: 19,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 21 },
      { text: `Option 2`, nextScene: 22 },
    ],
  },
  {
    id: 20,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 23 },
      { text: `Option 2`, nextScene: 24 },
    ],
  },
  {
    id: 21,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 25 },
    ],
  },
  {
    id: 22,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 26 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 23,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 24,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 22 },
    ],
  },
  {
    id: 25,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 104 },
      { text: `Option 2`, nextScene: 103 },
    ],
  },
  {
    id: 26,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 101 },
      { text: `Option 2`, nextScene: 102 },
    ],
  },
  {
    id: 27,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 28,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 17 },
      { text: `Option 2`, nextScene: 104 },
    ],
  },
  {
    id: 101,
    prefix: "",
    text: `Happy ending (medha): “A Love Fulfilled”`,
    suffix: "",
    author: "",
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 102,
    prefix: "",
    text: `Awkward ending (medha): “A Love Unspoken” `,
    suffix: "",
    author: "",
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 103,
    prefix: "",
    text: `Twist ending (Manas): “An Unexpected Love” `,
    suffix: "",
    author: "",
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 104,
    prefix: "",
    text: `Rival ending (Manas): “A Love That Got Away”`,
    suffix: "",
    author: "",
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
];
