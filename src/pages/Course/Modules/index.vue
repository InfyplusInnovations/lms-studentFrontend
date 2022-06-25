<template>
  <q-page>
    <router-view />

    <div class="">
      <div class="tw-h-1/3 tw-p-5">
        <div class="tw-p-3">
          <div class="tw-font-medium tw-text-xl tw-py-5">
            Modules in {{ course.cName }}
          </div>
          <div class="flex tw-gap-3 tw-text-white">
            <div
              v-for="(module, index) in modules"
              :key="index"
              class="tw-max-w-md tw-w-full"
            >
              <Module :module="module" :active-order="activeOrder" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Module from "../../../components/Module.vue";

export default {
  components: { Module },
  setup() {
    const store = useStore();

    const route = useRoute();

    let course = computed(() => store.getters["course/getCourse"]);
    let modules = computed(() => store.getters["module/getModules"]);
    let lastActiveLesson = computed(
      () => store.getters["streamStatus/getLatestStreamByCourse"]
    );

    onMounted(async () => {
      await store.dispatch("course/fetchCourse", route.params.cId);
      await store.dispatch("module/fetchModules", { cId: route.params.cId });
      await store.dispatch("streamStatus/fetchLatestStreamByCourse", {
        cId: route.params.cId,
      });
    });

    let activeOrder = computed(() => {
      if (lastActiveLesson.value !== undefined) {
        let order = 0;
        modules.value.forEach((module) => {
          // if streamstatus completed &&
          if (module.mId == lastActiveLesson.value.mId) {
            order = module.order;
          }
        });
        return order;
      }
      return 0;
    });
    return {
      course,
      modules,
      activeOrder,
    };
  },
};
</script>
