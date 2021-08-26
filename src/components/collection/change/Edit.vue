<template>
  <div :class="`card w-100 shadow-sm bg-${theme} text-${themeText}`">
    <div class="card-body">
      <form @submit.prevent="editCollection">
        <div class="form-outline border rounded-3 mb-2 ">
          <DropZone :id="id" />
        </div>
        <div class="form-outline border rounded-3 mb-2">
          <input
            v-model="editedCollection.name"
            type="text"
            id="form8Example1"
            :class="`form-control ${editedCollection.name && 'active'}`"
          />
          <label
            for="form8Example1"
            :class="`form-label fs-6 text-${themeText}`"
            >{{ $t("component.collection.create.name") }}</label
          >
        </div>
        <Multiselect
          v-model="editedCollection.topic.name"
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
            v-model="editedCollection.description"
            :class="`form-control ${editedCollection.description && 'active'}`"
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
          class="w-100 btn btn-lg btn-secondary"
          :disabled="disabled"
        >
          Изменить
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
    },
    collection: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      blocked: false,
      editedCollection: { ...this.collection }
    };
  },
  computed: {
    ...mapGetters(["topics", "theme", "themeText", "uppy", "isAdmin"]),
    topicId() {
      return (
        this.topics.find(el => el.name === this.editedCollection.topic.name)
          ?.id || -1
      );
    },
    disabled() {
      return this.topicId == -1 || this.blocked;
    }
  },
  methods: {
    ...mapActions(["EDIT_MY_COLLECTION", "EDIT_COLLECTION", "DELETE_IMAGE"]),
    async editMyCollection() {
      await this.EDIT_MY_COLLECTION({
        id: this.editedCollection.id,
        name: this.editedCollection.name,
        description: this.editedCollection.description,
        id_topic: this.topicId,
        image: this.editedCollection.image
      });
    },
    async editCollectionById() {
      await this.EDIT_COLLECTION({
        id: this.editedCollection.id,
        name: this.editedCollection.name,
        description: this.editedCollection.description,
        id_topic: this.topicId,
        image: this.editedCollection.image
      });
    },
    async editCollection() {
      try {
        this.blocked = true;
        if (Object.keys(this.uppy.store.state.files).length > 0) {
          this.editedCollection.image = await this.uppy.upload();
          this.editedCollection.image = this.editedCollection.image.successful[0].response.body.msg.name;
          await this.DELETE_IMAGE(this.editedCollection.id);
        }
        if (this.isAdmin) await this.editCollectionById();
        else await this.editMyCollection();
        this.$router.push(`/collection/${this.$route.params.id}`);
      } catch (error) {
        this.$toast.error(error.response.data.msg);
        setTimeout(this.$toast.clear, 3000);
      } finally {
        this.blocked = false;
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
