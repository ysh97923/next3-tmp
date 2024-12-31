<template>
  <div class="index-content text-xl p-3">
    <div @click="onClickIndex" class="hover:text-blue-400 cursor-pointer">
      to about
    </div>
    <div class="p-5">
      <UCard class="text-base">
        <template #header> icons </template>

        <UIcon :name="`i-${inputValue}`" class="text-blue-400" />
        <UCarousel v-slot="{ item }" :items="items" class="w-[100px]">
          <img :src="item" width="300" height="200" draggable="false" />
        </UCarousel>
        <DatePicker />
        <template #footer>
          <UInput v-model="inputValue" />
        </template>
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth", // 激活的中间件
});

const inputValue = ref<string>("material-symbols:beenhere-rounded");
const items = [
  "https://picsum.photos/200/200?random=1",
  "https://picsum.photos/200/200?random=2",
  "https://picsum.photos/200/200?random=3",
  "https://picsum.photos/200/200?random=4",
  "https://picsum.photos/200/200?random=5",
  "https://picsum.photos/200/200?random=6",
];
function onClickIndex() {
  navigateTo("/about");
}
</script>

<style lang="scss" scoped>
.index-content {
  height: 100%;
}
</style>
