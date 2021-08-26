<template>
  <div>
    <h3 class="text mb-2">
      {{ namePage }}
      <span class="badge bg-info text-dark ms-1">{{ ownerUserRight }}</span>
    </h3>
    <div v-if="!readOnly">
      <hr />
      <h3 class="text-center mb-5">
        <strong> {{ $t("view.page.title-2") }}</strong>
        <div class="d-flex justify-content-center p-2">
          <CreateCollection
            :id="$route.params.id"
            @updateCollections="updateCollections"
          />
        </div>
      </h3>
    </div>
    <hr />
    <h3 class="text-center mb-4">
      {{ $t("view.page.title-3") }}
    </h3>
    <p v-if="ownerCollections.length == 0" class="text-center fs-5">
      {{ $t("view.page.text-1") }}
    </p>
    <div v-else>
      <input
        class="form-control p-1 rounded"
        type="text"
        :placeholder="$t('view.page.searchPlaceholder')"
        v-model.trim="searchValue"
      />
      <br />
      <br />
      <Collections
        v-if="collections.length > 0"
        :collections="collections"
        :readOnly="readOnly"
        @deleteCollection="deleteCollection"
      />
      <p v-else class="text-center fs-5">
        {{ $t("view.page.text-2") }}
      </p>
    </div>
  </div>
</template>

<script>
import Collections from "@/components/collection/Collections.vue";
import CreateCollection from "@/components/collection/change/Create.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  components: { Collections, CreateCollection },
  data() {
    return {
      searchValue: "",
      owner: {},
      ownerCollections: []
    };
  },
  async created() {
    try {
      this.owner = await this.GET_USER(this.$route.params.id);
      if (!this.owner) this.$router.push("/page404");
      await this.updateCollections();
    } catch (error) {
      this.$router.push("/page404");
    }
  },
  computed: {
    ...mapGetters(["user", "adminRights", "isAdmin"]),
    ownerUserRight() {
      return this.owner?.right?.name;
    },
    isMyPage() {
      return this.user.id == this.$route.params.id;
    },
    namePage() {
      return this.isMyPage
        ? `${this.user.name} (${this.$t("view.page.title-1")})`
        : `${this.owner.name}`;
    },
    readOnly() {
      return !(!!this.user.id && (this.isMyPage || this.isAdmin));
    },
    collections() {
      return this.ownerCollections.filter(collection =>
        collection.name
          .trim()
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions([
      "GET_USER",
      "GET_USER_COLLECTIONS",
      "DELETE_COLLECTION",
      "DELETE_MY_COLLECTION"
    ]),
    async deleteCollection(id) {
      try {
        if (this.isAdmin) {
          await this.DELETE_COLLECTION({
            id
          });
        } else {
          await this.DELETE_MY_COLLECTION({
            id
          });
        }
        this.updateCollections();
        this.$toast.success(this.$t("view.page.successDelete"));
      } catch (error) {
        this.$toast.error(error.response.data.msg);
      } finally {
        setTimeout(this.$toast.clear, 3000);
      }
    },
    async updateCollections() {
      this.ownerCollections = await this.GET_USER_COLLECTIONS(
        this.$route.params.id
      );
    }
  }
};
</script>

<style scoped>
input {
  width: 100%;
}
</style>
