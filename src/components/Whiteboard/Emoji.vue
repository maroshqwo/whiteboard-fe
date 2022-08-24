<script lang="ts" setup>
import store from "@/store";
import { Card } from "@/types";
import { computed, ref } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  edit: {
    type: Boolean,
    required: true,
  },
});

const card = computed(() => props.card as Card);
const inputText = ref();

const save = () => {
  store.dispatch("updateCardContent", {
    cardId: props.card.content[0].cardId,
    contentId: props.card.content[0].id,
    newText: inputText.value,
  });
};

defineExpose({
  save,
});
</script>

<template>
  <div
    v-if="!props.edit"
    class="emoji"
    :style="{
      fontSize: `${card.width * 0.88}px`,
      marginLeft: `${card.width * -0.1}px`,
      lineHeight: `${card.width}px`,
    }"
  >
    {{ card.content[0].text }}
  </div>
  <div
    v-if="props.edit"
    class="emoji"
    :style="{
      fontSize: `${card.width * 0.88}px`,
      marginLeft: `${card.width * -0.1}px`,
      lineHeight: `${card.width}px`,
    }"
  >
    <input
      v-model="inputText"
      type="text"
      :style="{
        fontSize: `${card.width * 0.88}px`,
        marginLeft: `${card.width * 0.09}px`,
        marginTop: `${card.width * 0.01}px`,
        lineHeight: `${card.width}px`,
        textAlign: 'center',
        width: `${card.width * 0.92}px`,
        height: `${card.width * 0.92}px`,
      }"
    />
  </div>
</template>

<style lang="scss" scoped></style>
