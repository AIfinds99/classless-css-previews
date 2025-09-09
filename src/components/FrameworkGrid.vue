<script setup lang="ts">
import { computed, ref } from "vue";

import type { Repos } from "../types";

import Framework from "./Framework.vue";

type Props = {
  repos: Repos | null;
  searchTerm: string;
  orderBy: string;
  hasDarkLight: boolean;
};

const props = defineProps<Props>();

const frameworkRefs = ref<InstanceType<typeof Framework>[]>([]);
const loadedFrames = ref(new Set<string>());
const removedFrameworks = ref<string[]>(JSON.parse(localStorage.getItem("removed-frameworks") || "[]"));

const allFrameworks = computed(() => {
  if (!props.repos)
    return [];

  if (props.orderBy === "size-asc") {
    return [...props.repos].sort((a, b) => a.size - b.size);
  }
  else {
    return props.repos;
  }

  return props.repos;
});

function isFrameworkVisible(name: string) {
  if (removedFrameworks.value.includes(name)) {
    return false;
  }

  if (props.hasDarkLight) {
    const framework = props.repos?.find(f => f.name === name);
    if (!framework || !framework.dark_light_theme) {
      return false;
    }
  }

  if (props.searchTerm.trim()) {
    return name.toLowerCase().includes(props.searchTerm.toLowerCase());
  }

  return true;
}

function removeFramework(name: string) {
  if (!removedFrameworks.value.includes(name)) {
    removedFrameworks.value.push(name);
    localStorage.setItem("removed-frameworks", JSON.stringify(removedFrameworks.value));
  }
}

function addFramework(name: string) {
  const index = removedFrameworks.value.indexOf(name);
  if (index > -1) {
    removedFrameworks.value.splice(index, 1);
    localStorage.setItem("removed-frameworks", JSON.stringify(removedFrameworks.value));
  }
}

function onFrameLoad(name: string) {
  loadedFrames.value.add(name);
}

function updateFrames(html: string) {
  frameworkRefs.value.forEach((framework) => {
    framework.updateHtml(html);
  });
}

defineExpose({
  updateFrames,
});
</script>

<template>
  <div>
    <div v-if="removedFrameworks.length > 0" class="removed-frameworks">
      <h4>Frameworks</h4>
      <div class="removed-list">
        <button
          v-for="name in removedFrameworks"
          :key="name"
          class="add-btn"
          @click="addFramework(name)"
        >
          + {{ name }}
        </button>
      </div>
    </div>
    <div class="grid">
      <Framework
        v-for="framework in allFrameworks"
        :key="framework.name"
        ref="frameworkRefs"
        :name="framework.name"
        :framework="framework"
        :loaded="loadedFrames.has(framework.name)"
        :visible="isFrameworkVisible(framework.name)"
        @remove="removeFramework"
        @load="onFrameLoad"
      />
    </div>
  </div>
</template>

<style scoped>
.grid {
  margin: 0 1rem;
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  align-items: center;
  font-family: var(--font-system);
}

.removed-frameworks {
  margin-bottom: 2rem;
  padding: 1rem;
  font-family: var(--font-system);

  .removed-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
