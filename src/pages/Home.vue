<template>
  <main>
    <div id="map">
      <MapContainer/>
    </div>
  </main>
</template>

<script>
  import MapContainer from '../components/MapContainer'
  export default {
    name: 'Home',
    components: {
      MapContainer
    }
  }
</script>

<style scoped>
  #map {
    width: 70%;
    height: 100%;
    border-radius: 4px;
  }
</style>