<script setup lang="ts">
import Swal from "sweetalert2";
const store = useUserStore();
const router = useRouter();

async function onClick() {
  const response = await store.profile();
  if (response) {
    router.push("/regis");
  } else {
    Swal.fire({
      icon: "error",
      title: "Ada kesalahan pada anda",
      text: "Silahkan login terlebih dahulu",
    });
  }
}
</script>
<template>
  <section
    class="flex lg:flex-row flex-col items-center justify-between px-5 lg:px-20 py-10 rounded-2xl bg-gradient-to-r from-white to-[#C95792] mx-2 lg:mx-10 shadow-2xl"
  >
    <div class="flex-1 space-y-5 text-center lg:text-left">
      <h1 class="text-5xl font-bold">
        Selamat Datang di Praktek Bidan Istiadah
      </h1>
      <p class="max-w-4xl">
        Kami hadir untuk memberikan pelayanan kesehatan terbaik bagi ibu dan
        anak. Dengan tenaga medis yang ramah dan profesional, kami siap
        mendampingi setiap langkah perjalanan kesehatan Anda.
      </p>
      <p>🌸 Sehat Ibu, Bahagia Keluarga.</p>
      <button
        class="py-3 px-5 rounded-xl font-bold text-xl bg-[#3D365C] text-white"
        @click="onClick"
      >
        Daftar Sekarang!
      </button>
    </div>
    <div class="flex justify-center">
      <img src="../assets/iconBanner.png" alt="Image Banner" />
    </div>
  </section>
</template>
