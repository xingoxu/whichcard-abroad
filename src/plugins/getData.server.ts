import Vue from 'vue';
import { response } from '@/api/functions/currency';
import { Context } from '@nuxt/types';

const handler = (context: Context) => {
  return response(context.req);
};

declare module 'vue/types/vue' {
  interface VueConstructor {
    $serverGetCurrency: typeof handler;
  }
}

Vue.$serverGetCurrency = handler;
