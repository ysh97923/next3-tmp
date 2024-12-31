// 路由拦截器 -- key：auth
/* 
  definePageMeta({
    middleware: "auth" //  对应 - 文件名
  })
*/
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to, from, "权限拦截器");
  return true; // false-拦截   true-通过
});
