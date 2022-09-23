<template>
  <q-page class="flex flex-col p-5"
    ><router-view />
    <div class="font-fredoka">
      <div class="font-medium text-xl">Continue</div>
      <div class="flex py-3">
        <div class="" v-if="stream !== null">
          <CourseCard
            v-if="courseDetails !== null"
            :course="courseDetails"
            :enroll="null"
            :stream="stream"
            :index="0"
          />
        </div>
        <div class="flex justify-center items-center" v-else>
          No Streaming History
        </div>
      </div>
      <q-separator color="gray" spaced />
      <div class="">
        <div class="font-medium text-xl">Enrolled Courses</div>
        <div class="" v-if="enrolled.length > 0">
          <div class="py-5 flex gap-3 flex-wrap">
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
          <div class="">
            <q-btn to="/courses" unelevated class="bg-none text-blue-700"
              >Explore Courses</q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, onBeforeUpdate, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
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
