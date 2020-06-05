import Vue from 'vue';
import { response } from '@/api/functions/currency';
import { Context } from '@nuxt/types';

Vue.prototype.$getCurrency = (context: Context) => {
  return response(
    context.req
  );
}
