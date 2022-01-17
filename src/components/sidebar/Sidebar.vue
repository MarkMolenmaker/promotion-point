<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/search" icon="fas fa-search">Search</SidebarLink>
    <SidebarLink to="/scanner" icon="fas fa-barcode">Scanner</SidebarLink>
    <SidebarLink to="/multiple" icon="fas fa-poll-h">Multiple A5</SidebarLink>
    <SidebarLink to="/pdfkit" icon="fas fa-file-alt-h">Multiple A5 (WIP)</SidebarLink>

    <span
        class="collapse-icon"
        :class="{ 'rotate-180': collapsed }"
        @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
  import SidebarLink from './SidebarLink'
  import { collapsed, toggleSidebar, sidebarWidth } from './state'
  export default {
    props: {},
    components: { SidebarLink },
    setup() {
      return { collapsed, toggleSidebar, sidebarWidth }
    }
  }
</script>

<style scoped>
  .sidebar {
    color: white;
    background-color: var(--item-color);
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  .collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;
    color: rgba(255, 255, 255, 0.7);
    transition: 0.2s linear;
  }
  .rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
  }
</style>