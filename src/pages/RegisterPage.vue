<template>
  <q-layout>
    <!-- this is where the Pages are injected -->
    <q-page class="q-py-none">
      <div class="h-screen flex">
        <div class="bg-blue-700 gt-sm md:w-1/2 w-full">
          <div class="md:flex justify-center items-center h-full">
            <img src="/img/register/register.svg" alt="" class="max-w-lg" />
          </div>
        </div>
        <div
          class="bg-white flex justify-center flex-col items-center md:w-1/2 w-full p-5"
        >
          <div class="text-center">
            <div class="">
              <img src="/img/logo.svg" alt="" class="w-36" draggable="false" />
            </div>
            <div class="">
              <div class="py-5 font-bold text-xl">Student Register</div>
            </div>
          </div>
          <!-- <form
            class="q-gutter-y-md flex flex-col justify-center items-center"
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
              class="block w-full"
              type="submit"
            >
              <q-spinner-ios v-if="loading" color="white" size="1em"
            /></q-btn>
          </form> -->
          <form>
            <q-stepper
              v-model="step"
              ref="stepper"
              color="accent"
              animated
              :contracted="$q.screen.lt.md"
            >
              <q-step
                :name="1"
                title="Student Details"
                icon="create_new_folder"
                :done="step > 1"
              >
                <div class="flex flex-col gap-3">
                  <q-input
                    rounded
                    outlined
                    v-model="fullname"
                    label="Fullname"
                    name="name"
                    placeholder="Enter your Fullname"
                    dense
                    :rules="[(fullname) => !!fullname || 'Field is required']"
                    required
                    class=""
                    color="accent"
                  />
                  <q-input
                    rounded
                    outlined
                    v-model="sclass"
                    name="class"
                    label="class/Qualification"
                    placeholder="Enter your Class/Qualification"
                    dense
                    :rules="[(sclass) => !!sclass || 'Field is required']"
                    required
                    type="text"
                    class=""
                    color="accent"
                  />
                  <q-input
                    rounded
                    outlined
                    v-model="date"
                    name="bday"
                    dense
                    required
                    mask="date"
                    placeholder="Date of Birth"
                    :rules="['date']"
                    color="accent"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="date"
                            aria-placeholder="DOB"
                            color="accent"
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="ok"
                                color="accent"
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
                    name="phone"
                    dense
                    :rules="[(val) => !!val || 'Field is required']"
                    required
                    type="text"
                    mask="###########"
                    placeholder="Enter your phone"
                    class=""
                    prefix="+91"
                    color="accent"
                  />

                  <q-input
                    rounded
                    outlined
                    v-model="school"
                    label="school"
                    name="school"
                    dense
                    :rules="[(val) => !!val || 'Field is required']"
                    required
                    type="text"
                    placeholder="Enter your school"
                    class=""
                    color="accent"
                  />
                  <!-- <q-input
                    rounded
                    outlined
                    v-model="district"
                    label="district"
                    name="district"
                    dense
                    :rules="[(val) => !!val || 'Field is required']"
                    required
                    type="text"
                    placeholder="Enter your District"
                    class=""
                    color="accent"
                  /> -->
                  <q-select
                    v-model="district"
                    name="district"
                    color="accent"
                    dense
                    use-input
                    input-debounce="0"
                    label="District"
                    :options="options"
                    @filter="filterFn"
                    style="width: 250px"
                    behavior="menu"
                    rounded
                    outlined
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </q-step>

              <q-step
                :name="2"
                title="user credentials"
                icon="settings"
                :done="step > 2"
              >
                <div class="flex flex-col gap-3">
                  <q-input
                    rounded
                    outlined
                    name="username"
                    v-model="username"
                    label="Username"
                    dense
                    :rules="[(val) => !!val || 'Field is required']"
                    required
                    placeholder="Enter your username"
                    class=""
                    color="accent"
                    :hint="
                      usernameExists == true ? 'Username already exists!' : ''
                    "
                    @keyup="checkUsername"
                  >
                    <template
                      v-if="usernameExists != true && username.length > 0"
                      v-slot:append
                    >
                      <q-icon name="check" color="green" />
                    </template>
                    <template v-else v-slot:append>
                      <q-icon name="close" color="red" />
                    </template>
                  </q-input>
                  <q-input
                    rounded
                    outlined
                    v-model="email"
                    label="Email"
                    name="email"
                    dense
                    :rules="[
                      (val) => !!val || 'Field is required',
                      (val) => val.match(emailPattern) || 'invalidEmail',
                    ]"
                    :hint="emailExists == true ? 'Email already exists!' : ''"
                    required
                    type="email"
                    placeholder="Enter your Email"
                    class=""
                    color="accent"
                    @keyup="checkEmail"
                  >
                    <template
                      v-if="emailExists != true && email.length > 0"
                      v-slot:append
                    >
                      <q-icon name="check" color="green" />
                    </template>
                    <template v-else v-slot:append>
                      <q-icon name="close" color="red" />
                    </template>
                  </q-input>
                  <q-input
                    rounded
                    outlined
                    v-model="password"
                    label="Password"
                    dense
                    :rules="[(val) => !!val || 'Field is required']"
                    required
                    placeholder="Enter your password"
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
                </div>
              </q-step>
              <q-step :name="3" title="Finish" icon="settings" :done="step > 3">
                <div class="flex flex-col gap-3">
                  <q-icon name="tick"></q-icon>
                  we will create you an account and let you know via email
                </div>
              </q-step>
              <template v-slot:navigation>
                <q-stepper-navigation>
                  <q-btn
                    @click="
                      () => {
                        if (step == 3) return $router.push('/login');
                        if (step == 2) return handleFormSubmit();
                        return $refs.stepper.next();
                      }
                    "
                    color="accent"
                    :label="step === 3 ? 'Accept' : 'Continue'"
                  />
                  <q-btn
                    v-if="step > 1"
                    flat
                    color="accent"
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
                  color="accent"
                  v-close-popup
                  @click="error = false"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <div class="p-3">
            Already have an account
            <router-link to="/login" class="font-bold no-underline text-accent"
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
    let email = ref("");
    let confirmPass = ref("");
    let fullname = ref("");
    let sclass = ref("");
    let date = ref("");
    let phone = ref("");
    let district = ref("");
    let districtValues = [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ];

    let school = ref("");
    let error = ref(false);
    let step = ref(1);
    let delay = ref(false);
    const store = useStore();
    const router = useRouter();
    let usernameExists = computed(() => store.getters["auth/getUserExists"]);
    let emailExists = computed(() => store.getters["auth/getEmailExists"]);
    // onMounted(async()=>{

    // })
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
          sName: fullname.value,
          username: username.value,
          password: confirmPass.value,
          sClass: sclass.value,
          school: school.value,
          sDOB: date.value.replaceAll("/", "-"),
          sMobile: phone.value,
          sDistrict: district.value,
          email: email.value,
        };
        let res = await store.dispatch("auth/registerNewUser", payload);
        if (res == true) {
          step.value = 3;
        }
      }
    };
    const setDelay = () => {
      delay.value = true;
      setTimeout(async () => {
        delay.value = false;
        await store.dispatch("auth/checkUsername", username.value);
      }, 1000);
    };
    const checkUsername = async () => {
      if (delay.value !== true) {
        setDelay();
      }
    };
    const setEmailDelay = () => {
      delay.value = true;
      setTimeout(async () => {
        delay.value = false;
        await store.dispatch("auth/checkEmail", email.value);
      }, 1000);
    };
    const checkEmail = async () => {
      if (delay.value !== true) {
        setEmailDelay();
      }
    };
    const options = ref(districtValues);
    return {
      options,
      isPwd: ref(true),
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
      email,
      districtValues,
      checkUsername,
      usernameExists,
      checkEmail,
      emailExists,
      filterFn(val, update) {
        if (val === "") {
          update(() => {
            options.value = districtValues;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = districtValues.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>
