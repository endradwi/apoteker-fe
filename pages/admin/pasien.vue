<script setup lang="ts">
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

const store = useUserStore();
async function getAllPasien(page = 1) {
  currentPage.value = page;
  const response = (await store.getAllReserve(page)) as any;
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
function EditClick(user: User) {}
async function deleteUser(user: User) {}
onMounted(() => {
  getAllPasien(); // Example usage, remove this line in production
});
</script>
<template>
  <div class="w-screen h-screen flex flex-col py-24 px-52 gap-10">
    <h1 class="text-5xl font-black">Pendaftaran Pasien</h1>
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
          <td class="border border-black py-2 px-4">{{ user.age }}</td>
          <td class="border border-black py-2 px-4">{{ user.date }}</td>
          <td class="border border-black py-2 px-4">{{ user.doctor }}</td>
          <td class="border border-black py-2 px-4">{{ user.rec_medic }}</td>
          <td class="border border-black py-2 px-4">
            <span
              :class="{
                'bg-yellow-200 text-yellow-800': user.status === 'pending',
                'bg-green-200 text-green-800': user.status === 'completed',
                'bg-red-200 text-red-800':
                  user.status !== 'pending' && user.status !== 'completed',
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
            <button
              @click="deleteUser(user)"
              class="bg-red-500 text-white py-1 px-3 rounded"
            >
              Delete
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
        @click="getAllPasien(currentPage - 1)"
      >
        Prev
      </button>

      <button
        v-for="page in totalPage"
        :key="page"
        @click="getAllPasien(page)"
        class="p-2 px-4 rounded"
        :class="{
          'bg-blue-500 text-white': page === currentPage,
          'bg-gray-200': page !== currentPage,
        }"
      >
        {{ page }}
      </button>

      <button
        class="p-2 px-4 bg-gray-200 rounded"
        :disabled="currentPage === totalPage"
        @click="getAllPasien(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Mulish";
}
</style>
