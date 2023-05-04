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
import { simpleSprite } from "./components/simpleSprite.js";
import * as CONSTANTS from "./Constants";
const gui = new dat.GUI();

let camera;
let renderer;
let scene;
let loop;
let controls;
let myModel = new THREE.Object3D();
let myText = new Text();
let font;
let sBubble;

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
    myModel = await loadModel(
      CONSTANTS.SHAUNA_MODEL,
      "././/static/models/me.glb",
      "././/static/textures/lambert1_Base_color.png",
      1
    );
    scene.add(myModel.model);
    loop.updatables.push(myModel);
    console.log("My model in init :", myModel);

    myModel = await loadModel(
      "room1",
      "././/static/models/room1.glb",
      "././/static/textures/room1_tex.png",
      1
    );
    scene.add(myModel.model);
    loop.updatables.push(myModel);
    console.log("My model in init :", myModel);

    scene.add(new THREE.AxesHelper(5));
    scene.add(new THREE.GridHelper(8, 8));

    //Test simpleSprite
    sBubble = new simpleSprite(
      CONSTANTS.SPEECH_BUBBLE_SPRITE,
      3.5, //x
      15.2, //y
      0, //z
      "././/static/textures/sBubble1.png", //url
      5,
      4 //scale
    );
    scene.add(sBubble.sprite);
    loop.sprites.push(sBubble);
    console.log(sBubble);

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
    gui.add(sBubble.sprite.position, "y").min(-50).max(50).step(0.01);
    gui.add(sBubble.sprite.position, "x").min(-50).max(50).step(0.01);

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
    gui.add(camera.position, "x").min(-50).max(50).step(0.01).name("Camera X");
    gui.add(camera.position, "y").min(-50).max(50).step(0.01).name("Camera Y");
    gui.add(camera.position, "z").min(-50).max(50).step(0.01).name("Camera Z");
    
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
