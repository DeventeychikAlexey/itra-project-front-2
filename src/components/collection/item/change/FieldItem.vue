<template>
  <div class="d-flex">
    <div class="form-outline border rounded-3 me-2">
      <input
        type="text"
        class="form-control active"
        :id="`fieldTitle${index}`"
        v-model="field.title"
      />
      <label class="form-label fs-6" :for="`fieldTitle${index}`"
        >Название поля {{ index / 2 + 1 }}</label
      >
    </div>
    <div v-if="type != 'boolean'" class="form-outline border rounded-3 ">
      <input
        :type="type"
        class="form-control active"
        :id="`fieldValue${index}`"
        v-model="field.value"
      />
      <label class="form-label fs-6" :for="`fieldValue${index}`"
        >Значение поля {{ index / 2 + 1 }}</label
      >
    </div>
    <div v-else>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          :name="`fieldValue${index}`"
          :id="`fieldValue${index}`"
          value="true"
          v-model="field.value"
          checked
        />
        <label class="form-check-label" :for="`fieldValue${index}`">
          Правда
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          :name="`fieldValue${index}`"
          :id="`fieldValue${index + 1}`"
          value="false"
          v-model="field.value"
        />
        <label class="form-check-label" :for="`fieldValue${index + 1}`">
          Ложь
        </label>
      </div>

      <!-- <input
        type="radio"
        :name="`fieldValue${index}`"
        class="form-control active"
        value="false"
        :id="`fieldValue${index + 1}`"
        v-model.number="field.value"
      />
      <label class="form-label fs-6" :for="`fieldValue${index + 1}`"
        >Ложь {{ index + 1 }}</label
      > -->
    </div>
  </div>
</template>

<script>
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
  }
};
</script>

<style scoped></style>
