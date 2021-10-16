<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">Sample text</h1>
    </header>
    <nav class="menu">
      <ul class="menu__items">
        <li class="menu__item">
          <icon-wrapper width="32"><icon-wheel /></icon-wrapper>
        </li>
      </ul>
    </nav>
    <main class="app__main">
      <wheel class="app__content" />
    </main>
    <overlay />
  </div>
</template>

<script>
// кстати да https://csgo500tr.com/

import IconWrapper from "./components/common/IconWrapper.vue";
import IconWheel from "./components/icons/WheelMini.vue";
import Wheel from "./pages/Wheel.vue";
import Overlay from "./components/Overlay.vue";

export default {
  name: "App",
  components: {
    IconWrapper,
    IconWheel,
    Wheel,
    Overlay,
  },
};
</script>

<style lang="scss">
@import "./assets/vars.scss";
@import "./assets/reset.scss";

body {
  background-color: $backgroundColor;
}

.invisibleScrollBar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>

<style scoped lang="scss">
@import "./assets/vars.scss";

.app {
  display: grid;
  grid-template-columns: 80px auto;
  grid-template-rows: 90px auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  color: $color;
  height: 100vh;
  width: 100%;

  &__header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    grid-column: 1 / 3;
    background-color: $backgroundColor2;
    border-bottom: 1px solid $borderColor;
  }
  &__title {
    font-size: 2em;
    font-weight: bold;
  }
  &__main {
    overflow-y: scroll;
  }
}

.menu {
  height: 100%;
  background-color: $backgroundColor2;
  border-right: 1px solid $borderColor;

  &__item {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    color: $color2;
  }
}
</style>
