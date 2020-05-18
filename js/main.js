window.onload = function() {
/*
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(65,window.innerWidth/window.innerHeight, 0.1, 10000);

  var render = new THREE.WebGLRenderer({antialias: true});
  render.setSize(window.innerWidth, window.innerHeight);
  render.setClearColor(0xFFFFFF);

  document.body.appendChild(render.domElement);

  camera.position.z = 190;

  var manager = new THREE.LoadingManager();
  var loader = new THREE.ImageLoader(manager);

  var textureBody = new THREE.Texture();

  loader.load('model/meat.jpg', function (image) {
    textureBody.image = image;
    textureBody.needsUpdate = true;
  });

  var meshes = [];

  var objLoader = new THREE.OBJLoader();

  objLoader.load('model/meat.obj', function(object) {
    object.traverse(function(child) {
      if(child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    })
  });

  var body = meshes[0];


  scene.add(body);

  var rendering = function() {
    requestAnimationFrame(rendering);

    render.render(scene, camera);
  };

  rendering();
*/

var container,
  scene,
  camera,
  renderer,
  plane,
  mouseMesh,
  light,
  mixer,
  clock;

// Custom global variables
var mouse = {
  x: 0,
  y: 0
};

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 2000);


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xf7f2e8);
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry(400, 400, 400);

/*
var material = new THREE.MeshPhongMaterial({color: 0x3248FF,
                                           specular: 'red',
                                           shininess: 60.0});
                                           */


/*
var loader = new THREE.TextureLoader();
var material = new THREE.MeshBasicMaterial({
    map: loader.load('model/text.jpg'),
    shinyness: 5
  });
*/




var obj = new THREE.GLTFLoader();
obj.load('model/dancer3.gltf', function(gltf){
  object = gltf.scene.children[0];
  object.scale.set(1,1,1);
  object.position.set(0,-100,0);
  object.rotation.set(89.8,0,0);
  object.castShadow = true;
  mixer= new THREE.AnimationMixer(gltf.scene);
  gltf.animations.forEach((clip) => {mixer.clipAction(clip).play(); });
  scene.add(gltf.scene);
  render();
});








light = new THREE.PointLight(0xa0825b);
  light.position.set(0, 0, 5);
  scene.add(light);
  var lightAmb = new THREE.AmbientLight(0x7d85d0);
  scene.add(lightAmb);



camera.position.z = 500;
camera.position.y = 600;
document.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {

  // Update the mouse variable
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Make the sphere follow the mouse
  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.8);
  vector.unproject(camera);
  var dir = vector.sub(camera.position).normalize();
  var distance = 400;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  //mouseMesh.position.copy(pos);

  light.position.copy(pos);

  mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
    camera.position.x += (mouseX*0.15 - camera.position.x) * 0.15;
    camera.position.y += (mouseY*0.15 - camera.position.y) * 0.15;
    // устанавливаем позицию в камеру
    camera.lookAt(scene.position);
};


var clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);
  var delta = clock.getDelta();
  if (mixer != null) mixer.update(delta);

  renderer.render(scene, camera);
}

render();




};
