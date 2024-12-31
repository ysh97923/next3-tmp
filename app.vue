<template>
  <!-- 使用默认layout -- layouts/default.vue -->
  <NuxtLayout>
    <!-- 使用默认page -- pages/index/index.vue -->
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
