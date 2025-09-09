<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import type { Repos } from "../types";

import { examples } from "../constants";

const props = defineProps<{
  repos: Repos | null;
}>();

const emit = defineEmits<{
  updateCode: [code: string];
  updateWidth: [width: number];
  updateHeight: [height: number];
  updateSearch: [searchTerm: string];
  updateOrderBy: [orderBy: string];
  updateHasDarkLight: [hasDarkLight: boolean];
}>();

const code = ref(localStorage.getItem("framework-code") || "<button>Hello World</button>");
const width = ref(Number(localStorage.getItem("framework-width")) || 300);
const height = ref(Number(localStorage.getItem("framework-height")) || 500);
const searchTerm = ref(localStorage.getItem("framework-search") || "");
const selectedExample = ref(localStorage.getItem("framework-selected-example") || "button");
const orderBy = ref(localStorage.getItem("framework-order-by") || "alphabetical");
const hasDarkLight = ref(localStorage.getItem("framework-has-dark-light") === "true");
const screenWidth = ref(window.innerWidth);
const codeEditor = ref<HTMLTextAreaElement>();
const numRepos = computed(() => props.repos?.length || 0);

const maxWidth = computed(() => {
  return Math.floor(screenWidth.value * 0.9);
});

// eslint-disable-next-line ts/no-unsafe-function-type
function debounce(func: Function, delay: number) {
  let timeoutId: number;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

function handleResize() {
  screenWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);

  emit("updateCode", code.value);
  emit("updateWidth", Number(width.value));
  emit("updateHeight", Number(height.value));
  emit("updateSearch", searchTerm.value);
  emit("updateOrderBy", orderBy.value);
  emit("updateHasDarkLight", hasDarkLight.value);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

function updateCode() {
  localStorage.setItem("framework-code", code.value);
  emit("updateCode", code.value);
}

function updateWidth() {
  const widthValue = Number(width.value);
  localStorage.setItem("framework-width", widthValue.toString());
  emit("updateWidth", widthValue);
}

function updateSearch() {
  localStorage.setItem("framework-search", searchTerm.value);
  emit("updateSearch", searchTerm.value);
}

function updateOrderBy() {
  localStorage.setItem("framework-order-by", orderBy.value);
  emit("updateOrderBy", orderBy.value);
}

function updateHasDarkLight() {
  localStorage.setItem("framework-has-dark-light", hasDarkLight.value.toString());
  emit("updateHasDarkLight", hasDarkLight.value);
}

const debouncedUpdateHeight = debounce((value: number) => {
  localStorage.setItem("framework-height", value.toString());
  emit("updateHeight", value);
}, 150);

function updateHeight() {
  debouncedUpdateHeight(Number(height.value));
}

function formatExampleName(key: string) {
  return key.split("-").map(word =>
    word.charAt(0).toUpperCase() + word.slice(1),
  ).join(" ");
}

function loadExample() {
  if (selectedExample.value && selectedExample.value in examples) {
    code.value = examples[selectedExample.value as keyof typeof examples];
    localStorage.setItem("framework-selected-example", selectedExample.value);
    updateCode();
  }
  else if (selectedExample.value === "") {
    localStorage.setItem("framework-selected-example", "");
  }
}

function codeKeyDown(event: KeyboardEvent) {
  if (!codeEditor.value)
    return;
  if (event.code === "Tab") {
    codeEditor.value.setRangeText("\t", codeEditor.value.selectionStart, codeEditor.value.selectionStart, "end");
    event.preventDefault();
    return false;
  }
};
</script>

<template>
  <div class="controls">
    <h2>Classless CSS Framework Previews</h2>
    <p>Preview <strong>{{ numRepos }}</strong> classless css frameworks side by side.</p>
    <p>Each framework is loaded via CDN from jsdelivr (initial page load will take a second 😉)</p>
    <p>To make it on to this list, the framework must at least style a <code>button</code> element by default with no classes.</p>
    <p>Thanks to <a href="https://github.com/dbohdan/classless-css" target="_blank" rel="noopener nofollow">dbohdan/classless-css</a> for the original list of frameworks.</p>
    <div class="example-selector">
      <label>Choose Example:</label>
      <select
        v-model="selectedExample"
        class="example-select"
        @change="loadExample"
      >
        <option
          v-for="key in Object.keys(examples)"
          :key="key"
          :value="key"
        >
          {{ formatExampleName(key) }}
        </option>
      </select>
    </div>

    <textarea
      ref="codeEditor"
      v-model="code"
      class="code-editor"
      rows="10"
      cols="10"
      @keydown="codeKeyDown"
    />
    <div class="button-container">
      <button @click="updateCode">
        Update
      </button>
    </div>
    <br>
    <div class="slider-control">
      <label>Width</label>
      <input
        v-model="width"
        type="range"
        :min="100"
        :max="maxWidth"
        class="slider"
        @input="updateWidth"
      >
    </div>
    <div class="slider-control">
      <label>Height</label>
      <input
        v-model="height"
        type="range"
        :min="100"
        :max="2000"
        class="slider"
        @input="updateHeight"
      >
    </div>
    <br>
    <div class="filter-sort">
      <div>
        <label>Filter</label>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Type to filter frameworks..."
          class="search-input"
          @input="updateSearch"
        >
      </div>
      <div>
        <label>Order by:</label>
        <select
          v-model="orderBy"
          @change="updateOrderBy"
        >
          <option value="alphabetical">
            Alphabetical
          </option>
          <option value="size-asc">
            Size (ascending)
          </option>
        </select>
      </div>
    </div>
    <div>
      <label>
        <input
          v-model="hasDarkLight"
          type="checkbox"
          @change="updateHasDarkLight"
        >
        Has Dark / Light Theme
      </label>
    </div>
    <hr>
  </div>
</template>

<style scoped>
.controls {
  font-family: var(--font-system);
}

.code-editor,
.button-container {
  max-width: 400px;
  width: 100%;
}

.button-container {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
}

.filter-sort {
  display: flex;
  gap: 1rem;
}
</style>
