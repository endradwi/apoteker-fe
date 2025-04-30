<script setup lang="ts">
definePageMeta({
  layout: "admin",
  name: "AdminPage",
});
useSeoMeta({
  title: "Admin Page",
});
</script>
<template>
  <div class="w-screen h-screen flex flex-col py-24 px-52 gap-10">
    <h1 class="text-5xl font-black">Admin Page</h1>
    <div class="flex justify-between items-center gap-5">
      <div
        class="border border-black py-5 px-8 flex gap-10 justify-between items-center w-full"
      >
        <div class="space-y-20">
          <h2>Akun User</h2>
          <div>100</div>
        </div>
        <div>
          <img src="@/assets/Logogsu.png" alt="" class="w-20 h-20" />
        </div>
      </div>
      <div
        class="border border-black py-5 px-8 flex gap-10 justify-between items-center w-full"
      >
        <div class="space-y-20">
          <h2>Pasien Register</h2>
          <div>100</div>
        </div>
        <div>
          <img src="@/assets/Logogsu.png" alt="" class="w-20 h-20" />
        </div>
      </div>
      <div
        class="border border-black py-5 px-8 flex gap-10 justify-between items-center w-full"
      >
        <div class="space-y-20">
          <h2>Akun Admin</h2>
          <div>100</div>
        </div>
        <div>
          <img src="@/assets/Logogsu.png" alt="" class="w-20 h-20" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Mulish";
}
</style>
