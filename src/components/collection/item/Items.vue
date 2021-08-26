<template>
  <div class="list-group">
    <Item
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :isInCollection="isInCollection"
    />
  </div>
</template>

<script>
import Item from "@/components/collection/item/Item.vue";
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    isInCollection: {
      type: Boolean
    }
  },
  components: { Item }
};
</script>

<style scoped></style>
