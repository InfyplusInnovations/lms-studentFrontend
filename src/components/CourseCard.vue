<template>
  <q-card class="tw-w-72">
    <q-img :src="`${cloudinary}${course.cThumbnail}`" />

    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
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
      <div class="text-subtitle1">
        <q-icon name="paid" class="tw-text-yellow-400 tw-text-xl" />
        {{ course.cPrice }}
      </div>
      <div class="text-caption text-grey">
        {{
          String(course.cDescription)
            .replace(/<[^>]*>?/gm, "")
            .slice(0, 100)
        }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right" v-if="stream && stream.cId == course.cId">
      <q-btn
        flat
        color="primary"
        :to="`/course/${stream.cId}/modules/${stream.mId}/lessons/${stream.lId}`"
      >
        continue learning <q-icon name="arrow_right_alt" size="10" />
      </q-btn>
    </q-card-actions>
    <q-card-actions align="right" v-else-if="enroll">
      <q-btn flat color="primary" :to="`/course/${course.cId}`">
        start course <q-icon name="arrow_right_alt" size="10" />
      </q-btn>
    </q-card-actions>
    <q-card-actions align="right" v-else>
      <q-btn flat color="primary" :to="`/course/${course.cId}`">
        view <q-icon name="arrow_right_alt" size="10" />
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  props: ["course", "enroll", "stream"],
  setup() {
    const store = useStore();
    let cloudinary = computed(() => store.getters["auth/getCloudinaryURL"]);
    return {
      cloudinary,
    };
  },
};
</script>
