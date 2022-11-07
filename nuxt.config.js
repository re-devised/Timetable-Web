export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  telemetry: true,
  target: 'server',
  server: {
    host: '0.0.0.0', // default: localhost
    port: '8000',
    // https: {
    //   key: fs.readFileSync('/etc/letsencrypt/live/compoundcloud.ddns.net/privkey.pem', 'utf8'),
    //   cert: fs.readFileSync('/etc/letsencrypt/live/compoundcloud.ddns.net/fullchain.pem', 'utf8'),
    // }
  },
  
  head: {
    title: 'Timetable',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/tailwind.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/portal-vue.js',
    '~/plugins/vue-select.js',
    '~/plugins/vue-i18n.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    debug: false
  },


  serverMiddleware: ['~/server/index'],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
