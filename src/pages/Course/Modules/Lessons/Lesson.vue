<template>
  <q-page>
    <router-view :key="$route.fullPath" />
    <div class="p-3">
      <div class="" v-if="pageLoad">
        <div class="">
          <div class="" v-if="lesson.videoId == undefined">
            <h4>Purchase the full course to view this lesson</h4>
            <q-btn
              :to="`/course/${$route.params.cId}`"
              class="bg-accent text-white"
              rounded
              flat
              >Enroll</q-btn
            >
          </div>

          <div
            class="py-5 flex justify-center items-start flex-wrap"
            v-else-if="lessonStatus === true"
          >
            <div class="w-full bg-gray-300 flex justify-center items-center">
              <div class="md:max-w-3xl w-full">
                <VideoComp
                  v-if="lesson.videoId"
                  :videoLink="lesson.videoId"
                  :poster="`${cloudinary}${lesson.lThumbnail}`"
                  :seekTime="lessonStream"
                  @ended="handleVideoEnd"
                  @videoPause="handlePause"
                />
              </div>
            </div>
            <div class="p-5 flex justify-between items-start w-full">
              <div class="">
                <div class="text-2xl">
                  {{ lesson.lName }}
                </div>
                <div class="subtext">{{ lesson.lDescription }}</div>
              </div>
              <q-btn
                unelevated
                rounded
                color="accent"
                @click="handleNext"
                :disable="nextActive !== true"
                :label="nextBtn.name"
                class="capitalize"
              >
              </q-btn>
            </div>
          </div>
          <div class="p-5" v-else>
            <h4>You Havent Unlocked this Lesson Yet!{{ lessonStatus }}</h4>
            <q-btn to="/" class="bg-accent text-white" rounded flat>home</q-btn>
          </div>
        </div>
        <div class="p-3">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="accent"
            indicator-color="accent"
            align="left"
            narrow-indicator
          >
            <q-tab name="Details" icon="info" label="Details" />

            <q-tab name="Comments" icon="comment" label="Comments" />
            <q-tab name="Notes" icon="note" label="Notes" />
          </q-tabs>
          <q-separator horizontal />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="Details">
              <div class="text-h6">{{ lesson.lName }}</div>
              {{ lesson.lDescription }}
            </q-tab-panel>

            <q-tab-panel name="Comments">
              <div class="text-h6">All Comments</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
            <q-tab-panel name="Notes">
              <div class="text-h6">Notes</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
      <div class="" v-else>Loading</div>
    </div>
  </q-page>
