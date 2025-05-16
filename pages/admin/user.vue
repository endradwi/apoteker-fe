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
const editOpen = ref(false);
const role = ref(0);
const selectedUser = ref<User | null>(null);
const store = useUserStore();
async function getAllUser() {
  const response = (await store.allUser()) as any;
  if (response && Array.isArray(response.results)) {
    users.value = response.results;
    console.log("users data=", users.value);
  }
  console.log("data all=", response);
}

function EditClick(user: User) {
  selectedUser.value = { ...user };
  editOpen.value = true;
}
async function editProfile() {
  if (!selectedUser.value) return;

  const response = await store.updateStatus(
    selectedUser.value.id,
    selectedUser.value.role_id
  );
  console.log("Profile data = ", response);

  // Update user di list users
  const index = users.value.findIndex((u) => u.id === selectedUser.value?.id);
  // console.log("index=", index);
  if (index !== -1) {
    users.value[index] = { ...selectedUser.value };
  }

  editOpen.value = false;
  // console.log("Profile data = ", response);
}

onMounted(() => {
  getAllUser();
});
</script>
<template>
  <div class="w-screen h-screen flex flex-col py-24 px-52 gap-10">
    <h1 class="text-5xl font-black">Akun User</h1>
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
        <tr v-for="user in users" :key="user.id">
          <td class="border border-black py-2 pl-4">{{ user.id }}</td>
          <td class="border border-black py-2 pl-4">{{ user.fullname }}</td>
          <td class="border border-black py-2 pl-4">{{ user.phone_number }}</td>
          <td class="border border-black py-2 pl-4">{{ user.email }}</td>
          <td class="border border-black py-2 pl-4">
            {{ user.role_id === 1 ? "Admin" : "Users" }}
          </td>
          <td class="border border-black py-2 space-x-2 text-center">
            <button class="bg-red-500 text-white py-1 px-3 rounded">
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
    <div v-if="editOpen && selectedUser">
      <form @submit.prevent="editProfile">
        <div class="mb-4">
          <label class="block font-bold mb-1">Nama Lengkap</label>
          <input
            v-model="selectedUser.fullname"
            type="text"
            disabled
            class="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-1">Nomor Telepon</label>
          <input
            v-model="selectedUser.phone_number"
            type="text"
            disabled
            class="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-1">Email</label>
          <input
            v-model="selectedUser.email"
            type="email"
            disabled
            class="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-1">Role</label>
          <select
            v-model="selectedUser.role_id"
            class="border border-gray-300 p-2 rounded w-full"
          >
            <option :value="1">Admin</option>
            <option :value="2">Users</option>
          </select>
        </div>

        <div class="flex gap-2">
          <button
            type="submit"
            class="bg-green-500 text-white py-1 px-4 rounded"
          >
            Simpan
          </button>
          <button
            type="button"
            class="bg-gray-400 text-white py-1 px-4 rounded"
            @click="editOpen = false"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Mulish";
}

.info-list li {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 8px;
}
</style>
