<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h5 text-primary">Hi, {{ currentUser.firstName }}</div>
      <div class="text-h6">Choose your</div>
      <div class="text-h6 text-weight-bold">Car Here!</div>
    </div>
    <q-input filled v-model="search" label="Search" class="q-my-sm">
      <!-- <template v-slot:after>
        <q-btn @click="searchItems()" round dense flat icon="search" />
      </template> -->
    </q-input>
    <q-card flat class="bg-transparent">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey bg-transparent"
        active-color="primary"
        indicator-color="transparent"
        align="justify"
        narrow-indicator
      >
        <q-tab name="all" label="All" />
        <q-tab name="suv" label="Suv" />
        <q-tab name="van" label="Van" />
        <q-tab name="sedan" label="Sedan" />
        <!-- <q-tab name="luxury" label="Luxury" />
        <q-tab name="special" label="Special" /> -->
        <q-tab
          name="Multi-Purpose Vehicle or (MPV)"
          label="Multi-Purpose Vehicle or (MPV)"
        />
      </q-tabs>

      <q-list bordered v-if="filterRentals.length === 0" class="q-mt-md">
        <q-item>
          <q-item-section class="text-center"
            ><div>
              <q-icon
                size="32px"
                color="negative"
                name="warning"
                class="q-mr-xs"
              /><span>No data available.</span>
            </div></q-item-section
          >
        </q-item>
      </q-list>

      <q-list class="q-mt-md">
        <q-item
          v-for="(rental, index) in filterRentals"
          :key="index"
          style="border-radius: 15px"
        >
          <q-item-section thumbnail class="q-pa-sm">
            <img :src="rental.image" />
          </q-item-section>

          <q-item-section>
            <q-item-label
              ><span class="text-weight-bold">{{ rental.typeOfVehicle }}</span>
              {{ rental.vehicleName }}</q-item-label
            >
            <q-item-label>
              <q-btn
                dense
                :label="`${rental.seaters} seaters`"
                icon="person"
                size="xs"
                flat /><q-btn
                dense
                :label="`${rental.airConditioned}`"
                icon="ac_unit"
                size="xs"
                flat /><q-btn
                dense
                :label="`${rental.gasType}`"
                icon="local_gas_station"
                size="xs"
                flat
            /></q-item-label>
            <q-item-label caption class="text-body2"
              >Pick up & Drop off San Fernando Pampanga</q-item-label
            >
            <q-item-label caption
              >Pick up time: 7:00 am to 12:00 pm</q-item-label
            >
          </q-item-section>

          <q-item-section side>
            <q-item-label caption class="q-mb-md"
              >Click to see <br />
              full details</q-item-label
            >
            <q-item-label class="q-mb-md"
              >Php {{ rental.rate }} / Day</q-item-label
            >
            <q-item-label class="q-mb-md">
              <q-btn
                @click="
                  rentalDetails = rental;
                  isPreviewLayoutOpen = true;
                "
                style="border-radius: 8px"
                label="View details"
                size="sm"
                color="primary"
                no-caps
              />
            </q-item-label>
          </q-item-section>
          <q-separator spaced />
        </q-item>
      </q-list>
    </q-card>

    <q-dialog maximized v-model="isPreviewLayoutOpen">
      <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
        <q-page-container>
          <q-page>
            <q-card flat>
              <img style="height: 300px" :src="rentalDetails.image" />
              <q-card-section class="q-pa-xl">
                <div class="row">
                  <div class="col-6 text-h6 text-weight-bold">
                    {{ rentalDetails.vehicleName }}
                  </div>
                  <div class="col-6 text-h6 text-weight-bold">
                    {{ rentalDetails.typeOfVehicle }}
                  </div>
                  <div class="col-6 text-h6">
                    Php {{ rentalDetails.rate }} / day
                  </div>
                  <div class="col-6"></div>
                  <div class="col-6">
                    <q-btn dense size="xs" flat
                      ><q-icon size="24px" left name="person" />
                      <div class="text-caption">
                        {{ `${rentalDetails.seaters} seaters` }}
                      </div>
                    </q-btn>
                  </div>
                  <div class="col-6">
                    <q-btn dense size="xs" flat
                      ><q-icon size="24px" left name="ac_unit" />
                      <div class="text-caption">
                        {{ `${rentalDetails.airConditioned}` }}
                      </div>
                    </q-btn>
                  </div>
                  <div class="col-6">
                    <q-btn dense size="xs" flat
                      ><q-icon size="24px" left name="local_gas_station" />
                      <div class="text-caption">
                        {{ `${rentalDetails.gasType}` }}
                      </div>
                    </q-btn>
                  </div>
                  <div class="col-12 q-mt-lg">
                    {{ rentalDetails.description }}
                  </div>
                </div>
              </q-card-section>

              <q-card-actions align="center" vertical>
                <div class="q-mb-xs">Pick up time 7:00 am to 12:00 pm</div>
                <q-btn
                  v-if="rentalDetails.isAvailable"
                  @click="isProceedRentLayout = true"
                  color="primary"
                  style="width: 150px"
                  >Rent now</q-btn
                >
                <div v-else class="text-red text-h6">Not available</div>
              </q-card-actions>
            </q-card>

            <q-page-sticky position="top-left" :offset="[15, 15]">
              <q-btn
                @click="isPreviewLayoutOpen = false"
                color="primary"
                round
                icon="arrow_back"
              />
            </q-page-sticky>

            <q-page-sticky
              v-if="currentUser.role === 'admin'"
              position="top-right"
              :offset="[75, 15]"
            >
              <q-btn
                @click="deleteRentalVehicle()"
                color="negative"
                round
                icon="delete"
              />
            </q-page-sticky>
            <q-page-sticky
              v-if="currentUser.role === 'admin'"
              position="top-right"
              :offset="[15, 15]"
            >
              <q-btn
                @click="editRentalVehicle()"
                color="secondary"
                round
                icon="edit"
              />
            </q-page-sticky>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>

    <q-dialog v-model="isProceedRentLayout">
      <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-btn
              flat
              @click="isProceedRentLayout = !isProceedRentLayout"
              round
              dense
              icon="close"
            />
            <q-toolbar-title></q-toolbar-title>
          </q-toolbar>
        </q-header>
        <q-footer class="bg-blue-2">
          <q-toolbar>
            <q-checkbox
              @click="isAgree ? (basic = true) : ''"
              label="Terms of Agreement"
              class="text-black"
              v-model="isAgree"
            />
            <q-toolbar-title></q-toolbar-title>
            <q-btn
              :disable="!isAgree"
              @click="rentNow()"
              label="Proceed"
              color="primary"
            />
          </q-toolbar>
        </q-footer>
        <q-page-container>
          <q-page padding>
            <q-card>
              <q-tabs
                v-model="tab1"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="details" label="Details" />
                <q-tab name="attachment" label="Attachments" />
                <q-tab name="payment" label="Payment/Signature" />
              </q-tabs>

              <q-separator />

              <div v-show="tab1 === 'details'">
                <q-input
                  filled
                  type="date"
                  v-model="dateNeeded"
                  label="Date Needed"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Field cannot be empty',
                  ]"
                />
                <q-input
                  filled
                  type="number"
                  v-model="numberOfDays"
                  label="Number of days"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Field cannot be empty',
                  ]"
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
                  filled
                  v-model="currentUser.phoneNumber"
                  label="Phone Number"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Field cannot be empty',
                  ]"
                />
              </div>

              <div v-show="tab1 === 'attachment'">
                <div class="q-gutter-md">
                  <div class="text-h6">Driver's ID</div>
                  <q-uploader
                    accept=".jpg, image/*"
                    hide-upload-btn
                    label="Front Picture"
                    @added="driversIDFrontAdded"
                  />
                  <q-uploader
                    accept=".jpg, image/*"
                    hide-upload-btn
                    label="Back Picture"
                    @added="driversIDBackAdded"
                  />
                  <div class="text-h6">Supporting ID</div>
                  <q-uploader
                    accept=".jpg, image/*"
                    hide-upload-btn
                    label="Front Picture"
                    @added="supportingIDFrontAdded"
                  />
                  <q-uploader
                    accept=".jpg, image/*"
                    hide-upload-btn
                    label="Back Picture"
                    @added="supportingIDBackAdded"
                  />
                  <q-btn
                    color="primary"
                    glossy
                    unelevated
                    icon="camera_enhance"
                    label="Take a selfie"
                  />
                  <q-img
                    src="https://cdn.quasar.dev/img/non-existent-image-src.png"
                    style="height: 220px; max-width: 100%"
                  >
                    <template v-slot:error>
                      <div
                        class="absolute-full flex flex-center bg-negative text-white"
                      >
                        Please take a selfie.
                      </div>
                    </template>
                  </q-img>
                </div>
              </div>

              <div v-if="tab1 === 'payment'">
                <div class="text-h6 q-mb-md">Scan the qrcode to pay</div>
                <q-img class="q-mb-md" src="~assets/image1.jpg" />
                <q-img class="q-mb-md" src="~assets/image2.jpg" />
                <q-select
                  class="q-mb-md"
                  filled
                  v-model="payment"
                  :options="['Gcash', 'Paymaya']"
                  label="Payment"
                />
                <q-select
                  filled
                  class="q-mb-md"
                  v-model="paymentType"
                  :options="['Full payment', 'Down payment']"
                  label="Payment Type"
                />
                <q-uploader
                  accept=".jpg, image/*"
                  hide-upload-btn
                  class="q-mb-md"
                  label="Upload the receipt"
                  @added="receiptAdded"
                />
                <div class="text-h6">Draw your signature</div>
                <q-card style="z-index: 99999">
                  <Vue3Signature
                    ref="signature1"
                    :h="'200px'"
                    :sigOption="state.option"
                    :disabled="state.disabled"
                  ></Vue3Signature>
                </q-card>
              </div>
            </q-card>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <q-dialog v-model="basic" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          I agree that the information I have provided is accurate and complete,
          and I consent to its use for the purposes of processing the car rental
          reservation . Additionally, I acknowledge that my information will be
          handled with utmost confidentiality and security measures will be
          implemented to protect it from unauthorized access or disclosure
          <br /><br />supporting id type <br />SSS ID<br />
          NATIONAL ID <br />POSTAL ID <br />TIN ID <br />PHIL HEALTH ID
          <br />PASSPORT ID <br /><br /><br />Note: Confirm your identity with a
          photo of yourself<br />
          holding your ID
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addLayout">
      <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title
              >{{ action === "edit" ? "Edit" : "Add" }} rental
              vehicle</q-toolbar-title
            >
            <q-btn
              flat
              @click="addLayout = !addLayout"
              round
              dense
              icon="close"
            />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-transparent">
          <q-toolbar>
            <q-toolbar-title></q-toolbar-title>
            <q-btn
              color="primary"
              @click="addRentalVehicle()"
              label="Save"
              icon="save"
            />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <div class="q-gutter-md" align="center">
              <q-uploader
                accept=".jpg, image/*"
                hide-upload-btn
                label="Vehicle Image"
                @added="handleAdded"
              />
              <q-input outlined v-model="vehicleName" label="Vehicle Name" />
              <q-select
                outlined
                :options="[
                  'suv',
                  'van',
                  'sedan',
                  'luxury',
                  'special',
                  'hatchback',
                  'Multi-Purpose Vehicle or (MPV)',
                ]"
                v-model="typeOfVehicle"
                label="Type of Vehicle"
              />
              <q-input
                outlined
                type="number"
                v-model="seaters"
                label="Seaters"
              />
              <q-input outlined v-model="gasType" label="Gas Type" />
              <q-input outlined v-model="description" label="Description" />
              <q-input
                outlined
                v-model="airConditioned"
                label="Air contioned"
              />
              <q-input outlined v-model="rate" label="Rate" />
              <q-select
                :options="['Manual', 'Autmatic', 'Automatic/Manual']"
                outlined
                v-model="transmission"
                label="Transmission"
              />
            </div>
            <!-- <q-select outlined v-model="model" :options="" label="Outlined" /> -->
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      v-if="currentUser.role === 'admin'"
    >
      <q-btn round color="primary" @click="addLayout = true" icon="add" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { uid } from "quasar";
