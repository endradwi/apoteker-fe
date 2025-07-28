<script setup lang="ts">
import type { editUser } from "~/types/user";
import Swal from "sweetalert2";
const SwalInstance = Swal as any;

definePageMeta({
  layout: "admin",
  //   name: "AdminUserPage",
});
useSeoMeta({
  title: "Kelola Users - Admin Dashboard",
});
const users = ref<editUser[]>([]);
const selectedUser = ref<editUser | null>(null);
const store = useUserStore();
const modalOpenCreateAdmin = ref(false);
const modalOpenEditUser = ref(false);
const totalPage = ref(0);
const currentPage = ref(1);
const searchQuery = ref("");
const isLoading = ref(false);

async function getAllUser(page = 1, search = "") {
  try {
    isLoading.value = true;
    currentPage.value = page;
    const response = (await store.allUser(page, search)) as any;
    
    if (response && Array.isArray(response.results)) {
      users.value = response.results;
      totalPage.value = response.page_info.total_page;
    } else {
      users.value = [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    users.value = [];
  } finally {
    isLoading.value = false;
  }
}

function EditClick(user: editUser) {
  selectedUser.value = { ...user };
  modalOpenCreateAdmin.value = false;
  modalOpenEditUser.value = !modalOpenEditUser.value;
}
function toggleCreateAdmin() {
  modalOpenEditUser.value = false;
  modalOpenCreateAdmin.value = !modalOpenCreateAdmin.value;
}
async function deleteUser(user: editUser) {
  // Add confirmation dialog using SweetAlert2
  const result = await SwalInstance.fire({
    title: 'Konfirmasi Hapus',
    text: `Apakah Anda yakin ingin menghapus user "${user.fullname}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  });

  if (!result.isConfirmed) return;

  try {
    const response = await store.deleteUser(user.id);
    if (response) {
      console.log("User deleted successfully");
      await SwalInstance.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'User berhasil dihapus',
        timer: 2000,
        showConfirmButton: false
      });
      getAllUser(currentPage.value, searchQuery.value); // Refresh the user list
    } else {
      console.error("Failed to delete user");
      await SwalInstance.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal menghapus user. Silakan coba lagi.',
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    await SwalInstance.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Terjadi kesalahan saat menghapus user. Silakan coba lagi.',
    });
  }
}

function getRoleText(roleId: number) {
  return roleId === 1 ? "Admin" : "User";
}

function getRoleColor(roleId: number) {
  return roleId === 1 ? "bg-purple-100 text-purple-800 border-purple-200" : "bg-blue-100 text-blue-800 border-blue-200";
}

onMounted(() => {
  getAllUser();
});
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile-first responsive container -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      
      <!-- Header Section -->
      <div class="mb-6 lg:mb-8">
        <!-- Mobile menu spacing -->
        <div class="lg:hidden h-16"></div>
        
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          <div class="flex-1">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-2">
              Kelola Users
            </h1>
            <p class="text-sm sm:text-base text-gray-600">
              Manage user accounts and permissions
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <!-- Search Box -->
            <div class="relative flex-1 sm:min-w-[250px]">
              <input
                v-model="searchQuery"
                @input="getAllUser(1, searchQuery)"
                placeholder="Cari nama user..."
                class="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C95792] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              />
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
            </div>

            <!-- Add Admin Button -->
            <button
              @click="toggleCreateAdmin"
              class="flex items-center justify-center gap-2 bg-[#C95792] hover:bg-[#A64A7A] text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg touch-feedback"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="22" y1="11" x2="16" y2="11"></line>
              </svg>
              <span class="hidden sm:inline">Tambah Admin</span>
              <span class="sm:hidden">Tambah</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="flex items-center gap-3">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C95792]"></div>
          <span class="text-gray-600">Memuat data users...</span>
        </div>
      </div>

      <!-- Content Section -->
      <div v-else>
        <!-- Mobile Card Layout (hidden on lg and up) -->
        <div class="lg:hidden space-y-4">
          <div
            v-for="(user, index) in users"
            :key="user.id"
            class="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 hover:shadow-xl transition-all duration-200"
          >
            <!-- Card Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-800 mb-1">
                  {{ user.fullname }}
                </h3>
                <p class="text-sm text-gray-500">
                  User #{{ index + 1 + (currentPage - 1) * 10 }}
                </p>
              </div>
              <span
                :class="getRoleColor(user.role_id)"
                class="px-3 py-1 rounded-full text-xs font-semibold border"
              >
                {{ getRoleText(user.role_id) }}
              </span>
            </div>

            <!-- Card Content -->
            <div class="space-y-3">
              <div>
                <p class="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                <p class="text-sm font-medium text-gray-800">{{ user.email }}</p>
              </div>

              <div>
                <p class="text-xs text-gray-500 uppercase tracking-wide">No. Telepon</p>
                <p class="text-sm font-medium text-gray-800">{{ user.phone_number || '-' }}</p>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  @click="EditClick(user)"
                  class="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg font-medium transition-colors touch-feedback"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <span>Edit</span>
                </button>
                
                <button
                  @click="deleteUser(user)"
                  class="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-colors touch-feedback"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State for Mobile -->
          <div v-if="users.length === 0" class="text-center py-12">
            <div class="w-24 h-24 mx-auto mb-4 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-800 mb-2">Belum ada user</h3>
            <p class="text-gray-500 mb-4">Tambahkan admin atau user baru untuk memulai</p>
            <button
              @click="toggleCreateAdmin"
              class="bg-[#C95792] hover:bg-[#A64A7A] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Tambah Admin Baru
            </button>
          </div>
        </div>

        <!-- Desktop Table Layout (hidden on mobile) -->
        <div class="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="text-left py-4 px-6 font-semibold text-gray-800 text-sm">No</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Nama Lengkap</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-800 text-sm">No. Telepon</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Email</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Role</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-800 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(user, index) in users" 
                  :key="user.id"
                  class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td class="py-4 px-6 text-sm text-gray-700">{{ index + 1 + (currentPage - 1) * 10 }}</td>
                  <td class="py-4 px-6 text-sm font-medium text-gray-800">{{ user.fullname }}</td>
                  <td class="py-4 px-6 text-sm text-gray-700">{{ user.phone_number || '-' }}</td>
                  <td class="py-4 px-6 text-sm text-gray-700">{{ user.email }}</td>
                  <td class="py-4 px-6 text-sm">
                    <span
                      :class="getRoleColor(user.role_id)"
                      class="px-3 py-1 rounded-full text-xs font-semibold border"
                    >
                      {{ getRoleText(user.role_id) }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-sm">
                    <div class="flex items-center gap-2">
                      <button
                        @click="EditClick(user)"
                        class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteUser(user)"
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State for Desktop -->
          <div v-if="users.length === 0" class="text-center py-16">
            <div class="w-32 h-32 mx-auto mb-6 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-800 mb-3">Belum ada user terdaftar</h3>
            <p class="text-gray-500 max-w-md mx-auto mb-6">
              Mulai dengan menambahkan admin atau user baru untuk mengelola sistem.
            </p>
            <button
              @click="toggleCreateAdmin"
              class="bg-[#C95792] hover:bg-[#A64A7A] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Tambah Admin Baru
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPage > 1" class="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            @click="getAllUser(currentPage - 1, searchQuery)"
            :disabled="currentPage === 1"
            class="px-3 py-2 sm:px-4 sm:py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>

          <template v-for="page in totalPage" :key="page">
            <button
              v-if="page === 1 || page === totalPage || (page >= currentPage - 1 && page <= currentPage + 1)"
              @click="getAllUser(page, searchQuery)"
              :class="[
                'px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-[#C95792] text-white shadow-lg'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
            <span
              v-else-if="page === currentPage - 2 || page === currentPage + 2"
              class="px-2 py-2 text-gray-400"
            >
              ...
            </span>
          </template>

          <button
            @click="getAllUser(currentPage + 1, searchQuery)"
            :disabled="currentPage === totalPage"
            class="px-3 py-2 sm:px-4 sm:py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Modals -->
      <ModalEditUser
        v-if="modalOpenEditUser"
        :user="selectedUser"
        @close="modalOpenEditUser = false"
        @refresh="() => getAllUser(currentPage, searchQuery)"
      />
      
      <ModalCreateAdmin
        v-if="modalOpenCreateAdmin"
        @close="modalOpenCreateAdmin = false"
        @refresh="() => getAllUser(currentPage, searchQuery)"
      />
    </div>
  </div>
</template>

<style scoped>
/* Touch feedback effect */
.touch-feedback {
  position: relative;
  overflow: hidden;
}

.touch-feedback::before {
  content: '';
  position: absolute;
  inset: 0;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.touch-feedback:active::before {
  opacity: 0.1;
}

/* Loading animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Safe area padding for mobile */
@media (max-width: 1023px) {
  .container {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* Button focus states for accessibility */
button:focus {
  outline: 2px solid rgba(201, 87, 146, 0.5);
  outline-offset: 2px;
}
</style>
