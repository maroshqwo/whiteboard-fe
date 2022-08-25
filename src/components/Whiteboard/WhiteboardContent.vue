<script lang="ts" setup>
import { onBeforeMount, onMounted, computed, ref } from "vue";
import WhiteboardCard from "./WhiteboardCard.vue";
import store from "@/store";
import Lines from "@/components/Whiteboard/Lines.vue";

const content = ref();
const whiteboardCards = computed(() => store.getters.getCards);
const whiteboard = computed(() => store.getters.getBoard);

const mouseCoords = {
  x: 0,
  y: 0,
};
const draggable = {
  x: true,
  y: true,
};

const getNumberFromPx = (px: string) => {
  return parseInt(px.replace("px", ""), 10);
};

const possition = (axis: string, pos: number) => {
  if (!draggable.x && axis == "x") {
    return content.value.style.left;
  }
  if (!draggable.y && axis == "y") {
    return content.value.style.top;
  }
  if (pos > 100) return 100;
  if (axis === "x") {
    if (pos + whiteboard.value.width < parseInt(props.parentWidth) - 100)
      return -whiteboard.value.width + parseInt(props.parentWidth) - 100;
  } else {
    if (pos + whiteboard.value.height < parseInt(props.parentHeight) - 100)
      return -whiteboard.value.height + parseInt(props.parentHeight) - 100;
  }
  return pos;
};

const contentDragStart = (e: any) => {
  mouseCoords.x = e.clientX;
  mouseCoords.y = e.clientY;
};

const contentDragEnd = (e: any) => {
  store.commit(
    "setXBoard",
    possition(
      "y",
      getNumberFromPx(content.value.style.left) + e.clientX - mouseCoords.x
    )
  );
  store.commit(
    "setYBoard",
    possition(
      "y",
      getNumberFromPx(content.value.style.top) + e.clientY - mouseCoords.y
    )
  );
};

const centerContent = (axis: string) => {
  if (axis === "x") {
    return (
      -(parseInt(whiteboard.value.width) - parseInt(props.parentWidth)) / 2
    );
  } else {
    return (
      -(parseInt(whiteboard.value.height) - parseInt(props.parentHeight)) / 2
    );
  }
};

const checkIfDraggable = () => {
  if (parseInt(whiteboard.value.width) < parseInt(props.parentWidth) - 100) {
    draggable.x = false;
  }
  if (parseInt(whiteboard.value.height) < parseInt(props.parentHeight) - 100) {
    draggable.y = false;
  }
  content.value.draggable = draggable.x || draggable.y;
  return draggable.x || draggable.y;
};

const props = defineProps({
  height: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  parentWidth: {
    type: String,
    required: true,
  },
  parentHeight: {
    type: String,
    required: true,
  },
});

const handleClick = (e: any) => {
  e.stopPropagation();
  store.dispatch("setActiveCard", -1);
  store.dispatch("setAddDisplay", false);
};

onMounted(() => {
  checkIfDraggable();
  store.commit("setXBoard", centerContent("x"));
  store.commit("setYBoard", centerContent("y"));
});
</script>

<template>
  <div
    ref="content"
    class="whiteboard-content"
    :style="{
      width: `${whiteboard.width}px`,
      height: `${whiteboard.height}px`,
      left: `${whiteboard.x}px`,
      top: `${whiteboard.y}px`,
    }"
    @click="handleClick"
    @dragstart="contentDragStart"
    @dragend="contentDragEnd"
  >
    <WhiteboardCard
      v-for="card in whiteboardCards"
      :key="card.id"
      :card="card"
    />
    <Lines />
  </div>
</template>

<style lang="scss">
.whiteboard-content {
  //background-image: url("https://png-2.vector.me/files/images/1/6/167471/dots_square_grid_02_pattern_clip_art_preview.jpg");
  background-color: #fafafa;
  box-shadow: 10px 10px 10px dimgrey;
  border-radius: 4px;
  border: 1px solid grey;
  position: absolute;
  overflow: hidden;
}
</style>
