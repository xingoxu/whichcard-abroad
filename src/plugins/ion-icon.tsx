import Vue from 'vue';

Vue.component('vue-ion-icon', {
  props: {
    icon: Array,
    size: String
  },
  render(h) {
    let size = (this.size ?? '-48px')
      .split('-')
      .slice(1)
      .join('-');
    let iconName = (this.icon[1] as string)
      .split('-')
      .slice(1)
      .join('-');
    return (
      <ion-icon
        name={iconName}
        class={'hydrated'}
        size={!size.endsWith('px') && size}
        style={{
          fontSize:
            size.endsWith('px') && size
        }}
      ></ion-icon>
    );
  }
});
