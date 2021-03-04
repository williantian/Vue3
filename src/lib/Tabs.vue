<template>
  <div class="vue-tabs">
<!--渲染title-->
    <div class="vue-tabs-nav" ref="container">
      <div
        class="vue-tabs-nav-item"
        :class="{selected: t === selected}"
        v-for="(t, index) in titles"
        :key="t"
        @click="select(t)"
        :ref="el=>{if (t === selected) selectedItem = el}"
      >{{t}}</div>
<!-- 优化 :ref="el=>{if (t === selected) selectedItem = el}"-->
<!--      :ref="el=>{if (el) navItems[index] = el}"-->
<!-- https://vue3js.cn/docs/zh/guide/composition-api-template-refs.html#jsx-%E4%B8%AD%E7%9A%84%E7%94%A8%E6%B3%95-->
      <div class="vue-tabs-nav-indicator" ref="indicator"></div>
    </div>
<!--    {{defaults[0]}}-->
<!--    {{defaults[2]}}-->
<!--    <component :is="defaults[0]" />-->
<!--    <component :is="defaults[1]" />-->
<!-- 嵌套渲染slot内容-->
    <div class="vue-tabs-content">
<!--      {{current}}-->
<!--   方案1 会有多个元素在页面中  display: none-->
<!--      <component-->
<!--        v-for="(d, index) in defaults"-->
<!--        class="vue-tabs-content-item"-->
<!--        :class="{selected: d.props.title === selected}"-->
<!--        :key="index"-->
<!--        :is="d" />-->

<!--   方案2 只有单个元素在页面中-->
<!--  使用is和计算属性current，必须制定key :key="current.props.title"-->
      <component class="vue-tabs-content-item" :is="current"  :key="current.props.title"/>
    </div>
  </div>
</template>
<script lang="ts">
  import Tab from "./Tab.vue";
  import {computed, ref, onMounted, onUpdated, watchEffect, nextTick} from 'vue'
  export default {
  		props: {
        selected:{
          type: String
        }
      },
		  setup(props, context) {
        const navItems = ref<HTMLDivElement[]>([]); // Array <HTMLDivElement[]>告诉编辑器是div元素的数组
        const selectedItem = ref<HTMLDivElement>(null);
        const indicator = ref<HTMLDivElement>(null); //  页面中ref为indicator的只有一个
        const container = ref<HTMLDivElement>(null); //  页面中ref为container的只有一个
        const x = () => {
		        console.log('navItems.value',navItems, {...navItems.value})
		        const divs = navItems.value;
		        const result = divs.find(div =>
				        div.classList.contains('selected')
		        )
		        // find不是所有浏览器都兼容
		        // const result = divs.find(div =>
		        // 		div.classList.contains('selected')
		        // )
		        console.log('result111', result)
		        const {width} = result.getBoundingClientRect();
		        // console.log('width', width);
		        indicator.value.style.width = width + 'px'
		        // ref需要用value获取值
		        const {left: left1} = container.value.getBoundingClientRect();
		        const {left: left2} = result.getBoundingClientRect();
		        const left = left2 - left1;
		        indicator.value.style.left = left + 'px';
        }
        //函数的优化  干掉navItems
        const updatex = () => {
        		console.log('updatex')
		        // console.log('selectedItem.value',selectedItem, {...selectedItem.value})
		        const {width} = selectedItem.value.getBoundingClientRect();
		        indicator.value.style.width = width + 'px'
		        const {left: left1} = container.value.getBoundingClientRect();
		        const {left: left2} = selectedItem.value.getBoundingClientRect();
		        const left = left2 - left1;
		        indicator.value.style.left = left + 'px';
        }
        // 优化 干掉navItems
        // onMounted(updatex);
        // onUpdated(updatex);
        // onMounted(x); // 第一次
        // onUpdated(x); // 后面几次
        // onUpdated(() => {
        // 		console.log('onUpdated')
        // });

        // 优化 watchEffect 代替 onMounted onUpdated
        // watchEffect(() => {
		    //     console.log('effect')
        // });
        // 发现watchEffect第一次执行时在onMounted之前 selectedItem.value为null 无法获取到ref
        // 如果需要watchEffect第一次执行在onMounted之后
        // watchEffect是在页面数据跟新前完成
        const count = ref(0);
        onMounted(() => {
          watchEffect(() => {
            console.log('effect', count.value);
            nextTick(()=> {
		            // x()
		            updatex()
            })
          });
          // watchEffect(x);
        });

        // console.log('11111111', {...context});
        // console.log({...context.slots});
        console.log({...context.slots.default()});
        // console.log({...context.slots.default()[0]});
        // console.log({...context.slots.default()[1]});
        const defaults = context.slots.default();
        // console.log(defaults[0].type);
        // console.log(defaults[0].type === Tab);
        defaults.forEach((tag) => {
          if(tag.type !== Tab) {
            throw new Error('Tabs 子标签必须是Tab');
          }
        });
        // 获取title
        const titles = defaults.map((tag) => {
       		// console.log(1, {...tag});
       		// console.log(tag.props.title);
         return tag.props.title;
        });
        // 获取当前选中
        // const current = defaults.find((tag) => {
        // 		return tag.props.title === props.selected
        // })
        // 计算属性current
        const current = computed(()=>{
       		// console.log('重新return');
		      return defaults.find((tag) => {
            return tag.props.title === props.selected
		      })
        })
        const select = (title: string) => {
		        count.value++
          context.emit('update:selected', title);
        };
        return {
          defaults,
          titles,
          current,
          select,
          navItems,
          selectedItem,
          indicator,
          container
        }
    }
  }
</script>
<style lang="scss">
  $blue: #40a9ff;
  $color: #333;
  $border-color: #d9d9d9;
  .vue-tabs {
    &-nav {
      display: flex;
      color: $color;
      border-bottom: 1px solid $border-color;
      position: relative;
      &-item {
        padding: 8px 0;
        margin: 0 16px;
        cursor: pointer;
        &:first-child {
          margin-left: 0;
        }
        &.selected {
          color: $blue;
        }
      }
      &-indicator {
        position: absolute;
        height: 3px;
        background: $blue;
        left: 0;
        bottom: -1px;
        width: 100px;
        transition: all 250ms;
      }
    }
    &-content {
      padding: 8px 0;
      &-item {
        /*display: none;*/
        &.selected {
          display: block;
        }
      }
    }
  }
</style>
