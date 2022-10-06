<template>
  <div class="" v-if="loading">
    <div class="h-screen w-screen flex justify-center item-center">
      <img src="/img/horse.svg" alt="company logo" class="w-24 animate-pulse" />
    </div>
  </div>
  <div class="" v-else>
    <router-view />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    let loading = ref(false);
    const router = useRouter();
    router.beforeEach(() => {
      loading.value = true;
    });
    router.afterEach(() => {
      setTimeout(() => {
        loading.value = false;
      }, 10);
    });
    return {
      loading,
    };
  },
});
</script>
