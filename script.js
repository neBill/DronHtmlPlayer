const songs = {
  0 : 'Иные времена.mp3',
  1 : 'Частушки - пофигушки.mp3',    
  2 : 'Рассказ брачного агента, бывшего евнуха.mp3',
  3 : 'Свободная частица.mp3',
  4 : 'Любовное чтиво.mp3',
  5 : 'Астрологическая песня.mp3',
  6 : 'Деревенька.mp3',
  7 : 'Случай в Кремле.mp3',
  8 : 'Суррогаты.mp3',
  9 : 'Включайте поворотники.mp3',
  10 : 'Разговор с поэтом.mp3',
  11 : 'Марш гедонистов.mp3',
  12 : 'Разговор с критиком.mp3',
  13 : 'Инь и Ян.mp3',
  14 : 'Былина о попсе.mp3',
  15 : 'Кто стучится в дверь ко мне.mp3',
  16 : 'Товарищи учёные - 30 лет спустя.mp3',
  17 : 'Хоронила мафия....mp3',
  18 : 'Аутотренинг.mp3',
  19 : 'Цыганская песня.mp3',
  20 : 'О судьбе интеллигенции.mp3',
  21 : 'Сказки нашего времени.mp3',
  22 : 'Волшебство виски.mp3',
  23 : 'Перспективы.mp3',
  24 : 'Вредная песня.mp3'
} 

// const songs = {

//   0 : 'Волшебство виски.mp3',
//   1 : 'Перспективы.mp3',
//   2 : 'Вредная песня.mp3'

// }



const audio = document.createElement('audio'),
  player = document.querySelector('.player_container'),
  slider_container = document.querySelector('.slider_container'),
  play_btn = document.querySelector('#play_track'),
  next_btn = document.querySelector('#next_track'),
  prev_btn = document.querySelector('#prev_track'),
  slider = document.querySelector('.slider'),
  curr_time = document.querySelector('.current_time'),
  total_duration = document.querySelector('.total_duration'),
  track_list = document.querySelector('#buttons_container')

let track_index = 0


function getTrackPath(index){  

  return `music/${songs[index]}`

}


window.addEventListener("DOMContentLoaded", ()=>{

  createButtons(Object.keys(songs).length) 
  loadTrack(track_index)   

})

window.addEventListener('load', function() {
  window.history.pushState({}, '')
})

window.addEventListener('popstate', function() {
  window.history.pushState({}, '')
})






// audio.addEventListener("loadedmetadata", (event) => {
//   // console.log(
//   //   "The duration and dimensions of the media and tracks are now known.",
//   // );





// });

function createButtons(count){
  for(let i = 0; i < count; i++){
    let btn = document.createElement('button')
    btn.innerText=songs[i].replace('.mp3', '')
    btn.className = 'song_button'
    btn.id = i
    btn.color = 'var(--button-color)'
    track_list.appendChild(btn)
  }
}

function loadTrack(track_index){  
 
  audio.src = getTrackPath(track_index) 

}


function updateProgress(e){

  const {duration, currentTime} = e.srcElement  
  const progressPersent = (currentTime / duration) * 100;
  slider.style.width = `${progressPersent}%`;

  caclulateProgress(duration, currentTime)

  
}

audio.addEventListener('timeupdate', updateProgress)

function setProgress(e){  

  //console.log(audio.duration)

  const width = e.target.clientWidth
  const click = e.offsetX 
  const duration = audio.duration
  audio.currentTime = (click / width) * duration
 
  // console.log((click / width) * duration)
}

slider_container.addEventListener('click', setProgress)



play_btn.addEventListener('click', () => {

  const isPlaying = player.classList.contains('play')

  if(isPlaying) {

    pauseTrack()

  } else {


    playTrack()

  }

});

function playTrack() {  

  player.classList.add('play')
  document.getElementById(track_index).style.color = 'var(--button-pressed-color)'
  audio.play()
  play_btn.innerText = 'II'
}

function pauseTrack() {

  player.classList.remove('play')  
  audio.pause(); 
  play_btn.innerText = '>'
}



function nextTrack() {

  audio.pause();
  audio.currentTime = 0;

  

  document.getElementById(track_index).style.color = 'var(--button-color)' 

  track_index++

  //alert(songs.length)

  const songsLength = Object.keys(songs).length - 1

  if (track_index > songsLength) {

   // alert(track_index)
    track_index = 0
  }

  //alert(track_index)

  loadTrack(track_index)
  playTrack()

}

next_btn.addEventListener('click', nextTrack)



function prevTrack() {

  document.getElementById(track_index).style.color = 'var(--button-color)'

  track_index--

  if (track_index <  0) {

    track_index = 0
  }

  loadTrack(track_index)
  playTrack()
}

prev_btn.addEventListener('click', prevTrack)


document.addEventListener('click', event => {

  const btnClass = event.target.className

  if(btnClass === 'song_button') {

    document.getElementById(track_index).style.color = 'var(--button-color)' 

    track_index = event.target.id
    
    loadTrack(track_index)

    playTrack()    

  }   

})



audio.addEventListener('ended', nextTrack)


// function resetValues() {
//   curr_time.textContent = "00:00";
//   total_duration.textContent = "00:00";
//   // slider.value = 0;
// }



function caclulateProgress(duration, currentTime) { 

  //alert(duration)

  // Check if the current track duration is a legible number
  if (!isNaN(duration)) {
    
   

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }  

   
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;

    
  }    


}







