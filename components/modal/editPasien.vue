<script lang="ts" setup>
import Swal from "sweetalert2";
import type { editPasien } from "~/types/user";

const store = useUserStore();
const editUser = ref<editPasien | null>(null);
const statusOptions = ["completed", "pending", "cancelled"];
const isLoading = ref(false);

const props = defineProps<{
  user: editPasien | null;
}>();

const emit = defineEmits<{
  close: [];
  refresh: [];
}>();

async function editProfile() {
  if (!editUser.value) return;

  try {
    isLoading.value = true;
    const response = await store.patchPasienData(
      editUser.value.rec_medic,
      editUser.value.status,
      editUser.value.id
    );
    
    if (response) {
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data pasien berhasil diperbarui!",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      emit("refresh");
      emit("close");
    } else {
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal memperbarui data pasien!",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  } catch (error) {
    console.error("Error updating patient:", error);
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi kesalahan saat memperbarui data pasien!",
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  } finally {
    isLoading.value = false;
  }
}

function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

watch(
  () => props.user,
  (newUser) => {
    console.log("Modal received user:", newUser);
    if (newUser) {
      const cloned = { ...newUser };
      cloned.rec_medic = stripHtml(cloned.rec_medic);
      editUser.value = cloned;
      console.log("Modal editUser set to:", editUser.value);
    }
  },
  { immediate: true }
);
</script>

<template>
  <!-- Modal Overlay -->
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <!-- Modal Content -->
    <div
      class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
      v-if="props.user"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-800">Edit Data Pasien</h2>
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <form @submit.prevent="editProfile" class="space-y-4" v-if="editUser">
        <div>
          <label class="block font-semibold text-sm text-gray-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            v-model="editUser.fullname"
            disabled
            class="border border-gray-300 p-3 rounded-lg w-full bg-gray-50 text-gray-600"
          />
        </div>

        <div>
          <label class="block font-semibold text-sm text-gray-700 mb-1">Nomor Telepon</label>
          <input
            type="text"
            v-model="editUser.phone_number"
            disabled
            class="border border-gray-300 p-3 rounded-lg w-full bg-gray-50 text-gray-600"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold text-sm text-gray-700 mb-1">Umur</label>
            <input
              type="text"
              v-model="editUser.age"
              disabled
              class="border border-gray-300 p-3 rounded-lg w-full bg-gray-50 text-gray-600"
            />
          </div>
          <div>
            <label class="block font-semibold text-sm text-gray-700 mb-1">Tanggal Periksa</label>
            <input
              type="text"
              v-model="editUser.date"
              disabled
              class="border border-gray-300 p-3 rounded-lg w-full bg-gray-50 text-gray-600"
            />
          </div>
        </div>

        <div>
          <label class="block font-semibold text-sm text-gray-700 mb-1">Dokter</label>
          <input
            type="text"
            v-model="editUser.doctor"
            disabled
            class="border border-gray-300 p-3 rounded-lg w-full bg-gray-50 text-gray-600"
          />
        </div>

        <div>
          <label class="block font-semibold text-sm text-gray-700 mb-1">Catatan Medis</label>
          <textarea
            v-model="editUser.rec_medic"
            :disabled="isLoading"
            rows="4"
            class="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#C95792] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
            placeholder="Masukkan catatan medis..."
          ></textarea>
        </div>

        <div>
          <label class="block font-semibold text-sm text-gray-700 mb-1">Status</label>
          <select
            v-model="editUser.status"
            :disabled="isLoading"
            class="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#C95792] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
          >
            <option v-for="status in statusOptions" :key="status" :value="status">
              {{ status.charAt(0).toUpperCase() + status.slice(1) }}
            </option>
          </select>
        </div>

        <div class="flex gap-3 pt-4">
          <button 
            type="submit" 
            :disabled="isLoading"
            class="flex-1 bg-[#C95792] hover:bg-[#A64A7A] disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <div v-if="isLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            {{ isLoading ? 'Menyimpan...' : 'Simpan' }}
          </button>
          <button
            type="button"
            :disabled="isLoading"
            class="flex-1 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            @click="emit('close')"
          >
            Batal
          </button>
        </div>
      </form>
      
      <!-- Loading state when user data is not ready -->
      <div v-else class="flex items-center justify-center p-8">
        <div class="flex items-center gap-3">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-[#C95792]"></div>
          <span class="text-gray-600">Memuat data pasien...</span>
        </div>
      </div>
    </div>
  </div>
</template>
