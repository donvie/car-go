<template>
  <q-page padding style="background: white">
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
        <q-tab name="hatchback" label="Hatchback" />
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
              >Pick up time: 7:00 am to 5:00 pm <br />
              Note: If you fail to return the vehicle between 7 AM and 5 PM, we
              will charge an additional fee.</q-item-label
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
                <div class="q-mb-xs">Pick up time 7:00 am to 5:00 pm</div>
                <div class="q-mb-xs" style="width: 300px">
                  Note: If you fail to return the vehicle between 7 AM and 5 PM,
                  we will charge an additional fee.
                </div>
                <q-btn
                  v-if="
                    rentalDetails.isAvailable && currentUser.role !== 'admin'
                  "
                  @click="isProceedRentLayout = true"
                  color="primary"
                  style="width: 150px"
                  >Rent now</q-btn
                >
                <div
                  v-if="rentalDetails.isAvailable === false"
                  class="text-red text-h6"
                >
                  Not available
                </div>
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

    <q-dialog maximized v-model="isProceedRentLayout">
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
            <q-toolbar-title>{{ rentalDetails.vehicleName }}</q-toolbar-title>
          </q-toolbar>
        </q-header>
        <q-page-container>
          <q-page padding>
            <q-stepper
              keep-alive
              dense
              vertical
              v-model="step"
              ref="stepper"
              color="primary"
              animated
            >
              <q-step :name="1" title="Details" :done="step > 1">
                <!-- <q-input
                  filled
                  type="date"
                  v-model="dateNeeded"
                  label="Date Needed"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Field cannot be empty',
                  ]"
                /> -->
                <q-input
                  label="Date Needed"
                  filled
                  v-model="dateNeeded"
                  mask="date"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="dateNeeded"
                          :options="enableFutureDates"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input
                  filled
                  type="number"
                  v-model="numberOfDays"
                  label="Number of days"
                  class="q-mb-md"
                  @update:model-value="updddd"
                />

                <q-field label="Rate" filled stack-label class="q-mb-md">
                  <template v-slot:control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      {{ rentalDetails?.rate }}
                    </div>
                  </template>
                </q-field>

                <div class="text-right">
                  <span class="text-h5 q-mr-xs">Down payment:</span>
                  <span class="text-h6"
                    >Php
                    {{
                      (parseInt(rentalDetails?.rate) * parseInt(numberOfDays)) /
                      2
                    }}</span
                  >
                </div>
                <div class="text-right">
                  <span class="text-h5 q-mr-xs">Full payment:</span>
                  <span class="text-h6"
                    >Php
                    {{
                      parseInt(rentalDetails?.rate) * parseInt(numberOfDays)
                    }}</span
                  >
                </div>
                <!-- <q-input filled :value="rentalDetails.rate" label="Rate" /> -->

                <!-- <div>Rate: {{ rentalDetails.rate }}</div> -->
                <div class="text-h6 q-mb-sm">User Details</div>
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
                  v-model="currentUser.suffixName"
                  label="Suffix Name"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Field cannot be empty',
                  ]"
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
                  mask="(+63)#########"
                  fill-mask
                  v-model="currentUser.phoneNumber"
                  label="Phone Number"
                />
              </q-step>

              <q-step :name="2" title="Attachments" :done="step > 2">
                <div>
                  <div class="text-h6">Driver's ID</div>
                  <!-- <q-uploader
                    accept=".jpg, image/*"
                    class="q-mb-md"
                    hide-upload-btn
                    label="Front Picture"
                    @added="driversIDFrontAdded"
                  /> -->
                  <q-btn
                    color="primary"
                    glossy
                    @click="takePicture1()"
                    unelevated
                    icon="camera_enhance"
                    label="Front Picture"
                    class="q-mb-md"
                  />
                  <q-img
                    v-if="selfieData2"
                    class="q-mb-md"
                    :src="selfieData2"
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
                  <q-btn
                    color="primary"
                    glossy
                    @click="takePicture2()"
                    unelevated
                    icon="camera_enhance"
                    label="Back Picture"
                    class="q-mb-md"
                  />
                  <q-img
                    v-if="selfieData4"
                    class="q-mb-md"
                    :src="selfieData4"
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
                  <!-- <q-uploader
                    accept=".jpg, image/*"
                    hide-upload-btn
                    label="Back Picture"
                    @added="driversIDBackAdded"
                    class="q-mb-md"
                  /> -->
                  <div class="text-h6 q-mb-md">Supporting ID</div>
                  <div class="full-width">
                    <q-select
                      filled
                      class="q-mb-md"
                      v-model="supportingIDType"
                      :options="[
                        'SSS ID',
                        'NATIONAL ID',
                        'TIN ID',
                        'PHIL HEALTH ID',
                        'PASSPORT ID',
                      ]"
                      label="Supporting ID"
                    />
                  </div>
                  <!-- <q-uploader
                    class="q-mb-md"
                    accept=".jpg, image/*"
                    hide-upload-btn
                    label="Front Picture"
                    @added="supportingIDFrontAdded"
                  /> -->
                  <q-btn
                    color="primary"
                    glossy
                    @click="takePicture3()"
                    unelevated
                    icon="camera_enhance"
                    label="Front Picture"
                    class="q-mb-md"
                  />
                  <q-img
                    v-if="selfieData6"
                    class="q-mb-md"
                    :src="selfieData6"
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

                  <q-btn
                    color="primary"
                    glossy
                    @click="takePicture4()"
                    unelevated
                    icon="camera_enhance"
                    label="Back Picture"
                    class="q-mb-md"
                  />
                  <q-img
                    v-if="selfieData8"
                    class="q-mb-md"
                    :src="selfieData8"
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
                  <!-- <q-uploader
                    accept=".jpg, image/*"
                    class="q-mb-md"
                    hide-upload-btn
                    label="Back Picture"
                    @added="supportingIDBackAdded"
                  /> -->
                  <q-btn
                    color="primary"
                    glossy
                    @click="takePicture()"
                    unelevated
                    icon="camera_enhance"
                    label="Take a selfie"
                    class="q-mb-md"
                  />
                  <q-img
                    v-if="selfieData"
                    class="q-mb-md"
                    :src="selfieData"
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

                  <q-card flat>
                    Note: Confirm your identity with a photo of yourself holding
                    your ID
                  </q-card>
                </div>
              </q-step>

              <q-step :name="3" title="Payment/Signature">
                <div class="row">
                  <div class="text-h6 q-mb-md">Scan the qrcode to pay</div>
                  <div>
                    <span class="text-weight-medium">Downpayment:</span> 50%
                    downpayment to complete the booking. <br />
                    <span class="text-weight-medium">Final Payment:</span> The
                    remaining 50% is due upon delivery of the cars on site.
                    <br /><br />
                  </div>
                  <q-img class="q-mb-md" src="~assets/image1.jpg" />
                  <q-img class="q-mb-md" src="~assets/image2.jpg" />
                  <q-select
                    class="q-mb-md full-width"
                    filled
                    v-model="payment"
                    :options="['Gcash', 'Paymaya']"
                    label="Payment"
                  />

                  <q-select
                    filled
                    class="q-mb-md full-width"
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
                  <div class="text-right q-mb-md">
                    <span class="text-h6 q-mr-xs text-weight-bold"
                      >Down payment:</span
                    >
                    <span class="text-h5 text-positive"
                      >Php
                      {{
                        (parseInt(rentalDetails?.rate) *
                          parseInt(numberOfDays)) /
                        2
                      }}</span
                    >
                  </div>
                  <div class="text-right q-mb-md">
                    <span class="text-h6 q-mr-xs text-weight-bold"
                      >Full payment:</span
                    >
                    <span class="text-h5 text-positive"
                      >Php
                      {{
                        parseInt(rentalDetails?.rate) * parseInt(numberOfDays)
                      }}</span
                    >
                  </div>
                  <div class="text-h6">Draw your signature</div>
                  <q-btn
                    class="q-mb-md"
                    icon="delete"
                    color="red"
                    @click="signature1.clear()"
                    dense
                    label="Clear signature"
                  />
                  <q-card style="z-index: 99999">
                    <Vue3Signature
                      ref="signature1"
                      :h="'200px'"
                      :sigOption="state.option"
                      :disabled="state.disabled"
                    ></Vue3Signature>
                  </q-card>
                  <q-checkbox
                    @click="isAgree ? (basic = true) : ''"
                    label="Terms of Agreement"
                    class="text-black q-mt-md"
                    v-model="isAgree"
                  />
                </div>
              </q-step>

              <template v-slot:navigation>
                <q-stepper-navigation>
                  <q-btn
                    v-if="step === 3"
                    :disable="!isAgree"
                    @click="step === 3 ? rentNow() : $refs.stepper.next()"
                    color="primary"
                    :label="step === 3 ? 'Finish' : 'Continue'"
                  />

                  <q-btn
                    v-else
                    @click="step === 3 ? rentNow() : $refs.stepper.next()"
                    color="primary"
                    :label="step === 3 ? 'Finish' : 'Continue'"
                  />
                  <q-btn
                    v-if="step > 1"
                    flat
                    color="primary"
                    @click="$refs.stepper.previous()"
                    label="Back"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </template>
            </q-stepper>

            <!-- <q-card>
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

              <q-tab-panels
                v-model="tab1"
                keep-alive
                animated
                class="shadow-2 rounded-borders"
              >
                <q-tab-panel name="details"> </q-tab-panel>

                <q-tab-panel name="attachment"> </q-tab-panel>

                <q-tab-panel name="payment"> </q-tab-panel>
              </q-tab-panels>
            </q-card> -->
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
          implemented to protect it from unauthorized access or disclosure.
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addLayout" maximized>
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
            <q-uploader
              accept=".jpg, image/*"
              hide-upload-btn
              label="Vehicle Image"
              class="q-mb-md"
              @added="handleAdded"
            />
            <q-input
              class="q-mb-md"
              outlined
              v-model="vehicleName"
              label="Vehicle Name"
            />
            <q-select
              class="q-mb-md"
              outlined
              :options="[
                'suv',
                'van',
                'sedan',
                'hatchback',
                'luxury',
                'special',
                'hatchback',
                'Multi-Purpose Vehicle or (MPV)',
              ]"
              v-model="typeOfVehicle"
              label="Type of Vehicle"
            />
            <q-input
              class="q-mb-md"
              outlined
              type="number"
              v-model="seaters"
              label="Seaters"
            />
            <q-input
              class="q-mb-md"
              outlined
              v-model="gasType"
              label="Gas Type"
            />
            <q-input
              class="q-mb-md"
              outlined
              v-model="description"
              label="Description"
            />
            <q-input
              class="q-mb-md"
              outlined
              v-model="airConditioned"
              label="Air contioned"
            />
            <q-input class="q-mb-md" outlined v-model="rate" label="Rate" />
            <q-select
              class="q-mb-md"
              :options="['Manual', 'Autmatic', 'Automatic/Manual']"
              outlined
              v-model="transmission"
              label="Transmission"
            />
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
      <q-btn round color="primary" @click="clearVehicle()" icon="add" />
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

