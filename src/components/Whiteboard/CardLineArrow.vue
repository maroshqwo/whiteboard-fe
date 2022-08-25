<script lang="ts" setup>
import store from "@/store";
import { computed } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const createLineStart = computed(() => store.getters.getCreateLineStart);
const createLineEnd = computed(() => store.getters.getCreateLineEnd);

const elementIdSplit = (id: string) => {
  let splitElementId = id.split("_");
  return { id: parseInt(splitElementId[0]), pos: splitElementId[1] };
};

const arrowOnDragStart = (e: any) => {
  e.stopPropagation();
  const { id, pos } = elementIdSplit(e.target.id);
  store.dispatch("setCreateLineStart", { id, pos });
};

const arrowDragEnter = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  const { id, pos } = elementIdSplit(e.target.id);
  store.dispatch("setCreateLineEnd", { id, pos });
};

const arrowDragLeave = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  if (!e.target.id) {
    store.dispatch("setCreateLineEnd", null);
  }
};

const arrowOnDragEnd = (e: any) => {
  e.stopPropagation();
  if (createLineStart && createLineEnd) {
    store.dispatch("createLine", {
      start: createLineStart.value,
      end: createLineEnd.value,
    });
  }
};
</script>

<template>
  <div
    :id="card.id.toString() + '_t'"
    class="top dots"
    draggable="true"
    @dragstart="arrowOnDragStart"
    @dragend="arrowOnDragEnd"
    @dragenter="arrowDragEnter"
    @dragleave="arrowDragLeave"
  />
  <div
    :id="card.id + '_b'"
    class="bottom dots"
    draggable="true"
    @dragstart="arrowOnDragStart"
    @dragend="arrowOnDragEnd"
    @dragenter="arrowDragEnter"
    @dragleave="arrowDragLeave"
  />
  <div
    :id="card.id + '_l'"
    class="left dots"
    draggable="true"
    @dragstart="arrowOnDragStart"
    @dragend="arrowOnDragEnd"
    @dragenter="arrowDragEnter"
    @dragleave="arrowDragLeave"
  />
  <div
    :id="card.id + '_r'"
    class="right dots"
    draggable="true"
    @dragstart="arrowOnDragStart"
    @dragend="arrowOnDragEnd"
    @dragenter="arrowDragEnter"
    @dragleave="arrowDragLeave"
  />
</template>

<style lang="scss" scoped>
.card-line-arrow {
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dots {
  position: absolute;
  border-radius: 50%;
  border: 2px dotted rgb(126, 45, 252);
  width: 16px;
  height: 16px;
}
.top {
  top: -32px;
  left: calc(50% - 10px);
}
.bottom {
  bottom: -32px;
  left: calc(50% - 10px);
}
.left {
  left: -32px;
  top: calc(50% - 10px);
}
.right {
  right: -32px;
  top: calc(50% - 10px);
}
</style>
