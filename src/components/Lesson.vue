<template>
  <div class="">
    <q-card
      :class="`bg-gradient-to-b rounded-xl ${
        lesson.completed == true
          ? 'from-green-400 to-green-700 text-white'
          : lesson.unlocked == true
          ? 'from-yellow-500 to-yellow-700 text-white'
          : 'from-gray-500 to-gray-700 '
      } w-full`"
    >
      <router-link
        :to="
          lesson.completed == true || lesson.unlocked == true
            ? `/course/${cId}/modules/${mId}/lessons/${lesson.lId}`
            : ''
        "
        class="no-underline"
      >
        <q-card-section>
          <div class="flex items-center gap-2">
            <q-icon
              :name="
                lesson.completed == true
                  ? 'check'
                  : lesson.unlocked == true
                  ? 'play_arrow'
                  : 'lock'
              "
              :class="'text-white'"
              size="20px"
            />
            <div :class="`text-white w-full`">
              {{ lesson.lName }}
            </div>
          </div>
        </q-card-section>
      </router-link>
    </q-card>
  </div>
</template>
<script>
export default {
  props: ["lesson", "cId", "mId"],
  setup(props) {},
};
</script>
