<!-- eslint-disable unicorn/prefer-number-properties -->
<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

import type { Repos } from "./types";

import Controls from "./components/Controls.vue";
import FrameworkGrid from "./components/FrameworkGrid.vue";
import FrameworkPreview from "./components/FrameworkPreview.vue";

const version = "1.0.5";
const repos = ref<Repos | null>(null);
const selectedFramework = ref<string | null>(null);
const searchTerm = ref("");
const orderBy = ref("alphabetical");
const hasDarkLight = ref(false);
const frameworkGridRef = ref<InstanceType<typeof FrameworkGrid>>();
const stylesheet = ref<CSSStyleSheet>();

const params = new URLSearchParams(window.location.search);
const framework = params.get("framework");

if (!framework) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdn.jsdelivr.net/gh/tbolt/boltcss@main/bolt.min.css";
  document.head.append(link);
}

async function getRepos(cachedOnly = false) {
  const cachedVersion = localStorage.getItem("version");
  const cached = localStorage.getItem("repos");
  if (cached && cachedVersion === version) {
    return JSON.parse(cached) as Repos;
  }

  if (cachedOnly) {
    return null;
  }

  const response = await fetch("./repos.json");
  const reposData = await response.json() as Repos;
  localStorage.setItem("repos", JSON.stringify(reposData));
  localStorage.setItem("version", version);
  return reposData;
}

function handleUpdateCode(code: string) {
  frameworkGridRef.value?.updateFrames(code);
}

function handleUpdateWidth(width: number) {
  if (!isNaN(width)) {
    const grid = document.querySelector(".grid") as HTMLElement;
    if (grid) {
      grid.style.setProperty("grid-template-columns", `repeat(auto-fit, minmax(${width}px, 1fr))`);
    }
  }
}

function handleUpdateHeight(height: number) {
  if (!isNaN(height) && stylesheet.value) {
    stylesheet.value.replace(`.grid .framework { height: ${height}px }`);
  }
}

function handleUpdateSearch(term: string) {
  searchTerm.value = term;
}

function handleUpdateOrderBy(order: string) {
  orderBy.value = order;
}

function handleUpdateHasDarkLight(hasTheme: boolean) {
  hasDarkLight.value = hasTheme;
}

onMounted(async () => {
  if (framework) {
    document.title = framework;
    selectedFramework.value = framework;
    repos.value = await getRepos(true);
    if (!repos.value) {
      setTimeout(() => {
        loadFramework(framework);
      }, 500);
    }
  }
  else {
    await showGrid();
  }
});

async function showGrid() {
  repos.value = await getRepos();

  await nextTick();

  stylesheet.value = new CSSStyleSheet();
  stylesheet.value.replace(`.grid .framework { height: 150px }`);
  document.adoptedStyleSheets = [stylesheet.value];
}

async function loadFramework(framework: string) {
  repos.value = await getRepos(true);
  if (!repos.value) {
    setTimeout(() => {
      loadFramework(framework);
    }, 500);
  }
}
</script>

<template>
  <div id="app">
    <template v-if="selectedFramework && repos">
      <FrameworkPreview
        :framework="selectedFramework"
        :repos="repos"
      />
    </template>
    <template v-else>
      <Controls
        :repos="repos"
        @update-code="handleUpdateCode"
        @update-width="handleUpdateWidth"
        @update-height="handleUpdateHeight"
        @update-search="handleUpdateSearch"
        @update-order-by="handleUpdateOrderBy"
        @update-has-dark-light="handleUpdateHasDarkLight"
      />
      <FrameworkGrid
        ref="frameworkGridRef"
        :repos="repos"
        :search-term="searchTerm"
        :order-by="orderBy"
        :has-dark-light="hasDarkLight"
      />
    </template>
  </div>
</template>

<style>
:root {
  --font-system:
    system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
}

body {
  margin: 1rem !important;
  max-width: none;
}
</style>
