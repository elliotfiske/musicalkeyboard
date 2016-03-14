var metronome_cubes = [];

var metro_min_x = -6;
var metro_max_x = -metro_min_x;
var metro_y = -6;

var num_metro_cubes = 16;

function make_metronome() {
	for (var ndx = 0; ndx < num_metro_cubes; ndx++) {
      var cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var new_material = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0xffffff, shininess: 3, shading: THREE.FlatShading } );
      var new_cube = new THREE.Mesh (cube_geometry, new_material);

      var curr_x = (metro_min_x * (num_metro_cubes - ndx) + metro_max_x * ndx) / num_cubes;

      new_cube.position.x = curr_x;
      new_cube.base_x = curr_x;
      new_cube.position.y = metro_y;
      new_cube.position.z = -5;

      new_cube.scale.copy(new THREE.Vector3(0.2, 0.2, 0.2));

      metronome_cubes.push(new_cube);
      scene.add(new_cube);
   }
}

var ms_bw_beats = 400;
var next_beat_time = 0;

// Which metronome beat are we on?
var metro_ndx = 0;

// How long the whole 4-measure loop takes to complete
var TOTAL_METRO_LENGTH = ms_bw_beats * num_metro_cubes;
var curr_metro_offset = metro_ndx * ms_bw_beats;

function update_metronome() {
   var curr_time = Date.now();

   if (curr_time > next_beat_time) {
      next_beat_time = curr_time + ms_bw_beats;

      if (metro_ndx % 4 == 0) {
         do_sound("metro_hi", false);
      }
      else {
         do_sound("metro_lo", false);
      }

      metronome_cubes[metro_ndx].bounceTime = 16;
      metro_ndx++;
      metro_ndx %= num_metro_cubes;
   }
}

// When we start a loop, we always want it to play at
// the SAME TIME during the loop. For instance, if we
// hit space right on the 13th beat, the loop should always
// start right on the 13th beat.
//
// Here, calculate the ms offset that the loop needs to start
// at each time around.
function get_loop_offset() {

}