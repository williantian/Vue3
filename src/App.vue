<template>
  <router-view />
</template>

<script lang="ts">
  import { ref, provide } from "vue";
  import { router } from "./router";
  export default {
    name: "App",
    setup() {
      const width = document.documentElement.clientWidth;
      // console.log('width', width);
      const menuVisible = ref<boolean>(!width <= 500);
      provide("menuVisible", menuVisible); // set
      router.afterEach(() => {
          if (width <= 500) {
              menuVisible.value = false;
          }
      });
    },
  };
</script>
