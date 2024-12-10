document.addEventListener('DOMContentLoaded',pageLoad)

function pageLoad(){
	var textbox = document.getElementById('textbox');
	textbox.addEventListener('keydown', enterKeyPress);
}

function enterKeyPress(event){
	if(event.key === 'Enter'){
		console.log('Press your Enter key.')
	}
}
console.log("Update!!")
