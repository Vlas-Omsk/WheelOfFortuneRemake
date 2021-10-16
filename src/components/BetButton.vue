<template>
  <button
    role="button"
    class="betButton"
    :style="{ '--color': type.color }"
    @click="click"
  >
    <div class="betButton__foreground"></div>
    <label class="betButton__label">{{ type.coef }}x</label>
  </button>
</template>

<script>
import eventBus from "../core/eventBus.js";
import NewBetPopup from "./popups/NewBet.vue";

export default {
  props: {
    type: {
      type: Object,
      require: true,
    },
  },
  methods: {
    click() {
      eventBus.$emit("openPopup", NewBetPopup, {
        type: this.type,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/vars.scss";

.betButton {
  position: relative;
  border-top: 2.1px var(--color) solid;
  border-bottom: 2.1px var(--color) solid;
  color: var(--color);
  border-radius: 7px;
  font-size: 24px;
  font-weight: 400;
  padding: 18px 20px;
  text-align: center;
  background-color: $backgroundColor2;
  overflow: hidden;
  transition: color 0.2s ease;

  &:hover:not(:disabled) {
    color: $backgroundColor2;

    .betButton {
      &__foreground {
        transform: translateY(-3%);
      }
    }
  }
  &:disabled {
    cursor: default;
  }
  &__foreground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 106%;
    transform: translateY(100%);
    background-color: var(--color);
    border-radius: 7px;
    transition: transform 0.2s ease;
  }
  &__label {
    position: relative;
    cursor: inherit;
  }
}
</style>
