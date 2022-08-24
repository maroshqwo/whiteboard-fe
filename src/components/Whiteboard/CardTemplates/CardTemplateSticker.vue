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
  <div class="card" :style="{ backgroundColor: card.color }">
    <div class="card-header">
      <h5 class="card-title" :style="{ color: card.content[0].fontColor }">
        {{ card.content[0] ? card.content[0].text : "Sticker" }}
      </h5>
    </div>
    <div class="card-body">
      <span class="card-text">
        {{ card.content[1] ? card.content[1].text : "" }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 80%;
  height: 46%;
  margin: 27% auto;
  outline: 1px solid #aaa;
}
.card-title {
  text-align: left;
  margin: 2px;
}
.card-body {
  text-align: left;
  margin: 0;
  max-width: 72px;
  overflow: hidden;
  max-height: 40px;
}
.card-text {
  line-height: 7px;
  letter-spacing: -0.5px;
  line-break: anywhere;
  text-align: left;
  font-size: 10px;
}
</style>
