import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Meistericons",
  description: "Awesome icons library for your next project.",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Icons', link: '/' },
      { text: 'How to Use?', link: '/how-to-use' },
      { text: 'Sponsor', link: '/' }
    ],

    sidebar: [
      { text: 'All Icons', link: '/icons' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rahulrajdahal/meistericons' }
    ]
  }
})
