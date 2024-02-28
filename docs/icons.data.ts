import { readFileSync, readdirSync } from "fs";

export default {
    load(): any {
        const icons = readdirSync("icons").map((category: string) =>
            readdirSync(`icons/${category}`).map((icon) => {

                return readFileSync(`icons/${category}/${icon}`, 'utf-8').trim()
            }
            )
        ).flat().map(icon => icon.replaceAll('\n', '').trim())


        return icons
    }
}