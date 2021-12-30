<template>
  <div class="info-wrapper">
    <span class="title">{{shopName}}</span>
    <img :src="picture" title="Openen op GoogleMaps" :alt="shopName" @click="openGoogleMaps"/>
    <div class="info-details-wrapper">
      <div class="info-details">
        <span class="info">{{address}}</span>
        <span class="info">{{zipCode}}, {{city}}</span>
        <span class="info">{{country}}</span>
        <a class="info" title="Telefoonnummer bellen" :href="`tel:${telephoneNumber}`">{{telephoneNumber}}</a>
        <a class="info" title="Email versturen" :href="`mailto:${emailAddress}`">{{emailAddress}}</a>
        <span class="info">Winkelcode: {{shopCode}}</span>
      </div>
      <img :src="qrcode" title="VCard aan contacten toevoegen" alt="" @click="openVCard"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shopCode: String,
    shopName: String,
    address: String,
    zipCode: String,
    city: String,
    telephoneNumber: String,
    emailAddress: String,
    country: String,
    latitude: String,
    longitude: String
  },
  computed: {
    picture() {
      return `https://maps.googleapis.com/maps/api/staticmap?size=500x250&scale=2&center=${this.latitude},${this.longitude}&markers=color:orange%7CLabel:S%7C${this.latitude},${this.longitude}&zoom=15&key=AIzaSyAL1_U0rgdciuxTiymBVAMKehIZo8sz2nY`
    },
    vcard() {
      return `BEGIN:VCARD\nVERSION:3.0\nN:${this.shopName};Coop;\nTEL;TYPE=VOICE:${this.telephoneNumber}\nEMAIL:${this.emailAddress}\nADR;TYPE=WORK:;;${this.address};${this.city};;${this.zipCode};${this.country}\nGEO:${this.latitude};${this.longitude}\nEND:VCARD`
    },
    qrcode() {
      return `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${encodeURI(this.vcard)}`
    }
  },
  methods: {
    openGoogleMaps() {
      window.open(`https://maps.google.com/?q=${this.address}, ${this.zipCode_city}`)
    },
    openVCard() {
      window.open(`data:text/x-vcard;urlencoded,${encodeURI(this.vcard)}`);
    }
  }
}
</script>

<style scoped>
span, a {
  overflow:hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
}
.info-wrapper {
  display: flex;
  flex-direction: column;
}
.info-details-wrapper {
  display: grid;
  grid-template-columns: 75% 25%;
}
.info-details {
  margin-top: .5em;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.title {
  margin-bottom: .5em;
  font-weight: bold;
}
img { max-width: 100%; }
img:hover { cursor: pointer }
</style>