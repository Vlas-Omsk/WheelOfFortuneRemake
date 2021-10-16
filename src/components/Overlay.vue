<template>
  <div
    class="overlay"
    ref="overlay"
    :class="{ 'overlay-opened': isOpened }"
    @mousedown="onOverlayClick"
  >
    <div class="overlay__container">
      <component :is="popup" :data="data" @close="onClosePopup" />
    </div>
  </div>
</template>

<script>
import eventBus from "../core/eventBus.js";

export default {
  data() {
    return {
      popup: null,
      data: null,
      isOpened: false,
    };
  },
  methods: {
    onOverlayClick(e) {
      if (e.target == this.$refs.overlay) this.onClosePopup();
    },
    onClosePopup(popup) {
      if (!popup || popup.constructor == this.popup.constructor)
        this.isOpened = false;
    },
    onOpenPopup(popup, data) {
      this.popup = popup;
      this.data = data;
      this.isOpened = true;
    },
  },
  created() {
    eventBus.$on("openPopup", this.onOpenPopup);
    eventBus.$on("closePopup", this.onClosePopup);
  },
};
</script>

<style lang="scss">
.overlay {
  position: fixed;
  display: flex;
  opacity: 0;
  pointer-events: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  transition: opacity 0.1s ease-in;

  &-opened {
    opacity: 1;
    pointer-events: all;
    background-color: rgba(0, 0, 0, 0.8);
    transition: opacity 0.2s ease-in;

    .overlay {
      &__container {
        transform: none;
      }
    }
  }
  &__container {
    transform: scale(0.7, 0.7);
    transition: transform 0.25s cubic-bezier(0.48, 1.93, 1, 0.68);
  }
}
</style>
