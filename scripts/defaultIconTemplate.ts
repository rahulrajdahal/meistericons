export default ({componentName,children}:any)=>`
import defaultAttributes from './defaultAttributes';

const ${componentName} = [
    'svg',
    defaultAttributes,
    ${JSON.stringify(children)}
];

export default ${componentName};
`