<script setup lang="ts">
import { ModalEditPasien } from "#components";
import { on } from "events";

definePageMeta({
  layout: "admin",
  //   name: "AdminUserPage",
});
useSeoMeta({
  title: "Admin-Pasien Page",
});

interface User {
  id: number;
  fullname: string;
  phone_number: string;
  age: string;
  date: number;
  doctor: string;
  rec_medic: string;
  status: string;
}

const users = ref<User[]>([]);
const totalPage = ref(0);
const currentPage = ref(1);
const modalOpenEditUser = ref(false);
const selectedUser = ref<any | null>(null);
const searchQuery = ref("");

const store = useUserStore();
async function getAllPasien(page = 1, search = "") {
  currentPage.value = page;
  const response = (await store.getAllReserve(page, search)) as any;
  if (response && Array.isArray(response.results)) {
    console.log("Pasien data=", response.results);
    users.value = response.results.map((user: User) => {
      const [year, month, day] = user.date.toString().split("T")[0].split("-");
      return {
        ...user,
        date: `${day}-${month}-${year}`,
      };
    });
    console.log("Converted data=", users.value);
  } else {
    console.error("Failed to fetch pasien data");
  }
  totalPage.value = response.page_info.total_page;
}
function EditClick(user: User) {
  selectedUser.value = { ...user }; // Simpan user yang diklik
  modalOpenEditUser.value = true;
  console.log("Selected user for edit:", selectedUser.value);
}
onMounted(() => {
  getAllPasien(); // Ambil data pasien saat komponen dimuat
});
</script>
<template>
  <div class="w-screen h-screen flex flex-col py-24 px-5 lg:px-52 gap-10">
    <div class="flex justify-between items-center">
      <h1 class="text-5xl font-black">Pendaftaran Pasien</h1>
      <div
        class="flex focus-within:border-2 focus-within:border-black border border-black rounded-lg items-center pr-2 overflow-hidden"
      >
        <input
          placeholder="Search name"
          class="outline-none rounded-md pl-5 py-2"
          v-model="searchQuery"
          @input="getAllPasien(1, searchQuery)"
        />
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE -->
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
            />
          </svg>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th class="border border-black py-2 px-4">No</th>
          <th class="border border-black py-2 px-4">Nama Lengkap</th>
          <th class="border border-black py-2 px-4">No Telpon</th>
          <th class="border border-black py-2 px-4">Umur</th>
          <th class="border border-black py-2 px-4">Tanggal Periksa</th>
          <th class="border border-black py-2 px-4">Dokter</th>
          <th class="border border-black py-2 px-4">Catatan Medis</th>
          <th class="border border-black py-2 px-4">Status</th>
          <th class="border border-black py-2 px-4">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td class="border border-black py-2 px-4">{{ index + 1 }}</td>
          <td class="border border-black py-2 px-4">{{ user.fullname }}</td>
          <td class="border border-black py-2 px-4">{{ user.phone_number }}</td>
          <td class="border border-black py-2 px-4 text-center">
            {{ user.age }}
          </td>
          <td class="border border-black py-2 px-4 text-center">
            {{ user.date }}
          </td>
          <td class="border border-black py-2 px-4">{{ user.doctor }}</td>
          <td class="border border-black py-2 px-4">
            <div v-html="user.rec_medic"></div>
          </td>
          <td class="border border-black py-2 px-4">
            <span
              :class="{
                'bg-yellow-200 text-yellow-800':
                  user.status === 'pending' || user.status === 'Pending',
                'bg-green-200 text-green-800': user.status === 'completed',
                'bg-red-200 text-red-800':
                  user.status !== 'pending' &&
                  user.status !== 'Pending' &&
                  user.status !== 'completed',
              }"
              class="p-1 rounded-xl font-semibold"
            >
              {{ user.status }}
            </span>
          </td>
          <td class="border border-black py-2 px-4 space-x-1">
            <button
              class="bg-yellow-500 text-white py-1 px-3 rounded"
              @click="EditClick(user)"
            >
              Edit
            </button>
          </td>
        </tr>
        <!-- Add more rows as needed -->
      </tbody>
    </table>
    <div class="w-full flex justify-center gap-2 mt-4">
      <button
        class="p-2 px-4 bg-gray-200 rounded"
        :disabled="currentPage === 1"
        @click="getAllPasien(currentPage - 1, searchQuery)"
      >
        Prev
      </button>

      <button
        v-for="page in totalPage"
        :key="page"
        @click="getAllPasien(page, searchQuery)"
        class="p-2 px-4 rounded"
        :class="{
          'bg-[#C95792] text-white': page === currentPage,
          'bg-gray-200': page !== currentPage,
        }"
      >
        {{ page }}
      </button>

      <button
        class="p-2 px-4 bg-gray-200 rounded"
        :disabled="currentPage === totalPage"
        @click="getAllPasien(currentPage + 1, searchQuery)"
      >
        Next
      </button>
    </div>
    <ModalEditPasien
      v-if="modalOpenEditUser"
      :user="selectedUser"
      @close="modalOpenEditUser = false"
      @refresh="getAllPasien"
    />
  </div>
</template>

<style scoped>
* {
  font-family: "Mulish";
}
/* Jika pakai <style scoped>, tambahkan :deep() */
:deep(ol) {
  @apply list-disc pl-6 mb-2;
}
</style>
