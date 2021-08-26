<template>
  <router-link
    :to="button.to"
    tag="button"
    type="button"
    :class="button.class"
    v-show="button.show"
    @click="button.handler"
  >
    {{ button.text }}
  </router-link>
</template>

<script>
export default {
  props: {
    button: {
      type: Object,
      required: true
    }
  }
};
</script>
