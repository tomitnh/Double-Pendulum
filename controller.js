/***********
 * Controller.js 
 *
 * Controls frame animation and drawing on the canvas
 */

var fps = 15; // Standard frames per second
window.setInterval(animate, 1000/fps);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var r1 = 100;	// rod-1 length
var r2 = 100;	// rod-2 length
var m1 = 10;	// mass1
var m2 = 10;	// mass2
var a1 = 0; 	// angle1
var a2 = 0; 	// angle2

function draw () {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;

	ctx.translate(300, 50);

	var x1 = r1 * Math.sin(a1);
	var y1 = r1 * Math.cos(a1);

	line(0,0,x1,y1);
	ellipse(x1,y1,m1,m1);

	// reset current transformation matrix to the identity matrix
	ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function animate () {

	// clear canvas and draw new frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw();
}

function line (x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function ellipse (x, y, r1, r2) {
	ctx.beginPath();
	ctx.ellipse(x, y, r1, r2, 0, 0, 2 * Math.PI);
	ctx.stroke();
}

function dist (x1, y1, x2, y2) {
	// calculating distance with Pythagorean theorem
	var a = x2 - x1;
	var b = y2 - y1;
	return Math.sqrt(a*a + b*b);
}