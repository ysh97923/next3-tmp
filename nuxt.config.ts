// https://nuxt.com/docs/api/configuration/nuxt-config
import config from "./config";
export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: config.static,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "description",
          content:
            "同传，翻译，实时，直播，同步，会议，同传，翻译，实时，直播，同步，会议，同传，翻译，实时，直播，同步，会议，同传，翻译，实时，直播，同步，会议，同传，翻译，实时，直播，同步，会议，同传，翻译，实时，直播，同步，会议，同传，翻译，实时，直播，同步，会议，同传，翻译，实时，直播，同步，会议，同传",
        },
      ],
      title: "title",
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  devtools: { enabled: false },
  devServer: {},
  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  hooks: {
    "pages:extend"(routes) {
      routes.forEach((route) => {
        route.path = `${config.public}${route.path}`; // 为每个路由添加 /exam/exam 前缀
      });
    },
  },

  compatibilityDate: "2024-12-25",
  modules: ["@nuxt/ui"],
});
