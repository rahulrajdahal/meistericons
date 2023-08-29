import path from "path";
import { appendFile, resetFile, toPascalCase } from "./helpers.js";

export default (
  inputEntry: any,
  outputDir: any,
  iconNodes: any,
  iconFileExt = ""
) => {
  const fileName = path.basename(inputEntry);

  resetFile(fileName, outputDir);

  const icons = Object.keys(iconNodes);

  icons.forEach((iconName) => {
    const componentName = toPascalCase(iconName);
    const importString = `export {default as ${componentName}} from './${toPascalCase(
      iconName
    )}${iconFileExt}';\n`;
    appendFile(importString, fileName, outputDir);
  });
  appendFile("\n", fileName, outputDir);

  console.log(`Generated ${fileName} file`);
};
