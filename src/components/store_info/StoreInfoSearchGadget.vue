<template>
  <div class="gadget">
      <Searchbar class="searchbar" ref="searchbar" placeholder="Zoeken op winkelcode" button_text="Zoek" @search-action="loadStoreInfoByStorecode"/>
      <Searchbar class="searchbar" ref="searchbar" placeholder="Zoeken op postcode" button_text="Zoek" @search-action="loadStoreInfoByZipcode"/>
      <StoreInfo class="store-info" v-for="store in stores" :key="store.id" :shop-code="store.store"
                 :shop-name="store.shopName" :email-address="store.emailAddress"
                 :telephone-number="store.telephoneNumber" :address="store.address" :zip-code="store.zipCode"
                 :city="store.city" :country="store.country" :latitude="store.latitude" :longitude="store.longitude"/>
  </div>
</template>

<script>
import Searchbar from "@/components/Searchbar";
import StoreInfo from "@/components/store_info/StoreInfo";

export default {
  components: {
    Searchbar,
    StoreInfo
  },

  props: {},
  data() {
    return {
      stores: []
    }
  },
  methods: {
    async loadStoreInfoByStorecode(storecode) {
      // Clear the searchbar
      this.$refs.searchbar.clear()

      // Load the store data
      const response = await fetch(`https://api.microservice.coop.nl/storeinformation?store=${storecode}`)
      this.stores = [ await response.json() ]
    },
    async loadStoreInfoByZipcode(zipcode) {
      // Clear the searchbar
      this.$refs.searchbar.clear()

      // Load the store data
      const response = await fetch(`https://api.microservice.coop.nl/storeinformation/search?limit=10&range=5&postalCode=${zipcode}`)
      this.stores = await response.json()
    }
  }
}
</script>

<style scoped>
.searchbar {
  margin-bottom: .5em;
}
.store-info {
  margin: 1em 0;
  padding-bottom: 1em;
  border-bottom: solid black 1px;
}
.store-info:last-child {
  margin: 1em 0 0 0;
  padding-bottom: 0;
  border-bottom: none;
}
</style>