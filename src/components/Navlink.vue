<template>
  <router-link :to="linkTo" class="tw-text-white tw-no-underline">
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
      active-class="bg-accent tw-text-white "
    >
      <q-item-section avatar>
        <q-icon color="white" :name="linkIcon" />
      </q-item-section>

      <q-item-section>{{ linkName }} </q-item-section>
    </q-item>
  </router-link>
</template>
<script>
export default {
  props: ["linkName", "linkIcon", "linkTo"],
  setup() {},
};
</script>
