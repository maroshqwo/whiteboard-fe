import { createStore } from "vuex";
import WhiteboardModule from "@/store/whiteboard";
import WhiteboardUtilModule from "./whiteboard-util";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { WhiteboardModule, WhiteboardUtilModule },
});
