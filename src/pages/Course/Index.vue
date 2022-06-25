<template>
  <q-page>
    <router-view />
    <div class="">
      <div class="tw-p-3">
        <div class="tw-font-medium tw-text-xl">Enrolled Course</div>
        <div class="" v-if="enrolled.length > 0">
          <div
            class="tw-py-5 tw-flex tw-flex-wrap"
            v-for="(cEnrolled, index) in enrolledCourses"
            :key="index"
          >
            <CourseCard
              :course="cEnrolled"
              :enroll="enrolled"
              :stream="stream"
            />
          </div>
        </div>
        <div class="tw-flex tw-justify-center tw-items-center" v-else>
          No Course Enrolled
        </div>
      </div>
      <q-separator color="gray" spaced />
      <div class="tw-p-3">
        <div class="tw-font-medium tw-text-xl tw-py-5">
          Explore More Courses
        </div>
        <div class="tw-flex tw-gap-4 tw-flex-wrap">
          <div
            class="tw-py-5 tw-flex tw-flex-wrap"
            v-for="(course, index) in allCourses"
            :key="index"
          >
            <CourseCard :course="course" :enroll="null" :stream="null" />
          </div>
        </div>

        <!-- <div class="" v-else>No Course Enrolled</div> -->
      </div>
    </div>
  </q-page>
</template>
<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import CourseCard from "src/components/CourseCard.vue";
export default {
  components: { CourseCard },
  setup() {
    const store = useStore();
    // let currentCourse = computed(() =>
    //   store.getters["course/getStreamLatestStreamStatus"](1)
    // );

    // let currentCourseDetails = computed(() => {
    //   if (currentCourse.value !== "") {
    //     return store.getters["course/getCourseById"](currentCourse.value.cId);
    //   } else {
    //     return {};
    //   }
    // });
    // let enrolled = computed(() => {
    //   return store.getters["enroll/getEnrolled"](1);
    // });
    // store.dispatch("course/fetchCourses");
    let stream = computed(() => store.getters["streamStatus/getLatestStream"]);
    let enrolled = computed(() => store.getters["enroll/getEnrolls"]);
    let enrolledCourses = computed(
      () => store.getters["enroll/getEnrolledCourses"]
    );
    let allCourses = computed(() => store.getters["course/getCourses"]);
    onMounted(async () => {
      await store.dispatch("enroll/fetchEnrolls");
      await store.dispatch("streamStatus/fetchLatestStream");
      await store.dispatch("course/fetchCourses");
    });

    return {
      enrolled,
      stream,
      enrolledCourses,
      allCourses,
    };
  },
};
</script>
