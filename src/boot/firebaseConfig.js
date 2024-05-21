import { initializeApp } from "firebase/app";
import { VueFire, VueFireAuth } from "vuefire";
import { LocalStorage } from "quasar";
import Vue3Signature from "vue3-signature";
const firebaseConfig = {
  apiKey: "AIzaSyAfHhhkigk7btnKw-i9DVWW0tae_WvrBjw",
  authDomain: "car-rental-system-79811.firebaseapp.com",
  projectId: "car-rental-system-79811",
  storageBucket: "car-rental-system-79811.appspot.com",
  messagingSenderId: "41171403770",
  appId: "1:41171403770:web:a0ea324c3ece37ff831a43",
  measurementId: "G-8Q4VWEZ3PZ",
};

const firebaseApp = initializeApp(firebaseConfig);

export default ({ app, router, store }) => {
  document.addEventListener(
    "deviceready",
    () => {
      app.config.globalProperties.$isCordovaReady = true;
    },
    false
  );

  app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  });

  app.use(Vue3Signature);

  router.beforeEach((to, from, next) => {
    let currentUser = LocalStorage.getItem("user");
    let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
      next("/login");
    } else if (!requiresAuth && currentUser) {
      next("/");
    } else {
      next();
    }
  });
};
