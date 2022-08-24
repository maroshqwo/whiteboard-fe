<script lang="ts" setup>
import { CardTemplate } from "@/types";
import { computed } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});
const card = computed<CardTemplate>(() => props.card as CardTemplate);
</script>

<template>
  <div class="template">
    <h1>{{ card.content[0].text }}</h1>
  </div>
</template>

<style lang="scss" scoped>
.template {
  width: 100%;
  height: 100%;
}
h1 {
  font-size: 48px;
  line-height: 96px;
  padding: 0;
  margin: 0;
}
</style>
