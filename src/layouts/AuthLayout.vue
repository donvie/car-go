<template>
  <q-layout view="lHh Lpr lFf" style="background: #c4e6f9">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: "AuthLayout",
});
</script>
