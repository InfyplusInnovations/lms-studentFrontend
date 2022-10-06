<template>
  <q-card
    :class="`w-64 rounded-xl shadow-xl bg-gradient-to-b ${
      index == 0
        ? 'from-blue-400 to-blue-700'
        : index == 1
        ? 'from-red-300 to-red-600'
        : index == 2
        ? 'from-green-500 to-green-700'
        : index == 3
        ? 'from-blue-500 to-blue-700'
        : ''
    } hover:shadow-2xl font-fredoka relative`"
  >
    <div
      class="absolute top-0 right-0 px-3 p-2 z-10 bg-gray-700 text-white rounded-xl shadow-inner"
      v-if="enroll && expiry !== null"
    >
      expires in {{ expiry }}
    </div>
    <q-card-section class="h-48 overflow-hidden relative">
      <q-img
        :src="`${cloudinary}${course.cThumbnail}`"
        class="rounded-xl h-full"
      />
      <div
        class="w-54 absolute bottom-0 left-5"
        v-if="course.progress && course.progress > 0"
      >
        <q-linear-progress :value="course.progress / 100" color="white" />
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis text-white">
          {{ course.cName }}
        </div>
        <!-- <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                >
                  L{{ currentCourse.mId }} / M{{ currentCourse.lsId }}
                </div> -->
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1 text-white">
        <q-icon name="paid" class="text-white text-xl" />
        {{
          (enroll && enroll.status == "Paid") ||
          (enroll && enroll.status == "Free")
            ? "Enrolled"
            : course && course.cPrice == 0
            ? "Free"
            : course.cPrice
        }}
      </div>
      <div class="text-caption text-white text-lg" v-if="$route.path !== '/'">
        {{
          String(course.cDescription)
            .replace(/<[^>]*>?/gm, "")
            .slice(0, 100)
        }}
      </div>
    </q-card-section>

    <q-card-actions
      align="right"
      v-if="stream && stream.cId == course.cId"
      class=""
    >
      <q-btn
        flat
        :class="`bg-gradient-to-b from-gray-200 to-gray-50 rounded-xl shadow-xl w-full ${
          index == 0 ? 'text-blue-500' : index == 1 ? 'text-red-500' : ''
        }`"
        :to="`/course/${stream.cId}/modules/${stream.mId}/lessons/${stream.lId}`"
      >
        Continue
        <q-icon name="arrow_right_alt" size="20" class="" />
      </q-btn>
    </q-card-actions>
    <q-card-actions
      align="right"
      v-else-if="enroll && enroll.status == 'Not Paid'"
    >
      <q-btn
        flat
        color="blue"
        :to="`/course/${course.cId}/enroll`"
        class="bg-gradient-to-b from-gray-200 to-gray-50 text-gray-900 rounded-xl shadow-xl w-full"
      >
        complete enroll
        <q-icon name="arrow_right_alt" size="20" class="" />
      </q-btn>
    </q-card-actions>
    <q-card-actions
      align="right"
      v-else-if="enroll && enroll.status !== 'Not Paid'"
    >
      <q-btn
        flat
        color="blue"
        :to="`/course/${course.cId}`"
        class="bg-gradient-to-b from-gray-200 to-gray-50 text-gray-900 rounded-xl shadow-xl w-full"
      >
        start course
        <q-icon name="arrow_right_alt" size="20" class="" />
      </q-btn>
    </q-card-actions>
    <q-card-actions align="right" v-else>
      <q-btn
        flat
        color="blue"
        :to="`/course/${course.cId}`"
        class="bg-gradient-to-b from-gray-200 to-gray-50 text-gray-900 rounded-xl shadow-xl w-full"
      >
        view
        <q-icon name="arrow_right_alt" size="20" class="" />
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
import { computed, onBeforeMount, onMounted, ref, toRef } from "vue";
import { useStore } from "vuex";
import jwtInterceptor from "src/helpers/jwtInterceptor";
export default {
  props: ["course", "enroll", "stream", "index"],
  setup(props) {
    let course = toRef(props, "course");
    const store = useStore();
    let cloudinary = computed(() => store.getters["auth/getCloudinaryURL"]);
    let expiry = ref("");

    const fetchData = async () => {
      expiry.value = await jwtInterceptor
        .get(`/api/course/${course.value.cId}`)
        .then((res) => {
          return res.data.data.expires;
        })
        .catch((err) => {
          return null;
        });
    };
    onBeforeMount(async () => {
      await fetchData();
    });
    onMounted(async () => {
      await fetchData();
    });
    return {
      cloudinary,
      expiry,
    };
  },
};
</script>
