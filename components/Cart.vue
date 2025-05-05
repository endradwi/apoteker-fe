<script setup lang="ts">
const items = [
  {
    fullName: "John Doe",
    phoneNumber: "08123456789",
    age: 30,
    date: "2023-10-01",
    dokter: "Dr. Smith",
    keluhan: "Flu",
  },
  {
    fullName: "Jane Smith",
    phoneNumber: "08234567890",
    age: 25,
    date: "2023-10-02",
    dokter: "Dr. Brown",
    keluhan: "Headache",
  },
];
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td class="border border-black px-4 py-2">{{ index + 1 }}</td>
            <td class="border border-black px-4 py-2">{{ item.fullName }}</td>
            <td class="border border-black px-4 py-2">
              {{ item.phoneNumber }}
            </td>
            <td class="border border-black px-4 py-2">{{ item.age }}</td>
            <td class="border border-black px-4 py-2">{{ item.date }}</td>
            <td class="border border-black px-4 py-2">{{ item.dokter }}</td>
            <td class="border border-black px-4 py-2">{{ item.keluhan }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
