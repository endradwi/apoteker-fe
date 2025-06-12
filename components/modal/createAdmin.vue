<script lang="ts" setup>
const store = useUserStore();
const full_name = ref("");
const phone_number = ref("");
const email = ref("");
const password = ref("");
const role_id = ref(1); // Default to Admin role
async function createAdmin() {
  const response = await store.createAdmin({
    fullname: full_name.value,
    phone_number: phone_number.value,
    email: email.value,
    password: password.value,
    role_id: role_id.value,
  });
  if (response) {
    console.log("Admin created successfully:", response);
  } else {
    console.error("Failed to create admin");
  }
}
// onMounted(() => {
//   createAdmin();
// });
</script>
<template>
  <div class="absolute top-44 right-[750px]">
    <div
      class="bg-white p-6 rounded-lg shadow-lg w-96 shadow shadow-lg shadow-slate-500"
    >
      <h2 class="text-xl font-bold mb-4">Tambah Admin</h2>
      <form @submit.prevent="createAdmin">
        <div class="mb-4">
          <label class="block font-bold mb-1">Nama Lengkap</label>
          <input
            v-model="full_name"
            type="text"
            required
            class="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-1">Nomor Telepon</label>
          <input
            v-model="phone_number"
            type="text"
            required
            class="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-1">Role</label>
          <select
            v-model="role_id"
            required
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
            @click="$emit('close')"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
