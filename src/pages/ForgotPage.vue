<template>
  <q-layout>
    <!-- this is where the Pages are injected -->
    <q-page class="q-py-none">
      <div class="h-screen flex">
        <div class="bg-primary gt-sm md:w-1/2 w-full">
          <div class="md:flex justify-center items-center h-full">
            <img src="/img/login/login.svg" alt="" class="max-w-lg" />
          </div>
        </div>
        <div
          class="bg-white flex justify-center flex-col items-center md:w-1/2 w-full"
        >
          <div class="text-2xl">
            <div class="">Forgot password</div>
            <div class="text-accent font-bold">Call: 123234324</div>
          </div>
          <div class="p-3">
            go back to login page
            <router-link to="/login" class="font-bold text-accent"
              >Login</router-link
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
      username,
      password,
      loading,
      error,
      success,
    };
  },
};
</script>
