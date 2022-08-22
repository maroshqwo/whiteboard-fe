<script lang="ts" setup>
import { getNumberFromPx } from "@/utils";
import { computed } from "vue";
import store from "@/store";
import { Card } from "@/types";

const mouseCoords = {
  x: 0,
  y: 0,
};

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  card: {
    type: Object,
    required: true,
  },
});

const card = computed((): Card => {
  return props.card as Card;
});
const whiteboard = computed(() => store.getters.getBoard);

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

const resizeStart = (e: any) => {
  e.stopPropagation();
  mouseCoords.x = e.clientX;
  mouseCoords.y = e.clientY;
};

const resizeEnd = async (e: any) => {
  e.stopPropagation();
  const heightBefore = card.value.height;
  const widthBefore = card.value.width;
  const xBefore = card.value.x;
  const yBefore = card.value.y;
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
  if (e.target.classList.contains("t")) {
    await store.dispatch("setHeightCard", {
      id: card.value.id,
      height: heightBefore - (e.clientY - mouseCoords.y),
    });
    store.dispatch("setYCard", {
      id: card.value.id,
      y: possition("y", yBefore + (e.clientY - mouseCoords.y)),
    });
  }
  if (e.target.classList.contains("b")) {
    await store.dispatch("setHeightCard", {
      id: card.value.id,
      height: heightBefore + (e.clientY - mouseCoords.y),
    });
    store.dispatch("setYCard", {
      id: card.value.id,
      y: possition("y", yBefore),
    });
  }
  if (e.target.classList.contains("l")) {
    await store.dispatch("setWidthCard", {
      id: card.value.id,
      width: widthBefore - (e.clientX - mouseCoords.x),
    });
    store.dispatch("setXCard", {
      id: card.value.id,
      x: possition("x", xBefore + (e.clientX - mouseCoords.x)),
    });
  }
  if (e.target.classList.contains("r")) {
    await store.dispatch("setWidthCard", {
      id: card.value.id,
      width: widthBefore + (e.clientX - mouseCoords.x),
    });
    store.dispatch("setXCard", {
      id: card.value.id,
      x: possition("x", xBefore),
    });
  }
};
</script>

<template>
  <div
    v-if="card.active"
    class="resizeCorner lb"
    draggable="true"
    disabled="true"
    @dragstart="resizeStart"
    @dragend="resizeEnd"
  />
  <div
    v-if="card.active"
    class="resizeCorner lt"
    draggable="true"
    disabled="true"
    @dragstart="resizeStart"
    @dragend="resizeEnd"
  />
  <div
    v-if="card.active"
    class="resizeCorner rt"
    draggable="true"
    disabled="true"
    @dragstart="resizeStart"
    @dragend="resizeEnd"
  />
  <div
    v-if="card.active"
    class="resizeCorner rb"
    draggable="true"
    disabled="true"
    @dragstart="resizeStart"
    @dragend="resizeEnd"
  />
  <div
    v-if="card.active"
    class="resizeSide r"
    draggable="true"
    disabled="true"
    @dragstart="resizeStart"
    @dragend="resizeEnd"
  />
  <div
    v-if="card.active"
    class="resizeSide b"
    draggable="true"
    disabled="true"
    @dragstart="resizeStart"
    @dragend="resizeEnd"
  />
  <div
    v-if="card.active"
    class="resizeSide t"
    draggable="true"
    disabled="true"
    @dragstart="resizeStart"
    @dragend="resizeEnd"
  />
  <div
    v-if="card.active"
    class="resizeSide l"
    draggable="true"
    disabled="true"
    @dragstart="resizeStart"
    @dragend="resizeEnd"
  />
</template>

<style lang="scss">
.resizeCorner {
  position: absolute;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 4px solid rgb(126, 45, 252);
  background-color: #fff;
}
.resizeSide {
  position: absolute;
  box-sizing: border-box;
  background-color: rgb(126, 45, 252);
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
.l {
  left: -2px;
  top: 8px;
  height: calc(100% - 16px);
  width: 4px;
  cursor: e-resize;
}
.r {
  right: -2px;
  top: 8px;
  height: calc(100% - 16px);
  width: 4px;
  cursor: e-resize;
}
.t {
  left: 8px;
  top: -2px;
  width: calc(100% - 16px);
  height: 4px;
  cursor: n-resize;
}
.b {
  left: 8px;
  bottom: -2px;
  width: calc(100% - 16px);
  height: 4px;
  cursor: n-resize;
}
</style>
