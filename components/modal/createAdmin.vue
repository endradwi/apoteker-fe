<script lang="ts" setup>
import Swal from "sweetalert2";
const SwalInstance = Swal as any;

const store = useUserStore();
const full_name = ref("");
const phone_number = ref("");
const email = ref("");
const password = ref("");
const role_id = ref(1); // Default to Admin role
const eye = ref(false);
const isLoading = ref(false);

const emit = defineEmits<{
  close: [];
  refresh: [];
}>();

const togglePasswordVisibility = () => {
  eye.value = !eye.value;
};

function resetForm() {
  full_name.value = "";
  phone_number.value = "";
  email.value = "";
  password.value = "";
  role_id.value = 1;
  eye.value = false;
}

async function createAdmin() {
  try {
    isLoading.value = true;
    const response = await store.createAdmin({
      fullname: full_name.value,
      phone_number: phone_number.value,
      email: email.value,
      password: password.value,
      role_id: role_id.value,
    });
    
    if (response) {
      console.log("Admin created successfully:", response);
      // Show success message
      await SwalInstance.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Tambah Akun Berhasil',
        timer: 2000,
        showConfirmButton: false
      });
      // Reset form and emit events
      resetForm();
      emit('refresh');
      emit('close');
    } else {
      console.error("Failed to create admin");
      await SwalInstance.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal membuat admin. Silakan coba lagi.',
      });
    }
  } catch (error) {
    console.error("Error creating admin:", error);
    await SwalInstance.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Terjadi kesalahan saat membuat admin. Silakan coba lagi.',
    });
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div
    class="bg-white p-6 rounded-lg shadow-lg w-full shadow shadow-lg shadow-slate-500"
  >
    <h2 class="text-xl font-bold mb-2.5">Tambah Admin</h2>
    <form @submit.prevent="createAdmin">
      <div class="mb-2.5">
        <label class="block font-bold mb-1">Nama Lengkap</label>
        <input
          v-model="full_name"
          type="text"
          required
          :disabled="isLoading"
          class="border border-gray-300 p-2 rounded w-full disabled:bg-gray-100"
        />
      </div>

      <div class="mb-2.5">
        <label class="block font-bold mb-1">Nomor Telepon</label>
        <input
          v-model="phone_number"
          type="text"
          required
          :disabled="isLoading"
          class="border border-gray-300 p-2 rounded w-full disabled:bg-gray-100"
        />
      </div>

      <div class="mb-2.5">
        <label class="block font-bold mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          required
          :disabled="isLoading"
          class="border border-gray-300 p-2 rounded w-full disabled:bg-gray-100"
        />
      </div>

      <label class="block font-bold mb-1">Password</label>
      <div
        class="mb-2.5 flex border border-gray-300 rounded-md justify-between items-center pr-4 focus-within:border focus-within:border-black focus-within:shadow-lg transition-all duration-300 ease-in-out overflow-hidden"
      >
        <input
          v-model="password"
          :type="eye ? 'text' : 'password'"
          required
          :disabled="isLoading"
          class="p-2 rounded w-full outline-none disabled:bg-gray-100"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          v-if="eye"
          @click="togglePasswordVisibility"
          class="cursor-pointer"
        >
          <path
            fill="currentColor"
            d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.35 0-6.113-1.8t-4.362-4.75q-.125-.225-.187-.462t-.063-.488t.063-.488t.187-.462q1.6-2.95 4.363-4.75T12 4t6.113 1.8t4.362 4.75q.125.225.188.463t.062.487t-.062.488t-.188.462q-1.6 2.95-4.362 4.75T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          @click="togglePasswordVisibility"
          class="cursor-pointer"
        >
          <path
            fill="currentColor"
            d="M15.175 8.325q.725.725 1.063 1.65t.237 1.9q0 .375-.275.638t-.65.262t-.638-.262t-.262-.638q.125-.65-.075-1.25T13.95 9.6t-1.025-.65t-1.275-.1q-.375 0-.638-.275t-.262-.65t.263-.637t.637-.263q.95-.1 1.875.238t1.65 1.062M12 6q-.475 0-.925.037t-.9.138q-.425.075-.763-.125t-.462-.6t.088-.775t.612-.45q.575-.125 1.163-.175T12 4q3.425 0 6.263 1.8t4.337 4.85q.1.2.15.413t.05.437t-.038.438t-.137.412q-.45 1-1.112 1.875t-1.463 1.6q-.3.275-.7.225t-.65-.4t-.212-.763t.337-.687q.6-.575 1.1-1.25t.875-1.45q-1.25-2.525-3.613-4.012T12 6m0 13q-3.35 0-6.125-1.812T1.5 12.425q-.125-.2-.187-.437T1.25 11.5t.05-.475t.175-.45q.5-1 1.163-1.912T4.15 7L2.075 4.9q-.275-.3-.262-.712T2.1 3.5t.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-3.5-3.45q-.875.275-1.775.413T12 19M5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.613 4.013T12 17q.5 0 .975-.062t.975-.138l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525zm4.2 4.2"
          />
        </svg>
      </div>
      <div class="mb-2.5">
        <label class="block font-bold mb-1">Role</label>
        <select
          v-model="role_id"
          required
          :disabled="isLoading"
          class="border border-gray-300 p-2 rounded w-full disabled:bg-gray-100"
        >
          <option :value="1">Admin</option>
          <option :value="2">Users</option>
        </select>
      </div>

      <div class="flex gap-2">
        <button 
          type="submit" 
          :disabled="isLoading"
          class="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-2 px-4 rounded transition-colors flex items-center gap-2"
        >
          <div v-if="isLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          {{ isLoading ? 'Menyimpan...' : 'Simpan' }}
        </button>
        <button
          type="button"
          :disabled="isLoading"
          class="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white py-2 px-4 rounded transition-colors"
          @click="emit('close')"
        >
          Batal
        </button>
      </div>
    </form>
  </div>
</template>
