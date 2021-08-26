<template>
  <router-link
    :to="`/collection/${id}`"
    tag="button"
    type="button"
    @click="click"
    class="btn btn-sm btn-outline-primary"
  >
    Перейти к коллекции
  </router-link>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    click(event) {
      event.stopPropagation();
    }
  }
};
</script>

<style scoped></style>
