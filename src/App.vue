<template>
  <Sidebar />
  <div :style="{ 'margin-left': sidebarOffset }">
    <router-view />
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarOffset } from '@/components/sidebar/state'

export default {
  components: { Sidebar },
  setup() {
    return { sidebarOffset }
  }
}
</script>

<style>
:root {
  --item-color: #FF8500;
  --item-hover: #FF9E00;
  --item-active: #FF6D00;
  --input-color: #f1f1f1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>