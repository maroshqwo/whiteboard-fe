import { WhiteboardState, Card, CardTemplate, Group } from "@/types";

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
    groups: [],
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
      state.groups = state.groups.map((g) => {
        return {
          ...g,
          cards: g.cards.filter((c) => c.id !== id),
        };
      });
      state.cards = state.cards.filter((c) => c.id !== id);
    },
    deleteSelected(state: WhiteboardState) {
      state.cards = state.cards.filter((c) => !c.active);
    },
    toggleAddActiveCard(state: WhiteboardState, id: number) {
      const card = state.cards.find((c) => c.id === id);
      if (!card) return;
      card.active = !card.active;
    },
    addActiveCard(state: WhiteboardState, id: number) {
      state.cards = state.cards.map((c) => {
        if (c.id === id) {
          c.active = true;
        }
        return c;
      });
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
    addGroup(state: WhiteboardState, group: Group) {
      state.groups.push(group);
    },
    debug(state: WhiteboardState, id: number) {
      state.cards.forEach((c) => {
        if (c.id === id) {
          c.x = state.board.width / 2 - c.width / 2;
          c.y = state.board.height / 2 - c.height / 2;
        }
      });
    },
    deleteGroup(state: WhiteboardState, id: number) {
      state.groups = state.groups.filter((g) => g.id !== id);
    },
    deletePointlessGroups(state: WhiteboardState) {
      state.groups = state.groups.filter((g) => g.cards.length > 1);
    },
    changeGroupName(
      state: WhiteboardState,
      { id, name }: { id: number; name: string }
    ) {
      state.groups = state.groups
        .map((g) => {
          if (g.id === id) {
            g.name = name;
          }
          return g;
        })
        .filter((g) => g.name.length > 0);
    },
  },
  actions: {
    addCard(context: any, card: CardTemplate) {
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
      context.commit("deletePointlessGroups");
    },
    deleteSelected(context: any) {
      context.commit("deleteSelected");
      context.commit("deletePointlessGroups");
    },
    addGroup(context: any) {
      let newID = -1;
      context.state.groups.forEach((group: any) => {
        if (group.id >= newID) {
          newID = group.id + 1;
        }
      });
      let newGroup = {
        id: newID,
        name: "GRP-" + newID,
        cards: [] as Card[],
      };
      context.state.cards.forEach((card: Card) => {
        if (card.active) {
          newGroup.cards.push(card);
        }
      });
      if (newGroup.cards.length <= 1) return;
      context.commit("addGroup", newGroup);
    },
    disgroup(context: any, id: number) {
      context.commit("deleteGroup", id);
    },
    deleteGroup(context: any, id: number) {
      let deletedGroup = context.state.groups.find((g: any) => g.id === id);
      if (!deletedGroup) return;
      context.state.cards.forEach((c: any) => {
        deletedGroup!.cards.forEach((d: any) => {
          if (c.id === d.id) {
            context.commit("deleteCard", c.id);
          }
        });
      });
      context.commit("deleteGroup", id);
      context.commit("deletePointlessGroups");
    },
    toggleAddActiveCard(context: any, id: number) {
      context.commit("toggleAddActiveCard", id);
    },
    addActiveCard(context: any, id: number) {
      context.commit("addActiveCard", id);
    },
    setActiveCard(context: any, id: number) {
      context.commit("setActiveCard", id);
    },
    setEditCard(context: any, id: number) {
      context.commit("setEditCard", id);
    },
    setXCard(context: any, { id, x }: { id: number; x: number }) {
      context.state.cards.forEach((c: Card) => {
        if (c.active) {
          context.commit("setXCard", { id: c.id, x: c.x + x });
        }
      });
    },
    setYCard(context: any, { id, y }: { id: number; y: number }) {
      context.state.cards.forEach((c: Card) => {
        if (c.active) {
          context.commit("setYCard", { id: c.id, y: c.y + y });
        }
      });
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
    debug(context: any, id: number) {
      context.commit("debug", id);
    },
    changeGroupName(context: any, { id, name }: { id: number; name: string }) {
      context.commit("changeGroupName", { id, name });
    },
  },
  getters: {
    getCards(state: WhiteboardState) {
      return state.cards;
    },
    getBoard(state: WhiteboardState) {
      return state.board;
    },
    getGroups(state: WhiteboardState) {
      return state.groups;
    },
  },
};

export default WhiteboardModule;
