<template>
  <q-page>
    <router-view />
    <div class="flex p-3 justify-center items-center">
      <div class="">
        <q-icon name="check" class="" size="200px" />
      </div>
      <div class="">
        <div class="text-lg">
          You have successfully completed {{ course.cName }}!
        </div>
      </div>
    </div>
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
