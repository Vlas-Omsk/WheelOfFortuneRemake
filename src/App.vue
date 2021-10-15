<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">Wheel of fortune</h1>
    </header>
    <main class="app__main">
      <ul class="menu">
        <li class="menu__item">
          <icon-wrapper><icon-wheel /></icon-wrapper>
        </li>
      </ul>
      <wheel class="app__currentPage" />
    </main>
  </div>
</template>

<script>
import IconWrapper from "./components/common/IconWrapper.vue";
import IconWheel from "./components/icons/Wheel.vue";
import Wheel from "./components/Wheel.vue";

export default {
  name: "App",
  components: {
    IconWrapper,
    IconWheel,
    Wheel,
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
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color;
  height: 100vh;
  width: 100%;

  &__header {
    display: flex;
    align-items: center;
    height: 90px;
    padding: 0 20px;
    background-color: $backgroundColor2;
    border-bottom: 1px solid $color2;
  }
  &__title {
    font-size: 2em;
    font-weight: bold;
  }
  &__main {
    display: flex;
    height: 100%;
  }
  &__currentPage {
    width: 100%;
  }
}

.menu {
  min-width: 80px;
  height: 100%;
  background-color: $backgroundColor2;
  border-right: 1px solid $color2;

  &__item {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
    color: #c8354e;
  }
}
</style>
