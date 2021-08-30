<template>
  <div class="panel px-3">
    <div class="panel-body comment-body d-flex flex-column-reverse">
      <Comment
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/comment/Comment.vue";
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  components: { Comment }
};
</script>

<style scoped>
.comment-body {
  max-height: 220px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
