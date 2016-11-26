
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

function applySettings(mode) {
	switch (mode) {
		case 'easy':
			width = 8;
			height = 8;
			mines = 10;
		break;
		case 'medium':
			width = 16;
			height = 16;
			mines = 40;
		break;
		case 'hard':
			width = 24;
			height = 24;
			mines = 99;
		break;
		default:
			width = customWidth;
			height = customHeight;
			mines = customMines;
		break;
	}
	
	$('#' + currentMode).toggleClass('pressed');
	$('#' + currentMode).toggleClass('depressed');
	$('#' + mode).toggleClass('pressed');
	$('#' + mode).toggleClass('depressed');
	currentMode = mode;
	
	$lbWidth.prop('readOnly', false)
	$lbHeight.prop('readOnly', false)
	$lbMines.prop('readOnly', false)
	$lbWidth.val(width);
	$lbHeight.val(height);
	$lbMines.val(mines);
	$lbWidth.prop('readOnly', mode!='custom')
	$lbHeight.prop('readOnly', mode!='custom')
	$lbMines.prop('readOnly', mode!='custom')
}

function checkSettings() {
	if($lbWidth.val()<8) {$lbWidth.val(8);}
	else if($lbWidth.val()>32) {$lbWidth.val(32);}
	if($lbHeight.val()<8) {$lbHeight.val(8);}
	else if($lbHeight.val()>32) {$lbHeight.val(32);}
	width = parseInt($lbWidth.val());
	height = parseInt($lbHeight.val());
	if($lbMines.val()<1) {$lbMines.val(1);}
	else if($lbMines.val()>width*height) {$lbMines.val(width*height);}
	mines = $lbMines.val();
	customWidth = width;
	customHeight = height;
	customMines = mines;
	buildBoard();
}

function buildBoard() {
	var device_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	var device_height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var size = (device_width > device_height) ? device_height/(parseInt(height)+5) : device_width/(parseInt(width)+1);
	$minesweeper.empty();
	$minesweeper.append("<table class=\"board-table\"></table>");
	var $board_table = $(".board-table");
	for(var i = 0 ; i < height ; i++) {
		$board_table.append("<tr id=\"row"+i+"\" height='"+size+"' width='"+size+"'></tr>");
		var $board_row = $("#row"+i);
		for(var j = 0 ; j < width ; j++) {
			$board_row.append("<td id=\"s"+i+"."+j+"\" height='"+size+"' width='"+size+"'></td>");
		}
	}
}

$(document).ready(function() {
	$minesweeper = $('#minesweeper');
	$lbWidth = $('#lbWidth');
	$lbHeight = $('#lbHeight');
	$lbMines = $('#lbMines');
	applySettings('easy');
	buildBoard();
    $('.mode-btn').click(function() {
    	applySettings($(this).attr('id'));
		buildBoard();
    });
	$('.config-input').change(function() {
		checkSettings();
	});
	$("a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(hash).offset().top
        }, 600, function(){
			
		});
	});
});

window.onresize = function(event) {
    buildBoard();
};
