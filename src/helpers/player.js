export function playSong() {
  const kahoot = document.getElementById('kahoot');
  kahoot.play();
  kahoot.volume = 0.15;
}

export function pauseSong() {
  const kahoot = document.getElementById('kahoot');
  kahoot.pause();
}
