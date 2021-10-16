<template>
  <div class="newbet">
    <text-box class="newbet__textbox" v-model="amount">Bet:</text-box>
    <Button @click="add(1)">+</Button>
    <Button @click="add(-1)">-</Button>
    <Button @click="add(10)">+ 10</Button>
    <Button @click="add(-10)">- 10</Button>
    <Button @click="add(0)">All</Button>
    <Button @click="mul(2)" style="grid-column: 1">x2</Button>
    <Button @click="mul(1 / 2)">1 / 2</Button>

    <div class="newbet__container">
      <Button
        @click="
          parseAmount();
          newBet(amount, data.type.type);
          $emit('close');
        "
        >Send</Button
      >
      <Button @click="$emit('close')">Cancel</Button>
    </div>
  </div>
</template>

<script>
import { newBet } from "../../core/api.js";
import { roundFloat } from "../../core/utils.js";
import TextBox from "../common/TextBox.vue";
import Button from "../common/Button.vue";

export default {
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  components: {
    TextBox,
    Button,
  },
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    newBet,
    parseAmount() {
      const value = Number.parseFloat(this.amount);
      if (Number.isNaN(value)) this.amount = 0;
      else this.amount = roundFloat(value, 2);
    },
    set(value) {
      if (value >= 0) this.amount = value;
      else this.amount = 0;
    },
    add(value) {
      this.parseAmount();
      this.set(this.amount + value);
    },
    mul(value) {
      this.parseAmount();
      this.set(this.amount * value);
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/vars.scss";

.newbet {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 35px 35px;
  grid-template-rows: auto auto auto auto;
  gap: 10px;
  width: 100%;
  max-width: 400px;
  padding: 20px 40px;
  background-color: $popupBackgroundColor;
  border-radius: 5px;

  &__textbox {
    grid-column: 1 / 4;
  }
  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column: 1 / -1;
    column-gap: 10px;
    margin-top: 16px;

    :first-child {
      grid-column: 2;
    }
  }
}
</style>
