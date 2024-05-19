<template>
  <q-page padding>
    <div
      style="height: 650px"
      class="q-mt-md"
      ref="mapContainer"
      id="map"
    ></div>
  </q-page>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);

onMounted(() => {
  initializeMap();
});

const initializeMap = () => {
  const philippinesCoordinates = [12.8797, 121.774];
  const map = L.map(mapContainer.value).setView(philippinesCoordinates, 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // Add marker pin
  const markerCoordinates = [12.8797, 121.774]; // Example coordinates for marker
  const marker = L.marker(markerCoordinates).addTo(map);
};
</script>
