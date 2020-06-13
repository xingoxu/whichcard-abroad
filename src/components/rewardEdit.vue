<template>
  <td :data-label="label" class="edit-cell">
    <div class="view" v-if="!editing">
      <span> {{ card.rewardRate }}% </span>
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
            style="display: inline-block; width: calc(100% - 1em);"
            type="number"
            step="0.001"
            min="0"
            size="is-small"
            v-model="form.rewardRate"
          >
          </b-input>
          %
        </div>
        <div>
          <b-checkbox
            size="is-small"
            v-model="form.rewardWithReward"
          >
            <!-- Reward With Reward -->
            ポイントが更に還元される
          </b-checkbox>
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
          size="is-small"
          type="is-primary"
          :disabled="form.rewardRate === ''"
          icon-right="checkmark-outline"
          @click="changeCard"
        />
      </div>
    </div>
  </td>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Card,
    rewardWithReward,
    rewardWithoutReward
  } from '../constants/cards';

  const getForm = (card: Card) => ({
    rewardRate: card.rewardRate,
    rewardWithReward:
      card.rewardCalc === rewardWithReward
  });
  export default Vue.extend({
    props: ['card', 'label'],
    data() {
      return {
        editing: false,
        form: getForm(this.card as Card)
      };
    },
    methods: {
      openEdit() {
        this.editing = true;
        this.form = getForm(this.card);
      },
      changeCard() {
        let card = this.card as Card;
        card.rewardRate = this.form.rewardRate;
        card.rewardCalc = this.form
          .rewardWithReward
          ? rewardWithReward
          : rewardWithoutReward;
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
