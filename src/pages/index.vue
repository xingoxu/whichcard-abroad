<template>
  <div>
    <section
      ref="heroSection"
      class="hero columns is-centered is-multiline is-primary"
      style="margin-bottom: -0.75rem"
    >
      <div
        class="column is-three-fifths-fullhd is-four-fifths-desktop"
      >
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              海外どのカード？
            </h1>
            <h2 class="subtitle">
              手数料+ポイント横断比較
            </h2>
          </div>
        </div>
      </div>
    </section>
    <div
      ref="mainSection"
      class="columns is-centered is-multiline main"
    >
      <div
        class="column is-three-fifths-fullhd is-four-fifths-desktop"
      >
        <Form
          ref="form"
          :disabled="currencyLoading"
        ></Form>

        <div
          class="b-table sticky-header-table"
          :class="{
            'is-loading': currencyLoading
          }"
        >
          <div
            class="table-wrapper has-mobile-cards"
          >
            <table
              class="table is-hoverable"
            >
              <thead>
                <tr>
                  <th
                    v-for="(label,
                    index) in tableHeader"
                    :key="index"
                  >
                    <div
                      class="th-wrap"
                      :class="{
                        'is-numeric':
                          index === 0
                      }"
                    >
                      {{ label }}
                    </div>
                  </th>
                  <th>
                    <div class="th-wrap">
                      <b-button
                        rounded
                        outlined
                        type="is-primary"
                        icon-right="add-outline"
                        @click="addCard"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <transition-group
                tag="tbody"
                class="flip-list-wrapper"
                name="flip-list"
              >
                <tr
                  v-for="(row,
                  index) in table"
                  :key="row.card.id"
                >
                  <td
                    class="has-text-right"
                    :data-label="
                      tableHeader[0]
                    "
                  >
                    <span
                      :class="{
                        isSame:
                          index > 0 &&
                          table[index - 1]
                            .index ===
                            row.index
                      }"
                    >
                      {{ row.index + 1 }}
                    </span>
                  </td>
                  <cell-edit
                    :label="tableHeader[1]"
                    v-model="row.card.name"
                  />
                  <card-brand-edit
                    :label="tableHeader[2]"
                    v-model="row.card.brand"
                  >
                    <!-- <b-collapse
                      :open="false"
                      aria-id="currencyInfo"
                      animation="slide"
                    > -->
                    <!-- slot="trigger"
                        aria-controls="currencyInfo" -->
                    <span>
                      <span
                        style="vertical-align: middle"
                      >
                        {{
                          currency[
                            row.card.brand
                          ]
                        }}
                      </span>
                      <span
                        v-if="
                          row.card.brand ===
                            'ae' ||
                            row.card
                              .brand ===
                              'mastercard'
                        "
                        class="t-1_comment"
                        >*</span
                      >
                      <!-- <ion-icon
                          style="vertical-align: middle"
                          name="information-circle-outline"
                        ></ion-icon> -->
                    </span>
                    <!-- <div
                        class="notification"
                      >
                        <div class="content">
                          <h3>
                            Subtitle
                          </h3>
                          <p>
                            American Express
                            の為替は公表してない*
                          </p>
                        </div>
                      </div>
                    </b-collapse> -->
                  </card-brand-edit>
                  <cell-edit
                    :label="tableHeader[3]"
                    is-number
                    v-model="
                      row.card.markupFee
                    "
                  >
                    <span slot="afterInput">
                      %
                    </span>
                  </cell-edit>
                  <td
                    :data-label="
                      tableHeader[4]
                    "
                  >
                    <span
                      style="white-space:nowrap;"
                    >
                      <span>{{
                        row.calc
                      }}</span>
                      <span class="supp_text"
                        >JPY</span
                      >
                    </span>
                  </td>
                  <reward-edit
                    :label="tableHeader[5]"
                    :card="row.card"
                  />
                  <td
                    :data-label="
                      tableHeader[6]
                    "
                  >
                    <span
                      >-{{
                        (row.reward > 0 &&
                          row.reward) ||
                          ''
                      }}</span
                    >
                  </td>
                  <td
                    :data-label="
                      tableHeader[7]
                    "
                  >
                    <span
                      style="white-space:nowrap"
                    >
                      <span>{{
                        row.calcWithReward
                      }}</span>
                      <span class="supp_text"
                        >JPY</span
                      >
                    </span>
                  </td>
                  <td>
                    <b-button
                      class="hover-show"
                      type="is-danger"
                      @click="
                        removeCard(row.card)
                      "
                      outlined
                      rounded
                      icon-right="trash-outline"
                    />
                  </td>
                </tr>
                <tr key="extra">
                  <td colspan="9">
                    <span class="t-1_comment"
                      >*</span
                    >
                    Mastercard
                    の当日の基準レートは公表されておらず、直近日の基準レートで代用されてます
                    <br />
                    American Express
                    の基準レートは公表されておらず、全ブランドの基準レートの平均値を使って計算してます。
                    <br />
                    <br />
                    外貨から日本円へは後日売上データが到着された時点で換算されますので、実際のお支払い金額ではありません。
                    <br />
                    この表では当日の各ブランドの最新の基準レートを使用して推定され、一般に実際の外国為替購入の結果には多少の誤差がありますが、おおよそ各カードの違いを反映しています。
                  </td>
                </tr>
              </transition-group>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Route } from 'vue-router';
  import rewardEdit from '@/components/rewardEdit.vue';
  import cellEdit from '@/components/cellEdit.vue';
  import cardBrandEdit from '@/components/cardBrandEdit.vue';
  import Form, {
    getDefaultForm,
    serializeForm
  } from '@/components/Form.vue';
  import {
    cards,
    Card,
    ShowCard,
    BrandCurrency,
    rewardWithoutReward
  } from '@/constants/cards';
  import { Context } from '@nuxt/types';
  import { showCardSort } from '@/utils/cardSortRule';

  const setAECurrency = (
    currencyData: Partial<BrandCurrency>
  ): Partial<BrandCurrency> => {
    const sum = Object.values(
      currencyData
    ).reduce((prev, value) => {
      if (value === undefined) return prev;
      else
        return (
          prev + Number.parseFloat(value)
        );
    }, 0);
    return {
      ...currencyData,
      ae:
        (
          sum /
          Object.values(currencyData).filter(
            x => !!x
          ).length
        ).toString() ||
        'Card network currency is not available.'
    };
  };

  const generateTableData = (
    currencyData: Partial<BrandCurrency>,
    query: Route['query'],
    cards: Card[]
  ): ShowCard[] => {
    const amount = getDefaultForm(query)
      .amount;

    const _cards = cards
      .map(
        (card): ShowCard => {
          const errorMessage =
            'Card network currency is not available.';
          const currency =
            currencyData[card.brand];

          let calc = currency
            ? Math.round(
                Number.parseFloat(currency) *
                  amount *
                  (card.markupFee / 100 + 1)
              )
            : NaN;

          const reward =
            (card.rewardCalc &&
              !Number.isNaN(calc) &&
              card.rewardCalc(calc)) ||
            0;

          return {
            card,
            calc: !Number.isNaN(calc)
              ? calc
              : errorMessage,
            reward,
            calcWithReward: !Number.isNaN(
              calc
            )
              ? calc - reward
              : errorMessage,
            index: 0
          };
        }
      )
      .sort(showCardSort);
    _cards.forEach((value, index) => {
      if (
        index > 0 &&
        value.calcWithReward ===
          _cards[index - 1].calcWithReward
      ) {
        value.index =
          _cards[index - 1].index;
      } else {
        value.index = index;
      }
    });

    return _cards;
  };

  const getData = async ({
    context,
    axios,
    query
  }: {
    context?: Context;
    axios: Context['$axios'];
    query: Route['query'];
  }) => {
    let currencyData: Partial<BrandCurrency>;
    try {
      if (process.server && context) {
        currencyData = await Vue.prototype.$getCurrency(
          context
        );
      } else {
        const data = await axios.$get(
          '/currency',
          {
            params: serializeForm(
              getDefaultForm(query)
            )
          }
        );

        currencyData = data;
      }
    } catch (e) {
      if (context) {
        context.error(e);
        return;
      } else throw e;
    }

    const currency = setAECurrency(
      currencyData
    );

    return {
      currency
    };
  };

  export default Vue.extend({
    async asyncData(context) {
      return getData({
        context,
        axios: context.$axios,
        query: context.query
      });
    },
    methods: {
      fixHeaderNotClickableBug(
        event: Event
      ) {
        let target = event.target as
          | HTMLElement
          | null
          | undefined;
        while (
          target &&
          target.tagName !== 'THEAD'
        ) {
          target = target.parentElement;
          if (
            !target ||
            target.tagName === 'TABLE'
          )
            return;
        }
        target && target.click();
      },
      removeCard(card: Card): void {
        this.cards.splice(
          this.cards.indexOf(card),
          1
        );
      },
      addCard(): void {
        this.cards.push({
          id: this.cards.length,
          // 'Your Custom Payment'
          name: `カード ${this.cards.length +
            1}`,
          brand: 'visa',
          markupFee: 0,
          rewardCalc: rewardWithoutReward,
          rewardRate: 100
        });
      }
    },
    data() {
      return {
        currency: {} as Partial<
          BrandCurrency
        >,
        cards: cards,
        currencyLoading: false
      };
    },
    computed: {
      table(): ShowCard[] {
        return generateTableData(
          this.currency,
          this.$route.query,
          this.cards
        );
      },
      tableHeader() {
        return [
          '#',
          'カード名',
          'カードブランド為替',
          '手数料',
          '支払金額',
          '還元率',
          '還元額',
          '実質'
        ];
        // return [
        //   '#',
        //   'Card Name',
        //   'Card Network BrandCurrency',
        //   'Markup Fee Rate',
        //   'Pay Amount',
        //   'Rewards Rate',
        //   'Rewards',
        //   'Pay Amount with Rewards'
        // ];
      }
    },
    watch: {
      $route(
        _newValue: Route,
        _oldValue: Route
      ) {
        if (
          _newValue.query['ccy'] ===
            _oldValue.query['ccy'] &&
          _newValue.query['date'] ===
            _oldValue.query['date']
        )
          return;
        this.currencyLoading = true;
        getData({
          axios: this.$axios,
          query: _newValue.query
        })
          .then(data => {
            Object.keys(data!).forEach(
              _key => {
                let key = _key as keyof Exclude<
                  typeof data,
                  undefined
                >;
                let v = data![key];
                (this[key] as typeof v) = v;
              }
            );
          })
          .catch(err => {
            this.$buefy.toast.open({
              duration: 5000,
              message:
                err.message ||
                `Something's going wrong. Try to refresh page or try it again later.`,
              position: 'is-bottom',
              type: 'is-danger'
            });
          })
          .finally(() => {
            this.currencyLoading = false;
          });
      }
    },
    components: {
      Form,
      rewardEdit,
      cellEdit,
      cardBrandEdit
    }
  });
