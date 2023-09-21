<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { ref } from 'vue'
const { x, y } = useMouse()
// const currentX = ref(x)
// const currentY = ref(y)
</script>

<template>
  <h1>测试vueUse 的鼠标坐标</h1>
  <h3>Mouse:{{ x }} - {{ y }}</h3>
</template>

<style scoped>
h1 {
  color: var(--main-bg-color);
}
</style>
