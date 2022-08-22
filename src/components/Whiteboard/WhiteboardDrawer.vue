<script lang="ts" setup>
import { onBeforeMount, onMounted, computed, ref } from "vue";

const show = ref(false);

const toggleShow = () => {
  show.value = !show.value;
};
</script>

<template>
  <div class="whiteboard-drawer" :style="{ width: show ? '400px' : '16px' }">
    <button class="toggleDrawerButton" @click="toggleShow">
      {{ show ? "-" : "+" }}
    </button>

    <div
      v-if="show"
      class="whiteboard-drawer-content"
      :style="{ width: '300px' }"
    >
      Functionalities
    </div>
  </div>
</template>

<style lang="scss">
.whiteboard-drawer {
  position: absolute;
  right: -2px;
  top: -2px;
  height: 100%;
  width: 376px;
  border: 2px solid rgb(126, 45, 252);
  background-color: rgb(183, 142, 248);
  display: flex;
}
.whiteboard-drawer-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.toggleDrawerButton {
  position: relative;
  top: calc(50% - 40px);
  right: 12px;
  width: 24px;
  height: 80px;
  border: 2px solid rgb(126, 45, 252);
  background-color: #fff;
}
</style>
