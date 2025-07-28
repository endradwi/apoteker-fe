<script lang="ts" setup>
import type { editUser } from "~/types/user";
import Swal from "sweetalert2";
const SwalInstance = Swal as any;

const store = useUserStore();
const editUser = ref<editUser | null>(null);
const isLoading = ref(false);

const props = defineProps<{
  user: editUser | null;
}>();

const emit = defineEmits<{
  close: [];
  refresh: [];
}>();

async function editProfile() {
  if (!editUser.value) return;

  try {
    isLoading.value = true;
    const response = await store.updateStatus(
      editUser.value.id,
      editUser.value.role_id
    );

    if (response) {
      console.log("User updated successfully");
      // Show success message
      await SwalInstance.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'User berhasil diupdate',
        timer: 2000,
        showConfirmButton: false
      });
      // Emit events to parent component
      emit('refresh');
      emit('close');
    } else {
      console.error("Failed to update user");
      await SwalInstance.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal mengupdate user. Silakan coba lagi.',
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    await SwalInstance.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Terjadi kesalahan saat mengupdate user. Silakan coba lagi.',
    });
  } finally {
    isLoading.value = false;
  }
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
