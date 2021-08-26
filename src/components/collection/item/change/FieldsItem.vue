<template>
  <div class="d-flex flex-column me-4">
    <div v-for="(field, index) in fields" :key="index" class="mb-2">
      <Field :field="field" :index="index * 2" :type="type" />
    </div>
  </div>
</template>

<script>
import Field from "@/components/collection/item/change/FieldItem.vue";
export default {
  props: {
    fields: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: { Field }
};
</script>

<style scoped></style>
