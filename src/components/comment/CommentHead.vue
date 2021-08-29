<template>
  <form @submit.prevent="createComment" class="panel">
    <div class="panel-body">
      <textarea
        :class="`form-control bg-${theme} text-${themeText}`"
        rows="2"
        :placeholder="$t('component.comment.head.title-1')"
        v-model="body.comment"
      ></textarea>
      <div class="mt-2">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-12">
            <button
              :disabled="blocked"
              type="submit"
              class="btn btn-lg btn-primary w-100"
            >
              {{ $t("component.comment.head.button-1") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      body: {
        comment: "",
        blocked: false
      }
    };
  },
  computed: {
    ...mapGetters(["theme", "themeText"])
  },
  methods: {
    clearForm() {
      this.body.comment = "";
    },
    async createComment() {
      if (this.body.comment.trim()?.length > 0) {
        this.$emit("createComment", this.body);
        this.clearForm();
      }
    }
  }
};
</script>

<style scoped></style>
