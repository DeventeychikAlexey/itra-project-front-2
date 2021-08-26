<template>
  <div>
    <div class="mb-2">
      <Head :collection="collection" :buttons="buttons" />
    </div>
    <div>
      <hr />
      <h3 class="text-center mb-5">
        <strong> Изменить коллекцию</strong>
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

import { mapActions } from "vuex";
export default {
  components: { Edit, Head },
  data() {
    return {
      collection: null
    };
  },
  computed: {
    buttons() {
      return [
        {
          to: ``,
          class: "btn btn-lg btn-outline-primary",
          show: true,
          text: `Вернуться`,
          handler: this.getBack
        }
      ];
    }
  },
  methods: {
    ...mapActions(["GET_COLLECTION_ITEMS", "GET_COLLECTION"]),
    getBack() {
      this.$router.go(-1);
    }
  },
  async created() {
    this.collection = await this.GET_COLLECTION(this.$route.params.id);
  }
};
</script>

<style scoped></style>
