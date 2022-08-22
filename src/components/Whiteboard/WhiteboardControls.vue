<script lang="ts" setup>
import store from "@/store";

const handleKys = (e: any) => {
  store.dispatch("deleteCard", 1);
};
</script>

<template>
  <div class="whiteboard-controls">
    <button @click="handleKys">1.</button>
    <button>2.</button>
    <button>3.</button>
  </div>
</template>

<style lang="scss">
.whiteboard-controls {
  position: absolute;
  width: 200px;
  bottom: 40px;
  left: calc(50% - 100px);
}
</style>
