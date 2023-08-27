export default ({ componentName, iconName, children, getSvg }: any) => {
  const svgContents = getSvg();

  const svgBase64 = Buffer.from(
    svgContents.replace("\n", "").replace(`fill='currentColor'`, `fill='#000'`)
  ).toString("base64");

  return `
  import createMeisterIcons from '../createMeisterIcons';

  const ${componentName}=createMeisterIcons('${componentName}', ${JSON.stringify(
    children
  )});

  export default ${componentName};
  `;
};
