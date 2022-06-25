<template>
  <q-page>
    <router-view />

    <div class="">
      <div class="tw-h-2/3 tw-p-5 tw-overflow-y-auto">
        <div class="tw-p-5">
          <div class="tw-font-medium tw-text-xl tw-py-5">
            {{ course.cName }}-{{ module.mName }}
          </div>
        </div>
        <div class="tw-flex tw-flex-wrap tw-justify-center tw-items-center">
          <div class="md:tw-w-1/2 tw-w-full">
            <div class="tw-w-full tw-relative tw-p-5">
              <div class="tw-w-full">
                <q-img :src="`${cloudinary}${module.mThumbnail}`" />
              </div>
            </div>
          </div>
          <div class="md:tw-w-1/2 tw-w-full">
            <div class="tw-w-full tw-p-5">
              <q-card class="tw-w-full tw-max-w-lg">
                <q-card-section>
                  <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                      {{ module.mName }}
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-subtitle1">{{ module.mDescription }}</div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                  <q-btn
                    flat
                    color="primary"
                    :to="`/course/${module.cId}/modules/${module.mId}/lessons`"
                  >
                    View Lessons <q-icon name="arrow_right_alt"></q-icon>
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
            Lessons in {{ module.mName }}
          </div>
          <div class="flex tw-gap-3">
            <div
              class="tw-max-w-md tw-w-full"
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
import { computed, onMounted } from "@vue/runtime-core";
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
      let order = 0;
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
