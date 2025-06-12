<script lang="ts" setup>
interface User {
  id: number;
  fullname: string;
  phone_number: string;
  email: string;
  role_id: number; // atau `role_id: number` tergantung datanya
}
const store = useUserStore();
const editOpen = ref(false);
const users = ref<User[]>([]);
const editUser = ref<User | null>(null);

const props = defineProps<{
  user: User | null;
}>();

async function editProfile() {
  if (!editUser.value) return;

  const response = await store.updateStatus(
    editUser.value.id,
    editUser.value.role_id
  );
  console.log("Profile data = ", response);

  // Update user di list users
  const index = users.value.findIndex((u) => u.id === editUser.value?.id);

  if (index !== -1) {
    users.value[index] = { ...editUser.value };
  }

  editOpen.value = false;
}
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      editUser.value = { ...newUser }; // clone untuk menjaga reactivity dan binding
    }
  },
  { immediate: true }
);
</script>
<template>
  <div
    class="bg-white p-6 rounded-lg shadow-lg w-full shadow shadow-lg shadow-slate-500"
    v-if="editUser"
  >
    <h2 class="text-xl font-bold mb-4">Edit User Ke Admin</h2>
    <form @submit.prevent="editProfile">
      <div class="mb-4">
        <label class="block font-bold mb-1">Nama Lengkap</label>
        <input
          type="text"
          v-model="editUser.fullname"
          disabled
          class="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div class="mb-4">
        <label class="block font-bold mb-1">Nomor Telepon</label>
        <input
          type="text"
          v-model="editUser.phone_number"
          disabled
          class="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div class="mb-4">
        <label class="block font-bold mb-1">Email</label>
        <input
          type="email"
          v-model="editUser.email"
          disabled
          class="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div class="mb-4">
        <label class="block font-bold mb-1">Role</label>
        <select
          v-model="editUser.role_id"
          class="border border-gray-300 p-2 rounded w-full"
        >
          <option :value="1">Admin</option>
          <option :value="2">Users</option>
        </select>
      </div>

      <div class="flex gap-2">
        <button type="submit" class="bg-green-500 text-white py-1 px-4 rounded">
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
</template>
