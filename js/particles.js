var particles = [];

function clap_particles(posn, dx, dy, angle, how_many) {
   var num = how_many || 4;
   for (var ndx = 0; ndx < 4; ndx++) {
      var new_particle = make_new_cube(0x00ff00);
      new_particle.position.copy(posn.clone());
      // new_particle.position.add(new THREE.Vector3(dx, dy, 0));

      anim_pos(new_particle, 400, Math.sin(angle + Math.random() * 1)*3, Math.cos(angle + Math.random() * 1)*3, 0, easeOut);
      add_animation(new_particle, "scale", 400, new THREE.Vector3(0.4, 0.4, 0.4), new THREE.Vector3(0, 0, 0), easeOut);

      particles.push(new_particle);
   }
}
