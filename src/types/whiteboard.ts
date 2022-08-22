export type WhiteboardState = {
  cards: Card[];
  board: Board;
};

export type Card = {
  id: number;
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
  active: boolean;
  boardId: number;
};

export type Board = {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
};