import { date } from "quasar";
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
const ddd = date;
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

const app = getCurrentInstance().appContext.config.globalProperties;
const search = ref("");
let currentUser = ref(LocalStorage.getItem("user"));

const isAgree = ref(false);

const selfieData = ref(null);
const selfieData1 = ref(null);
const selfieData2 = ref(null);
const selfieData3 = ref(null);
const selfieData4 = ref(null);
const selfieData5 = ref(null);
const selfieData6 = ref(null);
const selfieData7 = ref(null);
const selfieData8 = ref(null);
const selfieData9 = ref(null);

const supportingIDType = ref("");
const numberOfDays = ref(1);
const payment = ref("");
const paymentType = ref("");
const vehicleName = ref("");
const typeOfVehicle = ref("");
const dateNeeded = ref(null);
const seaters = ref("");
const gasType = ref("");
const description = ref("");
const airConditioned = ref("");
const rate = ref("");
const transmission = ref("");
const driversIDFront = ref(null);
const driversIDBack = ref(null);
const supportingIDFront = ref(null);
const supportingIDBack = ref(null);
const selfiefetchdownloadURL = ref(null);
const selfiefetchdownloadURL1 = ref(null);
const selfiefetchdownloadURL2 = ref(null);
const selfiefetchdownloadURL3 = ref(null);
const selfiefetchdownloadURL4 = ref(null);
const receipt = ref(null);
const signature1 = ref(null);
const file = ref("");

