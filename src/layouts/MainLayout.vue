<template>
  <q-layout view="lHh lpR fFf">
    <q-header bordered class="bg-white text-dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->
          Home
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-primary text-white"
    >
      <q-item clickable v-ripple>
        <q-item-section side>
          <q-avatar rounded size="48px">
            <img src="/img/Logo.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold">Marengo</q-item-label>
        </q-item-section>
      </q-item>
      <q-list bordered class="flex column q-gutter-md">
        <q-item clickable v-ripple to="/" exact active-class="bg-accent">
          <q-item-section avatar>
            <q-icon color="white" name="home" />
          </q-item-section>

          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/course" exact active-class="bg-accent">
          <q-item-section avatar>
            <q-icon color="white" name="book" />
          </q-item-section>

          <q-item-section>Courses</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/profile" exact active-class="bg-accent">
          <q-item-section avatar>
            <q-icon color="white" name="person" />
          </q-item-section>

          <q-item-section>Profile</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/support" exact active-class="bg-accent">
          <q-item-section avatar>
            <q-icon color="white" name="support" />
          </q-item-section>

          <q-item-section>Support</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          active-class="bg-accent"
          @click="handleLogout"
        >
          <q-item-section avatar>
            <q-icon color="white" name="logout" />
          </q-item-section>

          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();
    const router = useRouter();
    const handleLogout = async () => {
      const res = await store.dispatch("auth/logoutApi");
      router.push("/login");
    };
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
    };
  },
};
</script>
