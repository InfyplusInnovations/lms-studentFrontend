<template>
  <router-link :to="linkTo" class="text-gray-900 no-underline">
    <q-item
      clickable
      v-ripple
      :active="
        linkTo !== '/' && $route.path.startsWith(linkTo)
          ? true
          : $route.path == linkTo
          ? true
          : false
      "
      active-class="bg-yellow-500 text-white "
    >
      <q-item-section avatar class="">
        <q-icon
          color="white"
          :class="`bg-gradient-to-b ${
            index == 0
              ? 'from-yellow-500 to-yellow-700'
              : index == 1
              ? 'from-blue-400 to-blue-700'
              : index == 2
              ? 'from-red-300 to-red-600'
              : index == 3
              ? 'from-green-500 to-green-700'
              : index == 4
              ? 'from-blue-500 to-blue-700'
              : ''
          }  shadow-xl p-3 rounded-full`"
          :name="linkIcon"
          active-class="bg-white"
        />
      </q-item-section>

      <q-item-section class="font-bold font-fredoka text-lg"
        >{{ linkName }}
      </q-item-section>
    </q-item>
  </router-link>
</template>
<script>
export default {
  props: ["linkName", "linkIcon", "linkTo", "index"],
  setup() {},
};
</script>
