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
import { Text, preloadFont } from "troika-three-text";
const gui = new dat.GUI();

let camera;
let renderer;
let scene;
let loop;
let controls;
let myModel = new THREE.Object3D();
let myText = new Text();
let font;
let speechBubbleSprite;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    controls = mouseMovement();
    font = preloadFont({
      font: "././/static/Pulang.ttf",
      characters:
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?!",
    });
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
      //"././/static/textures/speechBubble.png"
      "././/static/textures/sBubble1.png"
    );
    speechBubbleTexture.magFilter = THREE.NearestFilter;
    var speechBubbleMaterial = new THREE.SpriteMaterial({
      map: speechBubbleTexture,
    });
    speechBubbleSprite = new THREE.Sprite(speechBubbleMaterial);
    speechBubbleSprite.scale.set(5, 4, 6);
    speechBubbleSprite.position.set(3.5, 15.2, 0);
    scene.add(speechBubbleSprite);

    // Set properties to configure:
    myText.fontSize = 0.75;
    myText.position.set(1.22, 16.4, 1);
    myText.color = "black";
    myText.font = "././/static/Pulang.ttf";
    scene.add(myText);
    //myText.sync;
    loop.textUpdatables.push(myText);

    this.debugText();
  }

  debugText() {
    gui.add(speechBubbleSprite.position, "y").min(-50).max(50).step(0.01);
    gui.add(speechBubbleSprite.position, "x").min(-50).max(50).step(0.01);

    gui
      .add(myText.position, "y")
      .min(-50)
      .max(50)
      .step(0.0001)
      .name("Speech Bubble Text Y");
    gui
      .add(myText.position, "x")
      .min(-50)
      .max(50)
      .step(0.0001)
      .name("Speech Bubble Text X");
    //camera
    gui.add(camera.position, "y").min(-50).max(50).step(0.01).name("Camera Y");
    gui.add(camera.position, "z").min(-50).max(50).step(0.01).name("Camera X");
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
