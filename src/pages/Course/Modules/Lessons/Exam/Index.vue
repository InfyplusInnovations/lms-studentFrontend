<template>
  <q-page>
    <router-view />
    <div
      class="flex flex-col justify-center items-center p-5"
      v-if="examStatus.examStart == false && examStatus.examEnd == false"
    >
      <div class="max-w-7xl w-full">
        <div class="">
          <div class="py-5 flex justify-between w-full">
            <div class="font-bold text-lg">
              <span>Module {{ exam.mId }}</span
              >:<span>Exam{{ exam.exId }}</span>
            </div>
            <div class="font-bold text-lg">
              Time:
              <span class="text-accent">
                {{ Math.floor(exam.time / 60) }} :
                {{ Math.floor(exam.time % 60) }}
              </span>
            </div>
          </div>
          <p class="text-left w-full">Answer all questions</p>
        </div>
        <q-separator spaced />
        <div class="flex w-full justify-end">
          <div class="">
            <!-- <q-btn
              v-if="examLog !== null"
              unelevated
              rounded
              color="primary"
              label="Continue Exam"
              class="capitalize"
              @click="handleExamContinue"
            /> -->
            <q-btn
              unelevated
              rounded
              color="accent"
              label="Start Exam"
              class="capitalize"
              @click="handleExamStart"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="p-5 flex flex-col justify-center items-center relative"
      v-if="examStatus.examStart == true && examStatus.examEnd == false"
    >
      <div class="py-5 flex justify-between w-full">
        <div class="font-bold text-lg">
          <span>Module {{ exam.mId }}</span
          >:<span>Exam{{ exam.exId }}</span>
        </div>
        <div class="font-bold text-lg">
          Time Left:
          <span class="text-accent">
            {{ Math.floor(timer / 60) }} : {{ Math.floor(timer % 60) }}
          </span>
        </div>
      </div>
      <div class="max-w-6xl p-3 w-full">
        <div class="font-bold text-md py-5">
          Question {{ examIndex + 1 }} of {{ questions.length }}
        </div>
        <q-separator />
        <div class="font-bold text-lg py-5">
          {{ questions[examIndex].question }}
        </div>
        <div class="flex gap-5">
          <q-card class="max-w-md w-full">
            <q-card-section>
              <q-radio
                v-model="answerOption"
                checked-icon="task_alt"
                color="accent"
                unchecked-icon="panorama_fish_eye"
                :val="questions[examIndex].option1"
                :label="questions[examIndex].option1"
              />
            </q-card-section>
          </q-card>
          <q-card class="max-w-md w-full">
            <q-card-section>
              <q-radio
                v-model="answerOption"
                checked-icon="task_alt"
                color="accent"
                unchecked-icon="panorama_fish_eye"
                :val="questions[examIndex].option2"
                :label="questions[examIndex].option2"
              />
            </q-card-section>
          </q-card>
          <q-card class="max-w-md w-full">
            <q-card-section>
              <q-radio
                v-model="answerOption"
                checked-icon="task_alt"
                color="accent"
                unchecked-icon="panorama_fish_eye"
                :val="questions[examIndex].option3"
                :label="questions[examIndex].option3"
              />
            </q-card-section>
          </q-card>
          <q-card class="max-w-md w-full">
            <q-card-section>
              <q-radio
                v-model="answerOption"
                checked-icon="task_alt"
                color="accent"
                unchecked-icon="panorama_fish_eye"
                :val="questions[examIndex].option4"
                :label="questions[examIndex].option4"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-separator horizontal />
      <div class="flex w-full justify-end">
        <div class="">
          <q-btn
            unelevated
            rounded
            color="accent"
            label="Next"
            class="capitalize"
            @click="handleExamNext"
            v-if="examIndex + 1 < questions.length"
            :disable="answerOption == '' ? true : false"
          />
          <q-btn
            unelevated
            rounded
            color="accent"
            label="Finish"
            class="capitalize"
            v-else
            @click="handleExamEnd"
            :disable="answerOption == '' ? true : false"
          />
        </div>
        <div class="">
          <q-btn
            unelevated
            rounded
            color="accent"
            label="Previous"
            class="capitalize"
            @click="handleExamPrevious"
            :disable="examIndex - 1 < 0"
          />
        </div>
      </div>
      <div
        class="absolute w-full h-full flex justify-center items-center"
        v-if="timer === 0"
      >
        <q-banner inline-actions class="text-white bg-red max-w-sm">
          Time Up !
          <template v-slot:action>
            <q-btn flat color="white" label="Ok" @click="handleExamEnd" />
          </template>
        </q-banner>
      </div>
    </div>
    <div class="p-5 flex flex-col justify-center items-center">
      <div
        class="max-w-6xl w-full"
        v-if="examStatus.examStart == false && examStatus.examEnd == true"
      >
        <div class="font-bold text-lg py-5">Result</div>
        <div class="p-3 bg-gray-300">
          <q-card class="flex flex-col justify-center items-center">
            <q-card-section class="w-full">
              <div class="flex justify-between w-full p-3">
                <div class="">
                  <q-icon name="task_alt" size="32px" class="text-green-500" />
                  <div class="">Right Answers</div>
                </div>
                <div class="font-bold">{{ examResult.right }}</div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="w-full">
              <div class="flex justify-between w-full p-3">
                <div class="">
                  <q-icon name="close" size="32px" class="text-red-500" />
                  <div class="">Wrong Answers</div>
                </div>

                <div class="">
                  <div class="font-bold">{{ examResult.wrong }}</div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="w-full">
              <div class="flex justify-between w-full p-3">
                <div class="">
                  <q-icon name="note" size="32px" class="text-blue-500" />
                  <div class="">Mark</div>
                </div>
                <div class="font-bold">
                  {{ examResult.right }}/{{ examResult.total }}
                </div>
              </div>
            </q-card-section>
            <q-card-section class="w-full">
              <div class="flex justify-between w-full p-3">
                <div class="">
                  <q-icon
                    name="military_tech"
                    size="32px"
                    class="text-yellow-500"
                  />
                  <div class="">Status</div>
                </div>
                <div class="">
                  <div
                    class="font-bold text-green-500 text-xl"
                    v-if="examResult.passed"
                  >
                    Passed ({{ examResult.percent }} %)
                  </div>
                  <div class="font-bold text-red-500 text-xl" v-else>
                    Failed ({{ examResult.percent }} %)
                  </div>
                </div>
              </div>
              <div class="flex justify-between items-center my-5">
                <q-btn
                  unelevated
                  rounded
                  color="accent"
                  label="Retry"
                  icon="refresh"
                  class="capitalize"
                  @click="handleExamRetry"
                />
                <q-btn
                  unelevated
                  rounded
                  color="accent"
                  @click="handleNext"
                  :disable="examResult.passed != true"
                  :label="nextBtn.name"
                  class="capitalize"
                >
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    let examIndex = ref(0);
    let store = useStore();
    const router = useRouter();
    let timer = ref(0);
    let answerOption = ref("");
    const route = useRoute();
    let examStatus = ref({
      examStart: false,
      examEnd: false,
    });
    let lessonStream = computed(
      () => store.getters["streamStatus/getLessonStream"]
    );
    let modules = computed(() => store.getters["module/getModules"]);
    let lessons = computed(() => store.getters["lesson/getLessons"]);
    let lesson = computed(() => store.getters["lesson/getLesson"]);
    let exam = computed(() => store.getters["exam/getExam"]);
    let examLog = computed(() => store.getters["exam/getExamLog"]);
    let answers = computed(() => store.getters["exam/getAnswers"]);
    let questions = computed(() => store.getters["exam/getQuestions"]);
    let examResult = computed(() => store.getters["exam/getResult"]);
    const fetchData = async () => {
      await store.dispatch("module/fetchModules", {
        cId: route.params.cId,
      });
      await store.dispatch("lesson/fetchLessons", {
        cId: route.params.cId,
        mId: route.params.mId,
      });
      await store.dispatch("lesson/fetchLesson", {
        cId: route.params.cId,
        mId: route.params.mId,
        lId: route.params.lId,
      });
      await store.dispatch("exam/fetchExam", route.params.exId);
      await store.dispatch("exam/fetchExamLog", route.params.exId);
      await store.dispatch("streamStatus/fetchSteamByLesson", {
        lId: route.params.lId,
      });
      if (examLog.value !== null) {
        await store.dispatch("exam/fetchAnswers", {
          exId: route.params.exId,
          eLogId: examLog.value.eLogId,
        });
        if (examLog.value.completed == true) {
          await store.dispatch("exam/examResult", {
            exId: route.params.exId,
            eLogId: examLog.value.eLogId,
          });

          examStatus.value.examEnd = true;
        }
      }
    };
    onMounted(async () => {
      await fetchData();
    });
    const getAnswerByQuestionId = (qId) => {
      let [ansr] = answers.value.filter((ans) => ans.qId == qId);
      return ansr;
    };

    const handleExamStart = async () => {
      await store.dispatch("exam/startExam", {
        exId: route.params.exId,
        mId: route.params.mId,
      });
      timer.value = exam.value.time;
      examStatus.value.examStart = true;
      let interval = setInterval(() => {
        if (timer.value === 0 || examStatus.value.examEnd == true) {
          clearInterval(interval);
        } else {
          timer.value--;
        }
      }, 1000);
      if (questions.value) {
        let ans = getAnswerByQuestionId(questions.value[examIndex.value].qId);
        if (ans) {
          answerOption.value = ans.answer;
        }
      }
    };
    const handleExamContinue = async () => {
      timer.value = exam.value.time;
      examStatus.value.examStart = true;
      let interval = setInterval(() => {
        if (timer.value === 0 || examStatus.value.examEnd == true) {
          clearInterval(interval);
        } else {
          timer.value--;
        }
      }, 1000);
    };
    const handleExamNext = async () => {
      let ans = getAnswerByQuestionId(questions.value[examIndex.value].qId);

      if (ans) {
        answerOption.value = ans.answer;
      }
      if (!ans) {
        let answer = answerOption.value;
        store.dispatch("exam/addAnswer", {
          exId: route.params.exId,
          eLogId: examLog.value.eLogId,
          mId: route.params.mId,
          qId: questions.value[examIndex.value].qId,
          answer,
        });
      }

      if (examIndex.value < questions.value.length) {
        answerOption.value = NaN;
        examIndex.value = examIndex.value + 1;
      }
    };
    const handleExamPrevious = async () => {
      if (examIndex.value >= 0) {
        examIndex.value = examIndex.value - 1;
      }
      let ans = getAnswerByQuestionId(questions.value[examIndex.value].qId);

      if (ans) {
        console.log(ans.answer);
        answerOption.value = ans.answer;
      }
    };
    const handleExamEnd = async () => {
      let answer = answerOption.value;
      let ans = getAnswerByQuestionId(questions.value[examIndex.value].qId);
      if (!ans) {
        store.dispatch("exam/addAnswer", {
          exId: route.params.exId,
          eLogId: examLog.value.eLogId,
          mId: route.params.mId,
          qId: questions.value[examIndex.value].qId,
          answer,
        });
      } else {
        store.dispatch("exam/updateAnswer", {
          exId: route.params.exId,
          eLogId: examLog.value.eLogId,
          mId: route.params.mId,
          qId: questions.value[examIndex.value].qId,
          answer,
          ansId: ans.ansId,
        });
      }

      await store.dispatch("exam/endExam", {
        exId: route.params.exId,
        eLogId: examLog.value.eLogId,
        mId: route.params.mId,
        qId: questions.value[examIndex.value].qId,
        completed: true,
      });
      await store.dispatch("exam/examResult", {
        exId: route.params.exId,
        eLogId: examLog.value.eLogId,
      });
      examStatus.value.examStart = false;
      examStatus.value.examEnd = true;
    };
    const handleExamRetry = async () => {
      await store.dispatch("exam/resetExam", {
        eLogId: examLog.value.eLogId,
        exId: route.params.exId,
      });

      await fetchData();
      examStatus.value.examStart = false;
      examStatus.value.examEnd = false;
      examIndex.value = 0;
    };
    // NEXT lesson
    let nextBtn = computed(() => {
      let btnValue = {
        name: "Finish Course",
        to: `course/${route.params.cId}/finish`,
      };
      if (lessons.value.length > 0) {
        if (lessons.value[lessons.value.length - 1].lId != lesson.value.lId) {
          lessons.value.forEach((lsn, index) => {
            if (lsn.lId == lesson.value.lId) {
              btnValue.name = "Next Lesson";
              btnValue.to = `/course/${route.params.cId}/modules/${
                route.params.mId
              }/lessons/${lessons.value[index + 1].lId}`;
            }
          });
        } else {
          if (modules.value.length > 0) {
            if (
              modules.value[modules.value.length - 1].mId !== route.params.mId
            ) {
              modules.value.forEach((mdl, index) => {
                if (mdl.mId == route.params.mId) {
                  btnValue.name = "Next Module";
                  btnValue.to = `/course/${route.params.cId}/modules/${
                    modules.value[index + 1].mId
                  }`;
                }
              });
            }
          }
        }
      }
      return btnValue;
    });
    // end
    const handleNext = async () => {
      await store.dispatch("streamStatus/updateStream", {
        strId: lessonStream.value.id,
        lId: route.params.lId,
        cId: route.params.cId,
        mId: route.params.mId,
        completed: true,
        time: lesson.value.lDuration,
      });
      router.push(nextBtn.value.to);
    };
    return {
      handleExamStart,
      handleExamContinue,
      handleExamPrevious,
      handleExamRetry,
      answerOption,
      examStatus,
      timer,
      handleExamEnd,
      questions,
      examIndex,
      handleExamNext,
      examResult,
      exam,
      examLog,
      nextBtn,
      handleNext,
    };
  },
};
</script>
