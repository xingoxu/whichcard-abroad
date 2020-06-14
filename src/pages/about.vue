<template>
  <div>
    <section
      ref="heroSection"
      class="hero columns is-centered is-multiline is-primary"
    >
      <div
        class="column is-three-fifths-fullhd is-four-fifths-desktop"
      >
        <div class="hero-body">
          <h1 class="title">
            海外どのカード？
          </h1>
          <ul>
            <li>
              <h2 class="subtitle">
                これは？
              </h2>
              <p>
                クレジットカード手数料とポイント合わせて最安値を比較するランキングサイト
              </p>
            </li>
            <li>
              <h2 class="subtitle">
                比較対象カード
              </h2>
              <p>
                知る限り一番お得なカードを羅列しました、
                その他自分が追加することもできます
              </p>
              <p>
                また、Kyash
                など紐付いてるカードによって還元率が違う場合は編集もできます
              </p>
            </li>
            <li>
              <h2 class="subtitle">
                還元計算公式
              </h2>
              <p>
                ポイントはそのまま値引きで計算します
                クレカ代金として充当できるポイント、またポイントを使っても還元される場合はその分のポイントも値引きされています
              </p>
            </li>
            <li>
              <h2 class="subtitle">
                お問い合わせ
              </h2>
              <client-only>
                <p>
                  <b-button
                    type="is-primary"
                    inverted
                    outlined
                    icon-left="mail-outline"
                    tag="a"
                    href="mailto:admin@xingoxu.com"
                    >admin@xingoxu.com</b-button
                  >
                </p>
              </client-only>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .hero {
    flex-direction: row;
    margin-right: 0;
  }
  @media screen and (min-width: 1024px) {
    .hero-body {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
    font-weight: bold;
  }
  li {
    margin: 2.5rem 1rem;
  }
</style>
