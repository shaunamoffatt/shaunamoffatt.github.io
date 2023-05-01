//import { MeshPhongMaterial, BoxGeometry, Mesh, AxesHelper, Vector3 } from "three";
import * as THREE from "three";
import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";
import { mouseMovement } from "./systems/Controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import * as dat from "dat.gui";
import { loadModel } from "./components/loadModel.js";
const gui = new dat.GUI();

let camera;
let renderer;
let scene;
let loop;
let controls;
let myModel = new THREE.Object3D();

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    controls = mouseMovement();

    const { ambientLight, mainLight } = createLights();

    scene.add(ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    myModel = await loadModel("././/static/models/me.glb", "shaunaModel", 1);
    scene.add(myModel.model);
    loop.updatables.push(myModel);
    console.log("My model in init :", myModel);

    scene.add(new THREE.AxesHelper(5));
    scene.add(new THREE.GridHelper(8, 8));

    //Load Speech bubble
    const loader = new THREE.TextureLoader();
    var speechBubbleTexture = loader.load(
      "././/static/textures/speechBubble.png"
    );
    speechBubbleTexture.magFilter = THREE.NearestFilter;
    var speechBubbleMaterial = new THREE.SpriteMaterial({
      map: speechBubbleTexture,
    });
    var speechBubbleSprite = new THREE.Sprite(speechBubbleMaterial);
    speechBubbleSprite.scale.set(6, 6, 6);
    speechBubbleSprite.position.set(3.5,15,0);
    scene.add(speechBubbleSprite);

    //Debug
    //speechbubble
    gui.add(speechBubbleSprite.position, "y").min(-50).max(50).step(0.01);
    gui.add(speechBubbleSprite.position, "x").min(-50).max(50).step(0.01);
    //camera
    gui.add(camera.position, "y").min(-50).max(50).step(0.01);
    gui.add(camera.position, "z").min(-50).max(50).step(0.01);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
