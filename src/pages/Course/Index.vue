<template>
  <q-page>
    <router-view />
    <div class="">
      <div class="p-3">
        <div class="font-medium text-xl font-fredoka">Enrolled Course</div>
        <div class="" v-if="enrolled.length > 0">
          <div class="py-5 flex gap-4 flex-wrap">
            <div
              class=""
              v-for="(cEnrolled, index) in enrolledCourses"
              :key="index"
            >
              <div class="" v-for="(enroll, eIndex) in enrolled" :key="eIndex">
                <CourseCard
                  v-if="enroll.cId == cEnrolled.cId"
                  :course="cEnrolled"
                  :enroll="enroll"
                  :stream="stream"
                  :index="index"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center" v-else>
          No Course Enrolled
        </div>
      </div>
      <q-separator color="gray" spaced />
      <div class="p-3">
        <div class="font-medium text-xl py-5">Explore More Courses</div>
        <div class="flex gap-4 flex-wrap">
          <div
            class="py-5 flex flex-wrap"
            v-for="(course, index) in allCourses"
            :key="index"
          >
            <CourseCard
              :index="index"
              :course="course"
              :enroll="null"
              :stream="null"
            />
          </div>
        </div>

        <!-- <div class="" v-else>No Course Enrolled</div> -->
      </div>
    </div>
  </q-page>
</template>
<script>
import { computed, onMounted, ref } from "vue";
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
