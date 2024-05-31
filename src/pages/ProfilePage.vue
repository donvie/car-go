<template>
  <q-page class="q-pa-lg">
    <q-card class="my-card">
      <q-item>
        <q-item-section avatar>
          <q-avatar size="72px">
            <img :src="currentUser.profilePic" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            >{{ currentUser.firstName }} {{ currentUser.middleName }}
            {{ currentUser.lastName }}
            {{ currentUser.suffixName }}</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Address</q-item-label>
          <q-item-label caption>{{ currentUser.address }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Email</q-item-label>
          <q-item-label caption>{{ currentUser.email }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Gender</q-item-label>
          <q-item-label caption>{{ currentUser.gender }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Nationality</q-item-label>
          <q-item-label caption>{{ currentUser.nationality }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Date Of Birth</q-item-label>
          <q-item-label caption>{{ currentUser.dateOfBirth }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Phone Number</q-item-label>
          <q-item-label caption>{{ currentUser.phoneNumber }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple v-if="currentUser.role === 'admin'">
        <q-item-section>
          <q-item-label>Enable Location</q-item-label>
          <q-item-label caption> {{ currentUser.enableLocation }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-card-actions align="center" class="q-my-md">
        <q-btn @click="editProfileLayout = true" color="primary"
          >Update Profile</q-btn
        >
      </q-card-actions>
    </q-card>

    <q-dialog v-model="editProfileLayout" maximized>
      <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-btn
              flat
              @click="editProfileLayout = !editProfileLayout"
              round
              dense
              icon="close"
            />
            <q-toolbar-title>Update Profile</q-toolbar-title>
          </q-toolbar>
        </q-header>
        <q-footer class="bg-transparent">
          <q-toolbar>
            <q-toolbar-title></q-toolbar-title>
            <!-- <q-btn label="Proceed" color="primary" /> -->
          </q-toolbar>
        </q-footer>
        <q-page-container>
          <q-page padding>
            <q-form @submit="onSubmit" @reset="onReset">
              <q-uploader
                accept=".jpg, image/*"
                hide-upload-btn
                label="Profile Picture"
                @added="handleAdded"
                class="q-mb-md"
              />
              <q-input
                filled
                v-model="currentUser.firstName"
                label="First Name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field cannot be empty',
                ]"
              />

              <q-input
                filled
                v-model="currentUser.middleName"
                label="Middle Name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field cannot be empty',
                ]"
              />

              <q-input
                filled
                v-model="currentUser.lastName"
                label="Last Name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field cannot be empty',
                ]"
              />

              <q-input
                filled
                class="q-mb-md"
                v-model="currentUser.suffixName"
                label="Suffix Name"
              />

              <q-select
                filled
                class="q-mb-md"
                v-model="currentUser.gender"
                :options="['Male', 'Female']"
                label="Gender"
              />

              <q-input
                filled
                v-model="currentUser.address"
                label="Address"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field cannot be empty',
                ]"
              />

              <q-input
                filled
                type="email"
                v-model="currentUser.email"
                label="Email"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Email cannot be empty',
                ]"
              />

              <!-- <q-input
                label="Password"
                v-model="password"
                filled
                :type="isPwd ? 'password' : 'text'"
                :rules="[
                  (val) => (val && val.length > 0) || 'Email cannot be empty',
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
                :rules="[
                  (val) => (val && val.length > 0) || 'Email cannot be empty',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input> -->

              <q-input
                filled
                v-model="currentUser.nationality"
                label="Nationality"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field cannot be empty',
                ]"
              />

              <q-input
                filled
                type="date"
                v-model="currentUser.dateOfBirth"
                label="Date of Birth"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field cannot be empty',
                ]"
              />

              <q-input
                mask="(+63)#########"
                fill-mask
                filled
                v-model="currentUser.phoneNumber"
                label="Phone Number"
              />

              <q-toggle
                v-if="currentUser.role === 'admin'"
                v-model="currentUser.enableLocation"
                label="Share location"
                color="primary"
              />

              <!-- <q-input
                filled
                type="email"
                v-model="currentUser.emailAddress"
                label="Email Address"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field cannot be empty',
                ]"
              /> -->
              <div class="text-center q-mt-xl">
                <q-btn label="Save changes" type="submit" color="primary" />
              </div>
            </q-form>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { LocalStorage } from "quasar";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useFirestore } from "vuefire";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uid } from "quasar";