</template>
<script>
import {
  computed,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  ref,
  watch,
} from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import VideoComp from "src/components/VideoComp.vue";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let nextActive = ref(false);
    let course = computed(() => store.getters["course/getCourse"]);
    let module = computed(() => store.getters["module/getModule"]);
    let modules = computed(() => store.getters["module/getModules"]);
    let lessons = computed(() => store.getters["lesson/getLessons"]);
    let exams = computed(() => store.getters["exam/getExams"]);
    let lesson = computed(() => store.getters["lesson/getLesson"]);
    let lastActiveLesson = computed(
      () => store.getters["streamStatus/getLatestStreamByCourse"]
    );
    let lastActiveLessonData = computed(
      () => store.getters["lesson/getTempLesson"]
    );
    let lessonStream = computed(
      () => store.getters["streamStatus/getLessonStream"]
    );
    let pageLoad = ref(false);
    let cloudinary = computed(() => store.getters["auth/getCloudinaryURL"]);
    const fetchData = async () => {
      await store.dispatch("course/fetchCourse", route.params.cId);
      await store.dispatch("module/fetchModule", {
        cId: route.params.cId,
        mId: route.params.mId,
      });
      await store.dispatch("streamStatus/fetchLatestStreamByCourse", {
        cId: route.params.cId,
      });
      await store.dispatch("lesson/fetchLesson", {
        cId: route.params.cId,
        mId: route.params.mId,
        lId: route.params.lId,
      });
      await store.dispatch("streamStatus/fetchSteamByLesson", {
        lId: route.params.lId,
      });
      await store.dispatch("exam/fetchExams", route.params.mId);
      await store.dispatch("module/fetchModules", {
        cId: route.params.cId,
      });

      if (lastActiveLesson.value.lId !== undefined) {
        await store.dispatch("lesson/fetchTempLesson", {
          cId: route.params.cId,
          mId: route.params.mId,
          lId: lastActiveLesson.value.lId,
        });
      }
      await store.dispatch("lesson/fetchLessons", {
        cId: route.params.cId,
        mId: route.params.mId,
      });

      if (lessonStream.value !== null) {
        if (lessonStream.value.completed == true) {
          nextActive.value = true;
        }
      }
    };
    onBeforeUpdate(async () => {
      await fetchData();
    });
    onMounted(async () => {
      await fetchData();
      pageLoad.value = true;
    });

    let nextBtn = computed(() => {
      let btnValue = {
        name: "Finish Course",
        to: `course/${route.params.cId}/finish`,
      };
      if (lessons.value.length > 0) {
        if (lessons.value[lessons.value.length - 1].lId != lesson.value.lId) {
          lessons.value.forEach((lsn, index) => {
            if (lsn.lId == lesson.value.lId) {
              btnValue.name = "Next Lesson";
              btnValue.to = `/course/${route.params.cId}/modules/${
                route.params.mId
              }/lessons/${lessons.value[index + 1].lId}`;
            }
          });
        } else {
          if (modules.value.length > 0) {
            if (
              modules.value[modules.value.length - 1].mId !== route.params.mId
            ) {
              modules.value.forEach((mdl, index) => {
                if (mdl.mId == route.params.mId) {
                  btnValue.name = "Next Module";
                  btnValue.to = `/course/${route.params.cId}/modules/${
                    modules.value[index + 1].mId
                  }`;
                }
              });
            }
          }
        }
      }
      if (exams.value.length > 0) {
        exams.value.forEach((exm) => {
          if (exm.order == lesson.value.order) {
            btnValue.name = "Next Exam";
            btnValue.to = `/course/${route.params.cId}/modules/${route.params.mId}/lessons/${route.params.lId}/exam/${exm.exId}`;
          }
        });
      }
      return btnValue;
    });
    const addStream = async () => {
      if (lessonStream.value == null) {
        await store.dispatch("streamStatus/addStream", {
          lId: route.params.lId,
          cId: route.params.cId,
          mId: route.params.mId,
          time: 0,
        });
      }
    };
    let lessonStatus = computed(() => {
      let status = false;
      if (lastActiveLesson.value) {
        // we get the last latest completed lesson status belonging to current course fetchTempLesson
        if (lastActiveLessonData.value.mId == lesson.value.mId) {
          if (lesson.value.order > lastActiveLessonData.value.order) {
            lessons.value.forEach((lsn, index) => {
              if (lsn.lId == lastActiveLessonData.value.lId) {
                if (lessons.value[index + 1].lId == lesson.value.lId) {
                  status = true;
                }
              }
            });
          } else {
            status = true;
          }
        } else {
          status = true;
        }
      }
      return status;
    });

    let handlePause = async (time) => {
      await store.dispatch("streamStatus/updateStream", {
        lId: route.params.lId,
        cId: route.params.cId,
        mId: route.params.mId,
        time: time,
      });
    };
    const handleVideoEnd = async () => {
      nextActive.value = true;
    };
    const handleNext = async () => {
      if (
        nextBtn.value.name == "Next Lesson" ||
        nextBtn.value.name == "Next Module" ||
        nextBtn.value == "Finish Course"
      ) {
        await store.dispatch("streamStatus/updateStream", {
          lId: route.params.lId,
          cId: route.params.cId,
          mId: route.params.mId,
          completed: true,
          time: lesson.value.lDuration,
        });
      }
      router.push(nextBtn.value.to);
    };
    if (lessonStatus.value == true && lessonStream.value == null) {
      addStream();
    }
    return {
      lessonStatus,
      lesson,
      tab: ref("Details"),
      handleVideoEnd,
      nextBtn,
      handlePause,
      pageLoad,
      cloudinary,
      handleNext,
      nextActive,
      lessonStream,
    };
  },
  components: { VideoComp },
};
</script>
