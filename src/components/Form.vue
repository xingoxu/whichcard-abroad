<template>
  <div>
    <section
      class="columns is-vcentered input-form"
    >
      <div
        class="column form-control is-one-third"
      >
        <b-field>
          <template slot="label"
            >通貨</template
          >
          <b-field>
            <b-input
              expanded
              placeholder="Currency"
              v-model="form.ccy"
              :disabled="disabled"
              @click.native="
                showSelectCurrency
              "
            ></b-input>
            <p class="control">
              <b-button
                :disabled="disabled"
                @click="showSelectCurrency"
                type="is-primary"
                icon-left="globe-outline"
              ></b-button>
            </p>
          </b-field>
        </b-field>
      </div>
      <div
        class="column form-control"
        v-if="false"
      >
        <b-field label="Date">
          <b-field>
            <b-datepicker
              ref="datepicker"
              :disabled="disabled"
              expanded
              v-model="form.date"
              :month-names="[
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
              ]"
              :day-names="[
                '日',
                '月',
                '火',
                '水',
                '木',
                '金',
                '土'
              ]"
              @input="
                setQuery(
                  'date',
                  dateFormatter(form.date)
                )
              "
              :date-formatter="dateFormatter"
              :max-date="new Date()"
            >
            </b-datepicker>
            <p class="control">
              <b-button
                @click="
                  $refs.datepicker.toggle()
                "
                icon-left="calendar-outline"
                type="is-primary"
              />
            </p>
          </b-field>
        </b-field>
      </div>
      <div
        class="column form-control is-one-third"
      >
        <b-field
          label="取引金額"
          class="has-numberinput"
        >
          <div
            class="b-numberinput field b-numberinput is-grouped"
          >
            <div class="control is-clearfix">
              <input
                type="number"
                step="0.001"
                min="0"
                v-model="form.amount"
                @input="
                  setQuery(
                    'amount',
                    form.amount
                  )
                "
                class="input"
              />
            </div>
          </div>
        </b-field>
      </div>
    </section>

    <b-modal
      :active.sync="currencyModal"
      scroll="keep"
      :can-cancel="['escape', 'outside']"
      has-modal-card
    >
      <form
        action="javascript:;"
        style="margin: 1rem"
      >
        <div
          class="modal-card"
          style="width: 100%"
        >
          <header class="modal-card-head">
            <p class="modal-card-title">
              <ion-icon
                name="globe-outline"
              ></ion-icon>
              <span>通貨を選択</span>
            </p>
          </header>
          <section class="modal-card-body">
            <ul class="columns is-multiline">
              <li
                class="column is-one-fifth"
                v-for="(flag,
                currency) in SupportedCurrency"
                :key="currency"
              >
                <b-button
                  expanded
                  class="currency-button"
                  :class="{
                    'is-selected':
                      form.ccy === currency
                  }"
                  type="is-primary"
                  outlined
                  @click="
                    selectCurrency(currency)
                  "
                >
                  <div class="emoji">
                    {{ flag }}
                  </div>
                  <div>{{ currency }}</div>
                </b-button>
              </li>
            </ul>
          </section>
          <footer class="modal-card-foot">
            <b-button
              @click="currencyModal = false"
            >
              閉じる
            </b-button>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Route } from 'vue-router';
  import {
    SupportedCurrency as _supportedCurrency,
    SupportedCurrencyFrontend
  } from '@/constants/SupportedCurrency';
  import { format, parse } from 'date-fns';
  const DATE_FORMAT = 'yyyy-MM-dd';

  const __supportedCurrency = {
    ..._supportedCurrency
  };
  delete __supportedCurrency.JPY;
  const SupportedCurrency: SupportedCurrencyFrontend = __supportedCurrency;

  export const getDefaultForm = (
    query?: Route['query']
  ) => {
    const { ccy, date, amount } =
      query || {};

    let _date: Date;
    try {
      _date =
        (typeof date === 'string' &&
          parse(
            date,
            DATE_FORMAT,
            new Date()
          )) ||
        new Date();
    } catch (e) {
      _date = new Date();
    }

    return {
      ccy: ((typeof ccy === 'string' &&
        ccy in SupportedCurrency &&
        ccy) ||
        'USD') as keyof SupportedCurrencyFrontend,
      date: _date,
      amount:
        (typeof amount === 'string' &&
          Number.parseFloat(amount)) ||
        1.001
    };
  };

  export const serializeForm = (
    form: ReturnType<typeof getDefaultForm>
  ): Record<
    Exclude<keyof typeof form, 'amount'>,
    string
  > => ({
    ccy: form.ccy,
    date: format(form.date, DATE_FORMAT)
  });

  export default Vue.extend({
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: getDefaultForm(
          this.$route.query
        ),
        currencyModal: false,
        SupportedCurrency
      };
    },
    methods: {
      showSelectCurrency(event: Event) {
        (event.target! as HTMLElement).blur();
        this.currencyModal = true;
      },
      getForm() {
        return serializeForm(this.form);
      },
      selectCurrency(
        currency: keyof SupportedCurrencyFrontend
      ) {
        this.form.ccy = currency;
        this.currencyModal = false;
        this.setQuery('ccy', currency);
      },
      dateFormatter(date: Date) {
        return format(date, DATE_FORMAT);
      },
      setQuery(
        name: keyof ReturnType<
          typeof getDefaultForm
        >,
        value: string
      ) {
        if (
          this.$route.query[name] === value
        )
          return;
        this.$router.replace({
          query: {
            ...this.$route.query,
            [name]: value
          }
        });
      }
    },
    watch: {
      $route() {
        this.form = getDefaultForm(
          this.$route.query
        );
      }
    }
  });
</script>

<style scoped>
  .has-addons {
    flex-wrap: wrap;
  }
  .has-addons > .label {
    flex-basis: 100%;
  }
  .b-numberinput >>> input[type='number'] {
    text-align: initial;
  }
  @media screen and (max-width: 1023px) {
    .input-form {
      padding: 0 1.125rem;
    }
  }
  .input-form {
    margin-bottom: calc(1.5rem - 0.75rem);
  }
  .modal-card-title > * {
    vertical-align: middle;
  }
  .currency-button {
    height: auto;
    border-radius: 0;
    border-width: 0px;
    border-bottom-width: 2px;
  }
</style>
<style lang="scss" scoped>
  @use 'sass:color';
  @import '@/css/variables.scss';

  .button.currency-button {
    border-color: color.change(
      $primary,
      $alpha: 0.2
    );
    transition: all 0.2s ease;
    .emoji {
      font-size: 26px;
    }
    &::v-deep > span {
      transition: all 0.25s ease;
    }
    &::after {
      content: '';
      transition: all 0.2s ease;
      width: 0;
      position: absolute;
      bottom: -2px;
      height: 2px;
      top: auto;
      background: $primary;
      left: 50%;
      transform: translate(-50%);
    }
    &:focus {
      outline: none;
      background: transparent;
      color: $primary;
    }
  }

  .button.currency-button:hover,
  .button.currency-button.is-selected {
    color: $primary;
    background: transparent;
    border-color: color.change(
      $primary,
      $alpha: 0.2
    );
    &::v-deep > span {
      transform: translateY(2px);
    }
    &::after {
      width: 100%;
    }
  }
</style>
