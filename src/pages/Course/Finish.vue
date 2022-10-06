<template>
  <q-page>
    <router-view />
    <div
      class="flex flex-col gap-3 p-3 justify-center items-center"
      v-if="course"
    >
      <div class="bg-green-400 p-3 rounded-full">
        <q-icon name="check" class="" size="100px" color="white" />
      </div>
      <div class="">
        <div class="text-lg">
          You have successfully completed
          <span class="font-bold">{{ course.cName }}</span
          >!
        </div>
        <div class="text-center">
          <q-btn to="/courses" unelevated class="bg-none text-blue-700"
            >Explore Other Courses</q-btn
          >
        </div>
      </div>
    </div>
    <div class="" v-else>Loading...</div>
  </q-page>
</template>
<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    let course = computed(() => store.getters["course/getCourse"]);
    const fetchData = async () => {
      await store.dispatch("course/fetchCourse", route.params.cId);
    };
    onMounted(async () => {
      await fetchData();
    });
    return {
      course,
    };
  },
};
</script>
