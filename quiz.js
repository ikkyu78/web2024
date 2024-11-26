$(document).ready(function() {
    let quizData;
  
    // เมื่อเริ่มทำแบบทดสอบ
    $('#startBtn').click(function() {
      $.getJSON('quiz.json', function(data) {
        quizData = data;
        $('#intro').addClass('hidden');
        $('#quizContainer').removeClass('hidden');
        $('#subjectTitle').text(quizData.subject);
        loadQuestions();
      });
    });
  
    // โหลดคำถามทั้งหมด
    function loadQuestions() {
      let questionsHtml = '';
      quizData.questions.forEach(function(question, index) {
        questionsHtml += `
          <div class="question" data-index="${index}">
            <p><strong>ข้อที่ ${index + 1}: </strong>${question.question}</p>
            <div class="form-check">
              ${question.options.map((option, i) => `
                <input class="form-check-input" type="radio" name="question${index}" value="${i}" id="question${index}_option${i}">
                <label class="form-check-label" for="question${index}_option${i}">
                  ${option}
                </label><br>
              `).join('')}
            </div>
          </div>
        `;
      });
      $('#questionsContainer').html(questionsHtml);

      // ซ่อนปุ่มตรวจคำตอบในตอนแรก
      $('#submitBtn').addClass('hidden');
      
      // ตรวจสอบเมื่อเลือกคำตอบครบทุกข้อ
      $("input[type='radio']").change(function() {
        checkIfAllAnswered();
      });
    }

    // ฟังก์ชันตรวจสอบว่าผู้ใช้ตอบครบทุกคำถามหรือยัง
    function checkIfAllAnswered() {
      let allAnswered = true;
      quizData.questions.forEach(function(question, index) {
        if (!$(`input[name='question${index}']:checked`).val()) {
          allAnswered = false;
        }
      });
      
      // ถ้าผู้ใช้ตอบครบทุกข้อ ให้แสดงปุ่มตรวจคำตอบ
      if (allAnswered) {
        $('#submitBtn').removeClass('hidden');
      } else {
        $('#submitBtn').addClass('hidden');
      }
    }

    // ตรวจคำตอบ
    $('#submitBtn').click(function() {
      let score = 0;
      quizData.questions.forEach(function(question, index) {
        const selectedOption = $(`input[name='question${index}']:checked`).val();
        if (selectedOption != undefined && parseInt(selectedOption) === question.answer) {
          score++;
        }
      });
      $('#result').removeClass('hidden').html(`<h3>คุณได้คะแนน ${score} จาก ${quizData.questions.length}</h3>`);
      $('#submitBtn').addClass('hidden');
    });
});
