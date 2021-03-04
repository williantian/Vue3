<template>
  <button class="vue-button" :class="classes">
    <slot />
  </button>
</template>
<script lang="ts">
  import {computed} from 'vue'
	export default {
    // inheritAttrs: false, //不希望组件的根元素继承 attribute
    props: {
      theme: {
        type: String,
        default: 'button'
      },
      size: {
        type: String,
        default: 'normal'
      }
    },
    // setup(props, context) {
    //   console.log('props, context', {...props}, {...context.attrs}, context.attrs);
    //   const {size, ...rest} = context.attrs;
    //   return {size, rest}
    // }
    setup(props, context) {
      const {theme, size} = props;
      const classes = computed(() => {
        return {
          [`vue-theme-${theme}`] : theme,
          [`vue-size-${size}`] : size
        }
      });
      return {classes}
    }
  }
</script>
<style lang="scss">
  $h: 32px;
  $border-color: #d9d9d9;
  $color: #333;
  $blue: #40a9ff;
  $radius: 4px;
  .vue-button {
    box-sizing: border-box;
    height: $h;
    padding: 4px 12px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    border: 1px solid $border-color;
    border-radius: $radius;
    background: white;
    color: $color;
    box-shadow: 0 1px 0 fade_out(black, .95);
    & + & {
      margin-left: 8px;
    }
    &:hover,
    &:focus{
      color: $blue;
      border-color: $blue;
    }
    &:focus{
      outline: none;
    }
    // 兼容firefox
    &::-moz-focus-inner{
      border: 0;
    }
  }
</style>
