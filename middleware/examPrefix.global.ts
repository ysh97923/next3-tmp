// 全局路由拦截器  .global
import config from "~/config";

// 全局路由拦截器，添加项目前缀
export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith(config.public)) {
    return navigateTo(config.public + to.path, {
      // replace: !0,
    });
  }
});