const action = ref("");
const step = ref(1);

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

const takePicture = async () => {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
  });

  function onSuccess(imageDataUri) {
    // Call an async function to handle the async operations
    handleImageUpload(imageDataUri);
  }

  function onFail(message) {}

  async function handleImageUpload(imageDataUri) {
    try {
      // Prepare the image data
      const imageData = "data:image/jpeg;base64," + imageDataUri;
      const rawImageData = imageDataUri;
      selfieData.value = imageData;
      selfieData1.value = rawImageData;

      // Generate unique ID for the image file name
      const uniqueId = uid();
      const fileName = `${uniqueId.slice(-12)}-selfie.jpg`;

      // Convert base64 to Blob
      const contentType = "image/jpeg"; // Ensure this matches your image format
      const blob = base64ToBlob(rawImageData, contentType);

      // Define storage reference and metadata
      const storageRef1 = storageRef(storage, fileName);
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload the image
      const snapshot = await uploadBytes(storageRef1, blob, metadata);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      selfiefetchdownloadURL.value = downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  }
};

const takePicture1 = async () => {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
  });

  function onSuccess(imageDataUri) {
    // Call an async function to handle the async operations
    handleImageUpload(imageDataUri);
  }

  function onFail(message) {}

  async function handleImageUpload(imageDataUri) {
    try {
      // Prepare the image data
      const imageData = "data:image/jpeg;base64," + imageDataUri;
      const rawImageData = imageDataUri;
      selfieData2.value = imageData;
      selfieData3.value = rawImageData;

      // Generate unique ID for the image file name
      const uniqueId = uid();
      const fileName = `${uniqueId.slice(-12)}-selfie.jpg`;

      // Convert base64 to Blob
      const contentType = "image/jpeg"; // Ensure this matches your image format
      const blob = base64ToBlob(rawImageData, contentType);

      // Define storage reference and metadata
      const storageRef1 = storageRef(storage, fileName);
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload the image
      const snapshot = await uploadBytes(storageRef1, blob, metadata);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      selfiefetchdownloadURL1.value = downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  }
};