import { onMounted, getCurrentInstance, computed, reactive } from "vue";
import { useCollection, useFirebaseAuth } from "vuefire";
import { useFirestore } from "vuefire";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { LocalStorage } from "quasar";
import { useQuasar } from "quasar";
const db = useFirestore();
const rentals = useCollection(collection(db, "rentals"));
import { ref } from "vue";
defineOptions({
  name: "IndexPage",
});
console.log(";rentalsrentals", rentals);
const storage = getStorage();
const basic = ref(false);

const rentalDetails = ref({});
const addLayout = ref(false);
const isPreviewLayoutOpen = ref(false);
const isProceedRentLayout = ref(false);
const auth = useFirebaseAuth();
const tab = ref("all");
const tab1 = ref("details");
const $q = useQuasar();
const isAgree = ref(false);

const dateNeeded = ref(null);
const app = getCurrentInstance().appContext.config.globalProperties;
const search = ref("");

const numberOfDays = ref(null);

let currentUser = ref(LocalStorage.getItem("user"));
const payment = ref("");
const paymentType = ref("");

const vehicleName = ref("");
const typeOfVehicle = ref("");
const seaters = ref("");
const gasType = ref("");
const description = ref("");
const airConditioned = ref("");
const rate = ref("");
const transmission = ref("");
const action = ref("");

