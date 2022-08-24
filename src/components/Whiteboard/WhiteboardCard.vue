<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import store from "@/store";
import { Card } from "@/types";
import { createDOMCompilerError } from "@vue/compiler-dom";
import ItemResizable from "./ItemResizable.vue";
import { getNumberFromPx } from "@/utils";
import CardContent from "@/components/Whiteboard/CardContent.vue";
import Emoji from "@/components/Whiteboard/Emoji.vue";

const item = ref();
const whiteboard = computed(() => store.getters.getBoard);
const deleteMode = computed(() => store.getters.getDeleteMode);
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
  if (deleteMode.value) return;
  if (!card.value.active) store.dispatch("setActiveCard", card.value.id);
  item.value.classList.add("dragging");
  mouseCoords.x = e.clientX;
  mouseCoords.y = e.clientY;
};

const itemDragEnd = (e: any) => {
  e.stopPropagation();
  if (deleteMode.value) return;
  item.value.classList.remove("dragging");
  store.dispatch("setXCard", {
    id: card.value.id,
    x: e.clientX - mouseCoords.x,
  });
  store.dispatch("setYCard", {
    id: card.value.id,
    y: e.clientY - mouseCoords.y,
  });
};

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const contentRef = ref();
const handleSave = () => {
  if (!contentRef.value.save) {
    contentRef.value.forEach((el: any) => {
      el.save();
    });
  } else {
    contentRef.value.save();
  }
  store.dispatch("setActiveCard", -1);
};

const card = computed((): Card => {
  return props.card as Card;
});

const handleClick = (e: any) => {
  e.stopPropagation();
  if (deleteMode.value) {
    store.dispatch("deleteCard", card.value.id);
  } else {
    if (e.ctrlKey) {
      store.dispatch("toggleAddActiveCard", card.value.id);
    } else {
      store.dispatch("setActiveCard", card.value.id);
    }
  }
};
const handleDoubleClick = (e: any) => {
  e.stopPropagation();
  store.dispatch("setActiveCard", card.value.id);
  store.dispatch("setEditCard", card.value.id);
};
const handleDiscard = (e: any) => {
  e.stopPropagation();
  store.dispatch("setActiveCard", -1);
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
      height: card.type === 'emoji' ? `${card.width}px` : `${card.height}px`,
      zIndex: card.active ? 1001 : card.zIndex,
    }"
    @dragstart="itemDragStart"
    @dragend="itemDragEnd"
    @click="handleClick"
    @dblclick="handleDoubleClick"
  >
    <div v-if="card.type != 'emoji'">
      <CardContent
        v-for="content in card.content"
        :key="content.id"
        ref="contentRef"
        :content="content"
        :edit="card.edit"
      />
    </div>
    <div v-if="card.type === 'emoji'">
      <Emoji ref="contentRef" :card="card" :edit="card.edit" />
    </div>
    <ItemResizable :id="card.id" :card="card" :square="card.type === 'emoji'" />
    <div v-if="card.edit" class="edit-buttons">
      <button class="save" @click="handleSave">SAVE</button>
      <button class="discard" @click="handleDiscard">DISCARD</button>
    </div>
  </div>
</template>

<style lang="scss">
.whiteboard-item {
  position: absolute;
}

.dragging {
  z-index: -10;
}
.edit-buttons {
  position: absolute;
  z-index: 1002 !important;
  display: flex;
  flex-direction: column;
  right: -80px;
  bottom: 0px;

  button {
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 4px;
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: bold;
  }
  .discard {
    background-color: #ff0000;
  }
  .save {
    background-color: #00ff00;
  }
}
</style>
