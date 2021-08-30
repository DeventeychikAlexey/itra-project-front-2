<template>
  <div :class="`card border shadow-sm bg-${theme} text-${themeText}`">
    <div class="image-wrapper">
      <Image v-if="updatedCollection" :idCollection="updatedCollection.id" />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ getValidName }}</h5>
      <h6 class="card-subtitle mb-1 ">{{ topicName }}</h6>
      <p class="card-text mb-1">
        {{ $t("component.collection.collection.text-1") }}
        {{ updatedCollection.countItems }}
      </p>
      <p class="card-text">
        {{ updatedCollection.description }}
      </p>
    </div>
    <Buttons v-if="updatedCollection" :buttons="buttons" />
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
  computed: {
    ...mapGetters(["topics", "theme", "themeText", "isAdmin"]),
    topicName() {
      return this.topics.find(topic => topic.id === this.collection?.id_topic)
        ?.name;
    },
    getValidName() {
      return (
        this.collection.name ||
        this.$t("component.collection.collection.text-2")
      );
    },
    updatedCollection() {
      return this.collection;
    },
    buttons() {
      return [
        {
          to: `/collection/${this.updatedCollection.id}`,
          class: "btn btn-sm btn-outline-primary",
          show: true,
          text: `${this.$t("component.collection.collection.buttons.view")}`,
          handler: () => {}
        },
        {
          to: `/collection/edit/${this.updatedCollection.id}`,
          class: "btn btn-sm btn-outline-secondary",
          show: !this.readOnly,
          text: `${this.$t("component.collection.collection.buttons.edit")}`,
          handler: () => {}
        },
        {
          to: "",
          class: "btn btn-sm btn-outline-danger",
          show: !this.readOnly,
          text: `${this.$t("component.collection.collection.buttons.delete")}`,
          handler: this.deleteCollection
        }
      ];
    }
  },
  methods: {
    ...mapActions([
      "COUNT_COLLECTION_ITEMS",
      "DELETE_COLLECTION",
      "DELETE_MY_COLLECTION"
    ]),
    async deleteCollection() {
      try {
        const id = this.collection?.id;
        if (this.isAdmin) await this.DELETE_COLLECTION(id);
        else await this.DELETE_MY_COLLECTION(id);
        this.$emit("updateCollections");
        this.$toast.success(
          this.$t("component.collection.collection.success-1")
        );
      } catch (error) {
        this.$toast.error(
          error.response.data?.msg ||
            this.$t("component.collection.collection.error")
        );
      }
    }
  },
  async created() {
    try {
      this.collection.countItems = await this.COUNT_COLLECTION_ITEMS(
        this.collection.id
      );
    } catch (error) {}
  }
};
</script>

<style scoped>
.image-wrapper {
  height: 225px;
}
</style>
