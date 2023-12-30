# meistericons [![Npm package daily downloads](https://badgen.net/npm/dm/meistericons)](https://npmjs.com/package/meistericons)

[![Npm package version](https://badgen.net/npm/v/meistericons)](https://npmjs.com/package/meistericons)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## Usage

### Webfont Usage
>
>Note: You can import MeisterIcons with npm install, cdn or download it manually.

import CSS to your main.js

##### CDN

Copy the following code and add it to the <head> tag of your html document.

```
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/meistericons@2/fonts/mni.css">
 ```

##### Usage

Add icon with class name, class name rule: mni-{name}

```
<i class="mni mni-bug"></i>
```

### Installation

#### React

```

npm install meistericons-react --save-dev


import {Airpods} from 'meistericons-react'

<Airpods/>

```

#### Vue

```

npm install meistericons-vue --save-dev

<script>
import {ArrowDown} from "meistericons-vue"

export default {
    name:'My Component',
    components: {ArrowDown}
}
</script>

<template>
    <ArrowDown/>
</template>

```

#### Vue3

```

npm install meistericons-vue-latest --save-dev

<script>
import {ArrowDown} from "meistericons-vue-latest"
</script>

<template>
    <ArrowDown/>
</template>

```
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)