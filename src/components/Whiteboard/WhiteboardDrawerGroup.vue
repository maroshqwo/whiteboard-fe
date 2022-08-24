<script lang="ts" setup>
import store from "@/store";
import { computed, ref } from "vue";
import CardTemplateEmoji from "./CardTemplates/CardTemplateEmoji.vue";
import CardTemplateSticker from "./CardTemplates/CardTemplateSticker.vue";

const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
});

console.log(props.group);
const groupName = ref(props.group.name);
const editGroupName = ref(false);

const handleDelete = (e: any) => {
  e.stopPropagation();
  store.dispatch("deleteGroup", props.group.id);
};

const handleDisgroup = (e: any) => {
  e.stopPropagation();
  store.dispatch("disgroup", props.group.id);
};

const setActiveAll = (e: any) => {
  e.stopPropagation();
  store.dispatch("setActiveCard", -1);
  for (const card of props.group.cards) {
    store.dispatch("addActiveCard", card.id);
  }
};

const toggleEditGroupName = (e: any) => {
  e.stopPropagation();
  editGroupName.value = !editGroupName.value;
  store.dispatch("changeGroupName", {
    id: props.group.id,
    name: groupName.value,
  });
};
</script>

<template>
  <div class="whiteboard-drawer-card" @click="setActiveAll">
    <div class="preview">
      <div class="inMashup" :style="{ zIndex: 10 }">
        <div class="inMashupElement el1">
          <CardTemplateEmoji
            v-if="props.group.cards[0]?.type === 'emoji'"
            :card="props.group.cards[0]"
          />
        </div>
      </div>
      <div class="inMashup" :style="{ zIndex: 11 }">
        <div class="inMashupElement el2">
          <CardTemplateEmoji
            v-if="props.group.cards[1]?.type === 'emoji'"
            :card="props.group.cards[1]"
          />
        </div>
      </div>
      <div class="inMashup" :style="{ zIndex: 12 }">
        <div class="inMashupElement el3">
          <CardTemplateEmoji
            v-if="props.group.cards[2]?.type === 'emoji'"
            :card="props.group.cards[2]"
          />
        </div>
      </div>
      <div class="inMashup" :style="{ zIndex: 1 }">
        <div class="inMashupElement el1">
          <CardTemplateSticker
            v-if="props.group.cards[0]?.type === 'sticker'"
            :card="props.group.cards[0]"
          />
        </div>
      </div>
      <div class="inMashup" :style="{ zIndex: 2 }">
        <div class="inMashupElement el2">
          <CardTemplateSticker
            v-if="props.group.cards[1]?.type === 'sticker'"
            :card="props.group.cards[1]"
          />
        </div>
      </div>
      <div class="inMashup" :style="{ zIndex: 3 }">
        <div class="inMashupElement el3">
          <CardTemplateSticker
            v-if="props.group.cards[2]?.type === 'sticker'"
            :card="props.group.cards[2]"
          />
        </div>
      </div>
    </div>
    <div class="info">
      <span :style="{ fontWeight: 'bold' }" @dblclick="toggleEditGroupName"
        >{{ !editGroupName ? props.group.name : ""
        }}<input
          v-if="editGroupName"
          v-model="groupName"
          class="editNameInput"
        /><button
          v-if="editGroupName"
          class="saveNameChangeButton"
          @click="toggleEditGroupName"
        >
          ok
        </button></span
      ><br />
      Elements: {{ props.group.cards.length }}
    </div>
    <div class="utils">
      <div>
        <button class="customButton discardButton" @click="handleDisgroup">
          DISGROUP
        </button>
      </div>
      <div>
        <button class="customButton deleteButton" @click="handleDelete">
          DELETE
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.whiteboard-drawer-card {
  width: 100%;
  height: 100px;
  background-color: #eee;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify: space-between;
}
.preview {
  flex-basis: 80px;
  height: 92px;
  background-color: transparent;
  margin: 4px;
  flex: 1;
}
.info {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.customButton {
  border-radius: 4px;
  margin: 4px;
  padding: 4px;
  height: 40px;
  width: 80px;
  cursor: pointer;
  outline: none;
  border: none;
  font-weight: 900;
}
.deleteButton {
  background-color: rgb(187, 89, 89);
}
.discardButton {
  background-color: rgb(225, 165, 165);
}
.inMashup {
  position: absolute;
}
.el1 {
  position: relative;
  right: 10px;
  bottom: 16px;
}
.el2 {
  position: relative;
  left: 10px;
}
.el3 {
  position: relative;
  top: 16px;
}
.editNameInput {
  width: 60px;
  border: none;
  outline: none;
  font-weight: bold;
}
.saveNameChangeButton {
  background-color: #ccc;
  border: none;
  outline: none;
  font-weight: bold;
}
</style>
