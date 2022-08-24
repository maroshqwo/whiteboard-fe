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
});

const card = computed(() => props.card);

const handleDelete = () => {
  store.dispatch("deleteCard", props.card.id);
};

const handleDebug = () => {
  console.log("Visual filler, no need debug cuz no bugs 😎");
};
</script>

<template>
  <div class="whiteboard-drawer-card" :class="card.active ? 'active' : ''">
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
      <button class="customButton debugButton" @click="handleDebug">
        DEBUG
      </button>
      <button class="customButton deleteButton" @click="handleDelete">
        DELETE
      </button>
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
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 4px;
  padding: 4px;
  height: 40px;
  width: 64px;
  margin: 4px;
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
</style>
