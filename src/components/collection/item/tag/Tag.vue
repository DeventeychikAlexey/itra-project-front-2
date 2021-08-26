<template>
  <span class="btn btn-outline-primary p-1 m-1">{{ tag }}</span>
</template>

<script>
export default {
  props: {
    tag: { type: String, required: true }
  }
};
</script>

<style scoped></style>
