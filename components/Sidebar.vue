<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const store = useUserStore();

// Mobile sidebar state
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const logout = async () => {
  const tokenFromCookie = useCookie("token");
  const creadential = useCredentialsStore();
  creadential.clearToken();
  store.$reset();
  closeMobileMenu();
  router.push("/");
};

// Close mobile menu when route changes
watch(route, () => {
  closeMobileMenu();
});

// Close mobile menu when clicking outside (for mobile)
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const sidebar = document.getElementById('mobile-sidebar');
    const trigger = document.getElementById('mobile-menu-trigger');
    
    if (isMobileMenuOpen.value && 
        sidebar && 
        !sidebar.contains(event.target as Node) && 
        trigger && 
        !trigger.contains(event.target as Node)) {
      closeMobileMenu();
    }
  };

  document.addEventListener('click', handleClickOutside);
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});

// Prevent body scroll when sidebar is open
watch(isMobileMenuOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('sidebar-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('sidebar-open');
    }
  }
});

// Cleanup on unmount
onBeforeUnmount(() => {
  if (process.client) {
    document.body.style.overflow = '';
    document.body.classList.remove('sidebar-open');
  }
});
</script>

<template>
  <!-- Mobile Menu Trigger Button -->
  <button
    id="mobile-menu-trigger"
    @click="toggleMobileMenu"
    class="lg:hidden fixed top-4 left-4 z-[60] bg-[#C95792] text-white p-3 rounded-lg shadow-lg hover:bg-[#A64A7A] transition-colors touch-feedback"
    aria-label="Toggle Admin Menu"
  >
    <svg
      v-if="!isMobileMenuOpen"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>

  <!-- Mobile Overlay -->
  <div
    v-if="isMobileMenuOpen"
    @click="closeMobileMenu"
    class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[45] transition-opacity duration-300"
  ></div>

  <!-- Sidebar -->
  <aside 
    id="mobile-sidebar"
    :class="[
      'bg-gradient-to-b from-[#C95792] to-[#A64A7A] text-white transition-all duration-300 ease-in-out',
      'lg:static lg:translate-x-0 lg:w-64 lg:z-auto',
      'fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[50]',
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Sidebar Header -->
    <div class="w-full border-b-2 border-white/20 flex flex-col items-center py-6 px-4">
      <NuxtLink to="/admin" @click="closeMobileMenu">
        <img 
          src="@/assets/Logogsu.png" 
          alt="Logo Admin Panel" 
          class="w-16 h-16 sm:w-20 sm:h-20 mb-3 hover:scale-105 transition-transform"
        />
      </NuxtLink>
      <h2 class="text-lg font-bold text-center">Admin Panel</h2>
      <p class="text-sm text-white/80 text-center">Griya Sehat Ummi</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 py-4">
      <ul class="space-y-2 px-4">
        <!-- Dashboard -->
        <li>
          <NuxtLink
            to="/admin"
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10 focus:bg-white/10 focus:outline-none group"
            :class="[
              route.path === '/admin' 
                ? 'bg-white/20 font-bold shadow-lg' 
                : 'hover:bg-white/10'
            ]"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
              class="flex-shrink-0"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span class="text-sm sm:text-base">Dashboard</span>
          </NuxtLink>
        </li>

        <!-- Users Management -->
        <li>
          <NuxtLink
            to="/admin/user"
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10 focus:bg-white/10 focus:outline-none group"
            :class="[
              route.path === '/admin/user' 
                ? 'bg-white/20 font-bold shadow-lg' 
                : 'hover:bg-white/10'
            ]"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
              class="flex-shrink-0"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span class="text-sm sm:text-base">Kelola Users</span>
          </NuxtLink>
        </li>

        <!-- Patient Registration -->
        <li>
          <NuxtLink
            to="/admin/pasien"
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10 focus:bg-white/10 focus:outline-none group"
            :class="[
              route.path === '/admin/pasien' 
                ? 'bg-white/20 font-bold shadow-lg' 
                : 'hover:bg-white/10'
            ]"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
              class="flex-shrink-0"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
            </svg>
            <span class="text-sm sm:text-base">Pendaftaran Pasien</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Logout Section -->
    <div class="border-t-2 border-white/20 p-4">
      <button
        @click="logout"
        class="w-full flex items-center gap-3 px-4 py-3 bg-red-500/80 hover:bg-red-600 rounded-lg font-bold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#C95792] touch-feedback"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
          class="flex-shrink-0"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16,17 21,12 16,7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span class="text-sm sm:text-base">Logout</span>
      </button>
    </div>

    <!-- Mobile Close Button -->
    <button
      @click="closeMobileMenu"
      class="lg:hidden absolute top-4 right-4 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-[55]"
      aria-label="Close Menu"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </aside>
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

/* Smooth transitions for mobile */
@media (max-width: 1023px) {
  aside {
    backdrop-filter: blur(10px);
  }
}

/* Safe area support for iOS */
.safe-area-inset {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

/* Ensure proper z-index stacking */
#mobile-sidebar {
  z-index: 50;
}

#mobile-menu-trigger {
  z-index: 60;
}

/* Mobile overlay improvements */
@media (max-width: 1023px) {
  .mobile-overlay {
    z-index: 45;
  }
  
  /* Prevent body scroll when sidebar is open */
  body.sidebar-open {
    overflow: hidden;
  }
  
  /* Ensure sidebar appears above all content */
  aside[id="mobile-sidebar"] {
    position: fixed !important;
    z-index: 50 !important;
  }
}

/* Desktop sidebar positioning */
@media (min-width: 1024px) {
  aside[id="mobile-sidebar"] {
    position: static !important;
    z-index: auto !important;
    transform: translateX(0) !important;
  }
}

/* High z-index elements that might conflict */
.modal,
.dropdown,
.tooltip {
  z-index: 1000;
}

/* Ensure modals appear above sidebar */
.modal-backdrop {
  z-index: 1040;
}

.modal-content {
  z-index: 1050;
}
</style>
