<template>
  <div class="btn-group d-flex flex-wrap" role="group">
    <Button v-for="(button, index) in buttons" :key="index" :button="button" />
  </div>
</template>

<script>
import Button from "@/components/button/Button.vue";

export default {
  props: {
    buttons: {
      type: Array,
      required: true
    }
  },
  components: { Button }
};
</script>
