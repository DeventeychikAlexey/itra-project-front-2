<template>
  <div :id="id">
    <div class="DashboardContainer"></div>
  </div>
</template>

<script>
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import XHRUpload from "@uppy/xhr-upload";
import DropTarget from "@uppy/drop-target";
import russianLocale from "@uppy/locales/lib/ru_RU";
import englishLocale from "@uppy/locales/lib/en_US";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapGetters(["theme", "lang", "uppy"]),
    id() {
      return `uppy-${this.id}`;
    },
    locale() {
      return this.lang == "en" ? englishLocale : russianLocale;
    }
  },
  methods: {
    ...mapActions(["SET_UPPY"])
  },
  mounted() {
    const uppy = new Uppy({
      id: this.id,
      autoProceed: false,
      allowMultipleUploads: false,
      restrictions: {
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ["image/*"]
      }
    });

    uppy.use(Dashboard, {
      inline: true,
      target: ".DashboardContainer",
      replaceTargetContent: true,
      width: 1920,
      height: 320,
      locale: this.locale,
      hideUploadButton: true,
      hideRetryButton: true,
      theme: this.theme
    });

    uppy.use(XHRUpload, {
      endpoint: "http://localhost:3000/back/user/image",
      method: "post",
      FormData: true,
      fieldName: "image",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    uppy.use(DropTarget, { target: document.body });

    this.SET_UPPY(uppy);
  }
};
</script>
