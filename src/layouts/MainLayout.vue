<template>
  <q-layout view="lHh lpR fFf" class="tw-h-screen tw-overflow-hidden">
    <q-header bordered class="bg-white text-dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->
          {{ $route.meta.title }}
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar inset>
        <q-breadcrumbs class="tw-flex tw-flex-wrap">
          <q-breadcrumbs-el icon="home" to="/" label="home" />
          <q-breadcrumbs-el
            v-for="(sRoute, index) in breadCrumbs"
            :to="sRoute"
            :key="index"
            :label="bdLinkNames[index]"
          />
          <!-- :label="$route.path.split('/')[index + 1]" -->
        </q-breadcrumbs>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      class="bg-primary text-white"
      :width="220"
    >
      <q-item
        clickable
        v-ripple
        class="tw-my-5 tw-flex tw-justify-center tw-items-center"
      >
        <q-item-section side>
          <q-avatar rounded size="56px">
            <img src="/img/Logo.png" />
          </q-avatar>
        </q-item-section>
        <!-- <q-item-section>
          <q-item-label class="text-weight-bold">Marengo</q-item-label>
        </q-item-section> -->
      </q-item>
      <q-list bordered class="flex column q-gutter-md">
        <div class="tw-flex tw-flex-col tw-gap-4">
          <Navlink
            v-for="(navItem, index) in navItems"
            :linkIcon="navItem.icon"
            :linkName="navItem.name"
            :linkTo="navItem.link"
            :key="index"
          />
        </div>
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

    <q-page-container class="tw-overflow-y-scroll tw-h-full">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Navlink from "src/components/Navlink.vue";
export default {
  components: { Navlink },
  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const handleLogout = () => {
      store.dispatch("auth/logoutApi");
      router.push("/login");
    };
    const generateBreadcrumbLinks = (rParams, rLinks) => {
      // course/{cid}/modules/{mid}
      let params = rParams;
      // let bds = {
      //   links: ["course", "paramId", "modules", "paramId"],
      //   params: ["cId", "mId"],
      // };
      let bds = rLinks;
      let getParam = [];
      // set all the params to actual value
      bds.params.forEach((param) => {
        getParam.push(params[param]);
      });
      let bdLinks = [];
      let paramIndex = 0;
      bds.links.forEach((link, index) => {
        if (link === "paramId") {
          if (bdLinks.length < 1) {
            let newLink = `/${getParam[paramIndex]}`;
            bdLinks.push(newLink);
            paramIndex = paramIndex + 1;
          } else {
            let newLink = `${bdLinks[index - 1]}/${getParam[paramIndex]}`;
            bdLinks.push(newLink);
            paramIndex = paramIndex + 1;
          }
        } else {
          if (bdLinks.length < 1) {
            let newLink = `/${link}`;
            bdLinks.push(newLink);
          } else {
            let newLink = `${bdLinks[index - 1]}/${link}`;
            bdLinks.push(newLink);
          }
        }
      });
      return bdLinks;
    };
    const generateBreadcrumbNames = (rParams, rLinks) => {
      let params = rParams;
      let bds = rLinks;
      let getParam = [];
      // set all the params to actual value
      bds.params.forEach((param) => {
        getParam.push(params[param]);
      });
      let bdLinkNames = [];
      let paramIndex = 0;
      bds.links.forEach((link) => {
        if (link === "paramId") {
          bdLinkNames.push(getParam[paramIndex]);
        } else {
          bdLinkNames.push(link);
        }
      });
      return bdLinkNames;
    };
    let bdLinkNames = computed(() => {
      let rParams = route.params;
      let rLinks = route.meta.breadcrumbs;
      let bd = generateBreadcrumbNames(rParams, rLinks);
      return bd;
    });
    let breadCrumbs = computed(() => {
      let rParams = route.params;
      let rLinks = route.meta.breadcrumbs;
      let bd = generateBreadcrumbLinks(rParams, rLinks);
      return bd;
    });

    const navItems = [
      { name: "Home", link: "/", icon: "home" },
      { name: "Courses", link: "/course", icon: "book" },
      { name: "Profile", link: "/profile", icon: "person" },
      { name: "Support", link: "/support", icon: "support_agent" },
    ];
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
      breadCrumbs,
      bdLinkNames,
      navItems,
    };
  },
};
</script>
