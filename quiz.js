const quizData = [
  {
    question: "琉球王国を統一し、初代国王となった人物は誰でしょう？",
    choices: ["尚巴志", "尚寧", "察度", "英祖"],
    answer: 0,
    explanation: "1429年、中山王の尚巴志（しょうはし）が北山・中山・南山の三山を統一し、琉球王国を建国しました。"
  },
  {
    question: "琉球王国が掲げた交易の理念「万国津梁」の意味は何でしょう？",
    choices: ["海の守り神", "世界の架け橋", "太陽の国", "平和の象徴"],
    answer: 1,
    explanation: "「万国津梁（ばんこくしんりょう）」とは「世界の架け橋」という意味。首里城正殿にかかる鐘に刻まれ、交易立国としての琉球の精神を表しています。"
  },
  {
    question: "1609年に琉球王国へ侵攻した藩はどこでしょう？",
    choices: ["長州藩", "土佐藩", "薩摩藩", "肥前藩"],
    answer: 2,
    explanation: "1609年、島津氏率いる薩摩藩が琉球へ侵攻。国王・尚寧が降伏し、以後琉球は薩摩藩の支配下に置かれながらも中国（清）との冊封関係を維持する「両属」状態となりました。"
  },
  {
    question: "琉球の古典芸能「組踊」を創始したのは誰でしょう？",
    choices: ["尚円王", "玉城朝薫", "蔡温", "程順則"],
    answer: 1,
    explanation: "組踊（くみおどり）は1719年に玉城朝薫（たまぐすくちょうくん）が創始した琉球の総合芸術です。2010年にユネスコ無形文化遺産に登録されました。"
  },
  {
    question: "琉球王国の行政区分で、現在の「市町村」にあたる単位は何でしょう？",
    choices: ["郷（ごう）", "間切（まぎり）", "番（ばん）", "区（く）"],
    answer: 1,
    explanation: "琉球王国では「間切（まぎり）」が基本的な行政単位でした。間切はさらに「村（むら）」に細分化され、1908年の制度改正により現在の市町村制度へと移行しました。"
  },
  {
    question: "沖縄のグスク（城）および関連遺産群が世界遺産に登録されたのはいつでしょう？",
    choices: ["1993年", "2000年", "2005年", "2010年"],
    answer: 1,
    explanation: "「琉球王国のグスク及び関連遺産群」は2000年にユネスコ世界文化遺産に登録されました。首里城・今帰仁城・中城城・勝連城など9件が含まれます。"
  },
  {
    question: "琉球王国最後の国王は誰でしょう？",
    choices: ["尚寧", "尚敬", "尚泰", "尚育"],
    answer: 2,
    explanation: "尚泰（しょうたい）は琉球王国最後の国王。1879年の琉球処分により東京へ移され、約450年続いた琉球王国は終焉を迎えました。"
  },
  {
    question: "三線（さんしん）の起源とされる楽器はどの国のものでしょう？",
    choices: ["朝鮮", "ベトナム", "中国", "タイ"],
    answer: 2,
    explanation: "三線は中国の「三弦（さんげん）」が琉球に伝わり発展した楽器です。交易を通じて14〜15世紀頃に琉球に伝来したとされています。"
  }
];

let current = 0;
let score = 0;
let answered = false;

const progressEl = document.getElementById('progress');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const questionBox = document.getElementById('question-box');
const scoreText = document.getElementById('score-text');
const scoreComment = document.getElementById('score-comment');
const retryBtn = document.getElementById('retry-btn');

function loadQuestion() {
  answered = false;
  feedbackEl.style.display = 'none';
  nextBtn.style.display = 'none';

  const q = quizData[current];
  progressEl.textContent = `問題 ${current + 1} / ${quizData.length}`;
  questionNumber.textContent = `Q${current + 1}`;
  questionText.textContent = q.question;

  choicesEl.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => selectAnswer(i));
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const q = quizData[current];
  const buttons = choicesEl.querySelectorAll('.choice-btn');
  buttons.forEach(btn => btn.disabled = true);

  if (index === q.answer) {
    score++;
    buttons[index].classList.add('correct');
    feedbackEl.innerHTML = `✅ <strong>正解！</strong><br>${q.explanation}`;
  } else {
    buttons[index].classList.add('wrong');
    buttons[q.answer].classList.add('correct');
    feedbackEl.innerHTML = `❌ <strong>不正解。</strong>正解は「${q.choices[q.answer]}」です。<br>${q.explanation}`;
  }

  feedbackEl.style.display = 'block';
  nextBtn.style.display = 'block';
  nextBtn.textContent = current + 1 < quizData.length ? '次の問題へ →' : '結果を見る 🌺';
}

nextBtn.addEventListener('click', () => {
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionBox.style.display = 'none';
  choicesEl.style.display = 'none';
  feedbackEl.style.display = 'none';
  nextBtn.style.display = 'none';
  progressEl.style.display = 'none';
  resultBox.style.display = 'block';

  scoreText.textContent = `${score} / ${quizData.length}`;

  const ratio = score / quizData.length;
  if (ratio === 1) {
    scoreComment.textContent = '満点！琉球王国の歴史マスターです！';
  } else if (ratio >= 0.75) {
    scoreComment.textContent = 'すばらしい！琉球通ですね。';
  } else if (ratio >= 0.5) {
    scoreComment.textContent = 'もう少し！歴史を振り返ってみましょう。';
  } else {
    scoreComment.textContent = '琉球の歴史をもっと学んでみましょう！';
  }
}

retryBtn.addEventListener('click', () => {
  current = 0;
  score = 0;
  questionBox.style.display = 'block';
  choicesEl.style.display = 'grid';
  progressEl.style.display = 'block';
  resultBox.style.display = 'none';
  loadQuestion();
});

loadQuestion();
