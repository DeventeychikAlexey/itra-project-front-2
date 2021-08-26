<template>
  <div>
    <div
      v-for="(el, index) in fields"
      :key="index"
      :class="`me-4 text-${themeText}`"
    >
      <span class="fw-bold me-1">{{ el.title }}:</span>
      <span v-if="typeof el.value == 'boolean'">
        <i v-if="el.value" class="far fa-check-circle"></i>
        <i v-else class="far fa-times-circle"></i>
      </span>
      <span v-else> {{ el.value }} </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    fields: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(["themeText"])
  }
};
</script>

<style scoped></style>
