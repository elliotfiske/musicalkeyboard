window.waves_dampener = 0;
window.waves_side = 1;

(function() {

////////////////////
// SiriWave9Curve //
////////////////////

function SiriWave9Curve(opt) {
	opt = opt || {};
	this.controller = opt.controller;
	this.color = opt.color;
	this.tick = 0;

	this.respawn();
}

SiriWave9Curve.prototype.respawn = function() {
	this.amplitude = 0.3 + Math.random() * 0.7;
	this.seed = Math.random();
	this.open_class = 2+(Math.random()*3)|0;
};

SiriWave9Curve.prototype.equation = function(i) {
	var p = this.tick;
	var y = -1 * Math.abs(Math.sin(p)) * this.controller.amplitude * this.amplitude * this.controller.MAX * Math.pow(1/(1+Math.pow(this.open_class*i,2)),2);
	if (Math.abs(y) < 0.001) {
		this.respawn();
	}
	return y;
};

SiriWave9Curve.prototype._draw = function(m) {
	this.tick += this.controller.speed * (1-0.5*Math.sin(this.seed*Math.PI));

	var curr_width  = this.controller.width;
	var curr_height = this.controller.height;

	if (this.dim_flip) {
		var temp = curr_width;
		var curr_width = curr_height;
		var curr_height = temp;
	}

	var ctx = this.controller.ctx;
	ctx.beginPath();

	var x_base = curr_width/2 + (-curr_width/4 + this.seed*(curr_width/2) );
	var y_base = curr_height/2;

	var x, y, x_init;

	var i = -3;
	while (i <= 3) {
		x = x_base + i * curr_width/4;
		y = y_base + (m * this.equation(i)) * waves_dampener;
		x_init = x_init || x;
		ctx.lineTo(x, y);
		i += 0.01;
	}

	var h = Math.abs(this.equation(0));
	var gradient = ctx.createRadialGradient(x_base, y_base, h*1.15, x_base, y_base, h * 0.3 );
	gradient.addColorStop(0, 'rgba(' + this.color.join(',') + ',0.4)');
	gradient.addColorStop(1, 'rgba(' + this.color.join(',') + ',0.2)');

	ctx.fillStyle = gradient;

	ctx.lineTo(x_init, y_base);
	ctx.closePath();

	ctx.fill();
};

SiriWave9Curve.prototype.draw = function() {
	this._draw(-1);
	this._draw(1);
};

SiriWave9.prototype.do_resize = function(width, height) {
	this.ratio = window.devicePixelRatio || 1;

	// this.width = this.ratio * (width || 320);
	// this.height = this.ratio * (height || 100);
	this.width = width;
	this.height = height;
	this.MAX = this.height/2;
};

//////////////
// SiriWave //
//////////////

function SiriWave9(opt) {
	opt = opt || {};

	this.tick = 0;
	this.run = false;

	// If the siri wave is coming from the side, we want to flip width/height.
	this.dim_flip = false;

	// this.do_resize(opt.width, opt.height);

	// UI vars

	this.speed = 0.1;
	this.amplitude = opt.amplitude || 1;

	// Canvas

	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	if (opt.cover) {
		this.canvas.style.width = this.canvas.style.height = '100%';
	} else {
		this.canvas.style.width = (this.width / this.ratio) + 'px';
		this.canvas.style.height = (this.height / this.ratio) + 'px';
	};

	this.container = opt.container || document.body;
	this.container.appendChild(this.canvas);

	this.ctx = this.canvas.getContext('2d');

	// Create curves

	this.curves = [];
	for (var i = 0; i < SiriWave9.prototype.COLORS.length; i++) {
		var color = SiriWave9.prototype.COLORS[i];
		for (var j = 0; j < (3 * Math.random())|0; j++) {
			this.curves.push(new SiriWave9Curve({
				controller: this,
				color: color
			}));
		}
	}

	if (opt.autostart) {
		this.start();
	}
}

SiriWave9.prototype._clear = function() {
	// this.ctx.globalCompositeOperation = 'destination-out';
	this.ctx.clearRect(0, 0, this.width, this.height);
	this.ctx.globalCompositeOperation = 'lighter';
};

SiriWave9.prototype._draw = function() {
	if (this.run === false) return;

	this.ctx.save();

	if (waves_dampener >= 0.5) {
		waves_dampener *= 0.94;
	}

	this._clear();

	switch (waves_side) {
		case 0:
			this.ctx.translate(0, this.height/2);
			this.dim_flip = false;
			break;
		case 1:
			this.ctx.translate( this.width/2,  this.height/2);
			this.ctx.rotate(Math.PI/2);
			this.ctx.translate(-this.width/2, -this.height/2);

			this.ctx.translate(0, -this.width/2);

			this.dim_flip = true;
			break;
		case 2:
			this.ctx.translate(0, -this.height/2);
			this.dim_flip = false;
			break;
		case 3:
			this.ctx.translate( this.width/2,  this.height/2);
			this.ctx.rotate(Math.PI/2);
			this.ctx.translate(-this.width/2, -this.height/2);

			this.ctx.translate(0, this.width/2);

			this.dim_flip = true;
			break;
	}

	for (var i = 0, len = this.curves.length; i < len; i++) {
		this.curves[i].draw();
	}

	this.ctx.restore();

	if (window.requestAnimationFrame) {
		requestAnimationFrame(this._draw.bind(this));
		return;
	};
	setTimeout(this._draw.bind(this), 20);
};


SiriWave9.prototype.start = function() {
	this.tick = 0;
	this.run = true;
	this._draw();
};

SiriWave9.prototype.stop = function() {
	this.tick = 0;
	this.run = false;
};

SiriWave9.prototype.COLORS = [
[32,133,252],
[94,252,169],
[253,71,103]
];


if (typeof define === 'function' && define.amd) {
	define(function(){ return SiriWave9; });
	return;
};
window.SiriWave9 = SiriWave9;

})();
