const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

const quizData = {
  general: [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      answer: "Paris"
    },
    {
      question: "Which language is used for web development?",
      options: ["Python", "HTML", "Java", "C++"],
      answer: "HTML"
    },
    {
      question: "Who won the Nobel Peace Prize in 2014?",
      options: ["Marie Curie", "Ellen Degeneres", "Malala Yousafzai", "Catherin O'Hare"],
      answer: "Malala Yousafzai"
    },
    {
      question: "Who is the president of India?",
      options: ["Narendra Modi", "Draupadi Murmu", "APJ Abdul Kalam", "Ram Nath Kovind"],
      answer: "Draupadi Murmu"
    },
    {
      question: "What is the captial of Gujarat?",
      options: ["Ahemdabad", "Baroda", "Surat", "Gandhinagar"],
      answer: "Gandhinagar"
    },
  ],
  science: [
    {
      question: "What planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars"
    },
    {
      question: "What gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
      answer: "Carbon Dioxide"
    },
    {
      question: "Who discovered gravity?",
      options: ["Isaac Newton", "Galileo", "Marie Curie", "Sheldon Cooper"],
      answer: "Isaac Newton"
    },
    {
      question: "What is the symbol for helium?",
      options: ["He", "Ne", "H", "Li"],
      answer: "He"
    },
    {
      question: "What is the value of g?",
      options: ["9.4", "9.8", "10", "8.8"],
      answer: "9.8"
    },
  ],
  history: [
    {
      question: "Who was the first President of the United States?",
      options: ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"],
      answer: "George Washington"
    },
    {
      question: "In which year did World War II end?",
      options: ["1945", "1939", "1918", "1963"],
      answer: "1945"
    },
    {
      question: "The last Mughal emperor is?",
      options: ["Akbar", "Bahadur Shah Zafar", "Shah Alam II", "Salim"],
      answer: "Bahadur Shah Zafar"
    },
    {
      question: "Who was behind the Jallianwala Bagh massacre?",
      options: ["Hitler", "Lord Dalhousie", "General Dyer", "King George"],
      answer: "General Dyer"
    },
    {
      question: "Who was the last Viceroy of British ruled India?",
      options: ["Lord Mountbatten", "Lord Curzon", "Lord Canning", "Lord Lytton"],
      answer: "Lord Mountbatten"
    },
  ]
};

const categorySelect = document.getElementById('category-select');
const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const resultEl = document.querySelector('.result');
const restartBtn = document.querySelector('.restart-btn');

let currentCategory = '';
let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  if (currentQuestionIndex >= currentQuiz.length) {
    showResult();
    return;
  }
  const q = currentQuiz[currentQuestionIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  resultEl.style.display = 'none';
  restartBtn.style.display = 'none';

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selectedOption) {
  if (selectedOption === currentQuiz[currentQuestionIndex].answer) {
    score++;
  }
  currentQuestionIndex++;
  loadQuestion();
}

function showResult() {
  questionEl.textContent = `Quiz Completed! Your score: ${score} / ${currentQuiz.length}`;
  optionsEl.innerHTML = '';
  resultEl.style.display = 'block';
  restartBtn.style.display = 'inline-block';
}

restartBtn.addEventListener('click', () => {
  if (currentCategory) {
    startQuiz(currentCategory);
  }
});

function startQuiz(category) {
  currentCategory = category;
  currentQuiz = quizData[category];
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

categorySelect.addEventListener('change', e => {
  startQuiz(e.target.value);
});

function loadQuestion() {
  if (currentQuestionIndex >= currentQuiz.length) {
    showResult();
    return;
  }
  const q = currentQuiz[currentQuestionIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  resultEl.style.display = 'none';
  restartBtn.style.display = 'none';

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = option;
    btn.style.backgroundColor = ''; 
    btn.disabled = false;
    btn.onclick = () => checkAnswer(btn);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selectedBtn) {
  const allButtons = optionsEl.querySelectorAll('button');
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedBtn.textContent === currentQuiz[currentQuestionIndex].answer) {
    selectedBtn.style.backgroundColor = 'green'; 
    score++;
  } else {
    selectedBtn.style.backgroundColor = 'red';   
    
    allButtons.forEach(btn => {
      if (btn.textContent === currentQuiz[currentQuestionIndex].answer) {
        btn.style.backgroundColor = 'green';
      }
    });
  }
  currentQuestionIndex++;
  setTimeout(loadQuestion, 1000); 
}

