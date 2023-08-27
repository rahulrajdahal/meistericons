export default ({ componentName, children }: any) => {
  return `
    import createMeisterIcons from '../../scripts/createMeisterIcons';
  
    const ${componentName}=createMeisterIcons('${componentName}', ${JSON.stringify(
      children
    )});
  
    export default ${componentName};
    `;
};
