import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vitepress'

export function getAllCategoryFiles() {
  const fileNames = fs.readdirSync(path.join('../lucide/categories')).filter((file) => path.extname(file) === '.json');

  return fileNames
    .map((fileName) => path.basename(fileName, '.json'));
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Lucide",
  description: "Beautiful & consistent icon toolkit made by the community.",
  outDir: '.vercel/output/static',
  vite: {
    plugins: []
  },
  themeConfig: {
    logo: {
      light: '/logo.light.svg',
      dark: '/logo.dark.svg'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Icons', link: '/icons/index.md' },
      { text: 'Documentation', link: '/guide/' },
      { text: 'License', link: '/license' },
    ],

    sidebar: {
      'guide':[
        {
          text: 'Introduction',
          items: [
            { text: 'What is lucide?', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' }
          ]
        },
        {
          text: 'Packages',
          items: [
            {
              text: 'Lucide',
              link: '/guide/packages/lucide'
            },
            {
              text: 'Lucide React',
              link: '/guide/packages/lucide-react'
            },
            {
              text: 'Lucide React Native',
              link: '/guide/packages/lucide-react-native'
            },
            {
              text: 'Lucide Vue',
              link: '/guide/packages/lucide-vue'
            },
            {
              text: 'Lucide Vue Next (Vue 3)',
              link: '/guide/packages/lucide-vue-next'
            },
            {
              text: 'Lucide Svelte',
              link: '/guide/packages/lucide-svelte'
            },
            {
              text: 'Lucide Preact',
              link: '/guide/packages/lucide-preact'
            },
            {
              text: 'Lucide Angular',
              link: '/guide/packages/lucide-angular'
            },
            {
              text: 'Lucide Static',
              link: '/guide/packages/lucide-static'
            },
            {
              text: 'Lucide Flutter',
              link: '/guide/packages/lucide-flutter'
            },
          ]
        }
      ],
      'icons': [
        { text: 'All', link: '/icons/' },
        // { text: 'Categorized', link: '/icons/categorized' },
        // {
        //   text: 'Categories',
        //   items: [
        //     ...(getAllCategoryFiles().map((category) => ({ text: category, link: `/icons/category/${category}` })))
        //   ]
        // }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
