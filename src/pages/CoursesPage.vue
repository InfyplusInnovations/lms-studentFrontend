<template>
  <q-page>
    <router-view />
    <div class="">
      <div class="p-3">
        <div class="font-medium text-xl font-fredoka">Enrolled Course</div>
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
        </div>
      </div>
      <q-separator color="gray" spaced />
      <div class="p-3">
        <div class="font-medium text-xl py-5 font-fredoka">
          Explore More Courses
        </div>
        <div class="flex gap-4 flex-wrap">
          <div
            class="py-5 flex flex-wrap"
            v-for="(category, index) in categories"
            :key="index"
          >
            <CourseCategories :index="index" :category="category" />
          </div>
        </div>

        <!-- <div class="" v-else>No Course Enrolled</div> -->
      </div>
    </div>
  </q-page>
</template>
<script>
import { computed, onBeforeUpdate, onMounted } from "vue";
import { useStore } from "vuex";
import CourseCard from "src/components/CourseCard.vue";
import CourseCategories from "src/components/CourseCategories.vue";
export default {
  components: { CourseCard, CourseCategories },
  setup() {
    const store = useStore();
    const categories = computed(() => store.getters["category/getCategories"]);
    const fetchCategories = async () => {
      await store.dispatch("category/fetchCategories");
      await store.dispatch("enroll/fetchEnrolls");
      await store.dispatch("streamStatus/fetchLatestStream");
      await store.dispatch("course/fetchCourses");
    };
    onBeforeUpdate(async () => {
      await fetchCategories();
    });
    onMounted(async () => {
      await fetchCategories();
      console.log(categories.value);
    });
    let stream = computed(() => store.getters["streamStatus/getLatestStream"]);
    let enrolled = computed(() => store.getters["enroll/getEnrolls"]);
    let enrolledCourses = computed(
      () => store.getters["enroll/getEnrolledCourses"]
    );
    let allCourses = computed(() => store.getters["course/getCourses"]);

    return {
      stream,
      enrolled,
      enrolledCourses,
      allCourses,
      categories,
    };
  },
};
</script>
