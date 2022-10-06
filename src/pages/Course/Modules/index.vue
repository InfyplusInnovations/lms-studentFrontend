<template>
  <q-page>
    <router-view />

    <div class="" v-if="modules && course && pageLoad == true">
      <div class="h-1/3 p-5">
        <div class="p-3">
          <div class="font-medium text-xl py-5">
            Modules in {{ course.cName }}
          </div>
          <div class="flex gap-3 text-white">
            <div
              v-for="(module, index) in modules"
              :key="index"
              class="max-w-md w-full"
            >
              <Module :module="module" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-5" v-else>Loading...</div>
  </q-page>
</template>
<script>
import { computed, onBeforeUpdate, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Module from "../../../components/Module.vue";

export default {
  components: { Module },
  setup() {
    const store = useStore();

    const route = useRoute();
    let pageLoad = ref(false);
    let course = computed(() => store.getters["course/getCourse"]);
    let modules = computed(() => store.getters["module/getModules"]);
    let lastActiveLesson = computed(
      () => store.getters["streamStatus/getLatestStreamByCourse"]
    );
    const fetchData = async () => {
      await store.dispatch("course/fetchCourse", route.params.cId);
      await store.dispatch("module/fetchModules", { cId: route.params.cId });
      await store.dispatch("streamStatus/fetchLatestStreamByCourse", {
        cId: route.params.cId,
      });
    };
    onBeforeUpdate(async () => {
      await fetchData();
    });
    onMounted(async () => {
      await fetchData();
      pageLoad.value = true;
    });

    // let activeOrder = computed(() => {
    //   if (lastActiveLesson.value !== undefined) {
    //     let order = modules.value[0].order;
    //     modules.value.forEach((module, index) => {
    //       // if streamstatus completed &&
    //       if (module.mId == lastActiveLesson.value.mId) {
    //         if (
    //           lastActiveLesson.value.completed &&
    //           index < modules.value.length
    //         ) {
    //           order = modules.value[index + 1].order;
    //         }
    //         order = module.order;
    //       }
    //     });
    //     return order;
    //   }
    //   return modules.value[0].order;
    // });
    return {
      course,
      modules,

      pageLoad,
    };
  },
};
</script>
