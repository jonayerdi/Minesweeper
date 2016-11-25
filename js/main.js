
var currentMode;

var $lbWidth;
var $lbHeight;
var $lbMines;
	
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

function buildBoard() {
	
}

$(document).ready(function() {
	$lbWidth = $('#lbWidth');
	$lbHeight = $('#lbHeight');
	$lbMines = $('#lbMines');
	applySettings('easy');
    $('.mode-btn').click(function() {
    	applySettings($(this).attr('id'));
		buildBoard();
    });
	$('.config-input').change(function() {
		width = $lbWidth.val();
		height = $lbHeight.val();
		mines = $lbMines.val();
		customWidth = width;
		customHeight = height;
		customMines = mines;
		buildBoard();
	});
});