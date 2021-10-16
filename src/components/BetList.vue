<template>
  <div class="betList" :style="{ '--color': type.color }">
    <div class="betList__stats">
      <div class="betList__count betList__stat">{{ list.length }} bets</div>
      <div class="betList__wager betList__stat">
        <icon-wrapper height="14" class="betList__bux"
          ><icon-bux
        /></icon-wrapper>
        {{ getFormattedWager(getSumWager) }} BUX
      </div>
    </div>
    <div class="list">
      <div class="list__item" v-for="(item, i) of list.slice(0, 20)" :key="i">
        <a class="list__user list__subitem" href="#">{{ item.username }}</a>
        <div class="list__wager list__subitem">
          <icon-wrapper height="14" class="list__bux"
            ><icon-bux
          /></icon-wrapper>
          {{ getFormattedWager(item.bet) }}
          BUX
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconWrapper from "../components/common/IconWrapper.vue";
import IconBux from "../components/icons/Bux.vue";

export default {
  components: {
    IconWrapper,
    IconBux,
  },
  props: {
    type: {
      type: Object,
      require: true,
    },
    list: {
      type: Array,
      require: true,
    },
    isWinned: {
      type: Boolean,
      require: true,
    },
  },
  computed: {
    getSumWager() {
      let wager = 0;
      for (let item of this.list) wager += item.bet;
      return wager;
    },
  },
  methods: {
    getFormattedWager(wager) {
      return this.isWinned
        ? "+" + (wager * this.type.coef).toLocaleString()
        : wager.toLocaleString();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/vars.scss";

.betList {
  display: flex;
  flex-direction: column;
  background-color: $backgroundColor3;

  &__stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px 10px;
    font-size: 14px;
    white-space: nowrap;
    color: var(--color);
  }
  &__stat {
    margin-top: 10px;
  }
  &__wager {
    display: flex;
  }
  &__bux {
    color: var(--volor);
    margin-right: 5.25px;
  }
}

.list {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-weight: 600;
  color: $color3;

  &__item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px 8px;
  }
  &__subitem {
    margin-top: 8px;
  }
  &__wager {
    display: flex;
  }
  &__bux {
    margin-right: 5.25px;
  }
}
</style>