const takePicture2 = async () => {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
  });

  function onSuccess(imageDataUri) {
    // Call an async function to handle the async operations
    handleImageUpload(imageDataUri);
  }

  function onFail(message) {}

  async function handleImageUpload(imageDataUri) {
    try {
      // Prepare the image data
      const imageData = "data:image/jpeg;base64," + imageDataUri;
      const rawImageData = imageDataUri;
      selfieData4.value = imageData;
      selfieData5.value = rawImageData;

      // Generate unique ID for the image file name
      const uniqueId = uid();
      const fileName = `${uniqueId.slice(-12)}-selfie.jpg`;

      // Convert base64 to Blob
      const contentType = "image/jpeg"; // Ensure this matches your image format
      const blob = base64ToBlob(rawImageData, contentType);

      // Define storage reference and metadata
      const storageRef1 = storageRef(storage, fileName);
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload the image
      const snapshot = await uploadBytes(storageRef1, blob, metadata);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      selfiefetchdownloadURL2.value = downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  }
};

const takePicture3 = async () => {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
  });

  function onSuccess(imageDataUri) {
    // Call an async function to handle the async operations
    handleImageUpload(imageDataUri);
  }

  function onFail(message) {}

  async function handleImageUpload(imageDataUri) {
    try {
      // Prepare the image data
      const imageData = "data:image/jpeg;base64," + imageDataUri;
      const rawImageData = imageDataUri;
      selfieData6.value = imageData;
      selfieData7.value = rawImageData;

      // Generate unique ID for the image file name
      const uniqueId = uid();
      const fileName = `${uniqueId.slice(-12)}-selfie.jpg`;

      // Convert base64 to Blob
      const contentType = "image/jpeg"; // Ensure this matches your image format
      const blob = base64ToBlob(rawImageData, contentType);

      // Define storage reference and metadata
      const storageRef1 = storageRef(storage, fileName);
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload the image
      const snapshot = await uploadBytes(storageRef1, blob, metadata);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      selfiefetchdownloadURL3.value = downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  }
};

