<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm">
    <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center space-x-2"
      >
        <span class="text-xl font-bold text-primary-600 dark:text-primary-400">{{ $t('common.appName') }}</span>
      </NuxtLink>

      <div class="flex items-center space-x-4">
        <div class="relative">
          <select
            v-model="locale"
            class="appearance-none bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            @change="switchLocale"
          >
            <option value="en">
              {{ $t('common.english') }}
            </option>
            <option value="fr">
              {{ $t('common.french') }}
            </option>
          </select>
        </div>

        <button
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          :aria-label="isDarkMode ? $t('common.lightMode') : $t('common.darkMode')"
          @click="toggleTheme"
        >
          <span
            v-if="isDarkMode"
            class="text-yellow-400"
          >
            <!-- Sun icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </span>
          <span
            v-else
            class="text-gray-700"
          >
            <!-- Moon icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </span>
        </button>

        <NuxtLink
          to="/"
          class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
        >
          {{ $t('home.title') }}
        </NuxtLink>
        <template v-if="status === 'authenticated'">
          <!-- User Menu -->
          <div class="relative ml-3">
            <button
              class="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
              @click="isUserMenuOpen = !isUserMenuOpen"
            >
              <span>{{ user?.name || user?.email }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10"
            >
              <NuxtLink
                :to="localePath('/account')"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="isUserMenuOpen = false"
              >
                {{ $t('account.title') }}
              </NuxtLink>
              <button
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="logout"
              >
                {{ $t('auth.logout') }}
              </button>
            </div>
          </div>
        </template>

        <template v-else>
          <NuxtLink
            :to="localePath('/auth/login')"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          >
            {{ $t('auth.login') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/auth/register')"
            class="btn btn-primary"
          >
            {{ $t('auth.register') }}
          </NuxtLink>
        </template>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '~/stores/theme';

const localePath = useLocalePath();
const { locale } = useI18n();
const { status, data: { user }, signOut } = useAuth();
const themeStore = useThemeStore();

const isDarkMode = computed(() => themeStore.isDarkMode);
const isUserMenuOpen = ref(false);

const toggleTheme = () => {
  themeStore.toggleTheme();
};

const switchLocale = () => {
  // Locale is automatically updated by v-model
};

const logout = async () => {
  // Use signOut instead of the custom fetch to /api/auth/logout
  await signOut({ callbackUrl: '/auth/login' });
  isUserMenuOpen.value = false;
};

// Close user menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (isUserMenuOpen.value && !event.target.closest('.relative')) {
      isUserMenuOpen.value = false;
    }
  });
});
</script>
