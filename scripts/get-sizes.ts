/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Framework = {
  repo: string;
  url: string;
  size?: number;
};

type ReposData = {
  frameworks: Record<string, Framework>;
};

async function downloadCSSSize(url: string): Promise<number> {
  try {
    console.log("Downloading:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const cssContent = await response.text();
    const sizeInBytes = new TextEncoder().encode(cssContent).length;

    return sizeInBytes;
  }
  catch (error) {
    console.error(`Error downloading ${url}:`, error instanceof Error ? error.message : error);
    return 0;
  }
}

async function processFrameworks() {
  const reposPath = path.join(__dirname, "..", "public", "repos.json");

  try {
    const data: ReposData = JSON.parse(fs.readFileSync(reposPath, "utf8"));
    const frameworks = Object.entries(data.frameworks);

    for (const [frameworkName, frameworkData] of frameworks) {
      if (!frameworkData.size) {
        const size = await downloadCSSSize(frameworkData.url);
        data.frameworks[frameworkName] = {
          ...frameworkData,
          size,
        };
      }
    }
    fs.writeFileSync(reposPath, JSON.stringify(data, null, 2));
  }
  catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

processFrameworks();
