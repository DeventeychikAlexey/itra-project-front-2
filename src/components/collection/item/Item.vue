<template>
  <div class="mb-4">
    <div
      @click="toggleLike"
      :class="
        `bg-${theme} text-${themeText} border list-group-item list-group-item-action mb-1`
      "
    >
      <div class="d-flex w-100 justify-content-between">
        <h4 :class="`mb-1 text-${themeText}`">{{ getValidName }}</h4>
        <small> {{ date }}</small>
      </div>
      <div v-if="item?.tags?.length > 0">
        <Tags :tags="tags" />
      </div>
      <div v-if="item?.fieldsString?.length > 0">
        <hr :class="`mt-2 mb-2 bg-${themeText}`" />
        <ItemFields :fields="item?.fieldsString" />
      </div>
      <div v-if="item?.fieldsDate?.length > 0">
        <hr :class="`mt-2 mb-2 bg-${themeText}`" />
        <ItemFields :fields="item?.fieldsDate" />
      </div>
      <div v-if="item?.fieldsInteger?.length > 0">
        <hr :class="`mt-2 mb-2 bg-${themeText}`" />
        <ItemFields :fields="item?.fieldsInteger" />
      </div>
      <div v-if="item?.fieldsText?.length > 0">
        <hr :class="`mt-2 mb-2 bg-${themeText}`" />
        <ItemFields :fields="item?.fieldsText" />
      </div>
      <div v-if="item?.fieldsBoolean?.length > 0">
        <hr :class="`mt-2 mb-2 bg-${themeText}`" />
        <ItemFields :fields="item?.fieldsBoolean" />
      </div>
      <div class="d-flex align-items-center justify-content-end">
        <span class="me-1">{{ countLikes }}</span>
        <i v-if="isLiked" class="fas fa-heart"></i>
        <i v-else class="far fa-heart"></i>
      </div>
      <div class="row mt-3 mb-2">
        <div class="col-lg-3 col-md-6 col-sm-12">
          <Buttons :buttons="buttons" />
        </div>
      </div>
    </div>
    <CommentFull :comments="itemComments" @createComment="createComment" />
  </div>
</template>

<script>
import CommentFull from "@/components/comment/CommentFull.vue";
import ItemFields from "@/components/collection/item/ItemFields.vue";
import Tags from "@/components/collection/item/tag/Tags.vue";
import Buttons from "@/components/button/Buttons.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  components: { ItemFields, Tags, Buttons, CommentFull },
  props: {
    item: {
      type: Object,
      required: true
    },
    isInCollection: {
      type: Boolean
    },
    readOnly: {
      type: Boolean
    }
  },
  data() {
    return {
      isLiked: false,
      countLikes: 0,
      blocked: false,
      comments: []
    };
  },
  computed: {
    ...mapGetters(["theme", "themeText", "lang", "isAdmin"]),
    itemComments() {
      return this.comments;
    },
    tags() {
      return this.item?.tags.map(tag => tag.tag);
    },
    getValidName() {
      return (
        this.item?.name || this.$t("component.collection.item.item.title-1")
      );
    },
    date() {
      return moment(this.item?.createdAt)
        .locale(this.lang)
        .fromNow();
    },
    isInCollectionValue() {
      return this.isInCollection ? this.isInCollection : false;
    },
    buttons() {
      return [
        {
          to: `/collection/${this.item?.id_collection}`,
          class: "btn btn-sm btn-outline-primary",
          show: !this.isInCollectionValue,
          text: this.$t("component.collection.item.item.buttons.title-1"),
          handler: event => {
            event.stopPropagation();
          }
        },
        {
          to: `/item/edit/${this.item?.id}`,
          class: "btn btn-sm btn-outline-secondary",
          show: !this.readOnly,
          text: this.$t("component.collection.item.item.buttons.title-2"),
          handler: event => {
            event.stopPropagation();
          }
        },
        {
          to: ``,
          class: "btn btn-sm btn-outline-danger",
          show: !this.readOnly,
          text: this.$t("component.collection.item.item.buttons.title-3"),
          handler: this.deleteItem
        }
      ];
    }
  },

  methods: {
    ...mapActions([
      "IS_ITEM_LIKED",
      "LIKE_ITEM",
      "UNLIKE_ITEM",
      "COUNT_LIKES",
      "DELETE_MY_ITEM",
      "DELETE_ITEM",
      "UPDATE_TAGS",
      "CREATE_COMMENT",
      "GET_ITEM_COMMENTS",
      "SUBSCRIBE_COMMENTS"
    ]),
    async subscribe() {
      try {
        this.comments = await this.SUBSCRIBE_COMMENTS(this.item.id);
        this.subscribe();
      } catch (error) {
        setTimeout(() => this.subscribe(), 500);
      }
    },
    async toggleLike() {
      try {
        if (!this.blocked) {
          this.blocked = true;
          if (this.isLiked) await this.UNLIKE_ITEM(this.item.id);
          else await this.LIKE_ITEM(this.item.id);
          await this.countItemLikes();
          await this.isItemLiked();
        }
      } catch (error) {
        this.$toast.error(this.$t("component.collection.item.item.errorLike"));
        setTimeout(this.$toast.clear, 3000);
      } finally {
        this.blocked = false;
      }
    },
    async countItemLikes() {
      this.countLikes = await this.COUNT_LIKES(this.item.id);
    },
    async isItemLiked() {
      this.isLiked = await this.IS_ITEM_LIKED(this.item.id);
    },
    async deleteItem(event) {
      try {
        event.stopPropagation();
        if (this.isAdmin) await this.DELETE_ITEM(this.item.id);
        else await this.DELETE_MY_ITEM(this.item.id);
        await this.UPDATE_TAGS();
        this.$emit("updateItems");
        this.$toast.success(
          this.$t("component.collection.item.item.buttons.success-1")
        );
      } catch (error) {
        this.$toast.error(
          error.response.data?.msg ||
            this.$t("component.collection.item.item.buttons.error")
        );
      }
    },
    async createComment(body) {
      try {
        await this.CREATE_COMMENT({ ...body, id: this.item.id });
      } catch (error) {
        this.$toast.error(
          error.response.data?.msg ||
            this.$t("component.collection.item.item.buttons.error")
        );
        setTimeout(this.$toast.clear, 3000);
      }
    }
  },
  async created() {
    try {
      await this.countItemLikes();
      await this.isItemLiked();
      this.comments = await this.GET_ITEM_COMMENTS(this.item.id);
      this.subscribe();
    } catch (error) {}
  }
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>
