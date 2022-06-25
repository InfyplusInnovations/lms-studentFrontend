<template>
  <q-page>
    <router-view />
    <div class="tw-flex tw-flex-col tw-p-3">
      <div class="tw-flex tw-gap-3 tw-flex-wrap tw-my-10">
        <q-card class="tw-p-10" flat bordered>
          <q-card-section class="text-primary">
            <q-avatar class="">
              <q-icon name="school" size="48px"></q-icon>
            </q-avatar>
            <div class="text-h6">Contact Instructors</div>
            <div class="text-subtitle2">+91 1234567890</div>
          </q-card-section>
        </q-card>
        <q-card class="tw-p-10" flat bordered>
          <q-card-section class="text-primary">
            <q-avatar class="">
              <q-icon name="support" size="48px"></q-icon>
            </q-avatar>
            <div class="text-h6">Contact Support</div>
            <div class="text-subtitle2">+91 1234567890</div>
          </q-card-section>
        </q-card>
      </div>
      <q-separator color="gray" spaced />
      <div class="tw-my-10">
        <div class="tw-mb-5 tw-font-semibold tw-text-2xl">
          Frequently Asked Questions
        </div>
        <div class="tw-flex tw-flex-wrap tw-gap-3">
          <q-expansion-item expand-separator label="Question1" class="tw-w-72">
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex
                numquam, dolorum officiis modi facere maiores architecto
                suscipit iste eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item expand-separator label="Question2" class="tw-w-72">
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
