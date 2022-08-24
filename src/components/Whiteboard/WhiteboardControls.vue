<script lang="ts" setup>
import store from "@/store";
import CardTemplate from "@/components/Whiteboard/CardTemplate.vue";
import { computed, ref } from "vue";

const cardTemplates = store.getters.getCardTemplates;
const displayAdd = computed(() => store.getters.getAddDisplay);
const deleteMode = computed(() => store.getters.getDeleteMode);

const toggleAdd = (e: any) => {
  e.stopPropagation();
  store.dispatch("setAddDisplay", !displayAdd.value);
};

const toggleDelete = (e: any) => {
  e.stopPropagation();
  store.dispatch("setDeleteMode", !deleteMode.value);
};

const handleCreateGroup = (e: any) => {
  e.stopPropagation();
  store.dispatch("addGroup");
};

const deleteSelected = (e: any) => {
  e.stopPropagation();
  store.dispatch("deleteSelected");
};
</script>

<template>
  <div class="whiteboard-controls">
    <div v-if="displayAdd" class="whiteboard-controls-add">
      <CardTemplate
        v-for="card in cardTemplates"
        :key="card.id"
        :card-template="card"
      />
    </div>
    <div class="whiteboard-controls-buttons">
      <button @click="toggleAdd">+</button>
      <button
        :style="{ backgroundColor: deleteMode ? 'red' : '#fff' }"
        @click="toggleDelete"
      >
        -
      </button>
      <button @click="handleCreateGroup">GRP</button>
      <button @click="deleteSelected">DEL</button>
    </div>
  </div>
</template>

<style lang="scss">
.whiteboard-controls {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 300px;
  bottom: 40px;
  left: calc(50% - 150px);
  align-content: flex-end;
  z-index: 1001;
}
.whiteboard-controls-add {
  background-color: red;
  width: 300px;
  height: 150px;
  flex: 1;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 12px;
  border-radius: 8px;
  background-color: #eee;
  border: 1px solid #ddd;
  overflow-x: scroll;
}
.whiteboard-controls-buttons {
  flex: 1;

  button {
    width: 40px;
    height: 40px;
    border: 2px solid rgb(126, 45, 252);
    border-radius: 4px;
    margin: 0 2px;
    background-color: #fff;
    &:hover {
      background-color: #ddd;
      cursor: pointer;
    }
  }
}
</style>
