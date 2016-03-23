// Lazy shortcut for making a relative position animation
function anim_pos(cube, duration, dx, dy, dz, timing) {
	add_animation(cube, "pos", duration, cube.position.clone(), cube.position.clone().add(new THREE.Vector3(dx, dy, dz)), timing);
}

// Add a new animation to the specified cube!
function add_animation(cube, type, duration, start, end, timing) {
	if (!cube.animations) {
		cube.animations = [];
	}

	cube.animations.push({type: type, duration: duration, start: start, end: end, timing: timing, start_ms: Date.now()});
}

// Step through each animation and figure out what to do with it.
function do_animations(cube) {
	if (!cube.animations) return;

	// For each pending animation...
	for (var ndx = cube.animations.length - 1; ndx >= 0; ndx--) {
		var curr_animation = cube.animations[ndx];

		// Normalize the time value. When the animation is just beginning, u == 0.
		// When the animation is over, u >= 1.
		var u = (Date.now() - curr_animation.start_ms) / curr_animation.duration;

		// The animation is past its end time! Remove it from the list.
		if (u > 1) {
			cube.animations.splice(ndx, 1);
			continue;
		}

		// Call the timing function (chosen from one of the functions down there vvv)
		var s = curr_animation.timing(u);

		switch(curr_animation.type) {
			case "pos":
				cube.position.lerpVectors(curr_animation.start, curr_animation.end, s);
				break;
			case "scale":
				cube.scale.lerpVectors(curr_animation.start, curr_animation.end, s);
				break;
			case "rot":
				THREE.Quaternion.slerp( curr_animation.start, curr_animation.end, cube.quaternion, s );
				break;
		}
	}
}

function easeIn(u) {
	return u*u*u;
}

function easeOut(u) {
	return Math.pow(u, 1/3);
}

function clap(u) {
	return easeIn(1 - u);
}

function static(u) {
	return Math.random() * (1 - u) + u;
}

function bounce(u) {
	return 0.1 * u * Math.sin(0.4 * u);
}

function linear(u) {
	return u;
}

function instant(u) {
	if (u < 0.5) {
		return 0;
	}
	else {
		return 1;
	}
}