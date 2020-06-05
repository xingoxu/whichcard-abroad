const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = {
  head: {
    title: 'nuxt-serverless',
    meta: [
      { chatset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1'
      }
    ],
    link: [
      {
        rel: 'shortcut icon',
        type: 'image/png',
        href: '/static/favicon.png'
      }
    ],
    script: [
      {
        src:
          'https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js',
        type: 'module'
      },
      {
        src:
          'https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.js',
        nomodule: '',
      },
      // {
      //   src:
      //     'https://unpkg.com/ionicons@5.0.0/dist/ionicons.js',
      //   body: true
      // }
    ]
  },
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://whichcard-dev.xingoxu.com'
        : 'http://localhost:3000'
  },
  vue: {
    config: {
      ignoredElements: ['ion-icon']
    }
  },
  css: ['@/css/main.scss'],
  plugins: [
    {
      src: '@/plugins/ion-icon.tsx',
      ssr: true
    },
    '@/plugins/getData.server.ts'
  ],
  srcDir: './src',
  serverMiddleware: [
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    }),
    cookieParser()
  ],
  build: {
    standalone: true,
    loaders: {
      scss: {
        implementation: require('sass')
        // sassOptions: {
        //   fiber: require('fibers')
        // }
      }
    }
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build', // Doc: https://github.com/nuxt-community/dotenv-module
    [
      '@nuxtjs/dotenv',
      {
        filename: `./.env.${process.env.NODE_ENV}`
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    [
      'nuxt-buefy',
      {
        materialDesignIcons: false,
        defaultIconComponent: 'vue-ion-icon',
        customIconPacks: {
          mdi: {
            sizes: {
              'is-small': '-small'
            },
            internalIcons: {
              minus: 'remove-outline',
              plus: 'add-outline',
              'chevron-left':
                'chevron-back-outline',
              'chevron-right':
                'chevron-forward-outline'
            }
          }
        }
      }
    ],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  render: {
    etag: false,
    compressor: { threshold: Infinity }
  }
};