defineOptions({
  name: "ProfilePage",
});

let currentUser = ref(LocalStorage.getItem("user"));

const auth = getAuth();
const db = useFirestore();
const $q = useQuasar();

const firstName = ref(null);
const middleName = ref(null);
const lastName = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const address = ref(null);
const nationality = ref(null);
const dateOfBirth = ref(null);
const phoneNumber = ref(null);
const location = ref(false);
const image = ref("");
const file = ref("");
// const emailAddress = ref(null);
// const dateOfPickUp = ref(null);
// const dateOfReturn = ref(null);
const isPwd = ref(true);
const editProfileLayout = ref(false);

const storage = getStorage();

async function handleAdded(files) {
  console.log("files", files);
  file.value = files[0];
}

const onSubmit = async () => {
  $q.loading.show({
    delay: 400, // ms
  });

  try {
    let uid4 = uid();
    const data = file.value;
    let downloadURL = "";
    if (data) {
      const metadata = {
        contentType: data.type,
      };
      const storageRef1 = storageRef(
        storage,
        `${uid4.slice(-12)}-${data.name}`
      );
      const snapshot = await uploadBytes(storageRef1, data, metadata);

      downloadURL = await getDownloadURL(snapshot.ref);
    }

    const washingtonRef = doc(db, "users", currentUser.value.uid);
    const docRef = await updateDoc(washingtonRef, {
      firstName: currentUser.value.firstName,
      middleName: currentUser.value.middleName,
      lastName: currentUser.value.lastName,
      email: currentUser.value.email,
      address: currentUser.value.address,
      nationality: currentUser.value.nationality,
      dateOfBirth: currentUser.value.dateOfBirth,
      suffixName: currentUser.value.suffixName,
      gender: currentUser.value.gender,
      phoneNumber: currentUser.value.phoneNumber,
      profilePic: downloadURL ? downloadURL : currentUser.value.profilePic,
      enableLocation:
        currentUser.value.role === "admin"
          ? currentUser.value.enableLocation
          : false,
      role: currentUser.value.role,
      // dateOfPickUp: dateOfPickUp.value,
      // dateOfReturn: dateOfReturn.value,
    });

    currentUser.value = {
      uid: currentUser.value.uid,
      firstName: currentUser.value.firstName,
      middleName: currentUser.value.middleName,
      lastName: currentUser.value.lastName,
      suffixName: currentUser.value.suffixName,
      email: currentUser.value.email,
      address: currentUser.value.address,
      gender: currentUser.value.gender,
      nationality: currentUser.value.nationality,
      dateOfBirth: currentUser.value.dateOfBirth,
      phoneNumber: currentUser.value.phoneNumber,
      profilePic: downloadURL ? downloadURL : currentUser.value.profilePic,
      enableLocation: currentUser.value.enableLocation,
      role: currentUser.value.role,
    };

    LocalStorage.set("user", currentUser.value);
    console.log("docRefdocRef", docRef);
    editProfileLayout.value = false;
    $q.notify({
      color: "positive",
      icon: "check",
      message: "You have updated profile successfully.",
    });
    editProfileLayout.value = false;
    $q.loading.hide();
    // You can display a success message or perform any other actions here
  } catch (error) {
    console.error("Error uploading file:", error);
    $q.loading.hide();
    // Handle upload error
  }
};

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

    const washingtonRef = doc(db, "users", currentUser.value.uid);
    const docRef = await updateDoc(washingtonRef, {
      //   uid: currentUser.value.uid,
      firstName: currentUser.value.firstName,
      middleName: currentUser.value.middleName,
      lastName: currentUser.value.lastName,
      email: currentUser.value.email,
      address: currentUser.value.address,
      nationality: currentUser.value.nationality,
      dateOfBirth: currentUser.value.dateOfBirth,
      phoneNumber: currentUser.value.phoneNumber,
      //   profilePic: currentUser.value.downloadURL,
      // dateOfPickUp: dateOfPickUp.value,
      // dateOfReturn: dateOfReturn.value,
    });
    console.log("docRefdocRef", docRef);
    $q.notify({
      color: "positive",
      icon: "check",
      message: "You have created account successfully.",
    });
    // You can display a success message or perform any other actions here
  } catch (error) {
    console.error("Error uploading file:", error);
    // Handle upload error
  }
};

const onReset = () => {};
</script>
