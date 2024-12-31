<template>
  <div class="layout-default">
    <AppHeader />
    <div class="app-center">
      <slot></slot>
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.app-center {
  overflow: auto;
  height: calc(100vh - 60px - 60px);
}
</style>
