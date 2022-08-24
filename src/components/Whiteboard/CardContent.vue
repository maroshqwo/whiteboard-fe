<script lang="ts" setup>
import store from "@/store";
import { CardContent } from "@/types";
import { computed, ref } from "vue";

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
  edit: {
    type: Boolean,
    required: true,
  },
});

const save = () => {
  store.dispatch("updateCardContent", {
    cardId: props.content.cardId,
    contentId: props.content.id,
    newText: inputText.value,
  });
};

defineExpose({
  save,
});

const inputText = ref(props.content.text);

const content = computed((): CardContent => {
  return props.content as CardContent;
});
</script>

<template>
  <div
    class="cardContent"
    :style="{
      fontSize: `${content.fontSize}px`,
      color: content.fontColor,
      left: `${content.x}px`,
      top: `${content.y}px`,
    }"
  >
    <span v-if="props.edit">
      <input
        v-model="inputText"
        type="text"
        :style="{
          fontSize: `${content.fontSize}px`,
          color: content.fontColor,
          width: '90%',
          marginRight: '8px',
        }"
      />
    </span>
    <span v-if="!props.edit">{{ content.text }}</span>
  </div>
</template>

<style lang="scss">
.cardContent {
  position: absolute;
}
</style>
