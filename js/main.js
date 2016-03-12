 /**
 * Rectangles bounce when you click on em.  Iterate that animation here.
 */
function iterateBounciness(cube) {
     var bounceFactor = (Math.sin(cube.bounceTime / 2) + 1) * cube.bounceTime * 0.15;
     if (cube.bounceTime > 0) {
         cube.bounceTime--;
     }

   // bouncedRect.x = cube.x - bounceFactor;
   // bouncedRect.y = cube.y - bounceFactor;
   // bouncedRect.width  = cube.width  + bounceFactor * 2;
   // bouncedRect.height = cube.height + bounceFactor * 2;

   var amplitude = 0.1;
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


var num_cubes = 11;
var min_x = -8; var max_x = -min_x;
var curr_x = min_x;
var min_y = -6; var max_y = -min_y;
var curr_y = min_y;

var cubes = [];

for (var ndx = 0; ndx < num_cubes; ndx++) {
   var cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
   var new_material = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0xffffff, shininess: 3, shading: THREE.FlatShading } );
   var new_cube = new THREE.Mesh (cube_geometry, new_material);

   curr_x = (min_x * (num_cubes - ndx) + max_x * ndx) / num_cubes;
   curr_y = (min_y * (num_cubes - ndx) + max_y * ndx) / num_cubes;

   new_cube.position.x = curr_x;
   new_cube.position.y = curr_y;


   cubes.push(new_cube);
}

cubes.forEach(function(cube) {
    cube.bounceTime = 0;
    scene.add(cube);
    cube.position.z = -5;
});

camera.position.z = 5;

var ambient = new THREE.AmbientLight( 0x606060 );
scene.add(ambient);

var directionalLight = new THREE.DirectionalLight( /*Math.random() * */ 0xffffff, 0.225 );

directionalLight.position.x = 0;
directionalLight.position.y = 1;
directionalLight.position.z = 4;

directionalLight.position.normalize();

scene.add( directionalLight );

function render() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );

    cubes.forEach(function(cube) {
        iterateBounciness(cube);
    });

    update_loops();
}
render();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    $("#siri-container canvas").width(window.innerWidth);
    $("#siri-container canvas").height(window.innerHeight);
    $("#siri-container canvas").attr('width', window.innerWidth);
    $("#siri-container canvas").attr('height', window.innerHeight);

    siriWave.do_resize(window.innerWidth, window.innerHeight);
}

var siriWave = new SiriWave9({
    container: document.getElementById("siri-container"),
    width: window.innerWidth,
    height: window.innerHeight,
    autostart: true,
});