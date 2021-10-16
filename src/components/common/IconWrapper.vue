<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="this.width == 'auto' ? null : this.width"
    :height="this.height == 'auto' ? null : this.height"
    :style="`min-width: ${
      width instanceof Number ? width + 'px' : width
    }; min-height: ${height instanceof Number ? height + 'px' : height}`"
    :viewBox="viewbox"
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
      default: "auto",
    },
    height: {
      type: String,
      default: "auto",
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },
  data() {
    return {
      viewbox: "0 0 0 0",
    };
  },
  computed: {
    listener() {
      return Object.assign({}, this.$listeners, {
        click: (e) => this.$emit("click", e),
      });
    },
  },
  mounted() {
    const svg = this.$slots.default[0].elm;
    this.viewbox = svg.getAttribute("viewBox") || svg.getAttribute("viewbox");
  },
});
</script>

<style scoped>
svg {
  display: block;
}
</style>
