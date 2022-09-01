import * as THREE from "three";
const scene = new THREE.Scene();

//Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const screen = {
  width: 800,
  height: 600,
};

//camera
const camera = new THREE.PerspectiveCamera(75, screen.width / screen.height);
camera.position.set(0, 1, 3);

scene.add(camera);

//renderer
const canvas = document.querySelector(".webgl");
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(screen.width, screen.height);

renderer.render(scene, camera);
