import { fileURLToPath, URL } from 'node:url'
import path from 'path';
import { defineConfig } from 'vitepress'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import sidebar from './sidebar';
import fs from 'fs';

const links = []


const title = "IconsGuild";
const socialTitle = "IconsGuild Icons";
const description = "Beautiful, reliable & consistent icon toolkit made by the ConvoyChat Authors."

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title,
  description,
  cleanUrls: true,
  outDir: '.vercel/output/static',
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPIconAlignLeft\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/overrides/VPIconAlignLeft.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/overrides/VPFooter.vue', import.meta.url)
          )
        }
      ]
    },
  },
  head: [
    [ 'script', {
      src: 'https://plausible.io/js/script.js',
      'data-domain': 'iconsguild.vercel.app',
      defer: ''
    }],
    [ 'meta', {
      property:"og:locale",
      content:"en_US"
    }],
    [ 'meta', {
      property:"og:type",
      content:"website"
    }],
    [ 'meta', {
      property:"og:site_name",
      content: title,
    }],
    [ 'meta', {
      property:"og:title",
      content: socialTitle,
    }],
    [ 'meta', {
      property:"og:description",
      content: description
    }],
    [ 'meta', {
      property:"og:url",
      content:"https://iconsguild.vercel.app"
    }],
    [ 'meta', {
      property:"og:image",
      content: "https://iconsguild.vercel.app/og.png"
    }],
    [ 'meta', {
      property:"og:image:width",
      content:"1200"
    }],
    [ 'meta', {
      property:"og:image:height",
      content:"630"
    }],
    [ 'meta', {
      property:"og:image:type",
      content:"image/png"
    }],
    [ 'meta', {
      property:"twitter:card",
      content:"summary_large_image"
    }],
    [ 'meta', {
      property:"twitter:title",
      content: socialTitle,
    }],
    [ 'meta', {
      property:"twitter:description",
      content: description
    }],
    [ 'meta', {
      property:"twitter:image",
      content:"https://iconsguild.vercel.app/og.png"
    }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/logo.light.svg',
      dark: '/logo.dark.svg'
    },
    nav: [
      { text: 'Icons', link: '/icons/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Packages', link: '/packages' },
      { text: 'License', link: '/license' },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/c-eo/iconsguild' },
      { icon: 'discord', link: 'https://discord.gg/EH6nSts' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} IconsGuild Authors`
    },
    editLink: {
      pattern: 'https://github.com/c-eo/iconsguild/edit/main/docs/:path'
    },
  },
  transformHtml: (_, id, { pageData }) => {
    if (/[\\/]404\.html$/.test(id)) {
      return
    }

    if (pageData.relativePath.startsWith('icons/')) {
      links.push({
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData?.params?.changedRelease?.date
      })
      return
    }

    links.push({
      url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
      lastmod: pageData.lastUpdated
    })
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: 'https://iconsguild.vercel.app/'
    })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    await new Promise((r) => writeStream.on('finish', r))
  },
})
