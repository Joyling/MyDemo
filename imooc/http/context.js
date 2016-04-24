// var pet = {
// 	words: '...',
// 	speak:function(){
// 		console.log(this.words)
// 		console.log(this===pet)
// 	}
// }

// pet.speak()

// function pet(words){
// 	this.words = words

// 	console.log(this.words)
// 	console.log(this===global)
// }

// pet('...')

function Pet(words){
	this.words = words
	this.speak = function(){
		console.log(this.words)
		console.log(this)
	}
}

var cat = new Pet('miao')
cat.speak()