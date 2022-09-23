<template>
  <q-page>
    <router-view />
    <div class="">
      <div class="p-3">
        <div class="font-medium text-xl py-5 font-fredoka">
          {{ category.catName }} Courses
        </div>
        <div class="flex gap-4 flex-wrap">
          <div
            class="py-5"
            v-for="(course, index) in category.courses"
            :key="index"
          >
            <CourseCard :index="index" :course="course" />
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
import { useRoute } from "vue-router";
export default {
  components: { CourseCard, CourseCategories },
  setup() {
    const store = useStore();
    const route = useRoute();
    const categories = computed(() => store.getters["category/getCategories"]);
    const category = computed(() => store.getters["category/getCategory"]);

    const fetchCategories = async () => {
      await store.dispatch("category/fetchCategories");
      await store.dispatch("category/fetchCategory", {
        catId: route.params.catId,
      });
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

    return {
      stream,
      enrolled,
      enrolledCourses,
      categories,
      category,
    };
  },
};
</script>
