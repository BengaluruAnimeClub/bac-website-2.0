export interface Option {
  text: string;
  nextText: number;
}

export interface TextNode {
  id: number;
  text: string;
  options: Option[];
}

export const textNodes: TextNode[] = [
  {
    id: 1,
    text: `Passage 1 A`, 
    options: [
      { text: `Go to 2`, nextText: 2 },
      { text: `Stay at 1`, nextText: 1 },
    ],
  },
  {
    id: 2,
    text: `Passage 2`,
    options: [
      { text: `Go to 1`, nextText: 1 },
      { text: `Stay at 2`, nextText: 2 },
    ],
  },
];
