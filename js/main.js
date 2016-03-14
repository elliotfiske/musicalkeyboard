 /**
 * Rectangles bounce when you click on em.  Iterate that animation here.
 */
function iterateBounciness(cube, amp) {
   var bounceFactor = (Math.sin(cube.bounceTime / 2) + 1) * cube.bounceTime * 0.15;
   if (cube.bounceTime > 0) {
      cube.bounceTime--;
   }

   var amplitude = 0.1 * amp;
   cube.scale.x = 1 + bounceFactor * amplitude;
   cube.scale.y = 1 + bounceFactor * amplitude;
   cube.scale.z = 1 + bounceFactor * amplitude;

   cube.material.color.r = cube.bounceTime / 27;
   cube.material.color.g = 1-cube.bounceTime / 27;
   cube.material.color.r = 1-cube.bounceTime / 27;
}


// Set up the initial scene and camera!
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xddddff, 1);
document.body.appendChild( renderer.domElement );


var num_cubes = 12;

var min_x = -6;
var max_x = -min_x;
var curr_x = min_x;

var min_y = -6;
var max_y = -min_y;
var curr_y = min_y;

var cubes = [];

function make_new_cube() {
   var cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
   var new_material = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0xffffff, shininess: 3, shading: THREE.FlatShading } );
   var new_cube = new THREE.Mesh (cube_geometry, new_material);

   new_cube.bounceTime = 0;
   scene.add(new_cube);
   new_cube.position.z = -5;

   return new_cube;
}

for (var ndx = 1; ndx < num_cubes; ndx++) {
   var new_cube = make_new_cube();

   curr_x = (min_x * (num_cubes - ndx) + max_x * ndx) / num_cubes;
   curr_y = (min_y * (num_cubes - ndx) + max_y * ndx) / num_cubes;

   new_cube.position.x = curr_x;
   new_cube.base_x = curr_x;
   new_cube.position.y = curr_y;

   cubes.push(new_cube);
}

var clap_cube = make_new_cube();
clap_cube.base_x = -3;
clap_cube.position.y = 3;
clap_cube.scale.z = 0.3;

cubes.push(clap_cube);

camera.position.z = 5;

var ambient = new THREE.AmbientLight( 0x606060 );
scene.add(ambient);

var directionalLight = new THREE.DirectionalLight( /*Math.random() * */ 0xffffff, 0.225 );

directionalLight.position.x = 0;
directionalLight.position.y = 1;
directionalLight.position.z = 4;

directionalLight.position.normalize();

scene.add( directionalLight );

window.addEventListener( 'resize', onWindowResize, false );

function repos_cube(cube) {
   cube.position.x = cube.base_x * camera.aspect;
}

// If the window resizes, everything chaaaanges
function onWindowResize() {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();

   renderer.setSize( window.innerWidth, window.innerHeight );

   $("#siri-container canvas").width(window.innerWidth);
   $("#siri-container canvas").height(window.innerHeight);
   $("#siri-container canvas").attr('width', window.innerWidth);
   $("#siri-container canvas").attr('height', window.innerHeight);

   siriWave.do_resize(window.innerWidth, window.innerHeight);

   cubes.forEach(repos_cube);
   metronome_cubes.forEach(repos_cube);
}

make_metronome();

var siriWave = new SiriWave9({
   container: document.getElementById("siri-container"),
   width: window.innerWidth,
   height: window.innerHeight,
   autostart: false,
});

// Trigger a resize so everything fits in the starting frame
onWindowResize();
siriWave.start();

function render() {
   requestAnimationFrame( render );

   renderer.render( scene, camera );

   cubes.forEach(function(cube) {
      iterateBounciness(cube);
      do_animations(cube);
   });

   metronome_cubes.forEach(function(cube) {
      iterateBounciness(cube, 0.5);
      // cube.scale.set(new THREE.Vector3(0.2, 0.2, 0.2));
   });

   particles.forEach(function(cube) {
      do_animations(cube, 1);
   });

   update_metronome();
   update_loops();
}
render();