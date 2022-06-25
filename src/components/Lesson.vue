<template>
  <div class="">
    <q-card
      :class="`${
        lesson.order > activeOrder
          ? ''
          : lesson.order < activeOrder
          ? 'bg-primary'
          : 'bg-dark'
      } tw-w-full`"
    >
      <q-card-section>
        <div class="tw-flex tw-gap-2">
          <q-icon
            :name="
              lesson.order == activeOrder
                ? 'play_arrow'
                : lesson.order < activeOrder
                ? 'check'
                : 'lock'
            "
            :class="
              lesson.order <= activeOrder ? 'tw-text-white' : 'tw-text-black'
            "
            size="20px"
          />
          <router-link
            :to="
              lesson.order <= activeOrder
                ? `/course/${cId}/modules/${mId}/lessons/${lesson.lId}`
                : ''
            "
            class="tw-no-underline"
            ><div
              :class="`${
                lesson.order <= activeOrder ? `tw-text-white ` : 'tw-text-black'
              } tw-w-full`"
            >
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
