<template>
  <div class="">
    <q-card
      :class="`bg-gradient-to-b rounded-xl  ${
        module.completed == true
          ? 'from-green-400 to-green-700 text-white'
          : module.unlocked == true
          ? 'from-yellow-500 to-yellow-700 text-white'
          : 'from-gray-500 to-gray-700 '
      } w-full`"
    >
      <q-card-section>
        <div class="">
          <router-link
            :to="
              module.completed == true || module.unlocked == true
                ? `/course/${module.cId}/modules/${module.mId}`
                : ''
            "
            :class="`text-white w-full no-underline flex gap-2`"
          >
            <q-icon
              :name="
                module.completed == true
                  ? 'check'
                  : module.unlocked == true
                  ? 'play_arrow'
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
  props: ["module"],
  setup(props) {},
};
</script>
