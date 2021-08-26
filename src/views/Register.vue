<template>
  <div :class="`container-fluid bg-${theme} text-${themeText}`">
    <div class="rounded d-flex justify-content-center">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-12 shadow-lg p-5 pb-0 ">
        <div class="text-center">
          <h3 class="text-primary">{{ $t("view.register.title") }}</h3>
        </div>
        <div class="p-4">
          <Form @submit="register" class="needs-validation" novalidate>
            <div
              :class="`form-outline mb-3 border border-${themeText} rounded-3`"
            >
              <Field
                name="name"
                type="text"
                id="form3Example1"
                :class="`form-control text-${themeText}`"
                :rules="name"
              />
              <label :class="`form-label text-${themeText}`" for="form3Example1"
                >{{ $t("view.register.user.name") }}*</label
              >
            </div>
            <div class="mb-4">
              <ErrorMessage
                :class="` note note-danger bg-${theme} text-${themeText}`"
                name="name"
              />
            </div>

            <!-- Email input -->
            <div
              :class="`form-outline mb-3 border border-${themeText} rounded-3`"
            >
              <Field
                name="email"
                type="email"
                id="form3Example2"
                :class="`form-control text-${themeText}`"
                :rules="email"
              />
              <label :class="`form-label text-${themeText}`" for="form3Example2"
                >{{ $t("view.register.user.email") }}*</label
              >
            </div>
            <div class="mb-4">
              <ErrorMessage
                :class="` note note-danger bg-${theme} text-${themeText}`"
                name="email"
              />
            </div>

            <!-- Password input -->
            <div
              :class="`form-outline mb-3 border border-${themeText} rounded-3`"
            >
              <Field
                name="password"
                type="password"
                id="form3Example3"
                :class="`form-control text-${themeText}`"
                :rules="password"
              />

              <label :class="`form-label text-${themeText}`" for="form3Example3"
                >{{ $t("view.register.user.password") }}*</label
              >
            </div>
            <div class="mb-4">
              <ErrorMessage
                :class="` note note-danger bg-${theme} text-${themeText}`"
                name="password"
              />
            </div>

            <div
              :class="`form-outline mb-3 border border-${themeText} rounded-3`"
            >
              <Field
                name="repeatPassword"
                type="password"
                id="form3Example4"
                :class="`form-control text-${themeText}`"
                :rules="repeatPassword"
              />
              <label :class="`form-label text-${themeText}`" for="form3Example4"
                >{{ $t("view.register.user.password2") }}*</label
              >
            </div>

            <div class="mb-4">
              <ErrorMessage
                :class="` note note-danger bg-${theme} text-${themeText}`"
                name="repeatPassword"
              />
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block  mb-3">
              {{ $t("view.register.button") }}
            </button>
            <div class="text-center">
              <p>
                {{ $t("view.register.text") }}
                <router-link to="/login">{{
                  $t("view.register.route")
                }}</router-link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Field,
    Form,
    ErrorMessage
  },
  data() {
    return {
      name: yup.string().required(),
      email: yup
        .string(this.$t("form.error.string"))
        .required(this.$t("form.error.required"))
        .email(this.$t("form.error.email")),
      password: yup
        .string(this.$t("form.error.string"))
        .required(this.$t("form.error.required"))
        .min(6, this.$t("form.error.min"))
        .max(32, this.$t("form.error.max")),
      repeatPassword: yup
        .string(this.$t("form.error.string"))
        .required(this.$t("form.error.required"))
        .min(6, this.$t("form.error.min"))
        .max(32, this.$t("form.error.max"))
    };
  },
  computed: { ...mapGetters(["theme", "themeText"]) },
  methods: {
    ...mapActions(["REGISTER", "LOGIN"]),
    async register(data) {
      try {
        await this.REGISTER({
          login: data.email,
          password: data.password,
          password2: data.repeatPassword,
          name: data.name
        });
        const user = await this.LOGIN({
          login: data.email,
          password: data.password
        });
        this.$router.push(`/user/${user.id}`);
      } catch (error) {
        this.$toast.error(error.response.data.msg);
        setTimeout(this.$toast.clear, 3000);
      }
    }
  }
};
</script>
