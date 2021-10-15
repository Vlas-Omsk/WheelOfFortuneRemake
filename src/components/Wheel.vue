<template>
  <div class="wheel" :style="getBetsStyles">
    <div class="container">
      <div class="container__side"></div>
      <div class="wheel__body">
        <div
          class="wheel__image"
          :style="{
            transform: `rotate(${state.angle}deg)`,
          }"
        ></div>
        <Button class="wheel__spin" :disabled="isSpinning" @click="spin"
          >Spin!</Button
        >
        <div class="wheel__timer">
          <div
            class="wheel__time wheel__time-hidden"
            :style="{ color: `var(--bet${getCurrentType()}color)` }"
          >
            0:00
          </div>
          <icon-wrapper
            width="20"
            class="wheel__arrow"
            :style="{ color: `var(--bet${getCurrentType()}color)` }"
            ><icon-arrow
          /></icon-wrapper>
        </div>
      </div>
      <div class="container__side">
        <div class="history__wrapper">
          <div class="history__scroll invisibleScrollBar">
            <div class="history">
              <div
                v-for="(item, i) of history"
                :key="i"
                class="history__item"
                :style="{
                  backgroundColor: `var(--bet${item.type}color)`,
                  minWidth: `var(--bet${item.type}width)`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBetTypes,
  getBetHistory,
  getState,
  getParts,
  getNextSpin,
} from "../core/api.js";
import { animate, easingFunctions } from "../core/utils.js";
import IconWrapper from "../components/common/IconWrapper.vue";
import IconArrow from "../components/icons/Arrow.vue";
import Button from "../components/common/Button.vue";

export default {
  components: {
    IconWrapper,
    IconArrow,
    Button,
  },
  data() {
    return {
      history: [],
      state: {},
      isSpinning: false,
      parts: [],
      types: [],
    };
  },
  computed: {
    getBetsStyles() {
      const style = {};
      this.types.forEach((value) => {
        style[`--bet${value.type}color`] = value.color;
        style[`--bet${value.type}width`] = value.width + "px";
      });
      return style;
    },
  },
  methods: {
    getBetHistory,
    addCurrentBetToHistory() {
      this.history.unshift({
        type: this.getCurrentType(),
      });
    },
    getCurrentType() {
      while (this.state.angle > 360) this.state.angle -= 360;
      const selectedPart = Math.floor(
        this.state.angle / (360 / this.parts.length)
      );
      return this.parts[selectedPart];
    },
    spin() {
      if (this.isSpinning) return;
      this.isSpinning = true;
      const nextSpin = getNextSpin();
      animate(
        this.state.angle,
        this.state.angle + nextSpin.relativeAngle,
        10000,
        easingFunctions.easeInOutQuart,
        (value) => (this.state.angle = value),
        () => {
          this.addCurrentBetToHistory();
          this.isSpinning = false;
        }
      );
    },
  },
  created() {
    this.history = getBetHistory();
    this.state = getState();
    this.parts = getParts();
    this.types = getBetTypes();
  },
};
</script>

<style scoped lang="scss">
@import "../assets/vars.scss";

.wheel {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    max-width: 400px;
    aspect-ratio: 1;
    overflow: hidden;
  }
  &__image {
    position: absolute;
    background: url("https://csgo500tr.com/static/images/wheel_400.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  &__timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
  &__arrow {
    transform: rotate(90deg);
  }
  &__time {
    font-size: 2em;
    font-weight: 300;
    transition: opacity $transition, transform $transition;

    &-hidden {
      opacity: 0;
      transform: translateY(4px);
    }
  }
  &__spin {
    margin: auto 0;
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 25px;
  width: 100%;
  max-width: 700px;

  &__side {
    flex: 1;
    width: 100%;
  }
}

.history {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;

  &__scroll {
    display: flex;
    flex-direction: column-reverse;
    height: 240px;
    width: 36px;
    overflow: scroll;
  }
  &__wrapper {
    display: flex;
    justify-content: flex-end;
    max-width: 100px;
    width: 100%;
  }
  &__item {
    background-color: gray;
    margin: 3px 0 6px 0;
    border-radius: 2px;
    min-width: 18px;
    min-height: 3px;
  }
}

@media screen and (max-width: 620px) {
  .container {
    flex-direction: column-reverse;
  }

  .history {
    flex-direction: row;

    &__wrapper {
      max-width: none;
    }
    &__scroll {
      height: auto;
      flex: 1;
    }
    &__item {
      margin: 3px 3px 6px 6px;
    }
  }
}
</style>
