<template>
  <div>
    <div class="mb-2">
      <Head :collection="collection" :buttons="buttons" />
    </div>
    <div>
      <hr />
      <h3 class="text-center mb-5">
        <strong> Создать айтем</strong>
        <div class="d-flex justify-content-center p-2">
          <CreateItem :id="collection.id" @updateItems="updateItems" />
        </div>
      </h3>
    </div>
    <hr />
    <h3 class="text-center mb-4">
      Айтемы
    </h3>
    <p v-if="items.length == 0" class="text-center fs-5">
      Пока что нету айтемов :(
    </p>
    <div v-else>
      <input
        class="form-control p-1 rounded"
        type="text"
        placeholder="Найти айтем по названию"
      />
      <br />
      <br />
      <Items
        v-if="items.length > 0"
        :isInCollection="isCollection"
        :items="items"
      />
      <p v-else class="text-center fs-5">
        Айтемов пока что нету :(
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
      isCollection: true,
      items: [],
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
          text: `Владелец`,
          handler: this.toOwner
        },
        {
          to: `/collection/edit/${this.collection.id}`,
          class: "btn btn-lg btn-outline-secondary",
          show: !this.readOnly,
          text: `Редактировать`,
          handler: () => {}
        },
        {
          to: `/collection/${this.collection.id}`,
          class: "btn btn-lg btn-outline-danger",
          show: !this.readOnly,
          text: `Удалить`,
          handler: this.deleteCollection
        }
      ];
    },
    isMyPage() {
      return this.user.id == this.collection.id_user;
    },
    readOnly() {
      return !(!!this.user.id && (this.isMyPage || this.isAdmin));
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
        if (this.isAdmin) {
          await this.DELETE_COLLECTION({
            id: this.collection.id
          });
        } else {
          await this.DELETE_MY_COLLECTION({
            id: this.collection.id
          });
        }
        this.$router.push(`/user/${this.collection.id_user}`);
      } catch (error) {
        this.$toast.error(error.response.data.msg);
      } finally {
        setTimeout(this.$toast.clear, 3000);
      }
    }
  },
  async created() {
    this.items = await this.GET_COLLECTION_ITEMS(this.$route.params.id);
    this.collection = await this.GET_COLLECTION(this.$route.params.id);
  }
};
</script>

<style scoped></style>
