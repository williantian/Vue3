<template>
  <div>Dialog示例</div>
  <h1>示例1</h1>
  <div style="position: relative; z-index: 1">
    <Button @click="change">dialog</Button>
    <Dialog v-model:visible="x" :ok="okFn" :cancel="cancelFn">
      <template v-slot:title>
        <strong>加粗的标题</strong>
      </template>
      <template v-slot:content>
        <div>hi</div>
        <div>hi2</div>
      </template>
    </Dialog>
  </div>
  <h1>示例2</h1>
  <p>函数触发</p>
  <Button @click="showDialog">show</Button>
  <div style="position: relative; z-index: 2; height:300px; width:300px; background: red;"></div>
</template>
<script lang="ts">
  import Dialog from '../lib/Dialog.vue'
  import Button from '../lib/Button.vue'
  import { openDialog } from '../lib/openDialog'
  import {ref} from 'vue'
  export default {
    components: {Dialog, Button},
    setup(){
      const x = ref(false);
      const change = () => {
		      x.value = !x.value
      }
      const okFn = () => {console.log(1)}
      const cancelFn = () => {console.log(2)}
      const showDialog = () => {
      		console.log('openDialog')
      		openDialog({
            title: '提示',
            content: '内容',
            ok: () => {
              console.log('it is ok')
            },
            cancel: () => {
              console.log('it is cancel')
            }
          })
      };
      return {x, change, okFn, cancelFn, showDialog}
    }
  }
</script>
