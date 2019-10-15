<template>
  <div class="u-house__main">
  </div>
</template>

<script>
const type = {
  type: String | Number,
  default: 0
};
export default {
  props: {
    top: type,
    bottom: type,
    left: type,
    right: type,
  }
}
</script>
<style lang="scss">
.u-house {
  overflow: "hidden";
  &, &__t, &__l, &__r, &__b, &__main { position: absolute; }
  &, &__t, &__l, &__r { top: 0; }
  &, &__b, &__l, &__r { bottom: 0; }
  &, &__t, &__b, &__r { right: 0; }
  &, &__t, &__b, &__l { left: 0; }
}
</style>