import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

export default {

  paths() {
    const currentDir = fileURLToPath(new URL(import.meta.url));
    const iconsDir = resolve(currentDir, "../../../icons");

    const toCamelCase = (string: string) =>
      string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) =>
        p2 ? p2.toUpperCase() : p1.toLowerCase()
      );

    const toPascalCase = (string: string) =>
      toCamelCase(string).charAt(0).toUpperCase() + toCamelCase(string).slice(1);

    const getSvgCode = (icon: string) => readFileSync(icon, 'utf8')

    const icons = readdirSync(iconsDir).map((category: string) =>
      readdirSync(`icons/${category}`).map((icon) => {

        const content = `# Icon

${icon.replace('.svg', '')}


## Installation


::: code-group

\`\`\`css
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/meistericons@latest/fonts/mni.css">
\`\`\`

\`\`\`react
npm i meistericons-react --save
\`\`\`
\`\`\`vue
npm i meistericons-vue --save
\`\`\`
\`\`\`vue3
npm i meistericons-vue-latest --save
\`\`\`
:::
## Usage 
::: code-group
\`\`\`css
<i class='mni-${icon.replace('.svg', '')}'></i>
\`\`\`
\`\`\`react
import { ${toPascalCase(icon.replace('.svg', ''))} } from "meistericons-react";

export default () => {
  return <${toPascalCase(icon.replace('.svg', ''))} />;
};
\`\`\`

\`\`\`vue
import { ${toPascalCase(icon.replace('.svg', ''))} } from "meistericons-vue";

export default {
  name:'${toPascalCase(icon.replace('.svg', ''))}',
  components: {${toPascalCase(icon.replace('.svg', ''))}}
}
</script>

<template>
  <${toPascalCase(icon.replace('.svg', ''))}/>
</template>
\`\`\`

\`\`\`vue3
<script>
import { ${toPascalCase(icon.replace('.svg', ''))} } from "meistericons-vue-latest";
</script>

<template>
    <${toPascalCase(icon.replace('.svg', ''))}/>
</template>
\`\`\`
:::
`


        return {
          params: { icon: icon.replace('.svg', ''), },
          content
        }
      }
      )).flat();

    return icons
  },
};
