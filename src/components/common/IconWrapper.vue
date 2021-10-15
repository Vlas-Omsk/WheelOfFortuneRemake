<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :style="`min-width: ${width}px; min-height: ${height}px`"
    :viewBox="`0 0 ${width} ${height}`"
    role="presentation"
    v-bind="$attrs"
    v-on="listener"
  >
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "IconWrapper",
  props: {
    width: {
      type: String,
      default: "32",
    },
    height: {
      type: String,
      default: "32",
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },
  computed: {
    listener() {
      return Object.assign({}, this.$listeners, {
        click: (e) => this.$emit("click", e),
      });
    },
  },
});
</script>

<style scoped>
svg {
  display: block;
}
</style>
