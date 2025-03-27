<script setup lang="ts">
definePageMeta({
    layout: 'default',
    name: 'Homepage',
})
useSeoMeta({
    title: 'Home Page'
})
</script>
<template>
    <BannerHome/>
    <Card/>
</template>

<style scoped>
*{
    font-family: "Mulish";
}
</style>