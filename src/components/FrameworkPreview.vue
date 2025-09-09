<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

import type { Repos } from "../types";

type Props = {
  framework: string;
  repos: Repos | null;
};

const props = defineProps<Props>();

const exampleElement = ref<HTMLDivElement>();
const html = ref(localStorage.getItem("framework-code") || "<button>Hello World</button>");

function handleMessage(event: MessageEvent) {
  if (event.data.type === "update-html") {
    html.value = event.data.value;
  }
}

onMounted(() => {
  window.addEventListener("message", handleMessage);

  if (props.repos) {
    const info = props.repos.find(f => f.name === props.framework);
    if (info) {
      let cssLink: string | null = null;
      if (info.url.includes("github.com")) {
        const path = new URL(info.url).pathname;
        const [, user, repo, , ...file] = path.split("/");
        cssLink = `https://cdn.jsdelivr.net/gh/${user}/${repo}@${file.join("/")}`;
      }
      else if (info.url.includes("unpkg.com") || info.url.includes("jsdelivr.net")) {
        cssLink = info.url;
      }

      if (cssLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssLink;
        document.head.append(link);
      }
    }
  }
});

onUnmounted(() => {
  window.removeEventListener("message", handleMessage);
});
</script>

<template>
  <div ref="exampleElement" class="framework-preview" v-html="html" />
</template>

<style scoped>
.framework-preview {
  padding: 0.25rem;
}
</style>
