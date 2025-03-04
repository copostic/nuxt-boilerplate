// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {enabled: true},
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@nuxtjs/i18n',
		'@sidebase/nuxt-auth',
		"@prisma/nuxt",
		'@nuxt/eslint-config'
	],
	runtimeConfig: {
		private: {
			AUTH_SECRET: process.env.AUTH_SECRET
		}
	},
	css: ['~/assets/css/main.scss'],
	typescript: {
		strict: true
	},
	i18n: {
		locales: ['en', 'fr'],
		defaultLocale: 'en',
		vueI18n: './i18n.config.ts',
		strategy: 'prefix',
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
	compatibilityDate: '2025-03-03'
})