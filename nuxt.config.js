const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const title = `クレジットカード海外使用横断比較`;
const description = `クレジットカード手数料とポイント合わせて最安値を比較するランキングサイト`;

module.exports = {
  head: {
    title: title,
    meta: [
      { chatset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1'
      },
      {
        name: 'description',
        content: description
      },
      {
        name: 'keywords',
        content:
          'クレジットカード,ポイント,ランキング,比較,海外,海外利用,海外旅行'
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
        nomodule: ''
      }
      // {
      //   src:
      //     'https://unpkg.com/ionicons@5.0.0/dist/ionicons.js',
      //   body: true
      // }
    ]
  },
  pwa: {
    meta: {
      name: title,
      description: description,
      lang: 'ja',
      ogHost: 'https://whichcard.xingoxu.com'
    },
    manifest: {
      name: title,
      description: description,
      lang: 'ja',
    },
    icon: {
      iconSrc: './static/favicon.png'
    }
  },
  axios: {
    baseURL: '/'
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
    extractCSS:
      process.env.HOT_RELOAD !== 'true',
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
    ],
    [
      '@nuxtjs/google-analytics',
      { id: 'UA-169360316-1' }
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
