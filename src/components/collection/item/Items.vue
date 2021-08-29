<template>
  <div class="list-group">
    <Item
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :isInCollection="isInCollectionValue"
      :readOnly="readOnly"
      @updateItems="updateItems"
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
    },
    readOnly: {
      type: Boolean
    }
  },
  components: { Item },
  computed: {
    isInCollectionValue() {
      return this.isInCollection ? this.isInCollection : false;
    }
  },
  methods: {
    updateItems() {
      this.$emit("updateItems");
    }
  }
};
</script>

<style scoped></style>
