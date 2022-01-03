<template>
  <div class="search">
    <Searchbar class="searchbar" placeholder="Zoeken naar product" button_text="Zoek" @search-action="loadProductInfoByQuery"/>
    <div class="results">

    </div>
  </div>
</template>

<script>
import Searchbar from "@/components/Searchbar";

export default {
  name: "Search",
  components: {
    Searchbar
  },
  methods: {
    async loadProductInfoByQuery() {
      // Load the product data
      const response = await fetch(`https://api.microservice.coop.nl/storeinformation/search?limit=10&range=5&postalCode=${0}`)
      // https://api.coop.nl/INTERSHOP/rest/WFS/COOP-COOPBase-Site/-;loc=nl_NL;cur=EUR/culios/products?searchTerm=veltins&amount=9&attrs=sku,salePrice,listPrice,image,promotions,packingUnit,sticker,Inhoud
      this.stores = await response.json()
    }
  }

}
</script>

<style scoped>
.searchbar {
  width: 100%;
}
.results {

}
</style>