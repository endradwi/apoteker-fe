<script setup lang="ts">
const name = ref("");
const phone_number = ref("");
const age = ref("");
const date = ref("");
const doctor = ref("");
const complaint = ref("");
const doctorList = ref([
  { id: 1, name: "dr. Andi" },
  { id: 2, name: "dr. Budi" },
  { id: 3, name: "dr. Citra" },
]);
const arrow = ref(false);
const doctorSelect = ref<HTMLSelectElement | null>(null);
function toggleArrow() {
  arrow.value = !arrow.value;
  doctorSelect.value?.focus();
}
function formatDateToISOString(dateStr: string): string {
  const dateObj = new Date(dateStr);
  return dateObj.toISOString().split(".")[0] + "Z"; // hasil: 2025-05-16T00:00:00Z
}
function reserve() {
  const data = {
    name: name.value,
    phone_number: phone_number.value,
    age: age.value,
    date: formatDateToISOString(date.value), // format date to ISO string
    doctor: doctor.value,
    complaint: complaint.value,
  };
  console.log("Form data = ", data);
}
</script>
<template>
  <div class="flex flex-col gap-5 mx-96 my-28">
    <h1 class="text-5xl font-bold">Pendaftaran Pasien</h1>
    <section
      class="px-5 py-10 rounded-2xl border-2 border-[#C95792] shadow-xl shadow-[#3D365C]"
    >
      <form @submit.prevent="reserve" class="flex gap-5">
        <div class="flex flex-col gap-5 w-full">
          <div class="flex flex-col">
            <label for="">Full name</label>
            <input
              type="text"
              v-model="name"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">Phone Number</label>
            <input
              type="text"
              v-model="phone_number"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">Age</label>
            <input
              type="text"
              v-model="age"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">Date</label>
            <input
              type="date"
              v-model="date"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">Dokter</label>
            <!-- <input -->
            <!-- type="text" -->
            <!-- v-model="doctor" -->
            <!-- class="border border-black rounded-md py-3 px-5" -->
            <!-- /> -->
            <div class="flex w-full border border-black rounded-md py-3 px-2">
              <select
                v-model="doctor"
                class="w-full border-box outline-0"
                @focus="arrow = true"
                @blur="arrow = false"
                @change="arrow = false"
              >
                <option v-for="doctor in doctorList" :key="doctor.id">
                  {{ doctor.name }}
                </option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                @click="toggleArrow"
                :class="arrow ? 'rotate-180' : 'rotate-0'"
                class="cursor-pointer transition-transform duration-300"
              >
                <!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE -->
                <path
                  fill="currentColor"
                  d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"
                />
              </svg>
            </div>
          </div>
          <div class="flex flex-col">
            <label for="">Keluhan</label>
            <input
              type="text"
              v-model="complaint"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <button
            class="bg-[#3D365C] text-white font-bold w-full max-w-52 py-3 border-2 border-[#3D365C] rounded-lg hover:bg-white hover:border-2 hover:border-[#3D365C] hover:text-[#3D365C] transition-all duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
select {
  appearance: none; /* Non-standard */
  -webkit-appearance: none; /* For Safari */
  -moz-appearance: none; /* For Firefox */
  background: none; /* optional: remove default bg */
}
</style>
