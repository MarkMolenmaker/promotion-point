<template>
  <div class="markup">
    <div class="output group" ref="output">
      <span class="header">Hoofdtekst</span>
      <span class="subheader">Subtekst</span>
    </div>
    <div class="input group">
      <textarea class="item" ref="textarea" @input="render" />
    </div>
    <div class="explanation">
      <span>#  - Hoofdtekst</span>
      <span>\  - Subtekst</span>
      <span>@  - actiemechanisme</span>
      <span>$  - actieprijs</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  methods: {
    render() {
      // Selectors
      // const header =

      const string = this.$refs.textarea.value
      const data = []

      for (let index in string) {

        switch (string[index]) {
          case '#':
            data.append()
            break;
          case '/':
            break;
          case '@':
            break;
          case '$':
            break;
          default:
            break;
        }

      }

    }
  }
}
</script>

<style scoped>
.markup {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 2em;
  grid-column-gap: 1em;
  padding: 1em;
  text-align: left;
}
.group {
  border: 1px solid black;
  padding: .5em;
}
.item {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.input {

}
.output {

}
.explanation {
  display: flex;
  flex-direction: column;
}
</style>