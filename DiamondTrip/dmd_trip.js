var view = {
    displayMessage: function(msg){
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

var model = {
	boardSize: 5,
	numDiamonds: 3,
	diamondLength: 1,
	diamondFound: 0,
	diamonds: [{locations: ["10"], hits:[""]}, {locations: ["02"], hits:[""]}, {locations: ["23"], hits:[""]}],

	fire: function(guess){
		for(var i = 0; i < this.numDiamonds; i++){

    		var dmd = this.diamonds[i];   
    		var index = dmd.locations.indexOf(guess);

    		if(index >= 0){
    			dmd.hits[index]="hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");
				if(this.isFound(dmd)){
					view.displayMessage("You Find A DIAMOND! Congratulations! Good Job!");
					this.diamondFound++;		
				}
				return true;
    		}
		}
		view.displayMiss(guess);
		view.displayMessage("I'm Sorry But You Missed It...Try Again Then?!");
		return false;
		},

		isFound: function(dmd){
			for(var i = 0; i < this.diamondLength; i++){
				if(dmd.hits[i] !=="hit")
				return false;
			}
			return true;
		}
};

var controller = {
	guesses: 0,
	processGuess: function(guess){
		var location = this.parseGuess(guess);
		if(location){
			this.guesses++;
			var hit = model.fire(location);
			if(hit && model.diamondFound === model.numDiamonds){
				view.displayMessage("You Hit All the Diamonds, In " + this.guesses + " Guesses! Therefore, You Win! Cheers!");
			}
		}
	},
	parseGuess: function(guess){
		var alpha = ["A", "B", "C", "D", "E"];
		if(guess === null || guess.length !== 2){
			alert("Oops, oops, something goes wrong! Please enter a code on the board!");
		}else{
			firstChar=guess.charAt(0);
			var row=alpha.indexOf(firstChar);
			var column = guess.charAt(1);
			if(isNaN(row) || isNaN(column)){
				alert("Not a number?!");
			}else if(row < 0 || row >= model.boardsize || column < 0 || column >= model.boardsize){
				alert("Out of boundary, where are you heading for?");
			}else{
				return row + column;
			}
		}
		return null;
	}

};

function handleFireButton(){
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	console.log("value is" + guess);
	console.log("start to process guess-->");
	controller.processGuess(guess);
	console.log("after process guess>>>");
	controller.value = "";
	console.log("reset controller value");
}

function init(){
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	console.log("click firebutton");
}

window.onload = init;

