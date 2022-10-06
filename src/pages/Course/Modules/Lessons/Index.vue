<template>
  <q-page>
    <router-view />

    <div class="">
      <div class="h-1/3 p-5">
        <div class="p-3">
          <div class="font-medium text-xl py-5">
            Lessons in {{ module.mName }}
          </div>
          <div class="flex gap-3 flex-wrap">
            <div
              class="max-w-md w-full"
              v-for="(lesson, index) in lessons"
              :key="index"
            >
              <Lesson
                :lesson="lesson"
                :cId="$route.params.cId"
                :mId="$route.params.mId"
              />
            </div>
          </div>
          <!-- <Lesson
            v-for="(lesson, index) in lessons"
            :key="index"
            :activeOrder="activeOrder"
            :lesson="lesson"
            :cId="module.cId"
            :mId="module.mId"
          /> -->
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Lesson from "src/components/Lesson.vue";

export default {
  components: { Lesson },
  setup() {
    const store = useStore();

    const route = useRoute();

    let module = computed(() => store.getters["module/getModule"]);
    let lessons = computed(() => store.getters["lesson/getLessons"]);

    let lastActiveLesson = computed(
      () => store.getters["streamStatus/getLatestStreamByCompleted"]
    );

    onMounted(async () => {
      await store.dispatch("course/fetchCourse", route.params.mId);
      await store.dispatch("module/fetchModule", {
        cId: route.params.cId,
        mId: route.params.mId,
      });
      await store.dispatch("lesson/fetchLessons", {
        cId: route.params.cId,
        mId: route.params.mId,
      });
      await store.dispatch("streamStatus/fetchLatestStreamByComplete", {
        cId: route.params.cId,
      });
    });

    // let activeOrder = computed(() => {
    //   let order = 0;
    //   if (lastActiveLesson.value !== undefined) {
    //     lessons.value.forEach((lesson, index) => {
    //       // if streamstatus completed &&
    //       if (lesson.lId == lastActiveLesson.value.lId) {
    //         let lindex = index + 1;

    //         if (lindex < lessons.value.length) {
    //           order = lessons.value[index + 1].order;
    //         } else {
    //           order = lesson.order;
    //         }
    //       }
    //     });
    //   }
    //   return order;
    // });

    return {
      module,
      lessons,
    };
  },
  components: { Lesson },
};
</script>
