<template>
  <div>Tabs示例1</div>
<!--  {{x}}-->
  <hr>
<!--  <Tabs v-model:selected="x" @update:selected="x = $event">-->
  <Tabs v-model:selected="x">
    <Tab title="导航1">我是内容1</Tab>
    <Tab title="导航2">我是内容2</Tab>
  </Tabs>
</template>
<script lang="ts">
  import Tabs from '../lib/Tabs.vue';
  import Tab from '../lib/Tab.vue';
  import {ref} from 'vue';
  export default {
    components: {Tabs, Tab},
    setup(){
      const x = ref('导航1');
      return {x}
    }
  }
</script>
<style lang="scss" scoped>
  hr{
    margin-bottom: 20px;
  }
</style>
