const btns = document.querySelectorAll('.timer__button');
const left = document.querySelector('.display__time-left');
const end = document.querySelector('.display__end-time');
const input = document.querySelector('input[type="text"]');
let countInterval;

function timer(seconds) {
  clearInterval(countInterval);
  displayTime(seconds);

  countInterval = setInterval(function () {
    seconds--;
    displayTime(seconds);

    if (seconds <= 0) {
      clearInterval(countInterval);
    }
  },1000)
}

function displayTime(seconds) {
  const sec = seconds % 60;
  const min = (seconds - sec) / 60;
  left.innerHTML = `${min}:${(sec < 10 ? '0' : '') + sec}`;

  const now = Date.now();
  const endtime = new Date(now + seconds*1000)
  end.innerHTML = `Be Back At ${endtime.getHours()}:${(endtime.getMinutes() < 10 ? '0' : '') + endtime.getMinutes()}`;
}

btns.forEach(btn => btn.addEventListener('click', function () {
  timer(this.dataset.time);
}))

document.customForm.addEventListener('submit',function (e) {
  e.preventDefault();
  timer(this.minutes.value*60);
  this.reset();
})