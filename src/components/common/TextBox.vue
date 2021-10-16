<template>
  <label class="textbox">
    <slot />
    <input
      type="text"
      class="textbox__input"
      @input="$emit('input', $event.target.value)"
      :value="value"
    />
  </label>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/vars.scss";

.textbox {
  display: flex;
  align-items: center;
  color: $color3;
  font-size: 14px;
  font-weight: bold;

  &__input {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: $textboxBackgroundColor;
    color: $color;
    border-radius: 5px;
    font-weight: normal;
    width: 100%;
    height: 100%;
  }
}
</style>
