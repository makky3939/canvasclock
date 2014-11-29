var app = (function(){

var config = {
	hour: {
		top: 0.5, left: 0.5,
		color: "rgb(38, 218, 135)",
		lineWidth: 26,
		radius: 50,
		cycle: function(){return new Date().getHours()*15-90},
		textLeft:+350,
		textTop:+150,
		font: '60px "Press Start 2P" cursive',
		align: "center",
		baseline: "middle",
		time: function(){return new Date().getHours()}
	},
	minute: {
		top: 0.5, left: 0.5,
		color: "rgb(218, 144, 138)",
		lineWidth: 26,
		radius: 150,
		cycle: function(){return new Date().getMinutes()*6-90},
		textLeft:+350,
		textTop:-150,
		font: '60px "Press Start 2P" cursive',
		align: "center",
		baseline: "middle",
		time: function(){return new Date().getMinutes()}
	},
	second: {
		top: 0.5, left: 0.5,
		color: "rgb(3, 159, 177)",
		lineWidth: 26,
		radius: 250,
		cycle: function(){return new Date().getSeconds()*6 + new Date().getMilliseconds()/170-90},
		textLeft:-350,
		textTop:0,
		font: '60px "Press Start 2P" cursive',
		align: "center",
		baseline: "middle",
		time: function(){return new Date().getSeconds()}
	}
};

function init(){
	window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
	cvs = document.createElement("canvas");
	ctx = cvs.getContext("2d");
	document.body.appendChild(cvs);
	(window.onresize = function() {
		cvs.width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
		cvs.height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
	})();
	render();
}

function render() {
	w = cvs.width, h = cvs.height;
	ctx.clearRect(0, 0, w, h);
	
	render_bar(config.hour);
	render_bar(config.minute);
	render_bar(config.second);

	window.requestAnimationFrame(render);
}

function render_bar(date){
	ctx.beginPath();
	ctx.strokeStyle = "rgb(180, 180, 180)";
	ctx.arc(w*date.left, h*date.top, date.radius, 0, Math.PI*2, true)
	ctx.lineWidth = 6;
	ctx.stroke();
	
	ctx.beginPath();
	ctx.strokeStyle = date.color;
	ctx.arc(w*date.left, h*date.top, date.radius, -90*Math.PI/180, date.cycle()*Math.PI/180, false);
	ctx.lineWidth = date.lineWidth;
	ctx.stroke();
	
	render_text(date);
}

function render_text(date){
	ctx.beginPath();
	ctx.fillStyle = date.color;
	ctx.font = date.font;
	ctx.textAlign = date.align;
	ctx.textBaseline = date.baseline;
	ctx.fillText(date.time(), w*date.left-date.textLeft, h*date.top-date.textTop);
	ctx.stroke();
}
	
init();

}());

