<template>
  <div :class="`card w-100 shadow-sm bg-${theme} text-${themeText}`">
    <div class="card-body">
      <form @submit.prevent="editItem">
        <div class="form-outline border rounded-3 mb-2">
          <input
            v-model="collectionItem.name"
            type="text"
            id="form8Example1"
            :class="
              `form-control ${collectionItem.name &&
                'active'} text-${themeText}`
            "
          />
          <label
            for="form8Example1"
            :class="`form-label fs-6 text-${themeText} `"
            >{{ this.$t("component.collection.item.change.edit.name") }}
          </label>
        </div>

        <Multiselect
          v-model="newTags"
          mode="tags"
          :placeholder="
            this.$t('component.collection.item.change.edit.search-1')
          "
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
          {{ this.$t("component.collection.item.change.edit.countFields") }}
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
            <label :class="`form-label text-${themeText}`" for="typeNumber1">{{
              this.$t("component.collection.item.change.edit.fieldNumber")
            }}</label>
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
              this.$t("component.collection.item.change.edit.fieldText")
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
              this.$t("component.collection.item.change.edit.fieldString")
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
              this.$t("component.collection.item.change.edit.fieldDate")
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
              this.$t("component.collection.item.change.edit.fieldBool")
            }}</label>
          </div>
        </div>
        <div class="row mb-4">
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="collectionItem.fieldsNumber.length > 0"
          >
            <h6 class="text-start mt-3">
              {{
                this.$t(
                  "component.collection.item.change.edit.fieldNumber-title"
                )
              }}
            </h6>
            <Fields :fields="collectionItem.fieldsNumber" :type="`number`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="collectionItem.fieldsText.length > 0"
          >
            <h6 class="text-start mt-3">
              {{
                this.$t("component.collection.item.change.edit.fieldText-title")
              }}
            </h6>
            <Fields :fields="collectionItem.fieldsText" :type="`text`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="collectionItem.fieldsString.length > 0"
          >
            <h6 class="text-start mt-3">
              {{
                this.$t(
                  "component.collection.item.change.edit.fieldString-title"
                )
              }}
            </h6>
            <Fields :fields="collectionItem.fieldsString" :type="`text`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="collectionItem.fieldsDate.length > 0"
          >
            <h6 class="text-start mt-3">
              {{
                this.$t("component.collection.item.change.edit.fieldDate-title")
              }}
            </h6>
            <Fields :fields="collectionItem.fieldsDate" :type="`date`" />
          </div>
          <div
            class="col-xl-4 col-md-6 col-12"
            v-if="collectionItem.fieldsBoolean.length > 0"
          >
            <h6 class="text-start mt-3">
              {{
                this.$t("component.collection.item.change.edit.fieldBool-title")
              }}
            </h6>
            <Fields :fields="collectionItem.fieldsBoolean" :type="`boolean`" />
          </div>
        </div>
        <button
          type="submit"
          class="w-100 btn btn-lg btn-secondary"
          :disabled="disabled"
        >
          {{ this.$t("component.collection.item.change.edit.button") }}
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
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newTags: this.item.tags.map(({ tag }) => tag),
      blocked: false,
      maxCount: 6,
      minCount: 0,
      collectionItem: Object.assign({}, this.item),
      countFieldsNumber: 0,
      countFieldsText: 0,
      countFieldsString: 0,
      countFieldsDate: 0,
      countFieldsBoolean: 0,
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
      this.collectionItem.fieldsNumber = this.createFields(
        this.fieldsNumberCopy,
        value
      );
    },
    countFieldsText(value) {
      this.collectionItem.fieldsText = this.createFields(
        this.fieldsTextCopy,
        value
      );
    },
    countFieldsString(value) {
      this.collectionItem.fieldsString = this.createFields(
        this.fieldsStringCopy,
        value
      );
    },
    countFieldsDate(value) {
      this.collectionItem.fieldsDate = this.createFields(
        this.fieldsDateCopy,
        value,
        "date"
      );
    },
    countFieldsBoolean(value) {
      this.collectionItem.fieldsBoolean = this.createFields(
        this.fieldsBooleanCopy,
        value
      );
    }
  },
  methods: {
    ...mapActions(["EDIT_MY_ITEM", "EDIT_ITEM", "UPDATE_TAGS"]),
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
    async editMyItem() {
      await this.EDIT_MY_ITEM({
        itemId: this.collectionItem.id,
        name: this.collectionItem.name,
        tags: this.newTags,
        fieldsNumber: this.collectionItem.fieldsNumber,
        fieldsText: this.collectionItem.fieldsText,
        fieldsString: this.collectionItem.fieldsString,
        fieldsDate: this.collectionItem.fieldsDate,
        fieldsBoolean: this.collectionItem.fieldsBoolean
      });
    },
    async editItemById() {
      await this.EDIT_ITEM({
        itemId: this.collectionItem.id,
        name: this.collectionItem.name,
        tags: this.newTags,
        fieldsNumber: this.collectionItem.fieldsNumber,
        fieldsText: this.collectionItem.fieldsText,
        fieldsString: this.collectionItem.fieldsString,
        fieldsDate: this.collectionItem.fieldsDate,
        fieldsBoolean: this.collectionItem.fieldsBoolean
      });
    },
    async editItem() {
      try {
        this.blocked = true;
        if (this.isAdmin) await this.editItemById();
        else await this.editMyItem();
        await this.UPDATE_TAGS();
        this.$router.push(`/collection/${this.item.id_collection}`);
      } catch (error) {
        this.$toast.error(
          error.response.data?.msg ||
            this.$t("component.collection.item.change.edit.error")
        );
      } finally {
        this.blocked = false;
        setTimeout(this.$toast.clear, 3000);
      }
    }
  },
  created() {
    if (this.item) {
      this.countFieldsNumber = this.item.fieldsInteger.length;
      this.countFieldsText = this.item.fieldsText.length;
      this.countFieldsString = this.item.fieldsString.length;
      this.countFieldsDate = this.item.fieldsDate.length;
      this.countFieldsBoolean = this.item.fieldsBoolean.length;
      this.fieldsNumberCopy = [...this.item.fieldsInteger];
      this.fieldsTextCopy = [...this.item.fieldsText];
      this.fieldsStringCopy = [...this.item.fieldsString];
      this.fieldsDateCopy = [...this.item.fieldsDate];
      this.fieldsBooleanCopy = [...this.item.fieldsBoolean];
      this.collectionItem.fieldsNumber = this.createFields(
        this.fieldsNumberCopy,
        this.countFieldsNumber
      );
      this.collectionItem.fieldsText = this.createFields(
        this.fieldsTextCopy,
        this.countFieldsText
      );
      this.collectionItem.fieldsString = this.createFields(
        this.fieldsStringCopy,
        this.countFieldsString
      );
      this.collectionItem.fieldsDate = this.createFields(
        this.fieldsDateCopy,
        this.countFieldsDate,
        "date"
      );
      this.collectionItem.fieldsBoolean = this.createFields(
        this.fieldsBooleanCopy,
        this.countFieldsBoolean
      );
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
