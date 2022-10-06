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
          <div class="">
            <div class="py-5 font-bold text-xl">Reset password</div>
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
              class="text-white bg-green"
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
            <q-stepper
              v-model="step"
              ref="stepper"
              color="accent"
              active-color="accent"
              animated
              :contracted="$q.screen.lt.md"
            >
              <q-step
                :name="1"
                title="Reset password"
                icon="reset"
                :done="step > 1"
              >
                <q-input
                  rounded
                  outlined
                  v-model="email"
                  label="Email"
                  name="email"
                  dense
                  :rules="[(val) => !!val || 'Field is required']"
                  required
                  type="email"
                  placeholder="Enter your Email"
                  class=""
                  color="accent"
                />

                <!-- <q-input
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
            </q-input> -->

                <q-btn
                  unelevated
                  rounded
                  color="accent"
                  label="Reset Password"
                  class="block w-full"
                  type="submit"
                >
                  <q-spinner-ios v-if="loading" color="white" size="1em"
                /></q-btn>
              </q-step>
              <q-step
                :name="2"
                title="Confirm Email"
                icon="reset"
                :done="step > 1"
              >
                <div class="">
                  <div class="py-5 font-bold text-gray-800 text-md">
                    Please confirm email to reset your password
                  </div>
                </div>

                <a
                  href="https://mail.google.com"
                  target="_blank"
                  class="p-3 bg-blue-600 text-white no-underline"
                >
                  <q-icon name="mail" /> open Gmail
                </a>
              </q-step>
            </q-stepper>
          </form>
          <div class="p-3">
            go back to login page
            <router-link to="/login" class="font-bold text-accent"
              >login</router-link
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
    let email = ref("");

    let loading = ref(false);
    let step = ref(1);
    let error = computed(() => store.getters["forgot/getResponseStatus"]);

    let success = ref(false);
    const store = useStore();
    const router = useRouter();
    onMounted(async () => {
      await store.dispatch("forgot/resetError");
    });
    const handleFormSubmit = async () => {
      await store.dispatch("forgot/resetError");
      loading.value = true;
      let payload = {
        email: email.value,
      };

      const res = await store.dispatch("forgot/sendResetMail", payload);
      loading.value = false;

      if (res === true) {
        step.value = 2;
        success.value = true;
      } else {
        if (
          error.value.error == true &&
          error.value.msg == "Reset link already sent"
        ) {
          step.value = 2;
        }
      }
    };

    return {
      handleFormSubmit,
      email,
      step,
      loading,
      error,
      success,
    };
  },
};
</script>
