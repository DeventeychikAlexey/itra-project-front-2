<template>
  <div>
    <div v-if="tags.length > 0">
      <Multiselect
        v-model="value"
        mode="tags"
        :placeholder="$t('view.home.search-1')"
        :options="tags"
        :searchable="true"
        label="tag"
        trackBy="tag"
        class="text-black"
      >
        <template v-slot:option="{ option }">
          {{ option.tag }}
        </template>
      </Multiselect>
    </div>
    <div v-if="itemsByTags.length > 0">
      <h3 class="text-center my-5">
        <strong>{{ $t("view.home.title-1") }}</strong>
      </h3>
      <Items :items="itemsByTags" :readOnly="readOnly" />
      <hr />
    </div>
    <div v-if="lastCreatedItems.length > 0">
      <h3 class="text-center my-5">
        <strong>{{ $t("view.home.title-2") }}</strong>
      </h3>
      <Items :items="lastCreatedItems" :readOnly="readOnly" />
      <hr />
    </div>
    <div v-if="collections.length > 0">
      <h3 class="text-center my-5">
        <strong>{{ $t("view.home.title-3") }}</strong>
      </h3>
      <Collections :readOnly="readOnly" :collections="biggestCollections" />
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import Collections from "@/components/collection/Collections.vue";
import Items from "@/components/collection/item/Items.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Multiselect,
    Collections,
    Items
  },
  methods: {},
  data() {
    return {
      readOnly: true,
      value: [],
      collections: [],
      items: [],
      value: []
    };
  },
  computed: {
    ...mapGetters(["tags"]),
    itemsByTags() {
      return this.items.filter(item =>
        item.tags
          .map(({ tag }) => tag)
          .some(tag => this.value.some(value => tag === value))
      );
    },
    biggestCollections() {
      return (
        this.collections
          // .sort((a, b) => {
          //   if (a.countItems < b.countItems) return 1;
          //   if (a.countItems > b.countItems) return -1;
          //   return 0;
          // })
          .slice(0, 10)
      );
    },
    lastCreatedItems() {
      return this.items
        .sort((a, b) => {
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;
          return 0;
        })
        .slice(0, 5);
    }
  },
  methods: {
    ...mapActions(["GET_COLLECTIONS", "GET_ITEMS"])
  },
  async created() {
    try {
      this.items = await this.GET_ITEMS();
      this.collections = await this.GET_COLLECTIONS();
    } catch (error) {}
  }
};
</script>
