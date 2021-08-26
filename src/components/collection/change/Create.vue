<template>
  <div :class="`card w-100 shadow-sm bg-${theme} text-${themeText}`">
    <div class="card-body">
      <form @submit.prevent="createCollection">
        <div class="form-outline border rounded-3 mb-2 ">
          <DropZone :id="id" />
        </div>
        <div class="form-outline border rounded-3 mb-2 ">
          <input
            v-model="collection.name"
            type="text"
            id="form8Example1"
            class="form-control"
          />
          <label
            for="form8Example1"
            :class="`form-label fs-6 text-${themeText}`"
            >{{ $t("component.collection.create.name") }}</label
          >
        </div>

        <Multiselect
          v-model="collection.topic"
          :placeholder="$t('component.collection.create.searchPlaceholder')"
          label="name"
          trackBy="name"
          :options="topics"
          :searchable="true"
          class="mb-2 text-black"
        >
          <template v-slot:option="{ option }">
            {{ option.name }}
          </template>
        </Multiselect>

        <div class="form-outline border rounded-3 mb-2">
          <textarea
            v-model="collection.description"
            class="form-control"
            id="form4Example3"
            rows="4"
          ></textarea>
          <label
            :class="`form-label fs-6 text-${themeText}`"
            for="form4Example3"
            >{{ $t("component.collection.create.description") }}</label
          >
        </div>
        <button
          type="submit"
          class="w-100 btn btn-lg btn-primary"
          :disabled="disabled"
        >
          {{ $t("component.collection.create.button") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import DropZone from "@/components/dropZone/DropZone.vue";
import Multiselect from "@vueform/multiselect";

import { mapActions, mapGetters } from "vuex";

export default {
  components: { DropZone, Multiselect },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      blocked: false,
      collection: {
        name: "",
        topic: "",
        description: "",
        image: ""
      }
    };
  },
  computed: {
    ...mapGetters(["topics", "theme", "themeText", "uppy", "isAdmin"]),
    topicId() {
      return (
        this.topics.find(el => el.name === this.collection.topic)?.id || -1
      );
    },
    disabled() {
      return this.topicId == -1 || this.blocked;
    }
  },
  methods: {
    ...mapActions(["CREATE_MY_COLLECTION", "CREATE_COLLECTION"]),
    clearForm() {
      this.collection.image = "";
      this.collection.name = "";
      this.collection.description = "";
      this.collection.topic = "";
      this.uppy.reset();
    },
    async createMyCollection() {
      await this.CREATE_MY_COLLECTION({
        name: this.collection.name,
        description: this.collection.description,
        id_topic: this.topicId,
        image: this.collection.image
      });
    },
    async createCollectionById() {
      await this.CREATE_COLLECTION({
        id: this.id,
        name: this.collection.name,
        description: this.collection.description,
        id_topic: this.topicId,
        image: this.collection.image
      });
    },
    async createCollection() {
      try {
        this.blocked = true;
        this.collection.image = await this.uppy.upload();
        this.collection.image = this.collection.image.successful[0].response.body.msg.name;
        if (this.isAdmin) await this.createCollectionById();
        else await this.createMyCollection();
        this.$emit("updateCollections");
        this.$toast.success("Коллекция успешно создана!");
        setTimeout(this.$toast.clear, 3000);
      } catch (error) {
        this.$toast.error(error);
        setTimeout(this.$toast.clear, 3000);
      } finally {
        this.blocked = false;
        this.clearForm();
      }
    }
  }
};
</script>

<style land="scss" scoped>
img {
  width: 100%;
  height: 225px;
  object-fit: contain;
}
label {
  font-size: 12px;
}
</style>
