const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    }).catch(err => {
      console.error("Oh no", err);
    });
}
getVideo();

function videoTocanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  console.log(video.src);

  return setInterval(() =>{
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    //effect
    // pixels = redEffect(pixels);
    //REpaint
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}
video.addEventListener("canplay",videoTocanvas);

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const picdata = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = picdata;
  link.download = 'haha';
  link.innerHTML = `<img src="${picdata}" alt="">`;
  // strip.appendChild(link);
  strip.insertBefore(link,strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}