<template>
  <div class="wheel" :style="getBetsStyles">
    <div class="container__wrapper">
      <div class="container">
        <div class="container__side"></div>
        <div class="wheel__body" ref="wheelBody">
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
            <div
              class="history__scroll invisibleScrollBar"
              ref="historyScroll"
              @mousewheel="
                invertScrollHandler($event, 620, $refs.historyScroll)
              "
              @DOMMouseScroll="
                invertScrollHandler($event, 620, $refs.historyScroll)
              "
            >
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
    <div
      class="wheel__bets"
      :style="{ gridTemplateColumns: `repeat(${types.length}, 1fr)` }"
    >
      <div
        v-for="(type, i) of types"
        :key="i"
        class="bet__wrapper bet__button"
        :class="{
          'bet__wrapper-win': type.type == winType && isShowWinType,
          'bet__wrapper-disabled': isSpinning,
        }"
      >
        <bet-button :type="type" :disabled="isSpinning" class="bet__element" />
      </div>
      <div
        v-for="(type, i) of types"
        :key="i + types.length"
        class="bet__wrapper bet__list"
        :class="{
          'bet__wrapper-win': type.type == winType && isShowWinType,
          'bet__wrapper-disabled': isSpinning,
        }"
      >
        <bet-list
          :type="type"
          :list="lists[type.type]"
          :isWinned="type.type == winType && isShowWinType"
          class="bet__element"
        />
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
  getBetLists,
  onNewBet,
} from "@/core/api.js";
import { animate, easingFunctions, invertScrollHandler } from "@/core/utils.js";
import IconWrapper from "@/components/common/IconWrapper.vue";
import IconArrow from "@/components/icons/Arrow.vue";
import Button from "@/components/common/Button.vue";
import BetButton from "@/components/BetButton.vue";
import BetList from "@/components/BetList.vue";

export default {
  components: {
    IconWrapper,
    IconArrow,
    Button,
    BetButton,
    BetList,
  },
  data() {
    return {
      history: null,
      state: null,
      isSpinning: false,
      isShowWinType: true,
      winType: null,
      parts: null,
      types: null,
      lists: null,
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
    invertScrollHandler,
    getCurrentType() {
      while (this.state.angle > 360) this.state.angle -= 360;
      const selectedPart = Math.floor(
        this.state.angle / (360 / this.parts.length)
      );
      return this.parts[selectedPart];
    },
    onSpinEnd() {
      this.winType = this.getCurrentType();
      this.history.unshift({
        type: this.winType,
      });
      this.isShowWinType = true;
      setTimeout(() => {
        this.lists = getBetLists();
        this.isShowWinType = false;
        this.isSpinning = false;
      }, 2000);
    },
    spin() {
      if (this.isSpinning) return;

      this.winType = null;
      this.isSpinning = true;
      const nextSpin = getNextSpin();

      animate(
        this.state.angle,
        this.state.angle + nextSpin.relativeAngle,
        nextSpin.duration,
        easingFunctions.easeOutExpo,
        (value) => (this.state.angle = value),
        this.onSpinEnd
      );
    },
    onNewBet(type, e) {
      if (!this.isSpinning) this.lists[type].unshift(e);
    },
    updateWheelBodyAspectRatio() {
      this.$refs.wheelBody.style.height =
        this.$refs.wheelBody.clientWidth + "px";
    },
  },
  created() {
    this.history = getBetHistory();
    this.state = getState();
    this.parts = getParts();
    this.types = getBetTypes();
    this.lists = getBetLists();
    onNewBet(this.onNewBet);

    window.addEventListener("resize", this.updateWheelBodyAspectRatio);
  },
  mounted() {
    this.updateWheelBodyAspectRatio();
  },
  destroyed() {
    window.removeEventListener("resize", this.updateWheelBodyAspectRatio);
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/vars.scss";

.wheel {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    max-width: 400px;
    overflow: hidden;
  }
  &__image {
    position: absolute;
    background: url("/static/wheel_400.png");
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
  &__bets {
    display: grid;
    grid-template-rows: repeat(2, auto);
    column-gap: 24px;
    margin: 0 30px 30px 30px;
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 25px;
  width: 100%;
  max-width: 700px;

  &__wrapper {
    display: flex;
    justify-content: center;
  }
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

.bet {
  &__wrapper {
    display: flex;
    transition: opacity $transition;

    &-disabled:not(&-win) {
      opacity: 0.5;
    }
  }
  &__element {
    flex: 1;
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
      height: 30px;
    }
    &__scroll {
      height: auto;
      flex: 1;
      flex-direction: column;
      justify-content: center;
    }
    &__item {
      margin: 0 3px 0 6px;
    }
  }

  .bet {
    &__button {
      grid-column: 1 / -1;
    }
  }
}

@media screen and (max-width: 910px) {
  .wheel {
    &__bets {
      row-gap: 24px;
    }
  }

  .bet {
    &__list {
      grid-column: 1 / -1;
    }
  }
}
</style>
