<template>
  <q-layout view="lHh Lpr lFf" style="background: #c4e6f9">
    <q-header elevated class="q-py-sm">
      <q-toolbar>
        <q-icon name="car_rental" size="42px" color="white" />
        <q-toolbar-title> Car Rental System </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <q-item to="/" exact>
          <q-item-section side>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/rentals" exact>
          <q-item-section side>
            <q-icon name="history" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Rentals</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/profile" exact>
          <q-item-section side>
            <q-icon name="history" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Profile</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/tracking" exact>
          <q-item-section side>
            <q-icon name="map" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Cars Tracking</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="logOut()" exact>
          <q-item-section side>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Log out</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { LocalStorage } from "quasar";
import { useFirebaseAuth } from "vuefire";
import { useQuasar } from "quasar";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, onMounted, getCurrentInstance } from "vue";
import router from "src/router";
const auth = useFirebaseAuth();
const app = getCurrentInstance().appContext.config.globalProperties;
const $q = useQuasar();

defineOptions({
  name: "MainLayout",
});

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user;
      console.log("uiduid", uid);
    } else {
    }
  });
});

const leftDrawerOpen = ref(false);

const logOut = () => {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to logout?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      signOut(auth)
        .then(() => {
          LocalStorage.removeItem("user");
          app.$router.push("/login");
        })
        .catch((error) => {});
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
