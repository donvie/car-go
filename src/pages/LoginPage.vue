<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      style="width: 320px"
    >
      <div class="text-h4 text-center">
        <q-icon name="car_rental" size="96px" color="primary" class="q-mb-xl" />
        <br />
        Sign In
      </div>
      <q-input
        filled
        type="email"
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Email cannot be empty']"
      />

      <q-input
        label="Password"
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        :rules="[(val) => (val && val.length > 0) || 'Email cannot be empty']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="text-center q-gutter-sm">
        <q-btn label="Login" type="submit" color="primary" />
        <q-btn
          label="Signup"
          type="reset"
          color="primary"
          outline
          to="signup"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { LocalStorage } from "quasar";
import { useQuasar } from "quasar";
import { useFirestore } from "vuefire";
import { ref, onMounted, getCurrentInstance } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
const app = getCurrentInstance().appContext.config.globalProperties;
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

defineOptions({
  name: "IndexPage",
});

const auth = useFirebaseAuth();
const db = useFirestore();
const $q = useQuasar();

const email = ref("heridonvi_tagaban12@yahoo.com");
const password = ref("Pass123$");
const isPwd = ref(true);

// console.log("serverTimestamp", serverTimestamp());

const onSubmit = () => {
  $q.loading.show({
    delay: 400, // ms
  });

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      $q.loading.hide();
      const user = userCredential.user;
      getUser(user);
    })
    .catch((error) => {
      $q.loading.hide();
      $q.notify({
        color: "negative",
        icon: "error",
        message: "Invalid! Please check your email or password.",
      });
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const getUser = async (user) => {
  console.log("dada", user);
  const q = query(collection(db, "users"), where("uid", "==", user.uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    LocalStorage.set("user", doc.data());
    console.log("user232", doc.data());
    app.$router.push("/");
    $q.notify({
      color: "positive",
      icon: "check",
      message: "You have logged in successfully.",
    });
  });
  // const docRef = doc(db, "users", user.uid);
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  //   LocalStorage.set("user", user);
  //   console.log("user", user);
  //   app.$router.push("/");
  //   $q.notify({
  //     color: "positive",
  //     icon: "check",
  //     message: "You have logged in successfully.",
  //   });
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }
};

const onReset = () => {};
</script>
