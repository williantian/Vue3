<template>
  <div>
    <div>Button 示例</div>
    <hr>
    1111
    <div>
      <Button>按钮</Button>
      <Button theme="button">按钮</Button>
      <Button theme="text">按钮</Button>
      <Button theme="link">按钮</Button>
    </div>
    <div>Button 示例2</div>
    <hr>
    222
    <div class="button2">
      <Button>按钮</Button>
      <Button size="small">按钮</Button>
      <Button size="big">按钮</Button>
    </div>
  </div>
</template>
<script lang="ts">
		import Button from '../lib/Button.vue'
		export default {
      components: {Button},
      setup(){
        const onClick = () => {
          console.log('onClick');
        };
        return {onClick}
      }
		}
</script>
<style lang="scss" scoped>
  .button2{
    margin-top: 20px;
  }
</style>
