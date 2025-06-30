<script setup lang="ts">
definePageMeta({
  layout: "admin",
  //   name: "AdminUserPage",
});
useSeoMeta({
  title: "Admin-User Page",
});
interface User {
  id: number;
  fullname: string;
  phone_number: string;
  email: string;
  role_id: number; // atau `role_id: number` tergantung datanya
}
const users = ref<User[]>([]);
const selectedUser = ref<User | null>(null);
const store = useUserStore();
const modalOpenCreateAdmin = ref(false);
const modalOpenEditUser = ref(false);
const totalPage = ref(0);
const currentPage = ref(1);
const searchQuery = ref("");

async function getAllUser(page = 1, search = "") {
  currentPage.value = page;
  const response = (await store.allUser(page, search)) as any;
  if (response && Array.isArray(response.results)) {
    users.value = response.results;
    console.log("users data=", users.value);
  }
  totalPage.value = response.page_info.total_page;
  console.log("total page=", totalPage.value);
  console.log("data all=", response);
}

function EditClick(user: User) {
  selectedUser.value = { ...user };
  modalOpenCreateAdmin.value = false;
  modalOpenEditUser.value = !modalOpenEditUser.value;
}
function toggleCreateAdmin() {
  modalOpenEditUser.value = false;
  modalOpenCreateAdmin.value = !modalOpenCreateAdmin.value;
}
async function deleteUser(user: User) {
  const response = await store.deleteUser(user.id);
  if (response) {
    console.log("delete user response=", user);
    console.log("User deleted successfully");
    getAllUser(currentPage.value); // Refresh the user list
  } else {
    console.error("Failed to delete user");
  }
}

onMounted(() => {
  getAllUser(); // Example usage, remove this line in production
});
</script>
<template>
  <div class="w-screen h-screen flex flex-col py-12 px-5 lg:px-52 gap-2">
    <div class="w-full flex justify-between items-center">
      <h1 class="text-3xl lg:text-5xl font-black">Akun User</h1>
      <div
        class="flex focus-within:border-2 focus-within:border-black border border-black rounded-lg items-center pr-2 overflow-hidden"
      >
        <input
          placeholder="Search name"
          class="outline-none rounded-md pl-5 py-2"
          v-model="searchQuery"
          @input="getAllUser(1, searchQuery)"
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
      <button
        @click="toggleCreateAdmin"
        class="bg-slate-200 rounded-lg p-3 font-bold hover:bg-slate-500"
      >
        Tambah Admin Baru
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th class="border border-black py-2 px-4">No</th>
          <th class="border border-black py-2 px-4">Nama Lengkap</th>
          <th class="border border-black py-2 px-4">Nomor Telepon</th>
          <th class="border border-black py-2 px-4">Email</th>
          <th class="border border-black py-2 px-4">Role</th>
          <th class="border border-black py-2 px-4">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td class="border border-black py-2 pl-4">{{ index + 1 }}</td>
          <td class="border border-black py-2 pl-4">{{ user.fullname }}</td>
          <td class="border border-black py-2 pl-4">{{ user.phone_number }}</td>
          <td class="border border-black py-2 pl-4">{{ user.email }}</td>
          <td class="border border-black py-2 pl-4">
            {{ user.role_id === 1 ? "Admin" : "Users" }}
          </td>
          <td class="border border-black py-2 space-x-2 text-center">
            <button
              @click="deleteUser(user)"
              class="bg-red-500 text-white py-1 px-3 rounded"
            >
              Delete
            </button>
            <button
              class="bg-yellow-500 text-white py-1 px-3 rounded"
              @click="EditClick(user)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="w-full flex justify-center gap-2 mt-4">
      <button
        class="p-2 px-4 bg-gray-200 rounded"
        :disabled="currentPage === 1"
        @click="getAllUser(currentPage - 1, searchQuery)"
      >
        Prev
      </button>

      <button
        v-for="page in totalPage"
        :key="page"
        @click="getAllUser(page, searchQuery)"
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
        @click="getAllUser(currentPage + 1, searchQuery)"
      >
        Next
      </button>
    </div>

    <ModalEditUser
      v-if="modalOpenEditUser"
      :user="selectedUser"
      @close="modalOpenEditUser = false"
      @refresh="getAllUser"
    />
    <ModalCreateAdmin
      v-if="modalOpenCreateAdmin"
      @close="modalOpenCreateAdmin = false"
      @refresh="getAllUser"
    />
  </div>
</template>

<style scoped>
.info-list li {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 8px;
}
</style>
