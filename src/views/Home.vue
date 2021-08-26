<template>
  <div>
    <div v-if="tags.length > 0">
      <Tags class="mb-2" :tags="value" />
      <Multiselect
        v-model="value"
        :placeholder="$t('view.home.searchPlaceholder')"
        mode="multiple"
        :options="tags"
        :searchable="true"
        class="text-black"
        label="tag"
        trackBy="tag"
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
      <Items :items="itemsByTags" :read="readOnly" />
      <hr />
    </div>
    <div v-if="lastCreatedItems.length > 0">
      <h3 class="text-center my-5">
        <strong>{{ $t("view.home.title-2") }}</strong>
      </h3>
      <Items :items="lastCreatedItems" />
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
import Tags from "@/components/collection/item/tag/Tags.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Multiselect,
    Collections,
    Items,
    Tags
  },
  methods: {},
  data() {
    return {
      readOnly: true,
      value: [],
      collections: [],
      items: []
    };
  },
  computed: {
    ...mapGetters(["tags"]),
    itemsByTags() {
      return this.items.filter(item =>
        item.tags
          .map(tag => tag.tag)
          .some(tag => this.value.find(value => tag === value))
      );
    },
    biggestCollections() {
      return this.collections
        .sort((a, b) => a.countItems - b.countItems)
        .slice(0, 10);
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
      this.collections = await this.GET_COLLECTIONS();
      this.items = await this.GET_ITEMS();
    } catch (error) {}
  }
};
</script>
