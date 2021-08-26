<template>
  <Multiselect v-model="value" :options="langs" class="text-black" />
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
    ...mapGetters(["langs", "lang"])
  },
  watch: {
    value(value) {
      this.SET_LANG(value);
      this.$root.$i18n.locale = this.lang;
    }
  },
  created() {
    this.value = this.lang;
  },
  methods: {
    ...mapActions(["SET_LANG"])
  }
};
</script>
