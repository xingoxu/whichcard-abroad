<template>
  <td :data-label="label" class="edit-cell">
    <div class="view" v-if="!editing">
      <span>
        <slot>{{ value }}</slot>
      </span>
      <b-button
        class="edit-button"
        type="is-text"
        icon-right="create-outline"
        @click="openEdit"
      />
    </div>
    <div class="edit" v-else>
      <div>
        <b-select
          placeholder="Card Brand"
          size="is-small"
          expanded
          v-model="form.value"
        >
          <option
            v-for="(label, value) in Brands"
            :key="value"
            :value="value"
          >
            {{ label }}
          </option>
        </b-select>
      </div>
      <div
        style="text-align: right; margin-top: .3em"
      >
        <b-button
          size="is-small"
          icon-right="close-outline"
          @click="editing = false"
        />
        <b-button
          size="is-small"
          type="is-primary"
          icon-right="checkmark-outline"
          @click="changeCard"
        />
      </div>
    </div>
  </td>
</template>

<script lang="ts">
  import Vue from 'vue';
  const getForm = (value: string) => ({
    value: String(value)
  });

  import { Brand } from '../constants/cards';
  export default Vue.extend({
    props: {
      value: String,
      label: String
    },
    data() {
      return {
        editing: false,
        Brands: {
          visa: 'VISA',
          mastercard: 'Mastercard',
          jcb: 'JCB',
          ae: 'American Express'
        } as {
          [key in Brand]: string;
        },
        form: getForm(this.value)
      };
    },
    methods: {
      openEdit() {
        this.editing = true;
        this.form = getForm(this.value);
      },
      changeCard() {
        this.$emit('input', this.form.value);
        this.editing = false;
      }
    }
  });
</script>

<style lang="scss" scoped>
  .edit-cell .edit-button {
    padding: 0 0.5em;
    height: auto;
    margin-top: -2px;
    opacity: 0;
    transition: 0.3s opacity ease;
  }
  .edit-cell:hover {
    .edit-button {
      opacity: 1;
    }
  }

  .view .edit-button::v-deep span {
    height: auto;
  }
  .b-numberinput::v-deep
    input[type='number'] {
    text-align: initial;
  }
</style>
