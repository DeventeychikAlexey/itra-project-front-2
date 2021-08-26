<template>
  <div>
    <VueTailwindPagination
      :current="ops.currentPage"
      :total="ops.total"
      :per-page="ops.perPage"
      @page-changed="onPageClick($event)"
    />
  </div>
</template>

<script>
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
export default {
  components: {
    VueTailwindPagination
  },
  props: {
    ops: { type: Object, required: true }
  },
  data() {
    return {};
  },
  methods: {
    onPageClick(event) {
      this.$emit("onPageClick", event);
    }
  }
};
</script>
