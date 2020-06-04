<template>
  <section>
    <Navbar></Navbar>
    <nuxt />
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Navbar from '@/components/Navbar.vue';
  export default Vue.extend({
    components: {
      Navbar
    }
  });
</script>
