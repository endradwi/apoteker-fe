<script setup lang="ts">
definePageMeta({
  layout: "admin",
  name: "AdminPage",
});
useSeoMeta({
  title: "Admin Page",
});
const store = useUserStore();
const totalUser = ref(0);
const totalPendaftaran = ref(0);

async function getAllUser() {
  const responsePageAllUser = (await store.allUser()) as any;
  totalUser.value = responsePageAllUser.page_info.total_data;
  const responsePageReverse = (await store.getAllReserve()) as any;
  totalPendaftaran.value = responsePageReverse.page_info.total_data;
}
onMounted(() => {
  getAllUser();
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
          <div>{{ totalUser }}</div>
        </div>
        <div>
          <img src="@/assets/Logogsu.png" alt="" class="w-20 h-20" />
        </div>
      </div>
      <div
        class="border border-black py-5 px-8 flex gap-10 justify-between items-center w-full"
      >
        <div class="space-y-20">
          <h2>Pendaftaran Pasien</h2>
          <div>{{ totalPendaftaran }}</div>
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
