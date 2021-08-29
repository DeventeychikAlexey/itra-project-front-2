<template>
  <div>
    <div class="mb-2">
      <Head :collection="collection" :buttons="buttons" />
    </div>
    <div>
      <hr />
      <h3 class="text-center mb-5">
        <strong> {{ $t("view.collection-edit.title-1") }}</strong>
        <div class="d-flex justify-content-center p-2">
          <Edit :collection="collection" />
        </div>
      </h3>
    </div>
  </div>
</template>

<script>
import Head from "@/components/collection/CollectionHead.vue";
import Edit from "@/components/collection/change/Edit.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  components: { Edit, Head },
  data() {
    return {
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
          text: this.$t("view.collection-edit.buttons.title-1"),
          handler: this.getBack
        }
      ];
    },
    isMyPage() {
      return this.user?.id == this.collection?.id_user;
    },
    restricted() {
      return !(!!this.user.id && (this.isMyPage || this.isAdmin));
    }
  },
  methods: {
    ...mapActions(["GET_COLLECTION"]),
    getBack() {
      this.$router.go(-1);
    }
  },
  async created() {
    this.collection = await this.GET_COLLECTION(this.$route.params.id);
    if (!this.collection || this.restricted) this.$router.push("/page404");
  }
};
</script>

<style scoped></style>
