<script lang="ts" setup>
import CardTemplateEmoji from "./CardTemplates/CardTemplateEmoji.vue";
import CardTemplateSticker from "./CardTemplates/CardTemplateSticker.vue";
import store from "@/store";
import { CardTemplate } from "@/types";
import { computed } from "vue";

const whiteboard = store.getters.getWhiteboard;

const props = defineProps({
  cardTemplate: {
    type: Object,
    required: true,
  },
});

const cardTemplate = computed(() => props.cardTemplate as CardTemplate);

const handleAdd = () => {
  store.dispatch("addCard", props.cardTemplate);
};
</script>

<template>
  <div class="cardTemplate" @click="handleAdd">
    <CardTemplateSticker
      v-if="cardTemplate.type === 'sticker'"
      :card="cardTemplate"
    />
    <CardTemplateEmoji
      v-if="cardTemplate.type === 'emoji'"
      :card="cardTemplate"
    />
  </div>
</template>

<style lang="scss">
.cardTemplate {
  height: 96px;
  margin: 0 4px;
  flex-basis: 96px;
  flex-grow: 0;
  flex-shrink: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:hover {
    border: 1px solid aqua;
    outline: 2px solid aqua;
    background-color: rgb(126, 45, 252);
    cursor: pointer;
  }
}
</style>
