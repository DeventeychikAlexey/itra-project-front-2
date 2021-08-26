<template>
  <Multiselect v-model="value" :options="themes" class="text-black" />
</template>

<script>
import Multiselect from "@vueform/multiselect";

import { mapGetters, mapActions } from "vuex";

export default {
  components: { Multiselect },
  data() {
    return {
      value: null
    };
  },
  computed: {
    ...mapGetters(["themes", "theme"])
  },
  watch: {
    value(value) {
      this.SET_THEME(value);
    }
  },
  created() {
    this.value = this.theme;
  },
  methods: {
    ...mapActions(["SET_THEME"])
  }
};
</script>
