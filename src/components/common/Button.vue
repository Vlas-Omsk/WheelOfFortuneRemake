<template>
  <button role="button" class="button" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "../../assets/vars.scss";

.button {
  background: $buttonBackgroundColor;
  font-size: 1em;
  font-weight: bold;
  padding: 7.5px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  cursor: pointer;
  transition: background-color $transition;

  &:hover:not(:disabled) {
    background-color: $buttonHoverBackgroundColor;
  }
  &:active:not(:disabled) {
    background-color: $buttonActiveBackgroundColor;
  }
  &:disabled {
    background-color: $buttonDisabledBackgroundColor;
    cursor: default;
  }
}
</style>
