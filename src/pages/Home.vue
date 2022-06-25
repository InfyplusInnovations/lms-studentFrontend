<template>
  <q-page class="tw-flex tw-flex-col tw-p-5"
    ><router-view />
    <div class="">
      <div class="tw-flex">
        <div class="" v-if="stream !== null">
          <CourseCard
            v-if="courseDetails !== null"
            :course="courseDetails"
            :enroll="null"
            :stream="stream"
          />
        </div>
        <div class="tw-flex tw-justify-center tw-items-center" v-else>
          No Streaming History
        </div>
      </div>
      <q-separator color="gray" spaced />
      <div class="">
        <div class="tw-font-medium tw-text-xl">Enrolled Courses</div>
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
          <div class="">
            <q-btn to="/course" unelevated class="tw-bg-none tw-text-blue-700"
              >Explore Courses</q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, onBeforeUpdate, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import CourseCard from "src/components/CourseCard.vue";
export default {
  setup() {
    let store = useStore();
    let stream = computed(() => store.getters["streamStatus/getLatestStream"]);
    let courseDetails = computed(() => store.getters["course/getCourse"]);
    let enrolled = computed(() => store.getters["enroll/getEnrolls"]);
    let enrolledCourses = computed(
      () => store.getters["enroll/getEnrolledCourses"]
    );
    const fetchData = async () => {
      await store.dispatch("streamStatus/fetchLatestStream");
      if (stream.value && stream.value.cId !== "") {
        await store.dispatch("course/fetchCourse", stream.value.cId);
      }
      await store.dispatch("enroll/fetchEnrolls");
    };
    onBeforeUpdate(async () => {
      await fetchData();
    });
    onMounted(async () => {
      await fetchData();
    });
    return {
      courseDetails,
      enrolled,
      enrolledCourses,
      stream,
    };
  },
  components: { CourseCard },
};
</script>
