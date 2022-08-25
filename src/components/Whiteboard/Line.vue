<script lang="ts" setup>
import store from "@/store";
import { computed } from "vue";

const props = defineProps({
  line: {
    type: Object,
    required: true,
  },
});

const deleteMode = computed(() => store.getters.getDeleteMode);

const handleClick = (e: any) => {
  e.stopPropagation();
  if (deleteMode.value) {
    store.dispatch("deleteLine", props.line.id);
  }
};

const line = computed(() => props.line);
</script>

<template>
  <svg>
    <line
      :x1="line.start.x"
      :y1="line.start.y"
      :x2="line.end.x"
      :y2="line.end.y"
      @click="handleClick"
    />
  </svg>
  <div
    class="XD"
    :style="{
      left: `${line.start.x - 5}px`,
      top: `${line.start.y - 5}px`,
    }"
  ></div>
  <div
    class="XD"
    :style="{
      left: `${line.end.x - 5}px`,
      top: `${line.end.y - 5}px`,
    }"
  ></div>
</template>

<style lang="scss">
.line {
  position: absolute;
  padding: 0;
  margin: 0;
  z-index: 20;
}
.XD {
  position: absolute;
  z-index: 10000;
  background-color: red;
  width: 10px;
  height: 10px;
}
svg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  line {
    stroke: black;
    stroke-width: 3;
    position: "absolute";
    z-index: 10;
  }
}
</style>
