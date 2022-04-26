<template>
  <q-page class="flex flex-center"
    ><router-view /> <img src="/img/Logo.png" alt="" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>
