<template>
  <div :class="`container-fluid bg-${theme} text-${themeText}`">
    <div: class="rounded d-flex justify-content-center">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-12 shadow-lg p-5 pb-0 ">
        <div class="text-center">
          <h3 class="text-primary">{{$t('view.login.title')}}</h3>
        </div>
        <div class="p-4">
          <Form @submit="login" class="needs-validation">
            <div :class="`form-outline mb-3 border border-${themeText} rounded-3`">
              <Field
                name="email"
                type="email"
                id="form3Example2"
                :class="`form-control text-${themeText}`"
                :rules="email"
              />
              <label :class="`form-label text-${themeText}`" for="form3Example2"
                >{{$t('view.login.user.email')}}*</label
              >
            </div>
            <div :class="`mb-4 text-${themeText}`">
              <ErrorMessage :class="`note note-danger bg-${theme}`" name="email" />
            </div>

            <div :class="`form-outline mb-3 border border-${themeText} rounded-3`">
              <Field
                name="password"
                type="password"
                id="form3Example3"
                :class="`form-control text-${themeText}`"
                :rules="password"

              />

              <label :class="`form-label text-${themeText}`" for="form3Example3">{{$t('view.login.user.password')}}*</label>
            </div>
            <div :class="`mb-4 text-${themeText}`">
              <ErrorMessage :class="`note note-danger bg-${theme}`" name="password" />
            </div>

            <button type="submit" class="btn btn-primary btn-block  mb-4">
              {{$t('view.login.button')}}
            </button>
            <div class="text-center">
              <p>
                {{$t('view.login.text')}}<router-link to="/register">{{$t('view.login.route')}}</router-link>
              </p>
              <p>
                {{$t('view.login.media')}}:</p>
              <button type="button" class="btn btn-primary btn-floating mx-1">
                <i class="fab fa-facebook-f"></i>
              </button>

              <router-link
                to="/"
                tag="button"
                class="btn btn-primary btn-floating mx-1"
              >
                <i class="fab fa-google"></i>
              </router-link>

              <button type="button" class="btn btn-primary btn-floating mx-1">
                <i class="fab fa-twitter"></i>
              </button>

              <button type="button" class="btn btn-primary btn-floating mx-1">
                <i class="fab fa-github"></i>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div:>
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
      email: yup
        .string(this.$t("form.error.string"))
        .required(this.$t("form.error.required"))
        .email(this.$t("form.error.email")),
      password: yup
      .string(this.$t("form.error.string"))
        .required(this.$t("form.error.required"))
             .min(6, this.$t("form.error.min"))
        .max(32, this.$t("form.error.max"))
    };
  },
  computed: {
    ...mapGetters(["theme", "themeText"])
  },
  methods: {
    ...mapActions(["LOGIN"]),
    async login(data) {
      try {
        const user = await this.LOGIN({
          login: data.email,
          password: data.password
        });
        this.$router.push(`/user/${user.id}`);
      } catch (error) {
        console.log(error.response)
        this.$toast.error(error.response.data.msg || "Проверьте правильность введеных данных!");
        setTimeout(this.$toast.clear, 3000);
      }
    }
  }
};
</script>

<style scoped></style>
