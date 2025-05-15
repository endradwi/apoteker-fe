<script setup lang="ts">
import Admin from "./admin.vue";

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
const store = useUserStore();
async function getAllUser() {
  const response = (await store.allUser()) as any;
  if (response && Array.isArray(response.results)) {
    users.value = response.results;
    console.log("users data=", users.value);
  }
  console.log("data all=", response);
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
          <td class="border border-black py-2 px-4">{{ user.id }}</td>
          <td class="border border-black py-2 px-4">{{ user.fullname }}</td>
          <td class="border border-black py-2 px-4">{{ user.phone_number }}</td>
          <td class="border border-black py-2 px-4">{{ user.email }}</td>
          <td class="border border-black py-2 px-4">
            {{ user.role_id === 1 ? "Admin" : "Users" }}
          </td>
          <td class="border border-black py-2 px-4">
            <button class="bg-red-500 text-white py-1 px-3 rounded">
              Delete
            </button>
          </td>
        </tr>
        <!-- Add more rows as needed -->
      </tbody>
    </table>
  </div>
</template>

<style scoped>
* {
  font-family: "Mulish";
}
</style>
