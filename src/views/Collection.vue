<template>
  <div>
    <div class="mb-2">
      <Head
        v-if="updatedCollection"
        :collection="updatedCollection"
        :buttons="buttons"
      />
    </div>
    <div v-if="!readOnly">
      <hr />
      <h3 class="text-center mb-5">
        <strong> {{ $t("view.collection.title-1") }} </strong>
        <div class="d-flex justify-content-center p-2">
          <CreateItem
            v-if="updatedCollection"
            :id="updatedCollection.id"
            @updateItems="updateItems"
          />
        </div>
      </h3>
    </div>
    <hr />
    <h3 class="text-center mb-4">
      {{ $t("view.collection.title-2") }}
    </h3>
    <p v-if="collectionItems.length == 0" class="text-center fs-5">
      {{ $t("view.collection.text-1") }}
    </p>
    <div v-else>
      <input
        class="form-control p-1 rounded"
        type="text"
        :placeholder="$t('view.collection.search-1')"
        v-model="searchValue"
      />
      <br />
      <br />
      <Items
        v-if="collectionItems.length > 0"
        :isInCollection="isCollection"
        :items="items"
        :readOnly="readOnly"
        @updateItems="updateItems"
      />
      <p v-else class="text-center fs-5">
        {{ $t("view.collection.text-2") }}
      </p>
    </div>
  </div>
</template>

<script>
import Items from "@/components/collection/item/Items.vue";
import CreateItem from "@/components/collection/item/change/Create.vue";
import Head from "@/components/collection/CollectionHead.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: { Items, Head, CreateItem },
  data() {
    return {
      searchValue: "",
      isCollection: true,
      collectionItems: [],
      collection: null
    };
  },
  computed: {
    ...mapGetters(["user", "isAdmin"]),
    buttons() {
      return [
        {
          to: ``,
          class: "btn btn-lg btn-outline-primary",
          show: true,
          text: this.$t("view.collection.buttons.title-1"),
          handler: this.toOwner
        },
        {
          to: `/collection/edit/${this.collection.id}`,
          class: "btn btn-lg btn-outline-secondary",
          show: !this.readOnly,
          text: this.$t("view.collection.buttons.title-2"),
          handler: () => {}
        },
        {
          to: `/collection/${this.collection.id}`,
          class: "btn btn-lg btn-outline-danger",
          show: !this.readOnly,
          text: this.$t("view.collection.buttons.title-3"),
          handler: this.deleteCollection
        }
      ];
    },
    updatedCollection() {
      return this.collection;
    },
    isMyPage() {
      return this.user?.id == this.collection?.id_user;
    },
    readOnly() {
      return !(!!this.user.id && (this.isMyPage || this.isAdmin));
    },
    items() {
      return this.collectionItems.filter(item =>
        item.name
          .trim()
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions([
      "GET_COLLECTION_ITEMS",
      "GET_COLLECTION",
      "DELETE_COLLECTION",
      "DELETE_MY_COLLECTION"
    ]),
    toOwner() {
      this.$router.push(`/user/${this.collection.id_user}`);
    },
    async deleteCollection() {
      try {
        if (this.isAdmin) await this.DELETE_COLLECTION(this.collection.id);
        else await this.DELETE_MY_COLLECTION(this.collection.id);
        this.$router.push(`/user/${this.collection.id_user}`);
      } catch (error) {
        this.$toast.error(error?.response?.data?.msg);
      } finally {
        setTimeout(this.$toast.clear, 3000);
      }
    },
    async updateItems() {
      this.collectionItems = await this.GET_COLLECTION_ITEMS(
        this.$route.params.id
      );
    }
  },
  async created() {
    this.collection = await this.GET_COLLECTION(this.$route.params.id);
    if (!this.collection) this.$router.push("/page404");
    this.updateItems();
  }
};
</script>

<style scoped></style>
