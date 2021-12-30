<template>
  <div class="home">
    <StoreInfoSearchGadget ref="StoreCodeInfoGadget"></StoreInfoSearchGadget>
    <div class="gadget container">
      <button @click="this.$refs.StoreCodeInfoGadget.loadStoreInfoByStorecode(3645)">Achterwillens - 3645</button>
      <button @click="this.$refs.StoreCodeInfoGadget.loadStoreInfoByStorecode(3587)">De Heester - 3587</button>
      <button @click="this.$refs.StoreCodeInfoGadget.loadStoreInfoByStorecode(2278)">Nieuwe Marktpassage - 2278</button>
    </div>
  </div>
</template>

<script>
import StoreInfoSearchGadget from "@/components/store_info/StoreInfoSearchGadget";

export default {
  name: 'Home',
  components: {
    StoreInfoSearchGadget
  }
}
</script>

<style scoped>
.home {
  display: grid;
  grid-gap: 3em;
  grid-template-columns: repeat(auto-fit, minmax(140px, 500px));
  justify-items: center;
  align-items: center;

  padding: 1em;
}
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1em;
}
</style>

<style>
.gadget {
  width: 100%;
  position: relative;
  align-self: start;

  padding: 1em;
  border-radius: 1em;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.04),0 0 15px 0 rgba(0,0,0,.1),0 12px 24px 0 rgba(0,0,0,.06);
}
button {
  color: white;
  font: inherit;
  font-weight: bold;

  outline: 0;
  border: none;
  border-radius: .3em;
  padding: 1em .5em;

  background-color: var(--item-color);
}
button:hover {
  background-color: var(--item-hover);
}

button:active {
  background-color: var(--item-active);
}
</style>