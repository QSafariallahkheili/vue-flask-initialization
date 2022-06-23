<template>
  <div class="map-wrap" ref="mapContainer">
   
    <div class="map"  id="map" >
      <OSMButtons />
    </div>
  </div>
</template>

<script setup>
import { Map } from 'maplibre-gl';
import { shallowRef, onMounted, onUnmounted } from 'vue';
import {useStore} from "vuex";
import OSMButtons from './OSMButton.vue'
const store = useStore();

const mapContainer = shallowRef(null);

onMounted(() => {
    store.state.map.map = new Map({
        container: mapContainer.value,
        style: store.state.map.style,
        center: [store.state.map.center.lng, store.state.map.center.lat],
        zoom: store.state.map.zoom,
        minZoom: store.state.map.minZoom,
        maxZoom: store.state.map.maxZoom,
        maxPitch: store.state.map.maxPitch
    });
})

onUnmounted(() => {
    store.state.map.map?.remove();
})


</script>


<style scoped>

.map-wrap {
 position: relative;
  width: 100%;
  height: 80vh; /* calculate height of the screen minus the heading */
}

.map {
  height: 100%;
  width: 100%;
  position:absolute;
  background-color: darkgray;
  margin: auto
}

.watermark {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 999;
}
</style>