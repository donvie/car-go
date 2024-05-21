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
import { onMounted, ref, watchEffect } from "vue";
import { useCollection, useFirestore } from "vuefire";
import { collection } from "firebase/firestore";

const db = useFirestore();
const mapContainer = ref(null);

const users = useCollection(collection(db, "users"));

let map;
const markers = new Map();

// Define custom icon
const customIcon = new L.Icon({
  iconUrl: "images/marker-icon.png",
  iconRetinaUrl: "images/marker-icon-2x.png",
  shadowUrl: "images/marker-shadow.png",
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // size of the shadow
});

onMounted(() => {
  initializeMap();

  watchEffect(() => {
    if (users.value) {
      plotMarkers(users.value);
    }
  });
});

const initializeMap = () => {
  const philippinesCoordinates = [12.8797, 121.774];
  map = L.map(mapContainer.value).setView(philippinesCoordinates, 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
};

const plotMarkers = (users) => {
  console.log("Updating markers...");

  // Clear existing markers
  markers.forEach((marker) => marker.remove());
  markers.clear();

  // Add new markers
  users.forEach((user) => {
    if (user.location && user.enableLocation) {
      const { _lat, _long } = user.location;

      if (_lat && _long) {
        const marker = L.marker([_lat, _long], { icon: customIcon }).addTo(map);
        marker.bindPopup(
          `<b>${user.firstName} ${user.lastName}</b><br />${user.email}`
        );
        markers.set(user.id, marker);
      }
    }
  });

  console.log("Markers after update:", markers); // Debug log for markers after update
};
</script>

<style>
#map {
  width: 100%;
  height: 650px;
}
</style>
