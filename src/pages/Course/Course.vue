<template>
  <q-page>
    <router-view />

    <div class="" v-if="course !== null">
      <div class="tw-h-2/3 md:tw-p-5 tw-overflow-y-auto">
        <div class="tw-p-5">
          <div class="tw-font-medium tw-text-xl tw-py-5">
            {{ course.cName }}
          </div>
        </div>
        <div class="tw-flex tw-flex-wrap tw-justify-center tw-items-center">
          <div class="md:tw-w-1/2 tw-w-full">
            <div class="tw-min-w-md tw-min-h-full tw-bg-gray-800">
              <VideoComp
                v-if="course.cPreview"
                :videoLink="course.cPreview"
                :poster="`${cloudinary}${course.cThumbnail}`"
              />
            </div>
          </div>
          <div class="md:tw-w-1/2 tw-w-full">
            <div class="tw-w-full tw-p-5">
              <q-card class="tw-w-full tw-max-w-lg">
                <q-card-section>
                  <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                      {{ course.cName }}
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-subtitle1">Price: {{ course.cPrice }}</div>
                </q-card-section>
                <q-card-section
                  class="text-caption text-grey"
                  v-html="course.cDescription"
                >
                </q-card-section>
                <q-separator />

                <q-card-actions>
                  <q-btn
                    color="primary"
                    :to="`/course/${course.cId}/enroll`"
                    v-if="enrollStatus != true"
                  >
                    Enroll
                  </q-btn>
                  <q-btn
                    flat
                    color="primary"
                    :to="`/course/${course.cId}/modules`"
                  >
                    View Modules <q-icon name="arrow_right_alt"></q-icon>
                  </q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <q-separator />
      <div class="tw-h-1/3 tw-p-5">
        <div class="tw-p-3">
          <div class="tw-font-medium tw-text-xl tw-py-5">
            Modules in {{ course.cName }}
          </div>
          <div class="flex tw-gap-3">
            <div
              class="tw-max-w-md tw-w-full"
              v-for="(module, index) in modules"
              :key="index"
            >
              <Module :activeOrder="activeOrder" :module="module" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-p-3" v-else>loading</div>
  </q-page>
</template>
<script>
import { computed, onBeforeUpdate, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import Module from "../../components/Module.vue";
import VideoComp from "src/components/VideoComp.vue";
export default {
  components: { Module, VideoComp },
  setup() {
    const store = useStore();

    const route = useRoute();

    let course = computed(() => store.getters["course/getCourse"]);
    let modules = computed(() => store.getters["module/getModules"]);
    let enrollStatus = computed(() =>
      store.getters["enroll/getEnrolledStatus"](route.params.cId)
    );
    let lastActiveLesson = computed(
      () => store.getters["streamStatus/getLatestStreamByCourse"]
    );
    let cloudinary = computed(() => store.getters["auth/getCloudinaryURL"]);
    const fetchData = async () => {
      await store.dispatch("course/fetchCourse", route.params.cId);
      await store.dispatch("enroll/fetchEnrolls");
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
      enrollStatus,
      modules,
      activeOrder,
      cloudinary,
    };
  },
};
</script>
<style>
.player {
  --plyr-color-main: #1ac266;
}
</style>
