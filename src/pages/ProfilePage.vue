<template>
  <q-page class="p-5">
    <router-view />
    <div class="flex max-w-xl font-fredoka">
      <q-card class="w-full" flat bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-img :src="editValues.sProfilePic" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ editValues.sName }}</q-item-label>
            <q-item-label></q-item-label>
          </q-item-section>
        </q-item>
        <q-btn
          fab
          color="accent"
          icon="edit"
          class="absolute"
          style="top: 12px; right: 12px; transform: translateY(-50%)"
          @click="editPrompt = !editPrompt"
        />
        <q-separator />

        <q-card-section>
          <q-list bordered separator>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label caption>Class</q-item-label>
                <q-item-label>{{ editValues.sClass }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label caption>District</q-item-label>
                <q-item-label>{{ editValues.sDistrict }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label caption>Class</q-item-label>
                <q-item-label>{{ editValues.sSchool }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label caption>Mobile</q-item-label>
                <q-item-label>{{ editValues.sMobile }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label caption>DOB</q-item-label>
                <q-item-label>{{ editValues.sDOB }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <div class="">
      <q-dialog v-model="editPrompt">
        <q-card class="p-5">
          <div class="">
            <div>Edit Student</div>
          </div>
          <q-form class="flex flex-col gap-3" @submit="handleEditSubmit">
            <div class="">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-img :src="editValues.sProfilePic" />
                  </q-avatar>
                </q-item-section>
                <q-file
                  name="picture"
                  color="teal"
                  filled
                  v-model="pic"
                  label="change photo"
                  laceholder="change photo"
                  counter
                  hint="supported formats .png,.jpg"
                  accept=".png, .jpg,.jpeg"
                  @update:model-value="setPreview"
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="close"
                      @click.stop="pic = null"
                      class="cursor-pointer"
                    />
                  </template>
                </q-file>
              </q-item>
            </div>
            <q-input
              rounded
              outlined
              v-model="editValues.sName"
              label="Fullname"
              dense
              required
              placeholder="Enter the Fullname"
              class=""
            />
            <q-input
              rounded
              outlined
              v-model="editValues.sClass"
              label="class"
              dense
              required
              placeholder="Enter the class"
              class=""
            />
            <q-input
              rounded
              outlined
              v-model="editValues.sSchool"
              label="School"
              dense
              required
              placeholder="Enter the school"
              class=""
            />
            <q-input
              rounded
              outlined
              v-model="editValues.sDistrict"
              label="District"
              dense
              required
              placeholder="Enter the district"
              class=""
            />
            <q-input
              rounded
              outlined
              v-model="editValues.sMobile"
              label="Mobile"
              dense
              required
              placeholder=""
              class=""
              disable
            />
            <q-input
              rounded
              outlined
              v-model="editValues.sDOB"
              label="DOB"
              dense
              required
              placeholder="Enter the DOB"
              class=""
              disable
            />
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="accent" v-close-popup />
              <q-btn label="Confirm" color="accent" type="submit"
                ><q-spinner-ios v-if="loading" color="white" size="1em"
              /></q-btn>
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    let editPrompt = ref(false);
    let pic = ref(null);
    let editValues = ref({
      sName: "",
      sSchool: "",
      sClass: "",
      sDistrict: "",
      sProfilePic: "",
      sMobile: "",
      sDOB: "",
    });
    const store = useStore();
    let profile = computed(() => {
      return store.getters["profile/getUser"];
    });

    let loading = computed(() => store.getters["profile/getLoading"]);
    let cloudinary = computed(() => store.getters["auth/getCloudinaryURL"]);
    onMounted(async () => {
      await store.dispatch("profile/fetchUser");
      editValues.value.sName = profile.value.sName;
      editValues.value.sSchool = profile.value.sSchool;
      editValues.value.sClass = profile.value.sClass;
      editValues.value.sDistrict = profile.value.sDistrict;
      editValues.value.sMobile = profile.value.sMobile;
      editValues.value.sDOB = profile.value.sDOB;
      editValues.value.sProfilePic = `${cloudinary.value}${profile.value.sProfilePic}`;
    });
    const handleEditSubmit = async (evt) => {
      let payload = {
        sName: editValues.value.sName,
        sSchool: editValues.value.sSchool,
        sClass: editValues.value.sClass,
        sDistrict: editValues.value.sDistrict,
        sMobile: editValues.value.sMobile,
        sDOB: editValues.value.sDOB,
        sProfilePic: evt.target["picture"].files[0],
      };
      let formData = new FormData();
      for (let key in payload) {
        if (payload[key] !== "" && payload[key] !== undefined) {
          formData.append(key, payload[key]);
        }
      }
      let res = await store.dispatch("profile/editUser", formData);
      if (res == true) {
        editPrompt.value = false;
      }
    };
    const setPreview = (value) => {
      let preview = URL.createObjectURL(value);
      editValues.value.sProfilePic = preview;
    };
    return {
      editPrompt,
      editValues,
      loading,
      handleEditSubmit,
      setPreview,
      pic,
    };
  },
};
</script>
