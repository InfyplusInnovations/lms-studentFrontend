<template>
  <div class="">
    <q-card
      :class="`${
        module.order > activeOrder
          ? ''
          : module.order < activeOrder
          ? 'bg-primary'
          : 'bg-dark'
      } tw-w-full`"
    >
      <q-card-section>
        <div class="tw-flex tw-gap-2">
          <q-icon
            :name="
              module.order == activeOrder
                ? 'play_arrow'
                : module.order < activeOrder
                ? 'check'
                : 'lock'
            "
            :class="
              module.order <= activeOrder ? 'tw-text-white' : 'tw-text-black'
            "
            size="20px"
          />

          <router-link
            :to="
              module.order <= activeOrder
                ? `/course/${module.cId}/modules/${module.mId}`
                : ''
            "
            :class="`${
              module.order <= activeOrder ? `tw-text-white ` : 'tw-text-black'
            } tw-w-full tw-no-underline`"
          >
            <div class="tw-font-bold">
              {{ module.mName }}
            </div></router-link
          >
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  props: ["module", "activeOrder"],
  setup(props) {},
};
</script>
