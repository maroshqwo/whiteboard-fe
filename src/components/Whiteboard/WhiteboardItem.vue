<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import store from "@/store";
import { Card } from "@/types";
import { createDOMCompilerError } from "@vue/compiler-dom";
import ItemResizable from "./ItemResizable.vue";
import { getNumberFromPx } from "@/utils";

const item = ref();
const whiteboard = computed(() => store.getters.getBoard);
const mouseCoords = {
  x: 0,
  y: 0,
};

const possition = (axis: string, pos: number) => {
  if (axis === "x") {
    if (pos < 24 - card.value.width) return 24 - card.value.width;
    if (pos > whiteboard.value.width - 24) return whiteboard.value.width - 24;
    return pos;
  } else {
    if (pos < 36 - card.value.height) return 24 - card.value.height;
    if (pos > whiteboard.value.height - 24) return whiteboard.value.height - 24;
    return pos;
  }
};

const itemDragStart = (e: any) => {
  e.stopPropagation();
  store.dispatch("setActiveCard", card.value.id);
  item.value.classList.add("dragging");
  mouseCoords.x = e.clientX;
  mouseCoords.y = e.clientY;
};

const itemDragEnd = (e: any) => {
  e.stopPropagation();
  item.value.classList.remove("dragging");
  store.dispatch("setXCard", {
    id: card.value.id,
    x: possition(
      "x",
      getNumberFromPx(item.value.style.left) + e.clientX - mouseCoords.x
    ),
  });
  store.dispatch("setYCard", {
    id: card.value.id,
    y: possition(
      "y",
      getNumberFromPx(item.value.style.top) + e.clientY - mouseCoords.y
    ),
  });
};

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const card = computed((): Card => {
  return props.card as Card;
});

const handleClick = () => {
  store.dispatch("setActiveCard", card.value.id);
};
</script>

<template>
  <div
    ref="item"
    class="whiteboard-item"
    :class="card.active ? 'active' : ''"
    draggable="true"
    :style="{
      left: `${card.x}px`,
      top: `${card.y}px`,
      backgroundColor: card.color,
      width: `${card.width}px`,
      height: `${card.height}px`,
      zIndex: card.active ? 100 : 0,
    }"
    @dragstart="itemDragStart"
    @dragend="itemDragEnd"
    @click="handleClick"
  >
    WHITEBOARD ITEM
    <ItemResizable :id="card.id" :card="card" />
  </div>
</template>

<style lang="scss">
.whiteboard-item {
  position: absolute;
}

.dragging {
  z-index: -10;
}
</style>
