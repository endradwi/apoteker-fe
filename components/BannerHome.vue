<script setup lang="ts">
const store = useUserStore();
const router = useRouter();

async function onClick() {
  const response = await store.profile();
  if (response) {
    router.push("/regis");
  } else {
    // Handle profile retrieval error
    alert("Failed to retrieve profile");
  }
}
</script>
<template>
  <section
    class="flex items-center justify-between px-20 py-10 rounded-2xl bg-gradient-to-r from-white to-[#C95792] mx-10 shadow-2xl"
  >
    <div class="flex-1 space-y-5">
      <h1 class="text-5xl font-bold">Welcome To Praktek Bidan Istiadah</h1>
      <p class="">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <button
        class="py-3 px-5 rounded-xl font-bold text-xl bg-[#3D365C] text-white"
        @click="onClick"
      >
        Registration Now!
      </button>
    </div>
    <div class="flex-1 flex justify-center">
      <img src="../assets/iconBanner.png" alt="Image Banner" />
    </div>
  </section>
</template>