const driversIDFront = ref(null);
const driversIDBack = ref(null);
const supportingIDFront = ref(null);
const supportingIDBack = ref(null);
const receipt = ref(null);
const file = ref("");

const signature1 = ref(null);

const state = reactive({
  count: 0,
  option: {
    penColor: "rgb(0, 0, 0)",
    backgroundColor: "rgb(255,255,255)",
  },
  disabled: false,
});

// const query = ref("35");
// const matchingItems = searchItems(35);
// console.log(matchingItems);

// const dateOfReturn = ref(null);
onMounted(() => {});

async function driversIDFrontAdded(files) {
  console.log("files", files);
  driversIDFront.value = files[0];
}

async function driversIDBackAdded(files) {
  console.log("files", files);
  driversIDBack.value = files[0];
}

async function supportingIDFrontAdded(files) {
  console.log("files", files);
  supportingIDFront.value = files[0];
}

async function supportingIDBackAdded(files) {
  console.log("files", files);
  supportingIDBack.value = files[0];
}

async function receiptAdded(files) {
  console.log("files", files);
  receipt.value = files[0];
}

async function handleAdded(files) {
  file.value = files[0];
}

async function editRentalVehicle() {
  // image.value = rentalDetails.value.image;
  vehicleName.value = rentalDetails.value.vehicleName;
  typeOfVehicle.value = rentalDetails.value.typeOfVehicle;
  seaters.value = rentalDetails.value.seaters;
  gasType.value = rentalDetails.value.gasType;
  description.value = rentalDetails.value.description;
  airConditioned.value = rentalDetails.value.airConditioned;
  rate.value = rentalDetails.value.rate;
  transmission.value = rentalDetails.value.transmission;
  action.value = "edit";
  addLayout.value = true;
}

