<script lang="ts" setup>
import Line from "@/components/Whiteboard/Line.vue";
import store from "@/store";
import { computed } from "vue";

const lines = computed(() => store.getters.getLines);
</script>

<template>
  <div class="lines">
    <Line v-for="line in lines" :key="line.id" :line="line" />
  </div>
</template>

<style lang="scss">
.lines {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
