<script setup lang="ts">
import { computed, ref } from "vue";

import type { Framework as FrameworkType } from "../types";

type Props = {
  name: string;
  framework: FrameworkType;
  loaded: boolean;
  visible: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  remove: [name: string];
  load: [name: string];
  updateHtml: [html: string];
}>();

const iframe = ref<HTMLIFrameElement>();
const reloading = ref(false);
const loading = computed(() => !props.loaded && !reloading.value);

function formatSize(value: number) {
  return `${(value / 1024).toFixed(2)} KB`;
}

function removeFramework() {
  emit("remove", props.name);
}

function onFrameLoad() {
  reloading.value = false;
  emit("load", props.name);
}

function onFrameUnloaded() {
  reloading.value = true;
}

function updateHtml(html: string) {
  if (iframe.value) {
    iframe.value.contentWindow?.postMessage({
      type: "update-html",
      value: html,
    }, "*");
  }
}

defineExpose({
  updateHtml,
});
</script>

<template>
  <div class="framework" :style="{ display: visible ? 'flex' : 'none' }">
    <div class="framework-header">
      <h5>
        <a :href="framework.repo" target="_blank" rel="noopener nofollow">
          {{ name }}
        </a>↗
        {{ " | " }}
        {{ formatSize(framework.size) }}
        <span v-if="framework.dark_light_theme">
          {{ " | " }}
          🌞 + 🌙
        </span>
      </h5>
      <button class="remove-btn" title="Remove framework" @click="removeFramework">
        ×
      </button>
    </div>
    <div v-if="loading" class="loader-container">
      <div class="loader" />
    </div>
    <iframe
      ref="iframe"
      :src="`/?framework=${name}`"
      @load="onFrameLoad"
      @unload="onFrameUnloaded"
    />
  </div>
</template>

<style scoped>
.framework {
  border-radius: var(--border-radius);
  color: var(--text);
  background-color: var(--background-main);
  flex-direction: column;
  overflow: hidden;
}

.framework-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

.loader {
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid gray;
  border-right-color: var(--border-color);
  animation: l2 1s infinite linear;
}

@keyframes l2 {
  to {
    transform: rotate(1turn);
  }
}

iframe {
  flex-grow: 1;
  border: none;
  width: 100%;
  background: white;
}
</style>
