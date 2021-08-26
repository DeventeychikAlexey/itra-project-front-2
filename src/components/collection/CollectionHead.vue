<template>
  <div>
    <div
      class="card flex-md-nowrap flex-wrap-reverse flex-row flex-1-1 mb-4 box-shadow "
    >
      <div class="card-body d-flex flex-column align-items-start">
        <h3 class="card-title mb-0">
          {{ getValidName }}
        </h3>
        <div class="mb-1">
          {{ collection.topic.name }}
        </div>
        <div class="mb-2 text-muted">
          <strong class="me-1">Создано:</strong>{{ date }}
        </div>
        <p class="card-text mb-auto">
          {{ collection.description }}
        </p>
        <Buttons class="flex-md-nowrap mt-3" :buttons="buttons" />
      </div>
      <div class="card-img-right image-wrapper">
        <Image :idCollection="collection.id" />
      </div>
    </div>
  </div>
</template>

<script>
import Image from "@/components/collection/Image.vue";
import Buttons from "@/components/button/Buttons.vue";

import { mapGetters } from "vuex";

export default {
  props: {
    collection: {
      type: Object,
      required: true
    },
    buttons: {
      type: Array
    }
  },
  components: { Image, Buttons },
  computed: {
    ...mapGetters(["lang"]),
    date() {
      return moment(this.collection.createdAt)
        .locale(this.lang)
        .fromNow();
    },
    getValidName() {
      return this.collection.name || "Без названия";
    }
  }
};
</script>

<style scoped>
.image-wrapper {
  max-height: 300px;
  max-width: 520px;
}
</style>
