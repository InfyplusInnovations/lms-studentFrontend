<template>
  <q-page>
    <router-view />

    <div class="" v-if="syllabus.course !== undefined">
      <div
        class=""
        :class="` bg-gradient-to-b text-white ${
          $route.params.cId % 4 == 0
            ? 'from-blue-400 to-blue-700'
            : $route.params.cId % 3 == 0
            ? 'from-red-300 to-red-600'
            : $route.params.cId % 2 == 0
            ? 'from-green-500 to-green-700'
            : $route.params.cId % 1 == 0
            ? 'from-blue-500 to-blue-700'
            : ''
        } hover:shadow-2xl font-fredoka  w-full h-64 flex flex-col justify-center items-center`"
      >
        <div class="text-2xl">{{ syllabus.course.cName }} Syllabus</div>
        <div class="my-2">
          <q-btn color="accent" :to="`/course/${syllabus.course.cId}/enroll`">
            Enroll
          </q-btn>
        </div>
      </div>
      <div class="p-3">
        <q-list
          class="rounded-borders bg-gradient-to-b text-white from-blue-400 to-blue-700 max-w-md"
          v-for="(module, index) in syllabus.modules"
          :key="index"
        >
          <q-expansion-item
            expand-separator
            icon="book"
            color="white"
            :label="module.mName"
            expand-icon-class="text-white"
            class="mt-2"
          >
            <div
              class="flex"
              v-for="(lesson, index) in syllabus.lessons"
              :key="index"
            >
              <q-card
                flat
                class="w-full m-2 ml-2 text-black"
                v-if="module.mId == lesson.mId"
              >
                <q-card-section>{{ lesson.lName }} </q-card-section>
              </q-card>
            </div>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
    <div class="flex justify-center items-center p-5" v-else>
      <div class="">Loading...</div>
    </div>
  </q-page>
</template>
<script>
import { computed, onBeforeUpdate, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const route = useRoute();

    const store = useStore();

    const syllabus = computed(() => store.getters["syllabus/getSyllabus"]);
    const fetchData = async () => {
      await store.dispatch("syllabus/fetchSyllabus", { cId: route.params.cId });
    };

    onMounted(async () => {
      await fetchData();
    });
    return {
      syllabus,
    };
  },
};
</script>
