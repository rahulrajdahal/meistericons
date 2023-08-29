import { writeFile } from "./helpers.js";

export default function generateIconNodes(parsedSvgs:any, packageDir:string) {
    const iconNodes = parsedSvgs.reduce((acc:any, { name, parsedSvgs }:any) => {

        
      acc[name] = parsedSvgs.children.map(({ name, attributes }:any) => [name, attributes]);
  
      return acc;
    }, {});
  
    const iconNodesStringified = JSON.stringify(iconNodes, null, 2);
  
    writeFile(iconNodesStringified, 'icon-nodes.json', packageDir);
  }