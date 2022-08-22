<script lang="ts" setup>
import WhiteboardContent from "@/components/Whiteboard/WhiteboardContent.vue";
import WhiteboardControls from "@/components/Whiteboard/WhiteboardControls.vue";
import WhiteboardDrawer from "@/components/Whiteboard/WhiteboardDrawer.vue";
import { ref } from "vue";

const whiteboard = ref();

const props = defineProps({
  height: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    ref="whiteboard"
    class="whiteboard"
    :style="{
      height: `${props.height}px`,
      width: `${props.width}px`,
    }"
  >
    <WhiteboardContent
      width="1500"
      height="1000"
      :parent-width="props.width"
      :parent-height="props.height"
    />
    <WhiteboardControls />
    <WhiteboardDrawer />
  </div>
</template>

<style lang="scss">
.whiteboard {
  border-radius: 8px;
  border: 2px solid black;
  background-color: #eee;
  position: absolute;
  left: 0;
  top: 0;
  margin: 40px 40px;
  overflow: hidden;
}
</style>
