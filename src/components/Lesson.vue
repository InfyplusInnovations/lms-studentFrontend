<template>
  <div class="">
    <q-card
      :class="`bg-gradient-to-b rounded-xl ${
        lesson.order > activeOrder
          ? 'from-gray-500 to-gray-700 '
          : lesson.order < activeOrder
          ? 'from-green-400 to-green-700 text-white'
          : 'from-yellow-500 to-yellow-700 text-white'
      } w-full`"
    >
      <q-card-section>
        <div class="flex items-center gap-2">
          <q-icon
            :name="
              lesson.order == activeOrder
                ? 'play_arrow'
                : lesson.order < activeOrder
                ? 'check'
                : 'lock'
            "
            :class="'text-white'"
            size="20px"
          />
          <router-link
            :to="
              lesson.order <= activeOrder
                ? `/course/${cId}/modules/${mId}/lessons/${lesson.lId}`
                : ''
            "
            class="no-underline"
            ><div :class="`text-white w-full`">
              {{ lesson.lName }}
            </div></router-link
          >
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  props: ["lesson", "activeOrder", "cId", "mId"],
  setup(props) {},
};
</script>
