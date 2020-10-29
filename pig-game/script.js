"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
// const score1El = document.getElementById("score--1");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// test
// score0El.textContent = 0;
// score1El.textContent = 0;

// classList : 기존 class에 새로운 클래스명 추가
// diceEl.classList.add("hidden");      //hidden 을 추가해서 css에서 미리 정의해둔 display: none을 적용함

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  //player1을 시작player로 지정
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. 랜덤 주사위 번호 생성
    const dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display dice roll
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. 나온 숫자가 1인지 확인
    if (dice !== 1) {
      // 1이 아니면 current score에 표시
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // 1이면 switchPaleyr
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    // 1. Add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. score가 100이상인지 확인
    if (scores[activePlayer] >= 100) {
      // current player가 우승, 게임 종료
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 100미만이면 switchPlayer
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
