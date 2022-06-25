<template>
  <q-layout>
    <!-- this is where the Pages are injected -->
    <q-page class="q-py-none">
      <div class="tw-h-screen flex">
        <div class="bg-primary md:tw-block tw-hidden md:tw-w-1/2 tw-w-full">
          <div class="md:tw-flex tw-justify-center tw-items-center tw-h-full">
            <img src="/img/register/register.svg" alt="" class="tw-max-w-lg" />
          </div>
        </div>
        <div
          class="bg-white tw-flex tw-justify-center tw-flex-col tw-items-center md:tw-w-1/2 tw-w-full tw-p-5"
        >
          <div class="tw-text-center">
            <div class="">
              <img
                src="/img/Logo_Dark.png"
                alt=""
                class="tw-w-20"
                draggable="false"
              />
              <div class="text-subtitle1 tw-font-bold text-primary">
                Marengo
              </div>
            </div>
            <div class="">
              <div class="tw-py-5 tw-font-bold tw-text-xl">
                Student Register
              </div>
            </div>
          </div>
          <!-- <form
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
          </form> -->
          <form>
            <q-stepper
              v-model="step"
              ref="stepper"
              color="primary"
              animated
              :contracted="$q.screen.lt.md"
            >
              <q-step
                :name="1"
                title="Student Details"
                icon="create_new_folder"
                :done="step > 1"
              >
                <div class="tw-flex tw-flex-col tw-gap-3">
                  <q-input
                    rounded
                    outlined
                    v-model="fullname"
                    label="Fullname"
                    dense
                    :rules="[(fullname) => !!fullname || 'Field is required']"
                    required
                    class=""
                  />
                  <q-input
                    rounded
                    outlined
                    v-model="sclass"
                    label="class"
                    dense
                    :rules="[(sclass) => !!sclass || 'Field is required']"
                    required
                    type="text"
                    class=""
                  />
                  <q-input
                    rounded
                    outlined
                    v-model="date"
                    dense
                    required
                    mask="date"
                    :rules="['date']"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="date">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    rounded
                    outlined
                    v-model="phone"
                    label="Phone"
                    dense
                    :rules="[(val) => !!val || 'Field is required']"
                    required
                    type="text"
                    class=""
                  />
                  <q-input
                    rounded
                    outlined
                    v-model="school"
                    label="school"
                    dense
                    :rules="[(val) => !!val || 'Field is required']"
                    required
                    type="text"
                    class=""
                  />
                  <q-input
                    rounded
                    outlined
                    v-model="district"
                    label="district"
                    dense
                    :rules="[(val) => !!val || 'Field is required']"
                    required
                    type="text"
                    class=""
                  />
                </div>
              </q-step>

              <q-step
                :name="2"
                title="user credentials"
                icon="settings"
                :done="step > 2"
              >
                <div class="tw-flex tw-flex-col tw-gap-3">
                  <q-input
                    rounded
                    outlined
                    v-model="username"
                    label="Username"
                    dense
                    :rules="[(val) => !!val || 'Field is required']"
                    required
                    class=""
                  />
                  <q-input
                    rounded
                    outlined
                    v-model="password"
                    label="Password"
                    dense
                    :rules="[(val) => !!val || 'Field is required']"
                    required
                    type="password"
                    class=""
                  />
                  <q-input
                    rounded
                    outlined
                    v-model="confirmPass"
                    label="confirm password"
                    dense
                    required
                    :rules="[
                      (confirmPass) =>
                        password == confirmPass || 'Passwords should match',
                    ]"
                    type="password"
                    class=""
                  />
                </div>
              </q-step>
              <q-step :name="3" title="Finish" icon="settings" :done="step > 3">
                <div class="tw-flex tw-flex-col tw-gap-3">
                  <q-icon name="tick"></q-icon>
                  we will create you an account and let you know via email
                </div>
              </q-step>
              <template v-slot:navigation>
                <q-stepper-navigation>
                  <q-btn
                    @click="
                      () => {
                        if (step > 2) return handleFormSubmit();
                        return $refs.stepper.next();
                      }
                    "
                    color="primary"
                    :label="step === 3 ? 'Accept' : 'Continue'"
                  />
                  <q-btn
                    v-if="step > 1"
                    flat
                    color="primary"
                    @click="$refs.stepper.previous()"
                    label="Back"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </template>
            </q-stepper>
          </form>
          <q-dialog v-model="error">
            <q-card>
              <q-card-section>
                <div class="text-h6">Alert</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Please Fill in All the fields
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="OK"
                  color="primary"
                  v-close-popup
                  @click="error = false"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <div class="tw-p-3 text-primary">
            Already have an account
            <router-link to="/login" class="tw-font-bold">Login</router-link>
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
    let confirmPass = ref("");
    let fullname = ref("");
    let sclass = ref("");
    let date = ref("");
    let phone = ref("");
    let district = ref("");
    let school = ref("");
    let error = ref(false);
    let step = ref(1);
    const store = useStore();
    const router = useRouter();
    const handleFormSubmit = async () => {
      if (
        fullname.value == "" ||
        date.value == "" ||
        sclass.value == "" ||
        phone.value == "" ||
        district.value == "" ||
        school.value == ""
      ) {
        error.value = true;
        step.value = 1;
      } else if (username.value == "" || password.value == "") {
        error.value = true;
        step.value = 2;
      } else {
        let payload = {
          fullname: fullname.value,
          username: username.value,
          confirmPass: confirmPass.value,
          sclass: sclass.value,
          school: school.value,
          date: date.value,
          phone: phone.value,
          district: district.value,
        };
        store.dispatch("auth/registerNewUser", payload);
        router.push("/login");
      }
    };
    return {
      handleFormSubmit,
      username,
      password,
      confirmPass,
      fullname,
      sclass,
      school,
      date,
      phone,
      district,
      error,
      step,
    };
  },
};
</script>
