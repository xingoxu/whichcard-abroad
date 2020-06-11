<template>
  <main>
    <section>
      <Navbar></Navbar>
      <nuxt />
    </section>
    <footer class="columns is-centered is-multiline main">
      <ul class="column is-three-fifths-fullhd is-four-fifths-desktop">
        <li>© {{ today }} クレジットカード海外使用横断比較</li>
      </ul>
    </footer>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Navbar from '@/components/Navbar.vue';
  export default Vue.extend({
    components: {
      Navbar
    },
    computed: {
      today() {
        return new Date().getFullYear();
      }
    }
  });
</script>

<style lang="scss" scoped>
  footer {
    margin: 0;
  }
</style>