</script>
<style lang="scss" scoped>
  .hero {
    flex-direction: row;
    margin-right: 0;
  }
  .main {
    margin: 3rem 0;
  }
  @media screen and (min-width: 1024px) {
    .hero-body {
      padding-left: 0;
      padding-right: 0;
    }
  }
  td .isSame {
    color: darkgray;
  }
  .supp_text {
    font-size: smaller;
  }
  .hover-show {
    opacity: 0;
    transition: opacity 0.3s;
  }
  tr:hover {
    .hover-show {
      opacity: 1;
    }
  }
  @media screen and (max-width: 768px) {
    .hover-show {
      opacity: 1;
    }
  }
</style>

<style>
  .button.is-text {
    text-decoration: none;
  }
  .sticky-header-table thead th {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #fff;
  }
  .flip-list-wrapper > tr {
    transition: all 0.5s ease;
  }
  .flip-list-enter,
  .flip-list-leave-to {
    opacity: 0;
  }
  .flip-list-leave-active td {
    transition: all 0.5s ease;
    padding-top: 0;
    padding-bottom: 0;
  }
  .flip-list-leave-active td > * {
    position: absolute;
  }
  @media screen and (max-width: 1023px) {
    .table-wrapper {
      overflow: unset;
    }
  }
  .b-table .table th .th-wrap .icon {
    margin-left: 0;
  }
  .t-1_comment {
    color: red;
  }
</style>
