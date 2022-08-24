import { WhiteboardState, Card, CardTemplate } from "@/types";

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
        edit: false,
        boardId: 1,
        type: "sticker",
        zIndex: 1,
        content: [
          {
            id: 1,
            cardId: 1,
            fontSize: 20,
            fontColor: "#E4D9FF",
            x: 10,
            y: 10,
            text: "Sticker text here!",
          },
        ],
      },
      {
        id: 2,
        width: 100,
        height: 200,
        color: "transparent",
        x: 400,
        y: 300,
        active: true,
        edit: false,
        boardId: 1,
        zIndex: 2,
        type: "emoji",
        content: [
          {
            id: 2,
            cardId: 2,
            fontSize: 20,
            fontColor: "#E4D9FF",
            x: 10,
            y: 10,
            text: "😹",
          },
        ],
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
      state.cards.push(Object.assign(card));
    },
    updateCardContent(
      state: WhiteboardState,
      payload: { cardId: number; contentId: number; newText: string }
    ) {
      const card = state.cards.find((c) => c.id === payload.cardId);
      if (!card) return;
      const content = card.content.find((c) => c.id === payload.contentId);
      if (!content) return;
      content.text = payload.newText;
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
          c.edit = false;
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
          c.width = width > 0 ? width : -width;
        }
        return c;
      });
    },
    setEditCard(state: WhiteboardState, id: number) {
      state.cards = state.cards.map((c) => {
        if (c.id === id) {
          c.edit = true;
        } else {
          c.edit = false;
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
          c.height = height > 0 ? height : -height;
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
    addCard(context: any, card: CardTemplate) {
      console.log(context.state.cards);
      let newID = 0;
      context.state.cards.forEach((element: Card) => {
        if (element.id >= newID) {
          newID = element.id + 1;
        }
      });
      let contents = card.content.map((content: any) => {
        return {
          id: content.id,
          cardId: newID,
          fontSize: content.fontSize,
          fontColor: content.fontColor,
          x: content.x,
          y: content.y,
          text: content.text,
        };
      });

      let newCard = {
        id: newID,
        width: 200,
        height: 100,
        color: card.color,
        content: contents,
        x: 200,
        y: 200,
        active: false,
        edit: false,
        boardId: 1,
        zIndex: context.state.cards.length + 1,
        type: card.type,
      };
      context.commit("addCard", { ...newCard });
    },
    updateCardContent(context: any, updated: any) {
      context.commit("updateCardContent", updated);
    },
    deleteCard(context: any, id: number) {
      context.commit("deleteCard", id);
    },
    setActiveCard(context: any, id: number) {
      context.commit("setActiveCard", id);
    },
    setEditCard(context: any, id: number) {
      context.commit("setEditCard", id);
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
      context.commit("setHeightCard", { id, height });
    },
    setXBoard(context: any, x: number) {
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
