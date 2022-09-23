<template>
  <div class="">
    <q-card
      :class="`bg-gradient-to-b rounded-xl  ${
        module.order > activeOrder
          ? 'from-gray-500 to-gray-700 '
          : module.order < activeOrder
          ? 'from-green-400 to-green-700 text-white'
          : 'from-yellow-500 to-yellow-700 text-white'
      } w-full`"
    >
      <q-card-section>
        <div class="">
          <router-link
            :to="
              module.order <= activeOrder
                ? `/course/${module.cId}/modules/${module.mId}`
                : ''
            "
            :class="`text-white w-full no-underline flex gap-2`"
          >
            <q-icon
              :name="
                module.order == activeOrder
                  ? 'play_arrow'
                  : module.order < activeOrder
                  ? 'check'
                  : 'lock'
              "
              :class="`text-white block`"
              size="20px"
            />

            <div class="font-bold">
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
