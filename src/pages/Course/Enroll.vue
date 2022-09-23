<template>
  <q-layout>
    <q-page>
      <router-view />
      <div class="max-w-3xl p-3">
        <form>
          <q-stepper
            v-model="step"
            ref="stepper"
            color="accent"
            animated
            :contracted="$q.screen.lt.md"
          >
            <q-step
              :name="1"
              title="Enroll"
              icon="settings"
              color="accent"
              :done="step > 1"
            >
              <div class="flex flex-col gap-3">
                <q-icon name="tick"></q-icon>
                <span class="font-bold text-xl"> Enroll to the course</span>

                <q-card v-if="course">
                  <q-card-section horizontal>
                    <div class="col-5 p-3">
                      <q-img
                        :src="`${cloudinary}${course.cThumbnail}`"
                        class="w-48 rounded-lg"
                      />
                    </div>
                    <div class="p-3">
                      <div class="font-bold text-xl">
                        {{ course.cName }}
                      </div>
                      <div
                        class="text-md text-gray-600"
                        v-html="course.cDescription"
                      ></div>
                      <div class="font-bold text-2xl text-blue-600">
                        Price :
                        {{ course.cPrice == 0 ? "Free" : course.cPrice }}
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </q-step>
            <q-step :name="2" title="Pay" icon="settings" :done="step > 2">
              <div class="flex flex-col gap-3">
                <q-icon name="tick"></q-icon>
                Pay the Money to enroll into a course

                <p>
                  Course Name: <strong> {{ course.cName }}</strong>
                </p>
                <p>
                  Course Price: <strong> {{ course.cPrice }}</strong>
                </p>
              </div>
              <div class="p-3">
                <div class="">Promotional Codes</div>
                <div class="">
                  <q-input
                    rounded
                    outlined
                    dense
                    v-model="coupon"
                    placeholder="enter promo code"
                    class="p-3"
                  />
                </div>
              </div>
            </q-step>
            <q-step :name="3" title="Done" icon="settings" :done="step > 5">
              <div class="flex flex-col gap-3">
                <q-icon name="tick"></q-icon>
                Successfully Enrolled
              </div>
            </q-step>

            <template v-slot:navigation>
              <q-stepper-navigation>
                <div class="flex">
                  <div class="">
                    <q-btn
                      @click="
                        () => {
                          if (step == 1) return handleEnroll();
                          if (step == 2) return handlePayment();
                          if (step == 3) return handleFinish();
                          return $refs.stepper.next();
                        }
                      "
                      color="accent"
                      :label="
                        step === 2
                          ? 'Pay Now'
                          : step === 1
                          ? 'Enroll'
                          : 'Finish'
                      "
                    >
                      <q-spinner-ios v-if="loading" color="white" size="1em"
                    /></q-btn>
                    <q-btn
                      v-if="step == 4"
                      flat
                      color="accent"
                      @click="handleSkipPayment"
                      label="skip payment"
                      class="q-ml-sm"
                    />
                    <q-btn
                      v-if="step > 1 && course.cPrice > 0"
                      flat
                      color="accent"
                      @click="$refs.stepper.previous()"
                      label="Back"
                      class="q-ml-sm"
                    />
                  </div>
                  <div class="">
                    <q-btn
                      v-if="step < 2"
                      flat
                      color="accent"
                      to="/"
                      label="Cancel"
                      class="q-ml-sm"
                    />
                  </div>
                </div>
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </form>
      </div>
      <q-dialog v-model="errorAlert">
        <q-card class="max-w-md w-full">
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ enrollResponse.msg }}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="accent" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="successAlert">
        <q-card>
          <q-card-section>
            <div class="text-h6">Success</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ message }}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="accent" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="confirmPayment" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm text-gray-900 font-bold"
              >Proceed to complete the payment?</span
            >
          </q-card-section>
          <q-card-section class="text-md text-right">
            <div class="bg-gray-200 p-5">
              <div class="">
                Course Price:
                <span class="text-gray-900">{{ course.cPrice }}</span>
              </div>
              <div class="" v-if="coupon !== ''">
                Promo Codes:
                <span class="text-yellow-600">{{ coupon }}</span>
              </div>
            </div>
            <q-separator spaced />
            <div class="font-bold text-lg">
              Amount Payable:
              <span class="font-bold text-green-600">{{ payable }} INR</span>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="accent" v-close-popup />
            <q-btn
              flat
              label="Pay Now"
              color="accent"
              @click="handleConfirmPayment"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </q-layout>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { loadScript, removeScript } from "src/helpers/load-script.js";
