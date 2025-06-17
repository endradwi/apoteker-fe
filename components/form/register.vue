<script setup lang="ts">
import Swal from "sweetalert2";
import type { reserveResponse } from "~/types/user";

const name = ref("");
const phone_number = ref("");
const age = ref("");
const date = ref("");
const doctor = ref("");
const complaint = ref("");
const doctorList = ref([
  { id: 1, name: "Bidan istiadah S.Tr.Keb - Kepala Bidan dan Ceo" },
  { id: 2, name: "Dr. Femmy Dzulkarnaen, SpOG - Dokter Spesialis Kandungan" },
  { id: 3, name: "Lilis S.Pd - Kepala Trapis" },
]);
const arrow = ref(false);
const doctorSelect = ref<HTMLSelectElement | null>(null);
const dateInput = ref<HTMLInputElement | null>(null);
const store = useUserStore();

function openDatePicker() {
  dateInput.value?.showPicker(); // showPicker() hanya didukung di Chrome/Edge terbaru
}

function toggleArrow() {
  arrow.value = !arrow.value;
  doctorSelect.value?.focus();
}
function formatDateToISOString(dateStr: string): string {
  const dateObj = new Date(dateStr);
  return dateObj.toISOString().split(".")[0] + "Z";
}

async function reserve() {
  const data = {
    name: name.value,
    phone_number: phone_number.value,
    age: age.value,
    date: formatDateToISOString(date.value),
    doctor: doctor.value,
    complaint: complaint.value,
  };
  const response = (await store.reserve(
    data.name,
    data.phone_number,
    data.age,
    data.date,
    data.doctor,
    data.complaint
  )) as reserveResponse;
  console.log("Reservation response: ", response);
  Swal.fire({
    icon: response?.success ? "success" : "error",
    text: "Pendaftaran Berhasil, Silahkan datang sesuai tanggal yang telah dipilih",
    timer: 5000,
    showConfirmButton: false,
    timerProgressBar: true,
  }).then(() => {
    if (response?.success) {
      name.value = "";
      phone_number.value = "";
      age.value = "";
      date.value = "";
      doctor.value = "";
      complaint.value = "";
      arrow.value = false;
    }
  });
}
</script>
<template>
  <div class="flex flex-col gap-5 mx-2 my-10 lg:mx-96 lg:my-28">
    <h1 class="text-4xl lg:text-5xl font-bold">Pendaftaran Pasien</h1>
    <section
      class="px-5 py-10 rounded-2xl border-2 border-[#C95792] shadow-xl shadow-[#3D365C]"
    >
      <form @submit.prevent="reserve" class="flex gap-5">
        <div class="flex flex-col gap-5 w-full">
          <div class="flex flex-col">
            <label for="fullname">Nama Lengkap</label>
            <input
              type="text"
              v-model="name"
              id="fullname"
              placeholder="Masukan Nama Lengkap"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="phone_number">No Telepon</label>
            <input
              type="text"
              v-model="phone_number"
              id="phone_number"
              placeholder="Masukan No Telepon"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="age">Umur</label>
            <input
              type="text"
              v-model="age"
              id="age"
              placeholder="Masukan Umur"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="date">Piih Tanggal Berobat</label>
            <div @click="openDatePicker" class="cursor-pointer w-full">
              <input
                type="date"
                ref="dateInput"
                v-model="date"
                id="date"
                class="border border-black rounded-md py-3 px-5 w-full"
              />
            </div>
          </div>

          <div class="relative">
            <label for="doctor">Pilih Dokter</label>
            <div
              class="border border-black rounded-md py-3 px-5 cursor-pointer flex justify-between items-center"
              @click="toggleArrow"
            >
              <span>{{ doctor || "Pilih Dokter" }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                :class="[
                  'transition-transform duration-300',
                  arrow ? 'rotate-180' : 'rotate-0',
                ]"
              >
                <path
                  fill="currentColor"
                  d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"
                />
              </svg>
            </div>

            <!-- Dropdown menu -->
            <div
              v-show="arrow"
              class="absolute z-10 w-full bg-white border border-black rounded-md mt-1 shadow-lg"
            >
              <div
                v-for="item in doctorList"
                :key="item.id"
                class="px-5 py-3 hover:bg-gray-200 cursor-pointer"
                @click="
                  doctor = item.name;
                  arrow = false;
                "
              >
                {{ item.name }}
              </div>
            </div>
          </div>

          <div class="flex flex-col">
            <label for="complaint">Masukan Keluhan</label>
            <input
              type="text"
              v-model="complaint"
              placeholder="Masukan Keluhan"
              id="complaint"
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