const takePicture4 = async () => {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
  });

  function onSuccess(imageDataUri) {
    // Call an async function to handle the async operations
    handleImageUpload(imageDataUri);
  }

  function onFail(message) {}

  async function handleImageUpload(imageDataUri) {
    try {
      // Prepare the image data
      const imageData = "data:image/jpeg;base64," + imageDataUri;
      const rawImageData = imageDataUri;
      selfieData8.value = imageData;
      selfieData9.value = rawImageData;

      // Generate unique ID for the image file name
      const uniqueId = uid();
      const fileName = `${uniqueId.slice(-12)}-selfie.jpg`;

      // Convert base64 to Blob
      const contentType = "image/jpeg"; // Ensure this matches your image format
      const blob = base64ToBlob(rawImageData, contentType);

      // Define storage reference and metadata
      const storageRef1 = storageRef(storage, fileName);
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload the image
      const snapshot = await uploadBytes(storageRef1, blob, metadata);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      selfiefetchdownloadURL4.value = downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  }
};

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

const enableFutureDates = (date) => {
  console.log(date);
  const timeStamp = Date.now();
  // today.setHours(0, 0, 0, 0); // Set to start of the day
  // return today;
  return date >= ddd.formatDate(timeStamp, "YYYY/MM/DD");
};

const updddd = (value) => {
  console.log(value);
  if (value == 0) {
    numberOfDays.value = 1;
  }
};

async function clearVehicle() {
  addLayout.value = true;
  // image.value = rentalDetails.value.image;
  vehicleName.value = "";
  typeOfVehicle.value = "";
  seaters.value = 0;
  gasType.value = "";
  description.value = "";
  airConditioned.value = "";
  rate.value = 0;
  transmission.value = "";
  action.value = "add";
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
  if (
    paymentType.value &&
    payment.value &&
    dateNeeded.value &&
    numberOfDays.value &&
    // driversIDFront.value &&
    // driversIDBack.value &&
    // supportingIDFront.value &&
    // supportingIDBack.value &&
    signature1.value &&
    selfiefetchdownloadURL.value &&
    selfiefetchdownloadURL1.value &&
    selfiefetchdownloadURL2.value &&
    selfiefetchdownloadURL3.value &&
    selfiefetchdownloadURL4.value &&
    receipt.value
  ) {
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
  } else {
    $q.notify({
      position: "top",
      color: "negative",
      icon: "close",
      message: "Fill out all fields.",
    });
  }
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
  // const image1 = await driversIDFrontFetch();
  // const image2 = await driversIDBackFetch();
  // const image3 = await supportingIDFrontFetch();
  // const image4 = await supportingIDBackFetch();  const image1 = await driversIDFrontFetch();
  const image1 = selfiefetchdownloadURL1.value;
  const image2 = selfiefetchdownloadURL2.value;
  const image3 = selfiefetchdownloadURL3.value;
  const image4 = selfiefetchdownloadURL4.value;
  const image5 = await receiptFetch();
  const image6 = await signatureFetch();
  let image7 = selfiefetchdownloadURL.value;

  const docRef = await addDoc(collection(db, "histories"), {
    user: currentUser.value,
    currentUser: LocalStorage.getItem("user"),
    dateNeeded: dateNeeded.value,
    numberOfDays: numberOfDays.value,
    status: "Pending",
    rentalDetails: {
      ...rentalDetails.value,
      ...{ id: rentalDetails.value.id },
    },
    createdAt: serverTimestamp(),
    driversIDFront: image1,
    driversIDBack: image2,
    supportingIDType: supportingIDType.value,
    supportingIDFront: image3,
    supportingIDBack: image4,
    selfie: image7,
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

  paymentType.value = "";
  payment.value = "";
  dateNeeded.value = null;
  numberOfDays.value = 1;
  // driversIDFront.value = null;
  // driversIDBack.value = null;
  // supportingIDFront.value = null;
  // supportingIDBack.value = null;
  signature1.value = null;
  selfiefetchdownloadURL.value = null;
  selfiefetchdownloadURL1.value = null;
  selfiefetchdownloadURL2.value = null;
  selfiefetchdownloadURL3.value = null;
  selfiefetchdownloadURL4.value = null;
  receipt.value = null;

  isProceedRentLayout.value = false;
  app.$router.push("/history");
  $q.loading.hide();
};
</script>
