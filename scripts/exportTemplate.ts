export default ({ componentName, children }: any) => {
  return `
    import createMeisterIcons from '../src/createMeisterIcons';
  
    const ${componentName}=createMeisterIcons('${componentName}', ${JSON.stringify(
      children
    )});
  
    export default ${componentName};
    `;
};
