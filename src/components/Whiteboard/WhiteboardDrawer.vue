<script lang="ts" setup>
import { onBeforeMount, onMounted, computed, ref } from "vue";
import store from "@/store";
import WhiteboardDrawerCard from "@/components/Whiteboard/WhiteboardDrawerCard.vue";
import WhiteboardDrawerGroup from "./WhiteboardDrawerGroup.vue";

const show = ref(false);
const displayCards = ref(false);
const displayGroups = ref(false);
const groups = computed(() => store.getters.getGroups);
// sort cards by z-index
const cardsSorted = computed(() => {
  return store.getters.getCards.sort((a: any, b: any) => {
    return b.zIndex - a.zIndex;
  });
});

const toggleShow = () => {
  show.value = !show.value;
};

const toggleDisplayCards = () => {
  displayCards.value = !displayCards.value;
};

const toggleDisplayGroups = () => {
  displayGroups.value = !displayGroups.value;
};

const moveUp = (id: number) => {
  cardsSorted.value.forEach((card: any, index: number) => {
    if (card.id === id && index != 0) {
      let prevZIndex = card.zIndex;
      card.zIndex = cardsSorted.value[index - 1].zIndex;
      cardsSorted.value[index - 1].zIndex = prevZIndex;
    }
  });
};
const moveDown = (id: number) => {
  cardsSorted.value.forEach((card: any, index: number) => {
    if (card.id === id && index != cardsSorted.value.length - 1) {
      let prevZIndex = card.zIndex;
      card.zIndex = cardsSorted.value[index + 1].zIndex;
      cardsSorted.value[index + 1].zIndex = prevZIndex;
    }
  });
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
      <h2>
        Cards<button class="chevronButton" @click="toggleDisplayCards">
          {{ displayCards ? "👇" : "👈" }}
        </button>
      </h2>
      <div v-if="displayCards">
        <WhiteboardDrawerCard
          v-for="card in cardsSorted"
          :key="card.id"
          :card="card"
          :move-up="moveUp"
          :move-down="moveDown"
        />
      </div>
      <h2>
        Groups<button class="chevronButton" @click="toggleDisplayGroups">
          {{ displayGroups ? "👇" : "👈" }}
        </button>
      </h2>
      <div>
        <WhiteboardDrawerGroup
          v-for="group in groups"
          :key="group.id"
          :group="group"
        />
      </div>
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
  padding-right: 24px;
  border: 2px solid rgb(126, 45, 252);
  background-color: #ddd;
  display: flex;
  overflow-y: scroll;
}
.whiteboard-drawer-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.toggleDrawerButton {
  position: relative;
  right: 2px;
  width: 24px;
  height: 100%;
  margin-right: 8px;
  border: 2px solid rgb(126, 45, 252);
  background-color: #fff;
}
h2 {
  text-align: left;
}
.chevronButton {
  position: relative;
  font-size: 24px;
  width: 24px;
  height: 16px;
  background-color: transparent;
  outline: none;
  border: none !important;
}
</style>
