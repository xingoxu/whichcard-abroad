<template>
  <td :data-label="label" class="edit-cell">
    <div class="view" v-if="!editing">
      <span>
        <slot>{{ value }}</slot>
        <slot name="afterInput"></slot>
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
        <div>
          <b-input
            class="b-numberinput"
            :style="{
              display:
                hasAfterInput &&
                'inline-block',
              width:
                hasAfterInput &&
                'calc(100% - 1em)'
            }"
            :type="
              isNumber ? 'number' : 'text'
            "
            :step="isNumber && 0.001"
            :min="isNumber && 0"
            size="is-small"
            v-model="form.value"
          >
          </b-input>
          <slot name="afterInput"></slot>
        </div>
      </div>
      <div
        style="text-align: right; margin-right: 1.3em;margin-top: .3em"
      >
        <b-button
          size="is-small"
          icon-right="close-outline"
          @click="editing = false"
        />
        <b-button
          :disabled="form.value === ''"
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
  const getForm = (
    value: number | string
  ) => ({
    value: String(value)
  });
  export default Vue.extend({
    props: {
      value: [Number, String],
      label: String,
      isNumber: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        editing: false,
        form: getForm(this.value)
      };
    },
    computed: {
      hasAfterInput(): boolean {
        return !!this.$slots.afterInput;
      }
    },
    methods: {
      openEdit() {
        this.editing = true;
        this.form = getForm(this.value);
      },
      changeCard() {
        let v: string | number = this.form
          .value;
        if (typeof this.value === 'number') {
          v = Number(v);
        }
        this.$emit('input', v);
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
  @media screen and (max-width: 768px) {
    .edit-cell .edit-button {
      opacity: 1;
    }
  }
</style>
