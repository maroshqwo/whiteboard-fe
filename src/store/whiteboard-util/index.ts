import { CardTemplate, WhiteboardUtilState } from "@/types";

const WhiteboardUtilModule = {
  state: (): WhiteboardUtilState => ({
    cardTemplates: [
      {
        id: 1,
        content: [
          {
            id: 2,
            cardId: 1,
            fontSize: 20,
            fontColor: "#111",
            x: 8,
            y: 10,
            text: "Sticker",
          },
          {
            id: 3,
            cardId: 1,
            fontSize: 16,
            fontColor: "#111",
            x: 8,
            y: 40,
            text: "Sticker text here!",
          },
        ],
        color: "#E4D9FF",
        type: "sticker",
      },
      {
        id: 2,
        content: [
          {
            id: 2,
            text: "😹",
            cardId: 0,
            fontColor: "#E4D9FF",
            fontSize: 20,
            x: 10,
            y: 10,
          },
        ],
        color: "transparent",
        type: "emoji",
      },
    ],
    addDisplay: false,
    deleteMode: false,
  }),
  mutations: {
    setAddDisplay(state: WhiteboardUtilState, value: boolean) {
      state.addDisplay = value;
    },
    setDeleteMode(state: WhiteboardUtilState, value: boolean) {
      state.deleteMode = value;
    },
  },
  actions: {
    setAddDisplay(context: any, display: boolean) {
      context.commit("setAddDisplay", display);
    },
    setDeleteMode(context: any, deleteMode: boolean) {
      context.commit("setDeleteMode", deleteMode);
    },
  },
  getters: {
    getCardTemplates(state: WhiteboardUtilState) {
      return state.cardTemplates;
    },
    getAddDisplay(state: WhiteboardUtilState) {
      return state.addDisplay;
    },
    getDeleteMode(state: WhiteboardUtilState) {
      return state.deleteMode;
    },
  },
};

export default WhiteboardUtilModule;
