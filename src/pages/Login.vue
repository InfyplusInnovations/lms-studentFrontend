<template>
  <q-layout>
    <!-- this is where the Pages are injected -->
    <q-page class="q-py-none">
      <div class="tw-h-screen flex">
        <div
          class="bg-primary md:tw-block tw-hidden md:tw-w-1/2 tw-w-full"
        ></div>
        <div
          class="bg-white tw-flex tw-justify-center tw-flex-col tw-items-center md:tw-w-1/2 tw-w-full"
        >
          <div class="tw-text-center">
            <div class="">
              <img src="/img/Logo_Dark.png" alt="" class="tw-w-20" />
              <div class="text-subtitle1 tw-font-bold text-primary">
                Marengo
              </div>
            </div>
            <div class="">
              <div class="tw-py-5 tw-font-bold tw-text-xl">Student Login</div>
            </div>
          </div>
          <form
            class="q-gutter-y-md tw-flex tw-flex-col tw-justify-center tw-items-center"
            @submit.prevent="handleFormSubmit"
          >
            <q-input
              rounded
              outlined
              v-model="username"
              label="Username"
              dense
              class=""
            />
            <q-input
              rounded
              outlined
              v-model="password"
              label="Password"
              dense
              class=""
            />
            <q-btn
              unelevated
              rounded
              color="primary"
              label="Login"
              class="tw-block tw-w-full"
              type="submit"
            />
          </form>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Login",
  setup() {
    let username = ref("");
    let password = ref("");
    const store = useStore();
    const router = useRouter();
    const handleFormSubmit = async () => {
      let payload = {
        username: username.value,
        password: password.value,
      };

      const res = await store.dispatch("auth/loginApi", payload);
      if (res === true) {
        router.push("/");
      }
    };
    return {
      handleFormSubmit,
      username,
      password,
    };
  },
};
</script>
