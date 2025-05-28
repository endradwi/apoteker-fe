<script setup lang="ts">
const items = ref<any[]>([]); // reactive array untuk list

const store = useUserStore();

async function fetchHistory() {
  const response = await store.getHistory();
  if (response) {
    const results = (response as any).results;
    items.value = results;
  } else {
    console.error("Failed to fetch history");
  }
}

onMounted(() => {
  fetchHistory();
});
</script>

<template>
  <div class="h-screen w-screen py-16 px-20 flex flex-col gap-5">
    <h1 class="text-5xl font-bold">History Pendaftaran</h1>
    <section
      class="px-5 py-10 rounded-2xl border-2 border-[#C95792] shadow-xl shadow-[#3D365C]"
    >
      <table class="w-full">
        <thead>
          <tr>
            <th class="border border-black px-4 py-2">No</th>
            <th class="border border-black px-4 py-2">Full Name</th>
            <th class="border border-black px-4 py-2">Phone Number</th>
            <th class="border border-black px-4 py-2">Age</th>
            <th class="border border-black px-4 py-2">Date</th>
            <th class="border border-black px-4 py-2">Dokter</th>
            <th class="border border-black px-4 py-2">Keluhan</th>
            <th class="border border-black px-4 py-2">Rekam Medis</th>
            <th class="border border-black px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index" class="text-center">
            <td class="border border-black py-2">{{ index + 1 }}</td>
            <td class="border border-black py-2">{{ item.fullname }}</td>
            <td class="border border-black py-2">
              {{ item.phone_number }}
            </td>
            <td class="border border-black py-2">{{ item.age }}</td>
            <td class="border border-black py-2">
              {{ item.date.split("T")[0].split("-").reverse().join("-") }}
            </td>
            <td class="border border-black py-2">{{ item.doctor }}</td>
            <td class="border border-black py-2">{{ item.complaint }}</td>
            <td class="border border-black py-2">{{ item.rec_medic }}</td>
            <td class="border border-black py-2">
              <span class="bg-yellow-600 rounded-xl px-2 py-1 font-bold">{{
                item.status
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
