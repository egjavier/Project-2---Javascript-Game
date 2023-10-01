const gameContainer = document.querySelector('#gameContainer')
const lives = document.querySelector('#lives')
let playerLives = 6

// add lives count
lives.textContent = playerLives

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
  const cards = document.querySelectorAll('.card')

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

  if(flipped.length === 2) {
    if(flipped[0].getAttribute('alt') === flipped[1].getAttribute('alt')) {
      flipped.forEach( card => {
        card.classList.remove('flipped')
        card.style.pointerEvents = 'none'
      })
    } else {
      console.log('not matched')
      flipped.forEach( card => {
        card.classList.remove('flipped')
        setTimeout( () => {card.classList.remove('toggle')}, 500)
      })
      playerLives--
      lives.textContent = playerLives

      if (playerLives === 0) {
        end()
      }
    }
  }
}

// restart 
function end() {
  let images = shuffleImg()
  let front = document.querySelectorAll('.front')
  let card = document.querySelectorAll('.card')

  // loop through the shuffled images
  images.forEach( (e, i) => {
    // flip all the cards back when out of lives
    setTimeout(() => {
      card[i].classList.remove('toggle')
    }, 1000);


  })

  // restart the lives
  playerLives = 6;
  lives.textContent = playerLives
}

// play audio
function playAudio(audio) {
  const clickAudio = new Audio(audio);
  clickAudio.play();
}

console.log(addCards())
