<template>
  <div class="d-flex w-100 flex-wrap">
    <div v-for="(tag, index) in tags" :key="index" class="me-2">
      <Tag :tag="tag" />
    </div>
  </div>
</template>

<script>
import Tag from "@/components/collection/item/tag/Tag.vue";
export default {
  props: {
    tags: {
      type: Array,
      required: true
    }
  },
  components: { Tag }
};
</script>

<style scoped></style>
