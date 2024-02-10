const recordBtns = document.querySelectorAll('.record-btn');
const recordBtnOne = document.querySelector('.record-btn--one');
const recordBtnTwo = document.querySelector('.record-btn--two');
const recordBtnThree = document.querySelector('.record-btn--three');
const recordBtnFour = document.querySelector('.record-btn--four');
const playBtnOne = document.querySelector('.play-btn--one');
const playBtnTwo = document.querySelector('.play-btn--two');
const playBtnThree = document.querySelector('.play-btn--three');
const playBtnFour = document.querySelector('.play-btn--four');

const metronomeStart = document.querySelector('.metronome-start-btn');
const metronomeStop = document.querySelector('.metronome-stop-btn');

const tempoInp = document.querySelector('.tempo');

document.addEventListener('keypress', onKeyPress);

const KeyToSound = {
  q: document.querySelector('#sound1'),
  w: document.querySelector('#sound2'),
  e: document.querySelector('#sound3'),
  r: document.querySelector('#sound4'),
  t: document.querySelector('#sound5'),
  y: document.querySelector('#sound6'),
};

let tempoInterval;

const startMetronome = function () {
  tempoInterval = setInterval(function () {
    playSound(KeyToSound.q);
    console.log('x');
  }, tempoInp.value * 1000);
};

metronomeStart.addEventListener('click', startMetronome);
metronomeStop.addEventListener('click', function () {
  clearInterval(tempoInterval);
  console.log(tempoInterval);
});

let recordingStartTime0;
let recordingStartTime1;
let recordingStartTime2;
let recordingStartTime3;

let songNotes0 = [];
let songNotes1 = [];
let songNotes2 = [];
let songNotes3 = [];

function onKeyPress(event) {
  const sound = KeyToSound[event.key];
  playSound(sound);
}

recordBtnOne.addEventListener('click', function (e) {
  toggleRecording(recordBtnOne);
});
recordBtnTwo.addEventListener('click', function (e) {
  toggleRecording(recordBtnTwo);
});
recordBtnThree.addEventListener('click', function (e) {
  toggleRecording(recordBtnThree);
});
recordBtnFour.addEventListener('click', function (e) {
  toggleRecording(recordBtnFour);
});

function playSound(sound) {
  if (sound) {
    if (isRecording(recordBtnOne)) {
      recordSound(sound, recordBtnOne);
    }
    if (isRecording(recordBtnTwo)) {
      recordSound(sound, recordBtnTwo);
    }
    if (isRecording(recordBtnThree)) {
      recordSound(sound, recordBtnThree);
    }
    if (isRecording(recordBtnFour)) {
      recordSound(sound, recordBtnFour);
    }
    sound.currentTime = 0;
    sound.play();
  }
}

function toggleRecording(clickedBtn) {
  clickedBtn.classList.toggle('active');
  if (isRecording(clickedBtn)) {
    startRecording(clickedBtn);
  }
  //  else {
  //   stopRecording(clickedBtn);
  // }
}

function isRecording(clickedBtn) {
  return clickedBtn != null && clickedBtn.classList.contains('active');
}

function startRecording(clickedBtn) {
  if (clickedBtn === recordBtnOne) {
    recordingStartTime0 = Date.now();
    songNotes0 = [];
  }
  if (clickedBtn === recordBtnTwo) {
    recordingStartTime1 = Date.now();
    songNotes1 = [];
  }
  if (clickedBtn === recordBtnThree) {
    recordingStartTime2 = Date.now();
    songNotes2 = [];
  }
  if (clickedBtn === recordBtnFour) {
    recordingStartTime3 = Date.now();
    songNotes3 = [];
  }
}

// function stopRecording(clickedBtn) {
//   playSong(clickedBtn);
// }

playBtnOne.addEventListener('click', function () {
  if (songNotes0.length > 0) {
    songNotes0.forEach(note => {
      setTimeout(() => {
        playSound(note.key);
      }, note.startTime);
    });
  }
});

playBtnTwo.addEventListener('click', function () {
  if (songNotes1.length > 0) {
    songNotes1.forEach(note => {
      setTimeout(() => {
        playSound(note.key);
      }, note.startTime);
    });
  }
});

playBtnThree.addEventListener('click', function () {
  if (songNotes2.length > 0) {
    songNotes2.forEach(note => {
      setTimeout(() => {
        playSound(note.key);
      }, note.startTime);
    });
  }
});

playBtnFour.addEventListener('click', function () {
  if (songNotes3.length > 0) {
    songNotes3.forEach(note => {
      setTimeout(() => {
        playSound(note.key);
      }, note.startTime);
    });
  }
});

// function playSong(clickedBtn) {
//   if (clickedBtn === recordBtnOne) {
//     if (songNotes0.length > 0) {
//       songNotes0.forEach(note => {
//         setTimeout(() => {
//           playSound(note.key);
//         }, note.startTime);
//       });
//     }
//   }
//   if (clickedBtn === recordBtnTwo) {
//     if (songNotes1.length > 0) {
//       songNotes1.forEach(note => {
//         setTimeout(() => {
//           playSound(note.key);
//         }, note.startTime);
//       });
//     }
//   }
//   if (clickedBtn === recordBtnThree) {
//     if (songNotes2.length > 0) {
//       songNotes2.forEach(note => {
//         setTimeout(() => {
//           playSound(note.key);
//         }, note.startTime);
//       });
//     }
//   }
//   if (clickedBtn === recordBtnFour) {
//     if (songNotes3.length > 0) {
//       songNotes3.forEach(note => {
//         setTimeout(() => {
//           playSound(note.key);
//         }, note.startTime);
//       });
//     }
//   }
// }

function recordSound(sound, clickedBtn) {
  if (clickedBtn === recordBtnOne) {
    songNotes0.push({
      key: sound,
      startTime: Date.now() - recordingStartTime0,
    });
  }
  if (clickedBtn === recordBtnTwo) {
    songNotes1.push({
      key: sound,
      startTime: Date.now() - recordingStartTime1,
    });
  }
  if (clickedBtn === recordBtnThree) {
    songNotes2.push({
      key: sound,
      startTime: Date.now() - recordingStartTime2,
    });
  }
  if (clickedBtn === recordBtnFour) {
    songNotes3.push({
      key: sound,
      startTime: Date.now() - recordingStartTime3,
    });
  }
}
