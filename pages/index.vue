<script setup lang="ts">
definePageMeta({
  layout: "default",
  name: "Homepage",
});
useSeoMeta({
  title: "Home Page",
});
</script>
<template>
  <BannerHome />
  <AboutUs />
  <Card />
</template>

<style scoped>
* {
  font-family: "Mulish";
}
</style>
