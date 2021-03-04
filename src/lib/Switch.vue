<template>
  <button class="vue-switch" :class="{'vue-checked': value}" @click="changeStatus"><span /></button>
</template>
<script>
  import {ref} from "vue";
  export default {
  	props: {
  		value: Boolean
    },
  	setup(props, context){
		  const changeStatus = () => {
			  context.emit('update:value', !props.value)
      };
      return {changeStatus}
    }
  }
</script>
<style lang="scss">
  $h: 22px;
  $h2: $h - 4px;
  .vue-switch {
    height: $h;
    width: $h*2;
    border: none;
    background: grey;
    border-radius: $h/2;
    position: relative;
    > span {
      position: absolute;
      top: 2px;
      left: 2px;
      height: $h2;
      width: $h2;
      background: white;
      border-radius: $h2/2;
      transition: left .25s;
    }
    &.vue-checked {
      background: #1890ff;
      > span {
        left: calc(100% - #{$h2} - 2px);
      }
    }
    &:focus {
      outline: none;
    }
    &:active{
      >span{
        width: $h2 + 2px
      }
    }
    &.vue-checked:active{
      >span{
        width: $h2 + 2px;
        margin-left: -2px;
      }
    }
  }
</style>
