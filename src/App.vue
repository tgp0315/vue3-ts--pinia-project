<script setup lang="ts">
import userStore from './store/user'
import { storeToRefs } from 'pinia'
import service from '@/utils/request'

service.get('/user/list').then((res) => {
  console.log(res)
})
const store = userStore()
// `name` 和 `double` `num` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, num, double } = storeToRefs(store)
const { updateName } = store
console.log(name, num, double, updateName)
// $reset() 方法将 state 重置为初始值
store.$reset()
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
