let timer;
let targetTime = 0;
let remainingSeconds = 0;
let isRunning = false;

// 音のファイルをロードする
const alarmSound = new Audio('alarm.mp3');

const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopSoundButton = document.getElementById('stop-sound');
const resetButton = document.getElementById('reset');
const targetInput = document.getElementById('target-time');

function formatTime(sec) {
  const mins = Math.floor(sec / 60);
  const secs = sec % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning && targetInput.value > 0) {
    targetTime = parseInt(targetInput.value, 10) * 60;
    remainingSeconds = targetTime;
    isRunning = true;
    timer = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        timerElement.textContent = formatTime(remainingSeconds);
      } else {
        clearInterval(timer);
        alarmSound.play();  // 時間がゼロになったら音を再生
        stopSoundButton.style.display = "inline"; // 音を止めるボタンを表示
        alert('時間になりました！');
      }
    }, 1000);
  }
}

function stopSound() {
  alarmSound.pause();  // 音を止める
  alarmSound.currentTime = 0;  // 再生位置をリセット
  stopSoundButton.style.display = "none";  // 音を止めるボタンを非表示
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  remainingSeconds = 0;
  timerElement.textContent = '00:00';
  targetInput.value = '';
  stopSoundButton.style.display = "none"; // 音を止めるボタンを非表示
  alarmSound.pause();  // 念のため音も止める
  alarmSound.currentTime = 0;
}

startButton.addEventListener('click', startTimer);
stopSoundButton.addEventListener('click', stopSound);
resetButton.addEventListener('click', resetTimer);
