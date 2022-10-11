<template>
  <q-page>
    <router-view />
    <div class="flex flex-col p-3">
      <q-card flat class="bg-accent max-w-3xl text-white font-bold text-lg">
        <q-card-section>
          support is only available between 9:00AM to 6:00PM IST
        </q-card-section>
      </q-card>
      <div class="flex gap-3 flex-wrap my-10">
        <q-card class="p-10" flat bordered>
          <q-card-section class="text-dark">
            <q-avatar
              class="bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-xl"
            >
              <q-icon name="school" size="36px"></q-icon>
            </q-avatar>
            <div class="text-h6">Contact Instructors</div>
            <div class="text-subtitle2">+91 8089003100</div>
          </q-card-section>
        </q-card>
        <q-card class="p-10" flat bordered>
          <q-card-section class="text-dark">
            <q-avatar
              class="bg-gradient-to-b from-yellow-500 to-yellow-700 text-white shadow-xl"
            >
              <q-icon name="support" size="36px" class=""></q-icon>
            </q-avatar>
            <div class="text-h6">Contact Support</div>
            <div class="text-subtitle2">+91 8089010060</div>
            <div class="text-subtitle2">support@marengoedutech.com</div>
          </q-card-section>
        </q-card>
      </div>
      <q-separator color="gray" spaced />
      <div class="my-10">
        <div class="mb-5 font-semibold text-2xl">
          Frequently Asked Questions
        </div>
        <div class="flex flex-wrap gap-3">
          <q-expansion-item
            expand-separator
            :label="faq.question"
            class="w-72 font-bold text-lg"
            v-for="(faq, index) in faqs"
            :key="index"
          >
            <q-card>
              <q-card-section class="text-sm font-normal">
                {{ faq.answer }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  setup() {
    let faqs = [
      {
        question: "Somethings not working, such as video not playing",
        answer:
          "Contact marengo support from the above given number or email id",
      },
      {
        question: "Have doubts in lesson, notes or any course content",
        answer:
          "Contact marengo instructor support from the above given number",
      },
      {
        question: "What is abacus?",
        answer:
          "Abacus is a calculation tool.It is used to count numbers and do mathematical operations.We can call it world ‘s first calculator.",
      },

      {
        question: "Is it possible to study abacus without abacus tool?",
        answer:
          "NO.Studying Abacus means practicing Abacus tool initially and after excelling the tool students moves to abacus visualization.Students perform maths without using abacus tool in abacus visualization. ",
      },

      {
        question: "What is the age limit for studying Abacus?",
        answer:
          "There is no age limit for studying Abacus.Anyone above 5 years of age can start abacus study usually & there is no upper age limit.",
      },
    ];
    return { faqs };
  },
};
</script>
