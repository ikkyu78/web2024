const App = () => {
    const [data, setData] = React.useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [selectedAnswers, setSelectedAnswers] = React.useState([]);
    const [showScore, setShowScore] = React.useState(false);
    const [startQuiz, setStartQuiz] = React.useState(false);
  
    //ดึงข้อมูลจากไฟล์ Json
    React.useEffect(() => {
      fetch("./questions.json")
        .then((response) => response.json())
        .then((data) => setData(data));
    }, []);
  
    const handleAnswerSelect = (optionIndex) => {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[currentQuestionIndex] = optionIndex;
      setSelectedAnswers(updatedAnswers);
    };
  
    const handleNextQuestion = () => {
      if (currentQuestionIndex < data.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowScore(true);
      }
    };
  
    const calculateScore = () => {
      return data.questions.reduce((score, question, index) => {
        return question.answer === selectedAnswers[index] ? score + 1 : score;
      }, 0);
    };
  
    return (
      <div className="container py-5">
        {!startQuiz ? (
          <div className="text-center">
            <h1 className="mb-4">แบบทดสอบวิชาดาราศาสตร์</h1>
            <p className="mb-4">
              ยินดีต้อนรับสู่แบบทดสอบวิชาดาราศาสตร์!  
            </p>
            <button className="btn btn-primary" onClick={() => setStartQuiz(true)}>
              เริ่มทำแบบทดสอบ
            </button>
          </div>
        ) : !showScore ? (
          <div>
            <h1 className="mb-4">
              คำถามที่ {currentQuestionIndex + 1}:{" "}
              {data.questions[currentQuestionIndex].question}
            </h1>
            <div>
              {data.questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className={`btn btn-outline-primary d-block w-100 mb-2 ${
                    selectedAnswers[currentQuestionIndex] === index && "active"
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className="btn btn-primary mt-3"
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex === data.questions.length - 1
                ? "ตรวจคำตอบ"
                : "ข้อต่อไป"}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="mb-4">
              คะแนนของคุณ: {calculateScore()} / {data.questions.length}
            </h1>
            <button
              className="btn btn-danger"
              onClick={() => {
                setCurrentQuestionIndex(0);
                setShowScore(false);
                setStartQuiz(false);
                setSelectedAnswers([]);
              }}
            >
              ทำแบบทดสอบใหม่
            </button>
          </div>
        )}
      </div>
    );
  };
  
  
  ReactDOM.render(<App />, document.getElementById("root"));
  