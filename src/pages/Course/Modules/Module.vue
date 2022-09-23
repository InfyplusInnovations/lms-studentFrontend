<template>
  <q-page>
    <router-view />

    <div class="">
      <div class="h-2/3 p-5 overflow-y-auto">
        <div class="p-5" v-if="course">
          <div class="font-medium text-xl py-5">
            {{ course.cName }}-{{ module.mName }}
          </div>
        </div>
        <div class="flex flex-wrap justify-start items-center">
          <q-card
            :class="`rounded-xl shadow-xl bg-gradient-to-b text-white max-w-2xl ${
              $route.params.cId == 0
                ? 'from-blue-400 to-blue-700'
                : $route.params.cId == 1
                ? 'from-red-300 to-red-600'
                : $route.params.cId == 2
                ? 'from-green-500 to-green-700'
                : $route.params.cId == 3
                ? 'from-blue-500 to-blue-700'
                : ''
            } hover:shadow-2xl font-fredoka max-w-2xl w-full`"
          >
            <q-card-section class="flex flex-col md:flex-row gap-3">
              <div class="max-w-xs w-full overflow-hidden">
                <q-img
                  :src="`${cloudinary}${module.mThumbnail}`"
                  class="rounded-xl w-full"
                />
              </div>
              <div class="flex flex-col justify-between">
                <div class="">
                  <div class="text-xl font-bold">
                    {{ module.mName }}
                  </div>
                  <div class="text-subtitle1">{{ module.mDescription }}</div>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="">
                <q-card-actions align="right">
                  <q-btn
                    rounded
                    class="bg-white text-blue-400"
                    :to="`/course/${module.cId}/modules/${module.mId}/lessons`"
                  >
                    View Lessons <q-icon name="arrow_right_alt"></q-icon>
                  </q-btn>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-separator />
      <div class="h-1/3 p-5 font-fredoka font-bold text-lg">
        <div class="p-3">
          <div class="font-medium text-xl py-5">
            Lessons in {{ module.mName }}
          </div>
          <div class="flex gap-3">
            <div
              class="max-w-md w-full"
              v-for="(lesson, index) in lessons"
              :key="index"
            >
              <Lesson
                :activeOrder="activeOrder"
                :lesson="lesson"
                :cId="$route.params.cId"
                :mId="$route.params.mId"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Lesson from "src/components/Lesson.vue";

export default {
  components: { Lesson },
  setup() {
    const store = useStore();

    const route = useRoute();

    let course = computed(() => store.getters["course/getCourse"]);
    let module = computed(() => store.getters["module/getModule"]);
    let lessons = computed(() => store.getters["lesson/getLessons"]);

    let lastActiveLesson = computed(
      () => store.getters["streamStatus/getLatestStreamByCourse"]
    );
    let cloudinary = computed(() => store.getters["auth/getCloudinaryURL"]);
    onMounted(async () => {
      await store.dispatch("course/fetchCourse", route.params.cId);
      await store.dispatch("module/fetchModule", {
        cId: route.params.cId,
        mId: route.params.mId,
      });
      await store.dispatch("lesson/fetchLessons", {
        cId: route.params.cId,
        mId: route.params.mId,
      });
      await store.dispatch("streamStatus/fetchLatestStreamByCourse", {
        cId: route.params.cId,
      });
    });

    let activeOrder = computed(() => {
      let order = lessons.value[0].order;
      if (lastActiveLesson.value !== undefined) {
        lessons.value.forEach((lesson, index) => {
          // if streamstatus completed &&
          if (lesson.lId == lastActiveLesson.value.lId) {
            let lindex = index + 1;

            if (lindex < lessons.value.length) {
              order = lessons.value[index + 1].order;
            } else {
              order = lesson.order;
            }
          }
        });
      }
      return order;
    });

    return {
      course,
      module,
      lessons,
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
