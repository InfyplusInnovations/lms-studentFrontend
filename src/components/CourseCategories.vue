<template>
  <router-link :to="`/courses/${category.catId}`" class="no-underline">
    <q-card
      :class="`w-64 rounded-xl shadow-xl bg-gradient-to-b  ${
        index == 0
          ? 'from-blue-400 to-blue-700'
          : index == 1
          ? 'from-red-300 to-red-600'
          : index == 2
          ? 'from-green-500 to-green-700'
          : index == 3
          ? 'from-blue-500 to-blue-700'
          : ''
      } hover:shadow-2xl font-fredoka`"
    >
      <div class="">
        <q-card-section class="h-48 overflow-hidden">
          <q-img
            :src="`${cloudinary}${category.catThumbnail}`"
            class="rounded-xl h-full"
          />
        </q-card-section>

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis text-white">
              {{ category.catName }}
            </div>
            <!-- <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                >
                  L{{ currentCourse.mId }} / M{{ currentCourse.lsId }}
                </div> -->
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-caption text-white">
            {{
              String(category.catDescription)
                .replace(/<[^>]*>?/gm, "")
                .slice(0, 100)
            }}
          </div>
        </q-card-section>

        <q-card-actions align="right" class="">
          <q-btn
            flat
            :class="`bg-gradient-to-b from-gray-200 to-gray-50 rounded-xl shadow-xl w-full ${
              index == 0 ? 'text-blue-500' : index == 1 ? 'text-red-500' : ''
            }`"
            :to="`/courses/${category.catId}`"
          >
            view
            <q-icon name="arrow_right_alt" size="20" class="" />
          </q-btn>
        </q-card-actions>
      </div>
    </q-card>
  </router-link>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: ["category", "index"],
  setup() {
    const store = useStore();
    let cloudinary = computed(() => store.getters["auth/getCloudinaryURL"]);
    return {
      cloudinary,
    };
  },
};
</script>
