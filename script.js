(function () {

// create variables for WIDTH and HEIGHT:
var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#container');

// 0) SET CAMERA ATTRIBUTES
var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

// 1) CREATE SCENE
var scene = new THREE.Scene();
// 2) CREATE CAMERA
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);
// 3) CREATE RENDERER
var renderer = new THREE.WebGLRenderer();
 // Can alt use Canvas or SVG

// 4) SET RENDERER SIZE
renderer.setSize(WIDTH, HEIGHT);
// Can do half size if performance intensive
// For full size, half resolution, use size/2 and "false" as 3rd argument (update style)

// 5) ADD RENDERER ELEMENT TO DOCUMENT (this is a Canvas element)
$container.append(renderer.domElement);

/* Add cube ****************/

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({color: 0x00FFee});
// There are other materials
var cube = new THREE.Mesh(geometry, material);
// Mesh takes a geometry and applies a material to it
scene.add(cube);
camera.position.z = 9; // starts at 0,0,0 so pull back
var i = 0; // refer to this for rendering


/* Auto adjust on screen resize */
window.addEventListener('resize', function() {
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
});

/* LIGHTS */
// Create a light, set its position, and add it to the scene.
var light = new THREE.PointLight(0xffffff);
light.position.set(-100,200,100);
scene.add(light);

var light = new THREE.PointLight(0xffffff);
light.position.set(120,-220,-120);
scene.add(light);

/* Create a render loop **********/

function render() {

	requestAnimationFrame( render );
	// do the following once every 60 ms:
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	i += 0.1;
	j = Math.sin(i) *0.3;
	camera.position.z = 5 + (3*j);
	//cube.position.x = Math.sin(j);
	//cube.position.y = Math.cos(j);

	renderer.render( scene, camera );
}
render();


})();