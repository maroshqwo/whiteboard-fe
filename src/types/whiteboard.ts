export type WhiteboardState = {
  cards: Card[];
  board: Board;
  groups: Group[];
};

export type WhiteboardUtilState = {
  cardTemplates: CardTemplate[];
  addDisplay: boolean;
  deleteMode: boolean;
};

export type CardTemplate = {
  id: number;
  content: CardContent[];
  color: string;
  type: CardType;
};

export type CardType = "sticker" | "emoji";

export type Card = {
  id: number;
  width: number;
  content: CardContent[];
  height: number;
  color: string;
  x: number;
  y: number;
  active: boolean;
  edit: boolean;
  boardId: number;
  zIndex: number;
  type: CardType;
};

export type Group = {
  id: number;
  name: string;
  cards: Card[];
};

export type CardContent = {
  id: number;
  cardId: number;
  fontSize: number;
  fontColor: string;
  x: number;
  y: number;
  text: string;
};

export type Board = {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
};