export default {
  setup() {
    // let sDetail = ref({
    //   sId: "",
    //   sName: "",
    //   sClass: "",
    //   sMobile: "",
    // });
    // let cDetail = ref({
    //   cId: "",
    //   cName: "",
    //   cPrice: "",
    // });
    // let student = computed(() => store.getters["students/getStudent"]);
    // let course = computed(() => store.getters["courses/getCourse"]);
    // const handleStudentSearch = async () => {
    //   let res = await store.dispatch(
    //     "students/fetchStudent",
    //     sDetail.value.sId
    //   );

    //   sDetail.value.sName = student.value.sName;
    //   sDetail.value.sMobile = student.value.sMobile;
    //   sDetail.value.sClass = student.value.sClass;
    // };
    // const handleCourseSearch = async () => {
    //   await store.dispatch("courses/fetchCourse", cDetail.value.cId);
    //   cDetail.value.cName = course.value.cName;
    //   cDetail.value.cPrice = course.value.cPrice;
    // };

    // const handleCancel = () => {
    //   cDetail.value = {
    //     cId: "",
    //     cName: "",
    //     cPrice: "",
    //   };
    //   sDetail.value = {
    //     sId: "",
    //     sName: "",
    //     sClass: "",
    //     sMobile: "",
    //   };
    //   step.value = 1;
    // };
    // const handleEnroll = async () => {
    //   let payload = {
    //     cId: course.value.cId,
    //     cGroup: 1,
    //     status: 1,
    //   };
    //   await store.dispatch("enroll/newEnroll", payload);

    // };
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let loading = computed(() => store.getters["enroll/getLoading"]);
    let course = computed(() => store.getters["course/getCourse"]);
    let enrollResponse = computed(
      () => store.getters["enroll/getResponseStatus"]
    );
    let enrollStatus = computed(() =>
      store.getters["enroll/getEnrolledStatus"](route.params.cId)
    );
    let cloudinary = computed(() => store.getters["auth/getCloudinaryURL"]);
    let orderId = computed(() => store.getters["payment/getOrderId"]);
    let payable = computed(() => store.getters["payment/getPayable"]);
    let step = ref(1);
    let coupon = ref("");
    let successAlert = ref(false);
    let errorAlert = ref(false);
    let message = ref("");
    let confirmPayment = ref(false);

    const fetchData = async () => {
      await store.dispatch("course/startLoading");
      await store.dispatch("course/fetchCourse", route.params.cId);
      await store.dispatch("course/stopLoading");
      await store.dispatch("enroll/fetchEnrolls");
    };
    onMounted(async () => {
      await fetchData();
      await loadScript(rzorpaysrc);

      if (enrollStatus && enrollStatus.value.status == true) {
        if (
          enrollStatus.value.payment == "Free" ||
          enrollStatus.value.payment == "Paid"
        )
          step.value = 3;
        else if (enrollStatus.value.payment == "Not Paid") step.value = 2;
        else step.value = 1;
      }
    });
    const rzorpaysrc = "https://checkout.razorpay.com/v1/checkout.js";
    const completePayment = async (payload) => {
      const details = {
        eId: enrollStatus.value.eId,
        razorpay_payment_id: payload.razorpay_payment_id,
        razorpay_order_id: payload.razorpay_order_id,
        razorpay_signature: payload.razorpay_signature,
      };
      await store.dispatch("payment/completePayment", details);
      confirmPayment.value = false;
      step.value = 3;
    };
    const payNow = async (order) => {
      var options = {
        key: "rzp_test_eEiIp9uBm2Xtc7", // Enter the Key ID generated from the Dashboard
        currency: "INR",
        name: "Marengo Edutech",
        description: "Test Transaction",
        image: "",
        order_id: `${order}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: (response) => {
          completePayment(response);
        },

        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new Razorpay(options);
      rzp1.open();
    };

    const handlePayment = async () => {
      await fetchData();
      let payload =
        coupon.value != ""
          ? {
              eId: enrollStatus.value.eId,
              coupon: coupon.value,
            }
          : {
              eId: enrollStatus.value.eId,
            };
      await store.dispatch("payment/placePayment", payload);
      if (orderId.value !== null) {
        // payNow(orderId.value);

        confirmPayment.value = true;
      }
    };
    const handleConfirmPayment = async () => {
      if (payable.value > 0) {
        payNow(orderId.value);
      } else {
        step.value = 3;
        confirmPayment.value = false;
      }
    };
    onUnmounted(() => {
      removeScript(rzorpaysrc);
    });
    const handleEnroll = async () => {
      await store.dispatch("enroll/startLoading");
      let res = await store.dispatch("enroll/addEnroll", {
        course_id: route.params.cId,
        cGroup: 1,
      });
      await store.dispatch("enroll/stopLoading");

      await fetchData();
      if (res == true) {
        if (course.value.cPrice > 0) {
          successAlert.value = true;
          message.value = "Complete the payment to enroll";
          step.value = 2;
        } else {
          successAlert.value = true;
          message.value = "successfully enrolled!";
          step.value = 3;
        }
      } else {
        errorAlert.value = true;
      }
    };
    const handleFinish = async () => {
      router.push(`/course/${route.params.cId}`);
    };
    return {
      step,
      course,
      loading,
      cloudinary,
      errorAlert,
      successAlert,
      handleEnroll,
      handleFinish,
      enrollStatus,
      enrollResponse,
      confirmPayment,
      handlePayment,
      coupon,
      payable,
      handleConfirmPayment,
      message,
    };
  },
};
</script>
