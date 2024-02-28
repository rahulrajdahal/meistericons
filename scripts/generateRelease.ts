import { writeFileSync } from "fs";
import getCliArguments from 'minimist';
import { resolve } from "path";
import { getCurrentDir } from "./helpers";

const currentDir = getCurrentDir(import.meta.url);
const targetDir = resolve(currentDir, "../../.github/workflows");

const { releaseName } = getCliArguments((process.argv.slice(2)))

let githubToken = '${{ secrets.GITHUB_TOKEN }}';
let githubRef = '${{ github.ref  }}';
const template = `on:
    push:
    # Sequence of patterns matched against refs/tags
      tags:
      - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10

name: Create Release

jobs:
  build:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${githubToken} # This token is provided by Actions, you do not need to create your own token
        with:
          tag_name: ${githubRef}
          release_name: Release ${releaseName} - ${githubRef}
          body: |
            Changes in this Release
            - First Change
            - Second Change
          draft: false
          prerelease: false`

writeFileSync(resolve(targetDir, `./create-release.yml`), template, "utf-8");

