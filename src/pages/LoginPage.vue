<template>
  <q-layout>
    <!-- this is where the Pages are injected -->
    <q-page class="q-py-none">
      <div class="h-screen flex justify-center items-center">
        <div class="bg-primary gt-sm md:w-1/2 w-full h-full">
          <div class="md:flex justify-center items-center h-full">
            <img src="/img/login/login.svg" alt="" class="max-w-lg" />
          </div>
        </div>
        <div
          class="bg-white flex justify-center flex-col items-center md:w-1/2 w-full"
        >
          <div class="text-center">
            <div class="">
              <img src="/img/logo.svg" alt="" class="w-48" />
              <!-- <div class="text-subtitle1 font-bold text-primary">
                Marengo
              </div> -->
            </div>
            <div class="">
              <div class="py-5 font-bold text-xl">Student Login</div>
            </div>
          </div>
          <div class="p-3">
            <q-banner
              inline-actions
              class="text-white bg-red"
              v-if="error && error.error == true"
              animated
            >
              <div class="" v-if="error.msg !== ''">
                {{ error.msg }}
              </div>
            </q-banner>
            <q-banner
              inline-actions
              class="text-white bg-red"
              v-if="success == true"
              animated
            >
              <div class="" v-if="error.msg !== ''">
                {{ error.msg }}
              </div>
            </q-banner>
          </div>
          <form
            class="q-gutter-y-md flex flex-col justify-center items-center"
            @submit.prevent="handleFormSubmit"
          >
            <q-input
              rounded
              color="black"
              outlined
              v-model="username"
              required
              label="Username"
              placeholder="Enter username"
              dense
              class="text-gray-900 max-w-md w-full"
            />
            <q-input
              rounded
              color="black"
              outlined
              v-model="password"
              required
              label="Password"
              placeholder="Enter password"
              dense
              :type="isPwd ? 'password' : 'text'"
              class="text-gray-900 max-w-md w-full"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="ml-auto text-accent">
              <router-link to="/reset" class="font-bold text-accent"
                >Forgot password?</router-link
              >
            </div>
            <q-btn
              unelevated
              rounded
              color="accent"
              label="Login"
              class="block w-full"
              type="submit"
            >
              <q-spinner-ios v-if="loading" color="white" size="1em"
            /></q-btn>
          </form>
          <div class="p-3 text-accent">
            No account? create a new account by
            <router-link to="/register" class="font-bold text-accent"
              >Registering</router-link
            >
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>
<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
export default {
  setup() {
    let username = ref("");
    let password = ref("");
    let loading = ref(false);
    let error = computed(() => store.getters["auth/getResponseStatus"]);
    let success = ref(false);
    const store = useStore();
    const router = useRouter();
    onMounted(async () => {
      await store.dispatch("auth/resetError");
    });
    const handleFormSubmit = async () => {
      loading.value = true;
      let payload = {
        username: username.value,
        password: password.value,
      };

      const res = await store.dispatch("auth/loginApi", payload);
      loading.value = false;

      if (res === true) {
        success.value = error.value.error;
        router.push("/");
      }
    };

    return {
      handleFormSubmit,
      isPwd: ref(true),
      username,
      password,
      loading,
      error,
      success,
    };
  },
};
</script>
