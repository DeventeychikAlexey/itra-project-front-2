<template>
  <div :class="`card w-100 shadow-sm bg-${theme} text-${themeText}`">
    <div class="card-body">
      <form @submit.prevent="createItem">
        <div class="form-outline border rounded-3 mb-2">
          <input
            v-model="item.name"
            type="text"
            id="form8Example1"
            :class="`form-control text-${themeText}`"
          />
          <label
            for="form8Example1"
            :class="`form-label fs-6 text-${themeText}`"
            >{{ $t("component.collection.item.change.create.name") }}</label
          >
        </div>

        <Multiselect
          v-model="newTags"
          mode="tags"
          :placeholder="$t('component.collection.item.change.create.search-1')"
          :options="tags"
          :searchable="true"
          :createTag="true"
          label="tag"
          trackBy="tag"
          class="text-black"
        >
          <template v-slot:option="{ option }">
            {{ option.tag }}
          </template>
        </Multiselect>
        <h6 class="text-start mt-3">
          {{ $t("component.collection.item.change.create.countFields") }}
        </h6>
        <div class=" row mb-4 g-2">
          <div class="col-xl-4 col-md-6 col-12 form-outline border rounded-3">
            <input
              type="number"
              id="typeNumber1"
              :max="maxCount"
              :min="minCount"
              :class="`form-control active text-${themeText}`"
              v-model.number="countFieldsNumber"
            />
            <label :class="`form-label text-${themeText}`" for="typeNumber1">
              {{
                $t("component.collection.item.change.create.fieldNumber")
              }}</label
            >
          </div>
          <div class="col-xl-4 col-md-6 col-12 form-outline border rounded-3 ">
            <input
              type="number"
              id="typeNumber2"
              :max="maxCount"
              :min="minCount"
              :class="`form-control active text-${themeText}`"
              v-model.number="countFieldsText"
            />
            <label :class="`form-label text-${themeText}`" for="typeNumber2">{{
              $t("component.collection.item.change.create.fieldText")
            }}</label>
          </div>
          <div class="col-xl-4 col-md-6 col-12 form-outline border rounded-3 ">
            <input
              type="number"
              id="typeNumber3"
              :max="maxCount"
              :min="minCount"
              :class="`form-control active text-${themeText}`"
              v-model.number="countFieldsString"
            />
            <label :class="`form-label text-${themeText}`" for="typeNumber3">{{
              $t("component.collection.item.change.create.fieldString")
            }}</label>
          </div>
          <div class="col-xl-4 col-md-6 col-12 form-outline border rounded-3 ">
            <input
              type="number"
              id="typeNumber4"
              :max="maxCount"
              :min="minCount"
              :class="`form-control active text-${themeText}`"
              v-model.number="countFieldsDate"
            />
            <label :class="`form-label text-${themeText}`" for="typeNumber4">{{
              $t("component.collection.item.change.create.fieldDate")
            }}</label>
          </div>
          <div class="col-xl-4 col-md-6 col-12 form-outline border rounded-3  ">
            <input
              type="number"
              id="typeNumber5"
              :max="maxCount"
              :min="minCount"
              :class="`form-control active text-${themeText}`"
              v-model.number="countFieldsBoolean"
            />
            <label :class="`form-label text-${themeText}`" for="typeNumber5">{{
              $t("component.collection.item.change.create.fieldBool")
            }}</label>
          </div>
        </div>
        <div class="row mb-4">
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="item.fieldsNumber.length > 0"
          >
            <h6 class="text-start mt-3">
              {{
                $t("component.collection.item.change.create.fieldNumber-title")
              }}
            </h6>
            <Fields :fields="item.fieldsNumber" :type="`number`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="item.fieldsText.length > 0"
          >
            <h6 class="text-start mt-3">
              {{
                $t("component.collection.item.change.create.fieldText-title")
              }}
            </h6>
            <Fields :fields="item.fieldsText" :type="`text`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="item.fieldsString.length > 0"
          >
            <h6 class="text-start mt-3">
              {{
                $t("component.collection.item.change.create.fieldString-title")
              }}
            </h6>
            <Fields :fields="item.fieldsString" :type="`text`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="item.fieldsDate.length > 0"
          >
            <h6 class="text-start mt-3">
              {{
                $t("component.collection.item.change.create.fieldDate-title")
              }}
            </h6>
            <Fields :fields="item.fieldsDate" :type="`date`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="item.fieldsBoolean.length > 0"
          >
            <h6 class="text-start mt-3">
              {{
                $t("component.collection.item.change.create.fieldBool-title")
              }}
            </h6>
            <Fields :fields="item.fieldsBoolean" :type="`boolean`" />
          </div>
        </div>
        <button
          type="submit"
          class="w-100 btn btn-lg btn-primary"
          :disabled="disabled"
        >
          {{ $t("component.collection.item.change.create.button") }}
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
      newTags: [],
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
    ...mapGetters(["topics", "theme", "themeText", "isAdmin", "tags"]),
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
    ...mapActions(["CREATE_MY_ITEM", "CREATE_ITEM", "UPDATE_TAGS"]),
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
    clearForm() {
      this.item.name = "";
      this.newTags = [];
      this.item.fieldsNumber = [];
      this.item.fieldsText = [];
      this.item.fieldsString = [];
      this.item.fieldsDate = [];
      this.item.fieldsBoolean = [];
      this.item.fieldsNumberCopy = [];
      this.item.fieldsTextCopy = [];
      this.item.fieldsStringCopy = [];
      this.item.fieldsDateCopy = [];
      this.item.fieldsBooleanCopy = [];
      this.countFieldsNumber = 0;
      this.countFieldsText = 0;
      this.countFieldsString = 0;
      this.countFieldsDate = 0;
      this.countFieldsBoolean = 0;
    },
    async createMyItem() {
      await this.CREATE_MY_ITEM({
        id_collection: this.id,
        name: this.item.name,
        tags: this.newTags,
        fieldsNumber: this.item.fieldsNumber,
        fieldsText: this.item.fieldsText,
        fieldsString: this.item.fieldsString,
        fieldsDate: this.item.fieldsDate,
        fieldsBoolean: this.item.fieldsBoolean
      });
    },
    async createItemById() {
      await this.CREATE_ITEM({
        id_collection: this.id,
        name: this.item.name,
        tags: this.newTags,
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
        else await this.createMyItem();
        await this.UPDATE_TAGS();
        this.$emit("updateItems");
        this.$toast.success(
          this.$t("component.collection.item.change.create.success-1")
        );
        this.clearForm();
      } catch (error) {
        this.$toast.error(
          error.response.data?.msg ||
            this.$t("component.collection.item.change.create.error")
        );
      } finally {
        this.blocked = false;
        setTimeout(this.$toast.clear, 3000);
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
