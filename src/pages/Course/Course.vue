<template>
  <q-page>
    <router-view />

    <div class="" v-if="course !== null">
      <div class="h-2/3 md:p-5 overflow-y-auto">
        <div class="p-5">
          <div class="font-medium text-xl py-5">
            {{ course.cName }}
          </div>
        </div>
        <div class="p-3">
          <q-card
            :class="`rounded-xl shadow-xl bg-gradient-to-b text-white ${
              $route.params.cId % 4 == 0
                ? 'from-blue-400 to-blue-700'
                : $route.params.cId % 3 == 0
                ? 'from-red-300 to-red-600'
                : $route.params.cId % 2 == 0
                ? 'from-green-500 to-green-700'
                : $route.params.cId % 1 == 0
                ? 'from-blue-500 to-blue-700'
                : ''
            } hover:shadow-2xl font-fredoka max-w-4xl w-full`"
          >
            <q-card-section class="flex gap-3 flex-wrap md:flex-row flex-col">
              <div class="rounded-xl overflow-hidden">
                <!-- <VideoComp
                  v-if="course.cPreview"
                  :videoLink="course.cPreview"
                  class="max-w-md"
                  :poster="`${cloudinary}${course.cThumbnail}`"
                /> -->
                <ArtplayerVue
                  class="w-78 h-56 rounded-xl"
                  v-if="course.cPreview"
                  :videoLink="course.cPreview"
                  :poster="`${cloudinary}${course.cThumbnail}`"
                />
              </div>
              <div class="">
                <div class="flex flex-col justify-between w-full">
                  <div class="">
                    <div class="text-xl font-bold">
                      {{ course.cName }}
                    </div>
                    <div class="text-subtitle1">{{ course.cDescription }}</div>
                    <div class="text-subtitle1">Price: {{ course.cPrice }}</div>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section class="">
              <q-card-actions align="right" class="flex gap-2 flex-wrap">
                <q-btn
                  color="accent"
                  :to="`/course/${course.cId}/enroll`"
                  v-if="
                    enrollStatus.status != true ||
                    enrollStatus.payment == 'Not Paid' ||
                    enrollStatus.payment == 'Cancelled'
                  "
                >
                  Enroll
                </q-btn>
                <q-btn
                  rounded
                  :to="`/course/${course.cId}/modules`"
                  class="bg-white text-blue-400"
                  v-if="
                    enrollStatus.status == true &&
                    (enrollStatus.payment == 'Paid' ||
                      enrollStatus.payment == 'Free')
                  "
                >
                  View Modules <q-icon name="arrow_right_alt"></q-icon>
                </q-btn>
                <q-btn
                  rounded
                  :to="`/course/${course.cId}/syllabus`"
                  class="bg-white text-blue-400"
                >
                  View Syllabus <q-icon name="arrow_right_alt"></q-icon>
                </q-btn>
              </q-card-actions>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-separator />
      <div class="h-1/3 p-5">
        <div
          class="p-3"
          v-if="
            enrollStatus.status == true &&
            (enrollStatus.payment == 'Paid' || enrollStatus.payment == 'Free')
          "
        >
          <div class="font-medium text-xl py-5">
            Modules in {{ course.cName }}
          </div>
          <div class="flex gap-3">
            <div
              class="max-w-md w-full"
              v-for="(module, index) in modules"
              :key="index"
            >
              <Module :module="module" />
            </div>
          </div>
        </div>

        <div class="flex justify-center items-center" v-else>
          Course Locked
          <div class="">
            <q-btn
              :to="`/course/${course.cId}/enroll`"
              unelevated
              class="bg-none text-blue-700"
              >Enroll to the course</q-btn
            >
          </div>
        </div>
      </div>
    </div>
    <div class="p-3" v-else>loading</div>
  </q-page>
</template>
<script>
import { computed, onBeforeUpdate, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import Module from "../../components/Module.vue";
import VideoComp from "src/components/VideoComp.vue";
import ArtplayerVue from "src/components/Artplayer.vue";
export default {
  components: { Module, VideoComp, ArtplayerVue },
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

    // let activeOrder = computed(() => {
    //   if (lastActiveLesson.value !== undefined) {
    //     let order = modules.value[0].order;
    //     modules.value.forEach((module) => {
    //       // if streamstatus completed &&
    //       if (module.mId == lastActiveLesson.value.mId) {
    //         order = module.order;
    //       }
    //     });
    //     return order;
    //   }
    //   return modules.value[0].order;
    // });
    return {
      course,
      enrollStatus,
      modules,

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
