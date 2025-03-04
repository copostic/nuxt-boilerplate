// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth',
    '@prisma/nuxt',
    '@nuxt/eslint-config',
  ],
  devtools: { enabled: false },
  css: ['~/assets/css/main.scss'],
  runtimeConfig: {
    private: {
      AUTH_SECRET: process.env.AUTH_SECRET,
    },
  },
  compatibilityDate: '2025-03-03',
  typescript: {
    strict: true,
  },
  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs',
    },
    globalAppMiddleware: {
      isEnabled: true,
      allow404WithoutAuth: true,
    },
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts',
    strategy: 'prefix',
  },
});
