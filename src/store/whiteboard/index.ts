import { WhiteboardState, Card } from "@/types";

const WhiteboardModule = {
  state: (): WhiteboardState => ({
    cards: [
      {
        id: 1,
        width: 200,
        height: 100,
        color: "#222",
        x: 600,
        y: 200,
        active: false,
        boardId: 1,
      },
      {
        id: 2,
        width: 100,
        height: 200,
        color: "#888888",
        x: 400,
        y: 300,
        active: true,
        boardId: 1,
      },
      {
        id: 3,
        width: 200,
        height: 200,
        color: "#aaa",
        x: 200,
        y: 100,
        active: false,
        boardId: 1,
      },
    ],
    board: {
      id: 1,
      width: 800,
      height: 600,
      x: 0,
      y: 0,
    },
  }),
  mutations: {
    addCard(state: WhiteboardState, card: Card) {
      state.cards.push(card);
    },
    deleteCard(state: WhiteboardState, id: number) {
      state.cards = state.cards.filter((c) => c.id !== id);
    },
    setActiveCard(state: WhiteboardState, id: number) {
      state.cards = state.cards.map((c) => {
        if (c.id === id) {
          c.active = true;
        } else {
          c.active = false;
        }
        return c;
      });
    },
    setXCard(state: WhiteboardState, { id, x }: { id: number; x: number }) {
      state.cards = state.cards.map((c) => {
        if (c.id === id) {
          c.x = x;
        }
        return c;
      });
    },
    setYCard(state: WhiteboardState, { id, y }: { id: number; y: number }) {
      state.cards = state.cards.map((c) => {
        if (c.id === id) {
          c.y = y;
        }
        return c;
      });
    },
    setWidthCard(
      state: WhiteboardState,
      { id, width }: { id: number; width: number }
    ) {
      state.cards = state.cards.map((c) => {
        if (c.id === id) {
          c.width = width;
        }
        return c;
      });
    },
    setHeightCard(
      state: WhiteboardState,
      { id, height }: { id: number; height: number }
    ) {
      state.cards = state.cards.map((c) => {
        if (c.id === id) {
          c.height = height;
        }
        return c;
      });
    },
    setHeightBoard(state: WhiteboardState, height: number) {
      state.board.height = height;
    },
    setWidthBoard(state: WhiteboardState, width: number) {
      state.board.width = width;
    },
    setXBoard(state: WhiteboardState, x: number) {
      state.board.x = x;
    },
    setYBoard(state: WhiteboardState, y: number) {
      state.board.y = y;
    },
  },
  actions: {
    addCard(context: any, card: Card) {
      context.commit("addCard", card);
    },
    deleteCard(context: any, id: number) {
      context.commit("deleteCard", id);
    },
    setActiveCard(context: any, id: number) {
      context.commit("setActiveCard", id);
    },
    setXCard(context: any, { id, x }: { id: number; x: number }) {
      context.commit("setXCard", { id, x });
    },
    setYCard(context: any, { id, y }: { id: number; y: number }) {
      context.commit("setYCard", { id, y });
    },
    setWidthCard(context: any, { id, width }: { id: number; width: number }) {
      context.commit("setWidthCard", { id, width });
    },
    setHeightCard(
      context: any,
      { id, height }: { id: number; height: number }
    ) {
      console.log(height);
      context.commit("setHeightCard", { id, height });
    },
    setXBoard(context: any, x: number) {
      console.log("hello");
      context.commit("setXBoard", x);
    },
    setYBoard(context: any, y: number) {
      context.commit("setYBoard", y);
    },
    setWidthBoard(context: any, width: number) {
      context.commit("setWidthBoard", width);
    },
    setHeightBoard(context: any, height: number) {
      context.commit("setHeightBoard", height);
    },
  },
  getters: {
    getCards(state: WhiteboardState) {
      return state.cards;
    },
    getBoard(state: WhiteboardState) {
      return state.board;
    },
  },
};

export default WhiteboardModule;
