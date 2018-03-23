/***********
 * Controller.js 
 *
 * Controls frame animation and drawing on the canvas
 */

var fps = 30; // Standard frames per second
window.setInterval(animate, 1000/fps);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var r1 = 100;	// rod-1 length
var r2 = 100;	// rod-2 length
var m1 = 10;	// mass1
var m2 = 10;	// mass2
var a1 = Math.PI/2; 	// angle1
var a2 = Math.PI/2; 	// angle2

var a1_v = 0;
var a2_v = 0;
var a1_a = 0;
var a2_a = 0;
var g = 1; // gravity...

var trail = [];
var momentum = [];

function draw () {

	var num1 = -g * (2 * m1 + m2) * Math.sin(a1);
	var num2 = -m2 * g * Math.sin(a1-2*a2);
	var num3 = -2 * Math.sin(a1-a2) * m2;
	var num4 = a2_v*a2_v*r2 + a1_v*a1_v*r1*Math.cos(a1-a2);
	var den = r1 * (2*m1+m2-m2*Math.cos(2*a1-2*a2));
	a1_a = (num1 + num2 + num3 * num4) / den;

	num1 = 2 * Math.sin(a1-a2);
	num2 = (a1_v * a1_v * r1 * (m1+m2));
	num3 = g * (m1 + m2) * Math.cos(a1);
	num4 = a2_v * a2_v * r2 * m2 * Math.cos(a1-a2);
	den = r2 * (2*m1+m2-m2*Math.cos(2*a1-2*a2));
	a2_a = (num1 * (num2 + num3 + num4)) / den

	ctx.fillStyle = 'tan';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;

	ctx.translate(300, 150);

	var x1 = r1 * Math.sin(a1);
	var y1 = r1 * Math.cos(a1);

	var x2 = x1 + r2 * Math.sin(a2);
	var y2 = y1 + r2 * Math.cos(a2);

	// record x2,y2 in the trail array
	trail.push(new Point(x2,y2));

	line(0,0,x1,y1);
	ellipse(x1,y1,m1,m1);
	ctx.fillStyle = 'black'
	ctx.fill();		// fill the ellipse

	line(x1,y1, x2, y2);
	ellipse(x2,y2,m2,m2);
	ctx.fillStyle = 'black'
	ctx.fill();		// fill the ellipse

	a1_v += a1_a;
	a2_v += a2_a;

	a1 += a1_v;
	a2 += a2_v;

	// record the pedulum momentum
	momentum.push(a2_v);

	// draw the trail of the second pendulum
	for (var i=0; i<trail.length-1; i++){
		var p = trail[i];
		var p2 = trail[i+1];

		// Vary the trail color using a2's velocity
		var c = Math.abs(momentum[i] * 2550);
		c = Math.floor(c);
		var str = 'rgb(' + c + ',255,255)';

		ctx.strokeStyle = str;
		line(p.x, p.y, p2.x, p2.y);
	}
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