<template>
  <main>
    <div id="area-map">
      <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
              data-projection="EPSG:4326" class="map">
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

        <vl-geoloc @update:position="geolocPosition = $event">
          <template slot-scope="geoloc">
            <vl-feature v-if="geoloc.position" id="position-feature">
              <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
              <vl-style-box>
                <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
              </vl-style-box>
            </vl-feature>
          </template>
        </vl-geoloc>

        <vl-layer-tile id="osm">
          <vl-source-osm></vl-source-osm>
        </vl-layer-tile>
      </vl-map>
      <!--<div style="padding: 20px">
        Zoom: {{ zoom }}<br>
        Center: {{ center }}<br>
        Rotation: {{ rotation }}<br>
        My geolocation: {{ geolocPosition }}
      </div>-->
    </div>
    <div id="nav-menu">
      <p>nav</p>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return { 
        zoom: 10,
        center: [-46.622310399999996, -23.4848256],
        rotation: 0,
        geolocPosition: undefined,
      }
    },
  }
</script>

<style scoped>
  #area-map{
    display: flex;
    flex-direction: column;
    width: 70% !important;
    height: 100% !important;
  }
  #nav-menu{
    width: 30%;
  }
</style>