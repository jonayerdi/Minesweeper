
var mines = [];

//Returns the color for the discovered square
function getSquareColor(value) {
	switch (value) {
		case 1:
		return "blue";
		break;
		case 2:
		return "green";
		break;
		case 3:
		return "red";
		break;
		case 4:
		return "magenta";
		break;
		case 5:
		return "pink";
		break;
		case 6:
		return "orange";
		break;
		case 7:
		return "brown";
		break;
		default:
		return "black";
		break;
	}
}

//Returns * if it's a mine, or the number of mines it has around
function getSquareValue(x,y) {
	var surroundMines = 0;
	for(var i = 0 ; i < mines.length ; i++) {
		var current = mines[i];
		if(Math.abs(current.x-x)<2 && Math.abs(current.y-y)<2) {
			if(current.x == x && current.y == y) return '*';
			else surroundMines++;
		}
	}
	return (surroundMines==0 ? '':surroundMines);
}

//Creates m random positions within x and y
function initMines(x,y,m) {
	mines = [];
	var placedMines = 0;
	while(placedMines < m) {
		var mine = {x:Math.floor((Math.random() * x)), y:Math.floor((Math.random() * y))};
		if(getSquareValue(mine.x, mine.y) != '*') {
			mines.push(mine);
			placedMines++;
		}
	}
}

//Discovers all mines (you lost)
function discoverAllMines() {
	for(var i = 0 ; i < mines.length ; i++) {
		var m = mines[i];
		$square = $('#s'+m.x+"-"+m.y);
		$square.removeClass("undiscovered");
		$square.html('*');
		$square.addClass("boom");
	}
	$(".undiscovered").removeClass("undiscovered");
}

//Discovers the square
function discover(x,y) {
	$square = $('#s'+x+"-"+y);
	if($square.hasClass("undiscovered")) {
		$square.removeClass("undiscovered");
		//Discover surrounding squares if empty
		if(getSquareValue(x,y)=='') {
			for(var i = -1 ; i <=1 ; i++ ) {
				for(var j = -1 ; j <= 1 ; j++ ) {
					discover(x+i,y+j);
				}
			}
		}
		//Discover square
		$square = $('#s'+x+"-"+y);
		squareValue = getSquareValue(x,y);
		$square.html(squareValue);
		if(squareValue=='*') {
			$square.addClass("boom");
			discoverAllMines();
		}
		else {
			$square.css("color",getSquareColor(squareValue));
		}
	}
}

