<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
    <div class="col" v-for="(collection, index) in collections" :key="index">
      <Collection
        :collection="collection"
        :readOnly="readOnly"
        @updateCollections="updateCollections"
      />
    </div>
  </div>
</template>

<script>
import Collection from "@/components/collection/Collection.vue";

export default {
  props: {
    collections: {
      type: Array,
      required: true
    },
    readOnly: {
      type: Boolean,
      required: true
    }
  },
  components: { Collection },
  methods: {
    updateCollections() {
      this.$emit("updateCollections");
    }
  }
};
</script>
