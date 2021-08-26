<template>
  <div :class="`card w-100 shadow-sm bg-${theme} text-${themeText}`">
    <div class="card-body">
      <form @submit.prevent="createItem">
        <div class="form-outline border rounded-3">
          <input
            v-model="item.name"
            type="text"
            id="form8Example1"
            class="form-control"
          />
          <label
            for="form8Example1"
            :class="`form-label fs-6 text-${themeText}`"
            >{{ $t("component.collection.create.name") }}</label
          >
        </div>
        <h6 class="text-start mt-3">Количество полей:</h6>
        <div class=" row mb-4 g-2">
          <div class="col-xl-4 col-md-6 col-12 form-outline border rounded-3">
            <input
              type="number"
              id="typeNumber1"
              :max="maxCount"
              :min="minCount"
              class="form-control active"
              v-model.number="countFieldsNumber"
            />
            <label class="form-label" for="typeNumber1">Числовые</label>
          </div>
          <div class="col-xl-4 col-md-6 col-12 form-outline border rounded-3 ">
            <input
              type="number"
              id="typeNumber2"
              :max="maxCount"
              :min="minCount"
              class="form-control active"
              v-model.number="countFieldsText"
            />
            <label class="form-label" for="typeNumber2">Текстовые</label>
          </div>
          <div class="col-xl-4 col-md-6 col-12 form-outline border rounded-3 ">
            <input
              type="number"
              id="typeNumber3"
              :max="maxCount"
              :min="minCount"
              class="form-control active"
              v-model.number="countFieldsString"
            />
            <label class="form-label" for="typeNumber3">Строковые</label>
          </div>
          <div class="col-xl-4 col-md-6 col-12 form-outline border rounded-3 ">
            <input
              type="number"
              id="typeNumber4"
              :max="maxCount"
              :min="minCount"
              class="form-control active"
              v-model.number="countFieldsDate"
            />
            <label class="form-label" for="typeNumber4">Даты</label>
          </div>
          <div class="col-xl-4 col-md-6 col-12 form-outline border rounded-3  ">
            <input
              type="number"
              id="typeNumber5"
              :max="maxCount"
              :min="minCount"
              class="form-control active"
              v-model.number="countFieldsBoolean"
            />
            <label class="form-label" for="typeNumber5">Логические</label>
          </div>
        </div>
        <div class="row mb-4">
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="item.fieldsNumber.length > 0"
          >
            <h6 class="text-start mt-3">Числовые поля:</h6>
            <Fields :fields="item.fieldsNumber" :type="`number`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="item.fieldsText.length > 0"
          >
            <h6 class="text-start mt-3">Текстовые поля:</h6>
            <Fields :fields="item.fieldsText" :type="`text`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="item.fieldsString.length > 0"
          >
            <h6 class="text-start mt-3">Строковые поля:</h6>
            <Fields :fields="item.fieldsString" :type="`text`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="item.fieldsDate.length > 0"
          >
            <h6 class="text-start mt-3">Поля дат:</h6>
            <Fields :fields="item.fieldsDate" :type="`date`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="item.fieldsBoolean.length > 0"
          >
            <h6 class="text-start mt-3">Логические поля:</h6>
            <Fields :fields="item.fieldsBoolean" :type="`boolean`" />
          </div>
        </div>

        <!-- <Multiselect
          v-model="collection.topic"
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
        </Multiselect> -->
        <button
          type="submit"
          class="w-100 btn btn-lg btn-primary"
          :disabled="disabled"
        >
          {{ $t("component.collection.create.button") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import Fields from "@/components/collection/item/change/FieldsItem.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: { Multiselect, Fields },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      blocked: false,
      maxCount: 6,
      minCount: 0,
      countFieldsNumber: 0,
      countFieldsText: 0,
      countFieldsString: 0,
      countFieldsDate: 0,
      countFieldsBoolean: 0,
      item: {
        name: "",
        fieldsNumber: [],
        fieldsText: [],
        fieldsString: [],
        fieldsDate: [],
        fieldsBoolean: []
      },
      fieldsNumberCopy: [],
      fieldsTextCopy: [],
      fieldsStringCopy: [],
      fieldsDateCopy: [],
      fieldsBooleanCopy: []
    };
  },
  computed: {
    ...mapGetters(["topics", "theme", "themeText", "isAdmin"]),
    disabled() {
      return this.blocked;
    }
  },
  watch: {
    countFieldsNumber(value) {
      this.item.fieldsNumber = this.createFields(this.fieldsNumberCopy, value);
    },
    countFieldsText(value) {
      this.item.fieldsText = this.createFields(this.fieldsTextCopy, value);
    },
    countFieldsString(value) {
      this.item.fieldsString = this.createFields(this.fieldsStringCopy, value);
    },
    countFieldsDate(value) {
      this.item.fieldsDate = this.createFields(
        this.fieldsDateCopy,
        value,
        "date"
      );
    },
    countFieldsBoolean(value) {
      this.item.fieldsBoolean = this.createFields(
        this.fieldsBooleanCopy,
        value
      );
    }
  },
  methods: {
    ...mapActions(["CREATE_MY_ITEM", "CREATE_ITEM"]),
    createFields(fieldsCopy, value, type = null) {
      for (let i = 0; i < value && i < this.maxCount; i++)
        if (!fieldsCopy[i] && type === "date") {
          const date = new Date();
          fieldsCopy[i] = {
            title: "",
            value: `${date.getFullYear()}-${
              date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : "0" + (date.getMonth() + 1)
            }-${date.getDate() >= 10 ? date.getDate() : "0" + date.getDay()}`
          };
        } else if (!fieldsCopy[i]) fieldsCopy[i] = { title: "", value: "" };
      if (value > this.maxCount) return fieldsCopy.slice(0, this.maxCount);
      return fieldsCopy.slice(0, value);
    },
    clearForm() {},
    async createMyItem() {
      await this.CREATE_MY_ITEM({
        name: this.item.name,
        fieldsNumber: this.item.fieldsNumber,
        fieldsText: this.item.fieldsText,
        fieldsString: this.item.fieldsString,
        fieldsDate: this.item.fieldsDate,
        fieldsBoolean: this.item.fieldsBoolean
      });
    },
    async createItemById() {
      await this.CREATE_ITEM({
        id: this.id,
        name: this.item.name,
        fieldsNumber: this.item.fieldsNumber,
        fieldsText: this.item.fieldsText,
        fieldsString: this.item.fieldsString,
        fieldsDate: this.item.fieldsDate,
        fieldsBoolean: this.item.fieldsBoolean
      });
    },
    async createItem() {
      try {
        this.blocked = true;
        if (this.isAdmin) await this.createItemById();
        // else await this.createMyItem();
        // this.$emit("updateCollections");
        this.$toast.success("Айтем успешно создана!");
        setTimeout(this.$toast.clear, 3000);
      } catch (error) {
        this.$toast.error(error.response.data.msg);
        setTimeout(this.$toast.clear, 3000);
      } finally {
        this.blocked = false;
        this.clearForm();
      }
    }
  }
};
</script>

<style land="scss" scoped>
label {
  font-size: 12px;
}
input[type="number"] {
  min-width: 200px;
}
</style>
