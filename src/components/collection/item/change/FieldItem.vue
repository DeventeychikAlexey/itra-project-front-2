<template>
  <div :class="`d-flex bg-${theme} text-${themeText}`">
    <div class="form-outline border rounded-3 me-2">
      <input
        type="text"
        :class="`form-control active text-${themeText}`"
        :id="`fieldTitle${index}${type}`"
        v-model="field.title"
      />
      <label
        :class="`form-label fs-6 text-${themeText}`"
        :for="`fieldTitle${index}${type}`"
        >{{ $t("component.collection.item.change.fieldItem.name") }}
        {{ index / 2 + 1 }}</label
      >
    </div>
    <div v-if="type != 'boolean'" class="form-outline border rounded-3 ">
      <input
        :type="type"
        :class="`form-control active text-${themeText}`"
        :id="`fieldValue${index}${type}`"
        v-model="field.value"
      />
      <label
        :class="`form-label fs-6 text-${themeText}`"
        :for="`fieldValue${index}${type}`"
        >{{ $t("component.collection.item.change.fieldItem.value") }}
        {{ index / 2 + 1 }}</label
      >
    </div>
    <div v-else>
      <div class="form-check d-flex align-items-center">
        <input
          class="form-check-input"
          type="radio"
          :name="`fieldValue${index}`"
          :id="`fieldValue${index}${type}`"
          value="true"
          v-model="field.value"
          checked="true"
        />
        <label class="form-check-label fs-6" :for="`fieldValue${index}${type}`">
          {{ $t("component.collection.item.change.fieldItem.true") }}
        </label>
      </div>
      <div class="form-check d-flex align-items-center">
        <input
          class="form-check-input"
          type="radio"
          :name="`fieldValue${index}`"
          :id="`fieldValue${index + 1}${type}`"
          value="false"
          v-model="field.value"
        />
        <label
          class="form-check-label fs-6"
          :for="`fieldValue${index + 1}${type}`"
        >
          {{ $t("component.collection.item.change.fieldItem.false") }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    field: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["theme", "themeText"])
  }
};
</script>

<style scoped></style>
