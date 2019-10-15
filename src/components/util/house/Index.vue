<template>
  <div class="u-house">
    <div v-if="top" class="u-house__t" :style="{height:top}">
      <slot name="top"></slot>
    </div>
    <div v-if="left" class="u-house__l" :style="{width:left}">
      <slot name="left"></slot>
    </div>
    <div v-if="right" class="u-house__r" :style="{width:right}">
      <slot name="right"></slot>
    </div>
    <div v-if="bottom" class="u-house__b" :style="{height:bottom}">
      <slot name="bottom"></slot>
    </div>
    <div class="u-house__slot" :style="{top,right,bottom,left}"><slot></slot></div>
  </div>
</template>

<script>
const type = { type: String | Number, default: 0 };
export default { props: { top: type, bottom: type, left: type, right: type, } }
</script>
<style lang="scss">
.u-house {
  overflow: hidden;
  &, &__t, &__l, &__r, &__b, &__slot { position: absolute; }
  &, &__t, &__l, &__r { top: 0; }
  &, &__b, &__l, &__r { bottom: 0; }
  &, &__t, &__b, &__r { right: 0; }
  &, &__t, &__b, &__l { left: 0; }
}
</style>