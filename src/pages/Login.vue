<template>
  <q-layout>
    <!-- this is where the Pages are injected -->
    <q-page class="q-py-none">
      <div class="tw-h-screen flex">
        <div class="bg-primary md:tw-block tw-hidden md:tw-w-1/2 tw-w-full">
          <div class="md:tw-flex tw-justify-center tw-items-center tw-h-full">
            <img src="/img/login/login.svg" alt="" class="tw-max-w-lg" />
          </div>
        </div>
        <div
          class="bg-white tw-flex tw-justify-center tw-flex-col tw-items-center md:tw-w-1/2 tw-w-full"
        >
          <div class="tw-text-center">
            <div class="">
              <img src="/img/Logo_Dark.png" alt="" class="tw-w-32" />
              <!-- <div class="text-subtitle1 tw-font-bold text-primary">
                Marengo
              </div> -->
            </div>
            <div class="">
              <div class="tw-py-5 tw-font-bold tw-text-xl">Student Login</div>
            </div>
          </div>
          <div class="tw-p-3">
            <q-banner
              inline-actions
              class="text-white bg-red"
              v-if="error"
              animated
            >
              {{ resmsg }}
            </q-banner>
          </div>
          <form
            class="q-gutter-y-md tw-flex tw-flex-col tw-justify-center tw-items-center"
            @submit.prevent="handleFormSubmit"
          >
            <q-banner
              inline-actions
              class="text-white bg-red"
              v-if="error"
              animated
            >
              Invalid credentials
            </q-banner>
            <q-input
              rounded
              outlined
              v-model="username"
              required
              label="Username"
              dense
            />
            <q-input
              rounded
              outlined
              v-model="password"
              required
              label="Password"
              dense
              type="password"
              class=""
            />
            <q-btn
              unelevated
              rounded
              color="primary"
              label="Login"
              class="tw-block tw-w-full"
              type="submit"
            >
              <q-spinner-ios v-if="loading" color="white" size="1em"
            /></q-btn>
          </form>
          <div class="tw-p-3 text-primary">
            No account? create a new account by
            <router-link to="/register" class="tw-font-bold"
              >Registering</router-link
            >
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "@vue/runtime-core";
export default {
  name: "Login",
  setup() {
    let username = ref("");
    let password = ref("");
    let loading = ref(false);
    let error = computed(() => store.getters["auth/getError"]);
    const store = useStore();
    const router = useRouter();
    const handleFormSubmit = async () => {
      loading.value = true;
      let payload = {
        username: username.value,
        password: password.value,
      };

      const res = await store.dispatch("auth/loginApi", payload);
      loading.value = false;

      if (res === true) {
        router.push("/");
      }
    };

    return {
      handleFormSubmit,
      username,
      password,
      loading,
      error,
    };
  },
};
</script>
