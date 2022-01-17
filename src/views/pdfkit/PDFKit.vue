<template>
  <div class="pdfkit">
    <A4CollectionPDF :data="live"/>
    <textarea v-model="data" @keydown.ctrl.space.prevent="ctrlSpace" @keydown.ctrl.enter.prevent="ctrlEnter"></textarea>
    <div></div>
    <span>CTRL+Enter = Render PDF, CTRL+Space = Nieuwe regel</span>
  </div>
</template>

<script>
import A4CollectionPDF from "@/components/pdf/A4CollectionPDF";

export default {
  name: "PDFKit",
  components: {
    A4CollectionPDF
  },
  data () {
    return {
      data: JSON.stringify([{title:"Hoofdtekst",subtext:"Subtekst",price:"prijs",price_old:"prijs hoog"}], null, 2),
      live: JSON.stringify([{title:"Hoofdtekst",subtext:"Subtekst",price:"prijs",price_old:"prijs hoog"}], null, 2)
    }
  },
  methods: {
    ctrlSpace() {
      const temp = JSON.parse(this.data)
      temp.push({title:"",subtext:"",price:"",price_old:""})
      this.data = JSON.stringify(temp, null, 2)
    },
    ctrlEnter() {
      this.live = this.data;
    }
  }
}
</script>

<style scoped>
.pdfkit {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 1em;
}
</style>

// '[{"title":"Hoofdtekst","subtext":"per stuk","price":3.99,"price_old":2.99},{"title":"Hoofdtekst","subtext":"per stuk","price":3.99,"price_old":2.99}]'
// [{title:"Hoofdtekst",subtext:"per stuk",price:3.99,price_old:2.99},{title:"Hoofdtekst",subtext:"per stuk",price:3.99,price_old:2.99}]