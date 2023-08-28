export default ({ componentName, children }: any) => {
  return `
    import createMeisterIcons from './createMeisterIcons';
  
    const ${componentName}=createMeisterIcons('${componentName}', ${JSON.stringify(
      children
    )});
  
    export default ${componentName};
    `;
};
