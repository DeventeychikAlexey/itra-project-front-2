<template>
  <button type="button" :class="`btn btn-sm btn-${color}`">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped></style>
