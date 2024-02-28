import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Meistericons",
  description: "Over 1500+ Open-Source Icons for your next BIG project",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Icons', link: '/icons' },
      { text: 'How to Use?', link: '/how-to-use' },
    ],

    sidebar: [
      { text: 'All Icons', link: '/icons' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rahulrajdahal/meistericons' }
    ]
  },
  base: '/meistericons'
})
