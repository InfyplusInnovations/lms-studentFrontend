<template>
  <q-layout>
    <q-page>
      <router-view />
      <div class="tw-max-w-3xl tw-p-3">
        <form>
          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            animated
            :contracted="$q.screen.lt.md"
          >
            <q-step :name="1" title="Enroll" icon="settings" :done="step > 1">
              <div class="tw-flex tw-flex-col tw-gap-3">
                <q-icon name="tick"></q-icon>
                <span class="tw-font-bold tw-text-xl">
                  Enroll to the course</span
                >

                <q-card v-if="course">
                  <q-card-section horizontal>
                    <div class="col-5 tw-p-3">
                      <q-img :src="`${cloudinary}${course.cThumbnail}`" />
                    </div>
                    <div class="tw-p-3">
                      <div class="tw-font-bold tw-text-xl">
                        {{ course.cName }}
                      </div>
                      <div
                        class="tw-text-md tw-text-gray-600"
                        v-html="course.cDescription"
                      ></div>
                      <div class="tw-font-bold tw-text-2xl tw-text-blue-600">
                        Price : {{ course.cPrice }}
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </q-step>
            <q-step :name="2" title="Pay" icon="settings" :done="step > 2">
              <div class="tw-flex tw-flex-col tw-gap-3">
                <q-icon name="tick"></q-icon>
                Pay the Money to enroll into a course
                <!--
                <p>
                  sId: <strong>{{ sDetail.sId }}</strong>
                </p>
                <p>
                  student Name: <strong>{{ sDetail.sName }}</strong>
                </p>

                <p>
                  Course Name: <strong> {{ cDetail.cName }}</strong>
                </p>
                <p>
                  Course Price: <strong> {{ cDetail.cPrice }}</strong>
                </p> -->
              </div>
            </q-step>
            <q-step :name="5" title="Done" icon="settings" :done="step > 5">
              <div class="tw-flex tw-flex-col tw-gap-3">
                <q-icon name="tick"></q-icon>
                Successfully Enrolled
              </div>
            </q-step>

            <template v-slot:navigation>
              <q-stepper-navigation>
                <div class="flex">
                  <div class="">
                    <q-btn
                      @click="
                        () => {
                          if (step > 0) return handleEnroll();
                          return $refs.stepper.next();
                        }
                      "
                      color="primary"
                      :label="
                        step === 2
                          ? 'Pay Now'
                          : step === 1
                          ? 'Enroll'
                          : 'Continue'
                      "
                    >
                      <q-spinner-ios v-if="loading" color="white" size="1em"
                    /></q-btn>
                    <q-btn
                      v-if="step == 4"
                      flat
                      color="primary"
                      @click="handleSkipPayment"
                      label="skip payment"
                      class="q-ml-sm"
                    />
                    <q-btn
                      v-if="step > 1"
                      flat
                      color="primary"
                      @click="$refs.stepper.previous()"
                      label="Back"
                      class="q-ml-sm"
                    />
                  </div>
                  <div class="">
                    <q-btn
                      flat
                      color="primary"
                      to="/"
                      label="Cancel"
                      class="q-ml-sm"
                    />
                  </div>
                </div>
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </form>
      </div>
    </q-page>
  </q-layout>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    // let sDetail = ref({
    //   sId: "",
    //   sName: "",
    //   sClass: "",
    //   sMobile: "",
    // });
    // let cDetail = ref({
    //   cId: "",
    //   cName: "",
    //   cPrice: "",
    // });
    // let student = computed(() => store.getters["students/getStudent"]);
    // let course = computed(() => store.getters["courses/getCourse"]);
    // const handleStudentSearch = async () => {
    //   let res = await store.dispatch(
    //     "students/fetchStudent",
    //     sDetail.value.sId
    //   );

    //   sDetail.value.sName = student.value.sName;
    //   sDetail.value.sMobile = student.value.sMobile;
    //   sDetail.value.sClass = student.value.sClass;
    // };
    // const handleCourseSearch = async () => {
    //   await store.dispatch("courses/fetchCourse", cDetail.value.cId);
    //   cDetail.value.cName = course.value.cName;
    //   cDetail.value.cPrice = course.value.cPrice;
    // };

    // const handleCancel = () => {
    //   cDetail.value = {
    //     cId: "",
    //     cName: "",
    //     cPrice: "",
    //   };
    //   sDetail.value = {
    //     sId: "",
    //     sName: "",
    //     sClass: "",
    //     sMobile: "",
    //   };
    //   step.value = 1;
    // };
    // const handleEnroll = async () => {
    //   let payload = {
    //     cId: course.value.cId,
    //     cGroup: 1,
    //     status: 1,
    //   };
    //   await store.dispatch("enroll/newEnroll", payload);

    // };
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let loading = computed(() => store.getters["enroll/getLoading"]);
    let course = computed(() => store.getters["course/getCourse"]);
    let cloudinary = computed(() => store.getters["auth/getCloudinaryURL"]);
    let step = ref(1);
    const fetchData = async () => {
      await store.dispatch("course/startLoading");
      await store.dispatch("course/fetchCourse", route.params.cId);
      await store.dispatch("course/stopLoading");
    };
    onMounted(async () => {
      await fetchData();
    });

    const handleEnroll = async () => {
      await store.dispatch("enroll/startLoading");
      await store.dispatch("enroll/addEnroll", {
        course_id: route.params.cId,
        cGroup: 1,
      });
      await store.dispatch("enroll/stopLoading");
      router.push(`/course/${route.params.cId}`);
    };
    return {
      step,
      course,
      loading,
      cloudinary,

      handleEnroll,
    };
  },
};
</script>
