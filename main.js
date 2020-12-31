import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const FOV = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(FOV, aspect, near, far);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

const GLTFloader = new GLTFLoader();
GLTFloader.load(
  "/duck_06.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  "./skybox/posx.jpg",
  "./skybox/negx.jpg",
  "./skybox/posy.jpg",
  "./skybox/negy.jpg",
  "./skybox/posz.jpg",
  "./skybox/negz.jpg",
]);
scene.background = texture;

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

let ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

let dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
scene.add(dirLight);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
