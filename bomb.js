var time, interval;
var timerDisp = document.getElementById('timer')

document.addEventListener('DOMContentLoaded', function(){

	// Add event handler for start/reset button
	document.getElementById('reset').addEventListener('click', start)
})

function start(){
	
	// Set up the wires
	addWireListeners()
	
	// Start the siren
	document.getElementById('hot').pause()
	document.getElementById('win').pause()
	document.getElementById('siren').play()
	
	// Set the initial time AND display it to the user
	time = 30
	timerDisp.style.color ="chartreuse"
	timerDisp.textContent = time
	document.getElementById('message').textContent = ''

	// Change the button text to Reset
	this.textContent = 'Restart Game';
	
	// Make sure Unexploded is showing
	document.getElementsByTagName('body')[0].classList.remove('exploded')
	document.getElementsByTagName('body')[0].classList.add('unexploded')
	// Display some text that shows while the game runs
	
	//document.getElementById('message').display = "block"
	
	// Clear any previous intervals
	clearInterval(interval)
	
	// Start our timer
	interval = setInterval(tick,1000)
}

function tick(){
	// Subtract a second

	time -=1
	console.log("tick", time)

	// Display time left to the user
	timerDisp.textContent = time

	// Change color at certain time points
	if (time===19){
		timerDisp.style.color ="yellow"

	} else if (time===9){
		timerDisp.style.color ="red"
		document.getElementById('message').textContent = 'Hurry up!'
	} else if (time<=0){
		timerDisp.style.color ="black"
		
		// boom
		loseGame()

		
		}
}

function endGame(result){
	clearInterval(interval)
	document.getElementById('siren').pause()
	document.getElementById('message').textContent = result
	removeWireListeners()
}

function winGame (){
	//call endGame
	console.log('YOU WIN')
	endGame('win')

	// Stop the timer
	document.getElementById('win').play()
	document.getElementById('message').textContent = 'WINNER WINNER!'
	//var winSound = document.getElementById('win')
	//winSound.addEventListener('ended', function(){
			//after crowd cheer
			var winSound = function(){document.getElementById('hot').play()}
			setTimeout(winSound, 6000)

	//})


	//remove event listeners
}

function loseGame(){
	endGame('lose')
	console.log('YOU LOSE')
	document.getElementsByTagName('body')[0].classList.remove('unexploded')
	document.getElementsByTagName('body')[0].classList.add('exploded')
	document.getElementById('message').textContent = 'You Lose!'
	document.getElementById('explode').play()
	//remove event listeners
}

function addWireListeners(){
	// Grab all the img tags for the wires (load into array)
	var wireImages = document.querySelectorAll('#box img')
	console.log(wireImages)

	for(var i =0; i < wireImages.length; i++){

		// Make sure image is uncut
		wireImages[i].src = 'img/uncut-' + wireImages[i].id + '-wire.png'
		
		// Assign (randomly) hot or cold wire
		wireImages[i].setAttribute('data-cut',(Math.random() > 0.5).toString())

		//  Add click event listener to wires to see if they are getting cut]
		wireImages[i].addEventListener('click',cutWire)
		// Add click event listener to wires
		console.log(wireImages[i])

	}
	// TODO: handle all good / all bad wires
	if(checkWinCondition()){
		addWireListeners()

	}
}

function removeWireListeners(){

	var wireImages = document.querySelectorAll('#box img')

	for(var i =0; i < wireImages.length; i++){
		wireImages[i].removeEventListener('click', cutWire)

	}
}

function cutWire(){
	console.log('The', this.id, 'wire got clicked')
	//chage image to cutt
	this.src = 'img/cut-' + this.id + '-wire.png'
	
	//check if good or bad wire	
	if (this.getAttribute('data-cut') === 'true'){
		//Yess I was supposed to cut it, play buzz sound
		document.getElementById('cut').play()

		// Make the data-cut attribute false so we don't think it still needs to be cut
		this.setAttribute('data-cut', 'false')
		this.removeEventListener('click', cutWire)

		//Check if I win the game
		if(checkWinCondition()){

			//  Yay
			winGame()
		}

	} else {
		//boom
			loseGame();

	}
}

function checkWinCondition() { 

	// Grab all the img tags for the wires (load into array)
	var wireImages = document.querySelectorAll('#box img')

	for(var i = 0; i < wireImages.length; i++){
		if (wireImages[i].getAttribute('data-cut') === 'true'){
			return false
		}		
	}
	return true
}





