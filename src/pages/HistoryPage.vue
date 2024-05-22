<template>
  <q-page padding>
    <div class="text-h4 text-primary q-my-md">Rentals History</div>
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
        <q-tab name="All" label="All" />
        <q-tab name="Pending" label="Pending" />
        <q-tab name="Ongoing" label="Ongoing" />
        <q-tab name="Done" label="Done" />
        <q-tab name="Cancelled" label="Cancelled" />
        <q-tab name="Lapsed" label="Lapsed" />
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
          class="bg-white q-mb-md"
          v-for="(rental, index) in filterRentals"
          :key="index"
          style="border-radius: 15px"
        >
          <q-item-section thumbnail class="q-pa-sm">
            <img :src="rental.rentalDetails.image" />
          </q-item-section>

          <q-item-section>
            <q-item-label v-if="currentUser.role === 'admin'"
              >{{ rental.user.firstName }}
              {{ rental.user.lastName }}</q-item-label
            >
            <q-item-label
              ><span class="text-weight-bold">{{
                rental.rentalDetails.typeOfVehicle
              }}</span>
              {{ rental.rentalDetails.vehicleName }}</q-item-label
            >
            <q-item-label>
              <q-btn
                dense
                :label="`${rental.rentalDetails.seaters} seaters`"
                icon="person"
                size="xs"
                flat /><q-btn
                dense
                :label="`${rental.rentalDetails.airConditioned}`"
                icon="ac_unit"
                size="xs"
                flat /><q-btn
                dense
                :label="`${rental.rentalDetails.gasType}`"
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
            <q-item-label caption class="q-mb-md">{{
              rental.status
            }}</q-item-label>
            <q-item-label class="q-mb-md"
              >Php {{ rental.rentalDetails.rate }} / Day</q-item-label
            >
            <q-item-label class="q-mb-md">
              <q-btn
                @click="
                  historyDetails = rental;
                  statusLayout = true;
                "
                style="border-radius: 8px"
                label="View"
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

    <q-dialog v-model="statusLayout">
      <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>View details</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white q-pa-md">
          <q-select
            filled
            :disable="currentUser.role !== 'admin'"
            v-model="historyDetails.status"
            :options="statusOptions"
            label="Status"
          >
            <template v-slot:after>
              <q-btn
                v-if="currentUser.role === 'admin'"
                @click="updateStatus()"
                color="primary"
                icon="save"
              />
            </template>
          </q-select>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <q-card>
              <q-tabs
                v-model="tab1"
                inline-label
                class="bg-primary text-white shadow-2"
              >
                <q-tab name="rentalsdetails" label="Rental Details" />
                <q-tab name="profiledetails" label="User Profile" />
                <q-tab name="payments" label="Payment/Signature" />
              </q-tabs>
              <q-tab-panels v-model="tab1" animated>
                <q-tab-panel name="rentalsdetails">
                  <q-list>
                    <!-- <pre>{{ historyDetails }}</pre> -->
                    <q-item-label header class="text-h6"
                      >Rental details</q-item-label
                    >
                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Date Needed</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.dateNeeded
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Rate</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.rentalDetails.rate
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>How Many Days</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.numberOfDays
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Type of Vehicle</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.rentalDetails.typeOfVehicle
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section>
                        <q-item-label>Transmission</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.rentalDetails.transmission
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Seaters</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.rentalDetails.seaters
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Gas Type</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.rentalDetails.gasType
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Air Conditioned</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.rentalDetails.airConditioned
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Vehicle</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.rentalDetails.vehicleName
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Description</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.rentalDetails.description
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-tab-panel>
                <q-tab-panel name="profiledetails">
                  <q-list>
                    <q-item-label header class="text-h6"
                      >User Profile</q-item-label
                    >

                    <q-item>
                      <q-item-section avatar>
                        <q-avatar size="54px">
                          <img :src="historyDetails.user.profilePic" />
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label
                          >{{ historyDetails.user.firstName }}
                          {{ historyDetails.user.middleName }}
                          {{ historyDetails.user.lastName }}</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Address</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.user.address
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Email</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.user.email
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Nationality</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.user.nationality
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Date Of Birth</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.user.dateOfBirth
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Phone Number</q-item-label>
                        <q-item-label caption>{{
                          historyDetails.user.phoneNumber
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-card class="q-mb-md">
                      <q-card-section>
                        <div class="text-h6">Driver's license Front</div>
                      </q-card-section>
                      <q-img :src="historyDetails.driversIDFront" />
                    </q-card>
                    <q-card class="q-mb-md">
                      <q-card-section>
                        <div class="text-h6">Driver's license Back</div>
                      </q-card-section>
                      <q-img :src="historyDetails.driversIDBack" />
                    </q-card>

                    <q-card class="q-mb-md">
                      <q-card-section>
                        <div class="text-h6">Supporting ID</div>
                      </q-card-section>
                      <q-card-section
                        >{{ historyDetails.supportingIDType }}
                      </q-card-section>
                    </q-card>
                    <q-card class="q-mb-md">
                      <q-card-section>
                        <div class="text-h6">Supporting ID Front</div>
                      </q-card-section>
                      <q-img :src="historyDetails.supportingIDFront" />
                    </q-card>
                    <q-card class="q-mb-md">
                      <q-card-section>
                        <div class="text-h6">Supporting ID Back</div>
                      </q-card-section>
                      <q-img :src="historyDetails.supportingIDBack" />
                    </q-card>
                    <q-card class="q-mb-md">
                      <q-card-section>
                        <div class="text-h6">Selfie</div>
                      </q-card-section>
                      <q-img :src="historyDetails.selfie" />
                    </q-card>
                  </q-list>
                </q-tab-panel>

                <q-tab-panel name="payments">
                  <div class="q-gutter-md">
                    <div>
                      <span class="text-weight-medium">Downpayment:</span> 50%
                      downpayment to complete the booking. <br />
                      <span class="text-weight-medium">Final Payment:</span> The
                      remaining 50% is due upon delivery of the cars on site.
                      <br /><br />
                    </div>
                    <div class="text-right q-mb-md">
                      <span class="text-h6 q-mr-xs text-weight-bold"
                        >Total Fee:</span
                      >
                      <span class="text-h5 text-positive"
                        >Php
                        {{
                          parseInt(historyDetails?.rentalDetails?.rate) *
                          parseInt(historyDetails?.numberOfDays)
                        }}</span
                      >
                    </div>
                    <!-- <pre>{{ historyDetails }}</pre> -->
                    <q-card>
                      <q-card-section>
                        <div class="text-h6">Payment Receipt</div>
                      </q-card-section>
                      <q-img :src="historyDetails.receiptImage" />
                    </q-card>
                    <q-card>
                      <q-card-section>
                        <div class="text-h6">Signature</div>
                      </q-card-section>
                      <q-img :src="historyDetails.signature" />
                    </q-card>
                    <q-card>
                      <q-card-section>
                        <div class="text-h6">Payment</div>
                      </q-card-section>
                      <q-card-section>
                        <div>{{ historyDetails.payment }}</div>
                      </q-card-section>
                    </q-card>
                    <q-card>
                      <q-card-section>
                        <div class="text-h6">Payment Type</div>
                      </q-card-section>
                      <q-card-section>
                        <div>{{ historyDetails.paymentType }}</div>
                      </q-card-section>
                    </q-card>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </q-page>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, computed } from "vue";
import { useCollection, useFirebaseAuth } from "vuefire";
import { useFirestore } from "vuefire";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";

import { LocalStorage } from "quasar";
import { useQuasar } from "quasar";
const db = useFirestore();

import { ref } from "vue";
defineOptions({
  name: "IndexPage",
});

const zoom = ref(2);
const isPreviewLayoutOpen = ref(false);
const isProceedRentLayout = ref(false);
const auth = useFirebaseAuth();
const tab = ref("All");
const tab1 = ref("rentalsdetails");
const statusLayout = ref(false);
const $q = useQuasar();

const statusOptions = ["Pending", "Ongoing", "Done", "Cancelled", "Lapsed"];

const dateNeeded = ref(null);
const search = ref("");
const numberOfDays = ref(null);
const historyDetails = ref({});
const mapContainer = ref(null);

let currentUser = LocalStorage.getItem("user");
let rentals = null;

if (currentUser.role === "admin") {
  rentals = useCollection(collection(db, "histories"));
} else {
  rentals = useCollection(
    query(collection(db, "histories"), where("user.uid", "==", currentUser.uid))
  );
}

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

// const dateOfReturn = ref(null);
onMounted(() => {});

const rentNow = () => {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to proceed?",
    cancel: true,
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

const updateStatus = () => {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to proceed?",
    cancel: true,
  })
    .onOk(() => {
      // console.log('>>>> OK')
      updateStatusSubmit();
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

const updateStatusSubmit = async () => {
  const rentalsRef = doc(db, "histories", historyDetails.value.id);
  await updateDoc(rentalsRef, {
    status: historyDetails.value.status,
  });

  const rentals1Ref = doc(db, "rentals", historyDetails.value.rentalDetails.id);

  // Set the "capital" field of the city 'DC'
  await updateDoc(rentals1Ref, {
    isAvailable:
      historyDetails.value.status === "Done" ||
      historyDetails.value.status === "Cancelled" ||
      historyDetails.value.status === "Lapsed"
        ? true
        : false,
  });

  $q.notify({
    color: "positive",
    icon: "check",
    message: "It has been saved successfully.",
  });
};

const saveToHistory = async () => {
  const docRef = await addDoc(collection(db, "histories"), {
    uid: currentUser.uid,
    firstName: currentUser.firstName,
    middleName: currentUser.middleName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    address: currentUser.address,
    nationality: currentUser.nationality,
    dateOfBirth: currentUser.dateOfBirth,
    phoneNumber: currentUser.phoneNumber,
    dateNeeded: dateNeeded.value,
    numberOfDays: numberOfDays.value,
    status: "Pending",
    // dateOfPickUp: dateOfPickUp.value,
    // dateOfReturn: dateOfReturn.value,
  });
};
const filterRentals = computed(() => {
  let rentalss =
    tab.value === "All"
      ? searchItems()
      : searchItems().filter((dd) => dd.status === tab.value);
  return rentalss;
});
</script>
