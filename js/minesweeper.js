
var $minesweeper;

var $lbWidth;
var $lbHeight;
var $lbMines;

var currentMode;
	
var width;
var height;
var mines;

var customWidth = 8;
var customHeight = 8;
var customMines = 10;

var mineLocations = [];
var discovered = 0;

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
	for(var i = 0 ; i < mineLocations.length ; i++) {
		var current = mineLocations[i];
		if(Math.abs(current.x-x)<2 && Math.abs(current.y-y)<2) {
			if(current.x == x && current.y == y) return '*';
			else surroundMines++;
		}
	}
	return (surroundMines==0 ? '':surroundMines);
}

//Creates m random positions within x and y
function initMines(x,y,m) {
	mineLocations = [];
	discovered = 0;
	var placedMines = 0;
	while(placedMines < m) {
		var mine = {x:Math.floor((Math.random() * x)), y:Math.floor((Math.random() * y))};
		if(getSquareValue(mine.x, mine.y) != '*') {
			mineLocations.push(mine);
			placedMines++;
		}
	}
}

//Builds the board table
function buildBoard() {
	var device_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	var device_height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var size = (device_width > device_height) ? device_height/(parseInt(height)+3) : device_width/(parseInt(width)+1);
	$minesweeper.empty();
	$minesweeper.append("<table class=\"board-table\"></table>");
	var $board_table = $(".board-table");
	for(var i = 0 ; i < height ; i++) {
		$board_table.append("<tr id=\"row"+i+"\" height='"+size+"' width='"+size+"'></tr>");
		var $board_row = $("#row"+i);
		for(var j = 0 ; j < width ; j++) {
			$board_row.append("<td onclick=\"discover("+i+","+j+")\" id=\"s"+i+"-"+j+"\" height='"+size
			+"' width='"+size+"' class='undiscovered' style=\"font-size:"+size/2+"px;\"></td>");
		}
	}
	initMines(height,width,mines);
}

//Discovers all mines (you lost)
function discoverAllMines() {
	for(var i = 0 ; i < mineLocations.length ; i++) {
		var m = mineLocations[i];
		$square = $('#s'+m.x+"-"+m.y);
		$square.removeClass("undiscovered");
		$square.html('*');
		$square.addClass("boom");
	}
	var $undiscovered = $(".undiscovered");
	$undiscovered.addClass("disabled");
	$undiscovered.removeClass("undiscovered");
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
			discovered++;
		}
	}
}

