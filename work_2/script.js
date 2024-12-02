new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
      return {
        step: 'start',
        subjects: [],
        selectedSubject: null,
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        score: 0
      };
    },
    computed: {
      currentQuestion() {
        return this.questions[this.currentQuestionIndex];
      }
    },
    methods: {
      async startQuiz() {
        this.step = 'selectSubject';
        const response = await fetch('questions.json');
        const data = await response.json();
        this.subjects = data.map(item => item.subject);
      },
      async loadQuestions() {
        const response = await fetch('questions.json');
        const data = await response.json();
        const selectedData = data.find(item => item.subject === this.selectedSubject);
        this.questions = selectedData.questions;
        this.answers = Array(this.questions.length).fill(null);
        this.step = 'quiz';
      },
      selectAnswer(option) {
        this.$set(this.answers, this.currentQuestionIndex, option);
      },
      nextQuestion() {
        this.currentQuestionIndex++;
      },
      prevQuestion() {
        this.currentQuestionIndex--;
      },
      checkAnswers() {
        this.score = this.questions.reduce((total, question, index) => {
          return total + (this.answers[index] === question.answer ? 1 : 0);
        }, 0);
        this.step = 'result';
      },
      restartQuiz() {
        this.step = 'start';
        this.selectedSubject = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.score = 0;
      }
    }
  });
  