<script lang="ts" setup>
interface User {
  id: number;
  rec_medic: string;
  status: string;
  fullname: string;
  phone_number: string;
  age: string;
  date: number;
  doctor: string;
}

const store = useUserStore();
const editUser = ref<User | null>(null);
const statusOptions = ["completed", "pending", "cancelled"];

const props = defineProps<{
  user: User | null;
}>();

// ✅ Daftarkan event close & refresh
const emit = defineEmits(["close", "refresh"]);

async function editProfile() {
  if (!editUser.value) return;

  const response = await store.patchPasienData(
    editUser.value.rec_medic,
    editUser.value.status,
    editUser.value.id
  );
  console.log("Profile updated:", response);

  // ✅ Panggil emit untuk tutup modal & refresh data di parent
  emit("refresh");
  emit("close");
}
function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      const cloned = { ...newUser };
      cloned.rec_medic = stripHtml(cloned.rec_medic);
      editUser.value = cloned;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="absolute max-w-96 right-[700px] bg-white p-6 rounded-lg shadow-lg w-full shadow shadow-lg shadow-slate-500"
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
        <label class="block font-bold mb-1">Umur</label>
        <input
          type="text"
          v-model="editUser.age"
          disabled
          class="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div class="mb-4">
        <label class="block font-bold mb-1">Tanggal Periksa</label>
        <input
          type="text"
          v-model="editUser.date"
          disabled
          class="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div class="mb-4">
        <label class="block font-bold mb-1">Dokter</label>
        <input
          type="text"
          v-model="editUser.doctor"
          disabled
          class="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div class="mb-4">
        <label class="block font-bold mb-1">Catatan Medis</label>
        <textarea
          v-model="editUser.rec_medic"
          v-html="editUser.rec_medic"
          class="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div class="mb-4">
        <label class="block font-bold mb-1">Status</label>
        <select
          v-model="editUser.status"
          class="border border-gray-300 p-2 rounded w-full"
        >
          <option v-for="status in statusOptions" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
      <div class="flex gap-2">
        <button type="submit" class="bg-green-500 text-white py-1 px-4 rounded">
          Simpan
        </button>
        <button
          type="button"
          class="bg-gray-400 text-white py-1 px-4 rounded"
          @click="emit('close')"
        >
          Batal
        </button>
      </div>
    </form>
  </div>
</template>
