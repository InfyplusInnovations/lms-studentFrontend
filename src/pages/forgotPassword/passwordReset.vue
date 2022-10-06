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
            <div class="py-5 font-bold text-xl">New password</div>
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
              <q-step :name="1" title="verified" icon="check" :done="step > 1">
                <div
                  class="flex flex-col gap-2 justify-center items-center"
                  v-if="success == true"
                >
                  <div
                    class="bg-green-400 w-20 h-20 p-3 rounded-full flex justify-center items-center"
                  >
                    <q-icon name="check" class="" size="50px" color="white" />
                  </div>
                  <div class="py-5 font-bold text-gray-800 text-md">
                    email verified successfully
                  </div>
                </div>
                <div
                  class="flex flex-col gap-2 justify-center items-center"
                  v-else
                >
                  <div
                    class="bg-red-400 w-20 h-20 p-3 rounded-full flex justify-center items-center"
                  >
                    <q-icon name="close" class="" size="50px" color="white" />
                  </div>
                  <div class="py-5 font-bold text-gray-800 text-md">
                    {{ error.msg }}
                  </div>
                </div>
              </q-step>
              <q-step
                :name="2"
                title="Reset password"
                icon="reset"
                :done="step > 2"
              >
                <q-input
                  rounded
                  outlined
                  v-model="password"
                  label="New password"
                  dense
                  :rules="[(val) => !!val || 'Field is required']"
                  required
                  placeholder="Enter new password"
                  class=""
                  color="accent"
                  :type="isPwd ? 'password' : 'text'"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <q-input
                  rounded
                  outlined
                  v-model="confirmPass"
                  label="confirm password"
                  name="password"
                  dense
                  required
                  :rules="[
                    (confirmPass) =>
                      password == confirmPass || 'Passwords should match',
                  ]"
                  type="password"
                  placeholder="Confirm your password"
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
              </q-step>
              <q-step :name="3" title="success" icon="reset" :done="step > 2">
                <div class="flex flex-col gap-2 justify-center items-center">
                  <div
                    class="bg-green-400 w-20 h-20 p-3 rounded-full flex justify-center items-center"
                  >
                    <q-icon name="check" class="" size="50px" color="white" />
                  </div>
                  <div class="py-5 font-bold text-gray-800 text-md">
                    successfully reset password
                  </div>
                </div>
              </q-step>
              <template v-slot:navigation>
                <q-stepper-navigation>
                  <q-btn
                    v-if="step == 1 && success == true"
                    @click="
                      () => {
                        return $refs.stepper.next();
                      }
                    "
                    color="accent"
                    :label="step === 2 ? 'confirm' : 'proceed'"
                  />
                  <q-btn
                    v-if="step == 3"
                    to="/login"
                    color="accent"
                    label="Go to Login"
                  />

                  <q-btn
                    v-if="step == 2"
                    type="submit"
                    color="accent"
                    label="confirm"
                  >
                    <q-spinner-ios v-if="loading" color="white" size="1em" />
                  </q-btn>
                </q-stepper-navigation>
              </template>
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
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
export default {
  setup() {
    let loading = ref(false);
    let step = ref(1);
    let error = computed(() => store.getters["forgot/getResponseStatus"]);
    let success = ref(false);
    let password = ref("");
    let confirmPass = ref("");

    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    onMounted(async () => {
      await store.dispatch("forgot/resetError");
      let res = await store.dispatch("forgot/checkLink", {
        reset: route.params.resetLink,
      });
      if (res === true) {
        success.value = true;
      }
    });
    const handleFormSubmit = async () => {
      success.value = false;
      await store.dispatch("forgot/resetError");
      loading.value = true;
      let payload = {
        reset: route.params.resetLink,
        password: password.value,
        confirmPass: confirmPass.value,
      };

      const res = await store.dispatch("forgot/setNewPassword", payload);
      loading.value = false;

      if (res === true) {
        step.value = 3;
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
      isPwd: ref(""),
      step,
      loading,
      error,
      success,
      password,
      confirmPass,
    };
  },
};
</script>
