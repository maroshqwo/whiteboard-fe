<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import store from "@/store";
import { Card } from "@/types";
import { createDOMCompilerError } from "@vue/compiler-dom";

const item = ref();
const whiteboard = computed(() => store.getters.getBoard);
const mouseCoords = {
  x: 0,
  y: 0,
};

const getNumberFromPx = (px: string) => {
  return parseInt(px.replace("px", ""), 10);
};

const possition = (axis: string, pos: number) => {
  if (axis === "x") {
    if (pos + card.value.width < 36) return 36 - card.value.width;
    if (pos - 36 > whiteboard.value.width) return whiteboard.value.width - 36;
    return pos;
  } else {
    if (pos + card.value.height < 36) return 36 - card.value.height;
    if (pos - 36 > whiteboard.value.height) return whiteboard.value.height - 36;
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

const resizeStart = (e: any) => {
  e.stopPropagation();
  mouseCoords.x = e.clientX;
  mouseCoords.y = e.clientY;
};

const resizeEnd = async (e: any) => {
  e.stopPropagation();
  const heightBefore = getNumberFromPx(item.value.style.height);
  const widthBefore = getNumberFromPx(item.value.style.width);
  const xBefore = getNumberFromPx(item.value.style.left);
  const yBefore = getNumberFromPx(item.value.style.top);
  if (e.target.classList.contains("rb")) {
    await store.dispatch("setWidthCard", {
      id: card.value.id,
      width: widthBefore + (e.clientX - mouseCoords.x),
    });
    await store.dispatch("setHeightCard", {
      id: card.value.id,
      height: heightBefore + (e.clientY - mouseCoords.y),
    });
    store.dispatch("setXCard", {
      id: card.value.id,
      x: possition("x", xBefore),
    });
    store.dispatch("setYCard", {
      id: card.value.id,
      y: possition("y", yBefore),
    });
  }
  if (e.target.classList.contains("lb")) {
    await store.dispatch("setWidthCard", {
      id: card.value.id,
      width: widthBefore - (e.clientX - mouseCoords.x),
    });
    await store.dispatch("setHeightCard", {
      id: card.value.id,
      height: heightBefore + (e.clientY - mouseCoords.y),
    });
    store.dispatch("setXCard", {
      id: card.value.id,
      x: possition("x", xBefore + (e.clientX - mouseCoords.x)),
    });
    store.dispatch("setYCard", {
      id: card.value.id,
      y: possition("y", yBefore),
    });
  }
  if (e.target.classList.contains("lt")) {
    await store.dispatch("setWidthCard", {
      id: card.value.id,
      width: widthBefore - (e.clientX - mouseCoords.x),
    });
    await store.dispatch("setHeightCard", {
      id: card.value.id,
      height: heightBefore - (e.clientY - mouseCoords.y),
    });
    store.dispatch("setXCard", {
      id: card.value.id,
      x: possition("x", xBefore + (e.clientX - mouseCoords.x)),
    });
    store.dispatch("setYCard", {
      id: card.value.id,
      y: possition("y", yBefore + (e.clientY - mouseCoords.y)),
    });
  }
  if (e.target.classList.contains("rt")) {
    await store.dispatch("setWidthCard", {
      id: card.value.id,
      width: widthBefore + (e.clientX - mouseCoords.x),
    });
    await store.dispatch("setHeightCard", {
      id: card.value.id,
      height: heightBefore - (e.clientY - mouseCoords.y),
    });
    store.dispatch("setXCard", {
      id: card.value.id,
      x: possition("x", xBefore),
    });
    store.dispatch("setYCard", {
      id: card.value.id,
      y: possition("y", yBefore + (e.clientY - mouseCoords.y)),
    });
  }
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
    }"
    @dragstart="itemDragStart"
    @dragend="itemDragEnd"
    @click="handleClick"
  >
    WHITEBOARD ITEM
    <div
      v-if="card.active"
      class="resize lb"
      draggable="true"
      disabled="true"
      @dragstart="resizeStart"
      @dragend="resizeEnd"
    />
    <div
      v-if="card.active"
      class="resize lt"
      draggable="true"
      disabled="true"
      @dragstart="resizeStart"
      @dragend="resizeEnd"
    />
    <div
      v-if="card.active"
      class="resize rt"
      draggable="true"
      disabled="true"
      @dragstart="resizeStart"
      @dragend="resizeEnd"
    />
    <div
      v-if="card.active"
      class="resize rb"
      draggable="true"
      disabled="true"
      @dragstart="resizeStart"
      @dragend="resizeEnd"
    />
  </div>
</template>

<style lang="scss">
.whiteboard-item {
  position: absolute;
}
.active {
  z-index: 1001;
  outline: 3px solid rgb(12, 155, 180);
}
.dragging {
  z-index: -10;
}
.resize {
  position: absolute;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 4px solid rgb(20, 136, 157);
  background-color: rgb(12, 155, 180);
}
.lt {
  left: -8px;
  top: -8px;
  cursor: se-resize;
}
.lb {
  left: -8px;
  bottom: -8px;
  cursor: sw-resize;
}
.rt {
  right: -8px;
  top: -8px;
  cursor: sw-resize;
}
.rb {
  right: -8px;
  bottom: -8px;
  cursor: se-resize;
}
</style>
