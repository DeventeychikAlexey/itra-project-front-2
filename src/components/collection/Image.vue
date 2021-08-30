<template>
  <router-link :to="`/collection/${idCollection}`">
    <img :src="`${imageToShow}`" :alt="`collectionImage${idCollection}`" />
  </router-link>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    idCollection: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      image: null
    };
  },
  computed: {
    ...mapGetters(["thumbnail"]),
    imageToShow() {
      return this.image ? this.image : this.thumbnail;
    }
  },
  methods: {
    ...mapActions(["GET_IMAGE"]),
    async getImage(id) {
      this.image = await this.GET_IMAGE(id);
    }
  },
  async created() {
    try {
      this.getImage(this.idCollection);
    } catch (error) {}
  }
};
</script>

<style scoped>
img {
  display: inline-block;
  object-fit: cover;
  height: 100%;
  width: 100%;
  background: #e4e4e2;
}
</style>
