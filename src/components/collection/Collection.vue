<template>
  <div :class="`card border shadow-sm bg-${theme} text-${themeText}`">
    <div class="image-wrapper">
      <Image :idCollection="collection.id" />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ getValidName }}</h5>
      <h6 class="card-subtitle mb-1 ">{{ topicName }}</h6>
      <p v-if="!read" class="card-text mb-1">Количество: {{ countItems }}</p>
      <p class="card-text">
        {{ collection.description }}
      </p>
    </div>
    <Buttons :buttons="buttons" />
  </div>
</template>

<script>
import Buttons from "@/components/button/Buttons.vue";
import Image from "@/components/collection/Image.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    collection: {
      type: Object,
      required: true
    },
    readOnly: {
      type: Boolean,
      required: true
    }
  },
  components: { Buttons, Image },
  data() {
    return {
      countItems: 0,
      buttons: [
        {
          to: `/collection/${this.collection.id}`,
          class: "btn btn-sm btn-outline-primary",
          show: true,
          text: `${this.$t("component.collection.button.view")}`,
          handler: () => {}
        },
        {
          to: `/collection/edit/${this.collection.id}`,
          class: "btn btn-sm btn-outline-secondary",
          show: !this.readOnly,
          text: `${this.$t("component.collection.button.edit")}`,
          handler: () => {}
        },
        {
          to: "",
          class: "btn btn-sm btn-outline-danger",
          show: !this.readOnly,
          text: `${this.$t("component.collection.button.delete")}`,
          handler: this.deleteCollection
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["topics", "theme", "themeText"]),
    topicName() {
      return this.topics.find(topic => topic.id === this.collection.id_topic)
        ?.name;
    },
    getValidName() {
      return this.collection.name || "Без названия";
    }
  },
  methods: {
    ...mapActions(["COUNT_COLLECTION_ITEMS"]),
    deleteCollection() {
      this.$emit("deleteCollection", this.collection.id);
    }
  },
  async created() {
    try {
      this.countItems = await this.COUNT_COLLECTION_ITEMS(this.collection.id);
    } catch (error) {}
  }
};
</script>

<style scoped>
.image-wrapper {
  height: 225px;
}
</style>
