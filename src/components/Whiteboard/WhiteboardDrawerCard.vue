<script lang="ts" setup>
import CardTemplateSticker from "./CardTemplates/CardTemplateSticker.vue";
import CardTemplateEmoji from "./CardTemplates/CardTemplateEmoji.vue";
import store from "@/store";
import { computed } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  moveUp: {
    type: Function,
    required: true,
  },
  moveDown: {
    type: Function,
    required: true,
  },
});

const card = computed(() => props.card);

const handleDelete = (e: any) => {
  e.stopPropagation();
  store.dispatch("deleteCard", props.card.id);
};

const handleDebug = (e: any) => {
  e.stopPropagation();
  store.dispatch("debug", props.card.id);
};

const handleClick = (e: any) => {
  e.stopPropagation();

  if (e.ctrlKey) {
    store.dispatch("toggleAddActiveCard", card.value.id);
  } else {
    store.dispatch("setActiveCard", card.value.id);
  }
};

const handleUp = (e: any) => {
  e.stopPropagation();
  props.moveUp(card.value.id);
};

const handleDown = (e: any) => {
  e.stopPropagation();
  props.moveDown(card.value.id);
};
</script>

<template>
  <div
    class="whiteboard-drawer-card"
    :class="card.active ? 'active' : ''"
    @click="handleClick"
  >
    <div class="preview">
      <div v-if="props.card.type === 'emoji'">
        <CardTemplateEmoji :card="props.card" />
      </div>
      <div v-if="props.card.type === 'sticker'">
        <CardTemplateSticker :card="props.card" />
      </div>
    </div>
    <div class="info">
      <span>width: {{ props.card.width }}px</span>
      <span>height: {{ props.card.height }}px</span>
      <span>color: <input v-model="card.color" /> </span>
    </div>
    <div class="utils">
      <div>
        <button class="customButton debugButton" @click="handleDebug">
          DEBUG
        </button>
        <button class="zIndexModifier" @click="handleUp">👆</button>
      </div>
      <div>
        <button class="customButton deleteButton" @click="handleDelete">
          DELETE
        </button>
        <button class="zIndexModifier" @click="handleDown">👇</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.whiteboard-drawer-card {
  width: 100%;
  height: 100px;
  background-color: #eee;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify: space-between;
}
.active {
  background-color: rgb(216, 233, 249) !important;
}
.preview {
  flex-basis: 92px;
  height: 92px;
  background-color: transparent;
  margin: 4px;
  flex: 1;
}
.info {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 72px;
    text-align: center;
    border: none;
    outline: none;
  }
}
.utils {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
.customButton {
  border-radius: 4px;
  margin: 4px;
  padding: 4px;
  height: 40px;
  width: 64px;
  cursor: pointer;
  outline: none;
  border: none;
  font-weight: 900;
}
.deleteButton {
  background-color: rgb(187, 89, 89);
}
.debugButton {
  background-color: rgb(149, 149, 206);
}
.zIndexModifier {
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  height: px;
  padding: 4px;
  outline: none;
  border: none;

  &:first-child {
    margin-top: 8px;
  }
}
</style>
