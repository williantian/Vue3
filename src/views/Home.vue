<template>
  <div>
    <Topnav />
    <div class="banner">
      <h1>vue 3 UI</h1>
      <h2>一个vue 3.0 UI</h2>
      <p class="actions">
        <a href="https://github.com">GitHub</a>
        <router-link to="/doc">开始</router-link>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
		import Topnav from "../components/Topnav.vue";
		export default {
				components: { Topnav },
		};
</script>
<style lang="scss" scoped>
  .banner {
    padding: 100px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /*background: lightgreen;*/
    > .actions{
      padding: 8px 0;
      a {
        margin:0 8px;
        background: #fff;
        display: inline-block;
        $h: 28px;
        border: 1px solid grey;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 8px;
      }
    }
  }
</style>
