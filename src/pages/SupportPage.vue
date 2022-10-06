<template>
  <q-page>
    <router-view />
    <div class="flex flex-col p-3">
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
          <q-expansion-item expand-separator label="Question1" class="w-72">
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex
                numquam, dolorum officiis modi facere maiores architecto
                suscipit iste eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item expand-separator label="Question2" class="w-72">
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex
                numquam, dolorum officiis modi facere maiores architecto
                suscipit iste eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </div>
  </q-page>
</template>
