function anim_pos(cube, duration, dx, dy, dz, timing) {
	add_animation(cube, "pos", duration, cube.position.clone(), cube.position.clone().add(new THREE.Vector3(dx, dy, dz)), timing);
}

function add_animation(cube, type, duration, start, end, timing) {
	if (!cube.animations) {
		cube.animations = [];
	}

	cube.animations.push({type: type, duration: duration, start: start, end: end, timing: timing, start_ms: Date.now()});
}

function do_animations(cube) {
	if (!cube.animations) return;

	for (var ndx = cube.animations.length - 1; ndx >= 0; ndx--) {
		var curr_animation = cube.animations[ndx];

		var u = (Date.now() - curr_animation.start_ms) / curr_animation.duration;

		if (u > 1) {
			cube.animations.splice(ndx, 0);
			continue;
		}

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