async function deleteRentalVehicle() {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      deleteVehicle();
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
}

async function deleteVehicle() {
  $q.loading.show({
    delay: 400, // ms
  });

  const rentalsRef = doc(db, "rentals", rentalDetails.value.id);
  const docRef = await deleteDoc(rentalsRef);
  $q.notify({
    color: "positive",
    icon: "check",
    message: `It has been deleted successfully.`,
  });
  addLayout.value = false;
  isPreviewLayoutOpen.value = false;
  $q.loading.hide();
}

const addRentalVehicle = async () => {
  $q.loading.show({
    delay: 400, // ms
  });

  let uid4 = uid();
  const data = file.value;
  let downloadURL = "";
  if (data) {
    const metadata = {
      contentType: data.type,
    };
    const storageRef1 = storageRef(storage, `${uid4.slice(-12)}-${data.name}`);
    const snapshot = await uploadBytes(storageRef1, data, metadata);

    downloadURL = await getDownloadURL(snapshot.ref);
  }

  if (action.value === "edit") {
    const rentalsRef = doc(db, "rentals", rentalDetails.value.id);
    const docRef = await updateDoc(rentalsRef, {
      vehicleName: vehicleName.value,
      typeOfVehicle: typeOfVehicle.value,
      seaters: seaters.value,
      gasType: gasType.value,
      description: description.value,
      airConditioned: airConditioned.value,
      rate: rate.value,
      transmission: transmission.value,
      image: downloadURL,
    });
    isPreviewLayoutOpen.value = false;
  } else {
    const docRef = await addDoc(collection(db, "rentals"), {
      image: downloadURL,
      vehicleName: vehicleName.value,
      typeOfVehicle: typeOfVehicle.value,
      seaters: seaters.value,
      gasType: gasType.value,
      description: description.value,
      airConditioned: airConditioned.value,
      rate: rate.value,
      transmission: transmission.value,
      createdAt: serverTimestamp(),
    });
  }
  $q.notify({
    color: "positive",
    icon: "check",
    message: `It has been ${
      action.value === "edit" ? "updated" : "added"
    } successfully.`,
  });
  addLayout.value = false;
  vehicleName.value = "";
  typeOfVehicle.value = "";
  seaters.value = 0;
  gasType.value = "";
  description.value = "";
  airConditioned.value = "";
  rate.value = 0;
  transmission.value = "";
  $q.loading.hide();
};

const searchItems = () => {
  const query = search.value ? search.value : "";
  const matchingItems = [];
  const lowercaseQuery = query.toLowerCase(); // Convert query to lowercase
  rentals.value.forEach((item) => {
    // Perform deep search in each object
    for (let key in item) {
      if (
        typeof item[key] === "string" &&
        item[key].toLowerCase().includes(lowercaseQuery)
      ) {
        matchingItems.push(item);
        break; // No need to continue searching this item
      }
    }
  });
  return matchingItems;
};

