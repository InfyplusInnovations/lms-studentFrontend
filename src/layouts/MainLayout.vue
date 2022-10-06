<template>
  <q-layout view="lHh lpR fFf" class="h-screen overflow-hidden">
    <q-header bordered class="bg-primary text-dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="font-fredoka">
          {{ $route.meta.title }}
        </q-toolbar-title>
        <q-space />
        <q-btn flat>
          <q-icon name="bell" size="24px" />
        </q-btn>
        <q-item
          v-if="pic !== undefined && profile.sName !== undefined"
          clickable
          class="flex flex-col justify-center items-center"
          to="/profile"
        >
          <q-avatar>
            <q-img :src="pic" />
          </q-avatar>
          <div class="font-fredoka font-bold text-gray-800">
            {{ profile.sName }}
          </div>
        </q-item>
      </q-toolbar>
      <!-- <q-toolbar>
        <q-breadcrumbs class="flex flex-wrap font-fredoka text-lg">
          <q-breadcrumbs-el
            icon="home"
            to="/"
            label="home"
            class="text-gray-900"
          />
          <q-breadcrumbs-el
            v-for="(sRoute, index) in breadCrumbs"
            :to="sRoute"
            :key="index"
            :label="$route.path.split('/')[index + 1]"
            class="text-gray-900"
          >
          </q-breadcrumbs-el>
        </q-breadcrumbs>
      </q-toolbar> -->
      <q-toolbar>
        <q-breadcrumbs
          class="flex flex-wrap font-fredoka text-lg"
          v-if="$route.path.split('/').length < 4"
        >
          <q-breadcrumbs-el
            icon="home"
            to="/"
            label="home"
            class="text-gray-900"
          />
          <q-breadcrumbs-el
            v-for="(sRoute, index) in breadCrumbs"
            :to="sRoute"
            :key="index"
            :label="$route.path.split('/')[index + 1]"
            class="text-gray-900"
          >
          </q-breadcrumbs-el>
        </q-breadcrumbs>
        <q-breadcrumbs v-else class="flex flex-wrap font-fredoka text-lg">
          <q-breadcrumbs-el
            icon="home"
            to="/"
            label="home"
            class="text-gray-900"
          />

          <q-breadcrumbs-el>
            <q-btn color="" flat class="text-gray-900" icon="menu_open">
              <q-menu auto-close v-if="bdLinkNames && breadCrumbs">
                <q-list
                  style="min-width: 100px"
                  v-if="
                    bdLinkMenuItems.items && bdLinkMenuItems.items.length > 0
                  "
                >
                  <q-item
                    clickable
                    v-for="(item, index) in bdLinkMenuItems.items"
                    :key="index"
                    :to="item.link"
                    class="border-b-1 border-gray-300"
                  >
                    <q-item-section avatar>
                      <q-icon
                        color="black"
                        :name="
                          index == 4
                            ? 'play_arrow'
                            : index == 2
                            ? 'menu_book'
                            : index == 0
                            ? 'book'
                            : 'chevron_right'
                        "
                      />
                    </q-item-section>
                    <q-item-section>{{ item.text }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-breadcrumbs-el>
          <q-breadcrumbs-el
            v-if="bdLinkMenuItems.last"
            :label="bdLinkMenuItems.last.text"
            class="text-orange-600"
          >
          </q-breadcrumbs-el>
        </q-breadcrumbs>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      class="text-gray-900 bg-primary"
      :width="220"
      bordered
    >
      <q-item
        clickable
        v-ripple
        class="my-5 flex justify-center items-center"
        to="/"
      >
        <q-item-section side>
          <q-item-section side>
            <q-img src="/img/logo.svg" class="w-36" />
          </q-item-section>
        </q-item-section>
        <!-- <q-item-section>
          <q-item-label class="text-weight-bold">Marengo</q-item-label>
        </q-item-section> -->
      </q-item>
      <q-list class="flex column q-gutter-md">
        <div class="flex flex-col gap-4">
          <Navlink
            v-for="(navItem, index) in navItems"
            :linkIcon="navItem.icon"
            :linkName="navItem.name"
            :linkTo="navItem.link"
            :index="index"
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
            <q-icon
              color="white"
              class="bg-gradient-to-b from-indigo-500 to-indigo-700 text-white shadow-xl p-3 rounded-full"
              name="logout"
            />
          </q-item-section>

          <q-item-section class="font-bold font-fredoka text-lg text-gray-800"
            >Logout</q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="overflow-y-scroll h-full">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Navlink from "src/components/NavLink.vue";
export default {
  components: { Navlink },
  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let pic = ref("");
    const handleLogout = async () => {
      await store.dispatch("auth/logoutApi");
      router.push("/login");
    };
    let profile = computed(() => {
      return store.getters["profile/getUser"];
    });

    let cloudinary = computed(() => store.getters["auth/getCloudinaryURL"]);
    let lesson = computed(() => store.getters["item/getLesson"]);
    let module = computed(() => store.getters["item/getModule"]);
    let course = computed(() => store.getters["item/getCourse"]);
    let category = computed(() => store.getters["item/getCategory"]);
    const fetchData = async () => {
      let params = Object.keys(route.params);
      if (params && params.length > 0) {
        params.forEach(async (param) => {
          if (param == "cId") {
            await store.dispatch("item/fetchCourse", {
              cId: route.params.cId,
            });
          }
          if (param == "mId") {
            await store.dispatch("item/fetchModule", {
              cId: route.params.cId,
              mId: route.params.mId,
            });
          }
          if (param == "lId") {
            await store.dispatch("item/fetchLesson", {
              cId: route.params.cId,
              mId: route.params.mId,
              lId: route.params.lId,
            });
          }
          if (param == "catId") {
            await store.dispatch("item/fetchCategory", {
              catId: route.params.catId,
            });
          }
        });
      }
    };
    onMounted(async () => {
      await fetchData();
      await store.dispatch("profile/fetchUser");
      pic.value =
        profile.value.sProfilePic != ""
          ? `${cloudinary.value}${profile.value.sProfilePic}`
          : `${cloudinary.value}image/upload/v1664085802/jxfxvt5e4jepoj5rcek9.jpg`;
    });
    // ITEM GENERATOR

    // let links = route.path.split("/");
    let bds = route.meta.breadcrumbs;
    let params = Object.keys(route.params);
    let bdLinkMenuItems = computed(() => {
      let items = { items: [], last: { text: "", link: "" } };
      let counter = 0;

      bds.links.forEach((link, index) => {
        let newItem = null;
        if (link == "paramId") {
          if (params[counter] == "lId") {
            if (lesson.value !== null && lesson.value !== undefined) {
              newItem = {
                text: lesson.value.lName,
                link: `/course/${route.params.cId}/modules/${route.params.mId}/lessons/${route.params.lId}`,
              };
            }
          }
          if (params[counter] == "mId") {
            if (module.value !== null && module.value !== undefined) {
              newItem = {
                text: module.value.mName,
                link: `/course/${route.params.cId}/modules/${route.params.mId}`,
              };
            }
          }
          if (params[counter] == "cId") {
            if (course.value !== null && course.value !== undefined) {
              newItem = {
                text: course.value.cName,
                link: `/course/${route.params.cId}`,
              };
            }
          }
          if (params[counter] == "catId") {
            if (category.value !== null && category.value !== undefined) {
              newItem = {
                text: category.value.catName,
                link: `/courses/${route.params.catId}`,
              };
            }
          }
          counter += 1;
        } else {
          let rPath = "";
          route.path.split("/").forEach((path, i) => {
            if (i <= index + 1) {
              rPath += i > 0 ? "/" : "";
              rPath = rPath + path;
            }
          });
          newItem = { text: link, link: rPath };
        }
        if (index + 1 !== bds.links.length) {
          if (newItem !== null) {
            items.items.push(newItem);
          }
        } else {
          // last link
          if (link == "paramId") {
            items.last = newItem;
          } else {
            items.last = newItem;
          }
        }
      });

      return items;
    });
    // ITEM GENERATOR END
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
      { name: "Courses", link: "/courses", icon: "book" },
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
      pic,
      profile,
      bdLinkMenuItems,
    };
  },
};
</script>
