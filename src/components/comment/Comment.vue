<template>
  <div class="media-block">
    <div class="media-body">
      <div class="mar-btm">
        <router-link :to="`/user/${comment.id_user}`">
          <h6 class="text-semibold media-heading box-inline">
            {{ comment.user.name }}
          </h6>
        </router-link>
        <p class="text-muted text-sm">
          <i class="fa fa-globe fa-lg"></i> - {{ date }}
        </p>
      </div>
      <p>
        {{ comment.comment }}
      </p>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["lang"]),
    date() {
      return moment(this.comment?.createdAt)
        .locale(this.lang)
        .fromNow();
    }
  }
};
</script>

<style scoped></style>
