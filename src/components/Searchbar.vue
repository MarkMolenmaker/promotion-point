<template>
  <form class="searchbar" @submit.prevent="emitSearchEvent">
    <input v-model="value" type="text" :placeholder="placeholder" />
    <button>{{button_text}}</button>
  </form>
</template>

<script>
export default {
  props: [ 'placeholder', 'button_text' ],
  data() {
    return {
      value: ''
    }
  },
  methods: {
    emitSearchEvent() {
      this.$emit('search-action', this.value)
      this.clear()
    },
    clear() {
      this.value = ''
    }
  }
}
</script>

<style scoped>
.searchbar {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-column-gap: 1em;
}
input {
  width: auto;
  color: black;
  font: inherit;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  outline: 0;
  border: none;
  border-bottom: var(--item-color) solid .2em;

  padding: 1em .5em;
  background-color: var(--input-color);
}
</style>