const filterRentals = computed(() => {
  let rentalss =
    tab.value === "all"
      ? searchItems()
      : searchItems().filter((dd) => dd.typeOfVehicle === tab.value);
  return rentalss;
});

const rentNow = () => {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to proceed?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      // console.log('>>>> OK')
      saveToHistory();
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

const driversIDFrontFetch = async () => {
  let uid4 = uid();
  const data = driversIDFront.value;
  const metadata = {
    contentType: data.type,
  };
  const storageRef1 = storageRef(storage, `${uid4.slice(-12)}-${data.name}`);
  const snapshot = await uploadBytes(storageRef1, data, metadata);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
const driversIDBackFetch = async () => {
  let uid4 = uid();
  const data = driversIDBack.value;
  const metadata = {
    contentType: data.type,
  };
  const storageRef1 = storageRef(storage, `${uid4.slice(-12)}-${data.name}`);
  const snapshot = await uploadBytes(storageRef1, data, metadata);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

const supportingIDFrontFetch = async () => {
  let uid4 = uid();
  const data = supportingIDFront.value;
  const metadata = {
    contentType: data.type,
  };
  const storageRef1 = storageRef(storage, `${uid4.slice(-12)}-${data.name}`);
  const snapshot = await uploadBytes(storageRef1, data, metadata);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

const supportingIDBackFetch = async () => {
  let uid4 = uid();
  const data = supportingIDBack.value;
  const metadata = {
    contentType: data.type,
  };
  const storageRef1 = storageRef(storage, `${uid4.slice(-12)}-${data.name}`);
  const snapshot = await uploadBytes(storageRef1, data, metadata);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

const receiptFetch = async () => {
  let uid4 = uid();
  const data = receipt.value;
  const metadata = {
    contentType: data.type,
  };
  const storageRef1 = storageRef(storage, `${uid4.slice(-12)}-${data.name}`);
  const snapshot = await uploadBytes(storageRef1, data, metadata);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

const signatureFetch = async () => {
  let uid4 = uid();
  const data = signature1.value.save("image/jpeg");
  const metadata = {
    contentType: "image/jpeg",
  };

  const base64DataWithoutPrefix = removeDataURLPrefix(data);

  const base64String = base64DataWithoutPrefix;
  const contentType = "image/png"; // or the appropriate content type for your data
  const blob = base64ToBlob(base64String, contentType);

  const storageRef1 = storageRef(storage, `${uid4.slice(-12)}-${blob.name}`);
  const snapshot = await uploadBytes(storageRef1, blob, metadata);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

function base64ToBlob(base64String, contentType) {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

function removeDataURLPrefix(base64String) {
  // Split the base64 string at the comma to remove the data URL prefix
  const parts = base64String.split(",");
  if (parts.length === 2) {
    return parts[1]; // Return the second part (the base64 data) without the prefix
  } else {
    // If the base64 string doesn't have a comma, return the original string
    return base64String;
  }
}

const saveToHistory = async () => {
  $q.loading.show({
    delay: 400, // ms
  });
  const image1 = await driversIDFrontFetch();
  const image2 = await driversIDBackFetch();
  const image3 = await supportingIDFrontFetch();
  const image4 = await supportingIDBackFetch();
  const image5 = await receiptFetch();
  const image6 = await signatureFetch();

  const docRef = await addDoc(collection(db, "histories"), {
    user: currentUser.value,
    currentUser: LocalStorage.getItem("user"),
    dateNeeded: dateNeeded.value,
    numberOfDays: numberOfDays.value,
    status: "Pending",
    rentalDetails: rentalDetails.value,
    createdAt: serverTimestamp(),
    driversIDFront: image1,
    driversIDBack: image2,
    supportingIDFront: image3,
    supportingIDBack: image4,
    payment: payment.value,
    paymentType: paymentType.value,
    receiptImage: image5,
    signature: image6,
    // dateOfPickUp: dateOfPickUp.value,
    // dateOfReturn: dateOfReturn.value,
  });

  const rentalsRef = doc(db, "rentals", rentalDetails.value.id);

  // Set the "capital" field of the city 'DC'
  await updateDoc(rentalsRef, {
    isAvailable: false,
  });

  $q.notify({
    color: "positive",
    icon: "check",
    message: "It has been submitted successfully.",
  });
  isProceedRentLayout.value;
  app.$router.push("/history");
  $q.loading.hide();
};
</script>
