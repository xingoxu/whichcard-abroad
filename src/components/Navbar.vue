<template>
  <section
    class="columns is-centered is-transparent"
  >
    <div
      class="column is-three-fifths-fullhd is-four-fifths-desktop"
    >
      <b-navbar transparent>
        <template slot="start">
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/' }"
          >
            <!-- Home -->
            ホーム
          </b-navbar-item>
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/about' }"
          >
            <!-- About -->
            <!-- Contact -->
            説明 / お問合せ
          </b-navbar-item>
          <!-- <b-navbar-dropdown label="Info">

          </b-navbar-dropdown> -->
        </template>
      </b-navbar>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({});
</script>

<style scoped>
  .column {
    padding-bottom: 0;
    padding-right: 0;
  }
  .columns {
    margin-right: 0;
  }
</style>

<style>
  .is-transparent {
    background: transparent;
  }
</style>
