const gameContainer = document.querySelector('#gameContainer')
const lives = document.querySelector('#lives')
let playerLives = 6

// add lives count
lives.textContent = playerLives

// play button 
function play() {
  const playBtn = document.querySelector('#playBtn');

  // add bg Music
  playBtn.addEventListener('click', () => {

    const game = document.querySelector('.game')
    game.removeChild(game.firstElementChild)

    // change play button style
    setTimeout(() => {
      playBtn.disabled = true;
      playBtn.style.opacity = .5;
      playBtn.style.color = "white";
      playBtn.style.backgroundColor = "rgb(25, 135, 84)"
    }, 100);

    // add Cards
    addCards()

    // show all cards for a seconds
    const card = document.querySelectorAll('.card')
    setTimeout(() => {
      card.forEach( e => {
        e.classList.toggle('toggle')
      })
      playAudio('audio/flipCard.wav')
    }, 500);
    setTimeout(() => {
      card.forEach( e => {
        e.classList.toggle('toggle')
      })
    }, 2000);
  })
}

// array of images
function imgArray() {
  const arr = [
    { imgSrc: 'images/bear.png', name: 'bear' },
    { imgSrc: 'images/dog.png', name: 'dog' },
    { imgSrc: 'images/elephant.png', name: 'elephant' },
    { imgSrc: 'images/bunny.jpg', name: 'bunny' },
    { imgSrc: 'images/cat.png', name: 'cat' },
    { imgSrc: 'images/frog.png', name: 'frog' },
    { imgSrc: 'images/panda.png', name: 'panda' },
    { imgSrc: 'images/hamster.png', name: 'hamster' },
  ];
   return [...arr, ...arr]
}

// shuffle images
function shuffleImg() {
  const images = imgArray()

  for (let i = images.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * images.length);
    [ images[i], images[random] ] = [ images[random], images[i] ];
  }   
  return images
}

// append cards
function addCards() {
  const images = shuffleImg()

  // add cards to the section
  images.forEach( e => {
    const card = document.createElement('div')
    const front = document.createElement('img')
    const back = document.createElement('img')

    // add classes
    card.classList.add('card')
    front.classList.add('front')
    back.classList.add('back')

    // add imgs to front and back
    front.src = e.imgSrc
    back.src = 'images/playingCard.png'

    // attribute alt
    card.setAttribute('alt', e.name)

    // append cards to gameContainer and images to card
    gameContainer.appendChild(card)
    card.appendChild(front)
    card.appendChild(back)
    
    // flip cards
    card.addEventListener('click', e => {
      playAudio('audio/flipCard.wav')
      card.classList.toggle('toggle');

      checkCards(e)

    })
  })
}

// check cards are matching
function checkCards(e) {
  const clickedCArd = e.target;
    clickedCArd.classList.add('flipped')

  const flipped = document.querySelectorAll('.flipped')
  const toggle = document.querySelectorAll('.toggle')

  if(flipped.length === 2) {
    if(flipped[0].getAttribute('alt') === flipped[1].getAttribute('alt')) {
      flipped.forEach( card => {
        card.classList.remove('flipped')
        card.style.pointerEvents = 'none'
        playAudio('audio/match.wav');
      })
    } else {
      flipped.forEach( card => {
        card.classList.remove('flipped')
        setTimeout( () => {card.classList.remove('toggle')}, 500)
      })
      playerLives--
      lives.textContent = playerLives

      if (playerLives === 0) {
        end('🙀 OH NO! Try Again.')
        playAudio('audio/tryAgain.mp3')
      }
    }
  }

  if (toggle.length === 16){
    end('👏 You Won!')
  }
}

// restart 
function end(text) {
  let images = shuffleImg()
  let front = document.querySelectorAll('.front')
  let card = document.querySelectorAll('.card')

  gameContainer.style.pointerEvents = 'none';

  // loop through the shuffled images
  images.forEach( (e, i) => {
    // flip all the cards back when out of lives
    card[i].classList.remove('toggle')

    // shuffle the images again
    setTimeout(() => {
      card[i].style.pointerEvents = 'all'
      front[i].src = e.imgSrc
      card[i].setAttribute('alt', e.name)
      gameContainer.style.pointerEvents = 'all';
    }, 1000);

    // change play button style
    setTimeout(() => {
      playBtn.disabled = false
      playBtn.style.opacity = 1
      playBtn.style.color = "rgb(25, 135, 84)"
      playBtn.style.backgroundColor = "white"
    }, 100);
})

  // restart the lives
  playerLives = 6;
  lives.textContent = playerLives

  // show all cards for a seconds
  setTimeout(() => {
    card.forEach( e => {
      e.classList.toggle('toggle')
    })
    playAudio('audio/flipCard.wav')
  }, 1500);
  setTimeout(() => {
    card.forEach( e => {
      e.classList.toggle('toggle')
    })
  }, 2500);
  

  // 
  setTimeout(() => {alert(text)}, 100);
}

// play audio
function playAudio(audio) {
  const clickAudio = new Audio(audio);
  clickAudio.play();
}

play()

