<template>
  <q-page class="q-pa-lg">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="text-h4 text-center">
        <q-icon name="car_rental" size="96px" color="primary" class="q-mb-xl" />
        <br />Sign Up
      </div>
      <div align="center">
        <q-uploader
          accept=".jpg, image/*"
          hide-upload-btn
          label="Profile Picture"
          @added="handleAdded"
        />
      </div>
      <q-input
        filled
        v-model="firstName"
        label="First Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Field cannot be empty']"
      />

      <q-input
        filled
        v-model="middleName"
        label="Middle Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Field cannot be empty']"
      />

      <q-input
        filled
        v-model="lastName"
        label="Last Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Field cannot be empty']"
      />

      <q-input
        filled
        v-model="suffixName"
        label="Suffix Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Field cannot be empty']"
      />

      <q-select
        filled
        class="q-mb-md"
        v-model="gender"
        :options="['Male', 'Female']"
        label="Gender"
      />

      <q-input
        filled
        v-model="address"
        label="Address"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Field cannot be empty']"
      />

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
        :rules="[
          (val) => (val && val.length > 0) || 'Password cannot be empty',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        label="Confirm Password"
        v-model="confirmPassword"
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

      <q-input
        filled
        v-model="nationality"
        label="Nationality"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Field cannot be empty']"
      />

      <q-input
        filled
        type="date"
        v-model="dateOfBirth"
        label="Date of Birth"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Field cannot be empty']"
      />

      <q-input
        filled
        mask="(+63)#########"
        fill-mask
        v-model="phoneNumber"
        label="Phone Number"
      />

      <!-- <q-input
        filled
        type="email"
        v-model="emailAddress"
        label="Email Address"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Field cannot be empty']"
      /> -->

      <!-- <q-input
        filled
        type="date"
        v-model="dateOfPickUp"
        label="Date of pick-up"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Field cannot be empty']"
      /> -->

      <!-- <q-input
        filled
        type="date"
        v-model="dateOfReturn"
        label="Date of return"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Field cannot be empty']"
      /> -->
      <!-- <div align="center">
        <q-uploader accept=".jpg, image/*"  hide-upload-btn 
          class="q-mb-md"
          label="Identification"
          url="http://localhost:4444/upload"
        />
        <q-uploader accept=".jpg, image/*"  hide-upload-btn 
          class="q-mb-md"
          label="Supporting ID"
          url="http://localhost:4444/upload"
        />
        <q-uploader accept=".jpg, image/*"  hide-upload-btn 
          class="q-mb-md"
          label="Signature"
          url="http://localhost:4444/upload"
        />
      </div> -->

      <div class="text-center">
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Back to login"
          type="reset"
          color="primary"
          to="/login"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useQuasar } from "quasar";
import { ref, getCurrentInstance } from "vue";
import { useFirestore } from "vuefire";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uid } from "quasar";

defineOptions({
  name: "IndexPage",
});

const app = getCurrentInstance().appContext.config.globalProperties;

const auth = getAuth();
const db = useFirestore();
const $q = useQuasar();

const firstName = ref(null);
const middleName = ref(null);
const lastName = ref(null);
const suffixName = ref(null);
const gender = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const address = ref(null);
const nationality = ref(null);
const dateOfBirth = ref(null);
const phoneNumber = ref(null);
const image = ref("");
const file = ref("");
// const emailAddress = ref(null);
// const dateOfPickUp = ref(null);
// const dateOfReturn = ref(null);
const isPwd = ref(true);

const storage = getStorage();

async function handleAdded(files) {
  console.log("files", files);
  file.value = files[0];
}

const onSubmit = async () => {
  if (confirmPassword.value === password.value) {
    $q.loading.show({
      delay: 400, // ms
    });

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        $q.loading.hide();
        addUserDb(userCredential);
      })
      .catch((error) => {
        $q.loading.hide();
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  } else {
    $q.notify({
      color: "red",
      icon: "close",
      message: "Password did not match.",
    });
  }
};

console.log("serverTimestamp", serverTimestamp());

const addUserDb = async (userCredential) => {
  try {
    let uid4 = uid();
    const data = file.value;
    const metadata = {
      contentType: data.type,
    };
    const storageRef1 = storageRef(storage, `${uid4.slice(-12)}-${data.name}`);
    const snapshot = await uploadBytes(storageRef1, data, metadata);

    const downloadURL = await getDownloadURL(snapshot.ref);

    const user = userCredential.user;
    console.log("userrr", user);
    const docRef = await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName: firstName.value,
      middleName: middleName.value,
      lastName: lastName.value,
      suffixName: suffixName.value,
      gender: gender.value,
      email: email.value,
      address: address.value,
      nationality: nationality.value,
      dateOfBirth: dateOfBirth.value,
      phoneNumber: phoneNumber.value,
      profilePic: downloadURL,
      createdAt: serverTimestamp(),
      role: "",
      // dateOfPickUp: dateOfPickUp.value,
      // dateOfReturn: dateOfReturn.value,
    });
    console.log("docRefdocRef", docRef);
    $q.notify({
      color: "positive",
      icon: "check",
      message: "You have created account successfully.",
    });

    app.$router.push("/login");
    // You can display a success message or perform any other actions here
  } catch (error) {
    console.error("Error uploading file:", error);
    // Handle upload error
  }
};

const onReset = () => {};
</script>
