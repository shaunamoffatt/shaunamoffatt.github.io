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
import { LoadingManager } from "./components/loadingManager.js";

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
let loadingManager; 

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    controls = mouseMovement();
    loadingManager = new LoadingManager(5);
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
  //1
  loadingManager.fileLoaded();
    scene.add(myModel.model);
    loop.updatables.push(myModel);
   // console.log("My model in init :", myModel);

    var room = await loadModel(
      "room1",
      "././/static/models/room1.glb",
      "././/static/textures/room1_tex.png",
      1,
      6,
      0,
      0
    );
    scene.add(room.model);
    //2
    loadingManager.fileLoaded();
    var pottedplant = await loadModel(
      "pottedplant",
      "././/static/models/pottedplant.glb",
      "././/static/textures/potteplant_tex.jpg",
      1,
      -8.3,
      0,
      -6
    );
    //3
    loadingManager.fileLoaded();
    scene.add(pottedplant.model);

  //   this.debugModel(pottedplant.model);

    //Test simpleSprite
    sBubble = new simpleSprite(
      CONSTANTS.SPEECH_BUBBLE_SPRITE,
      3.75, //x
      15.2, //y
      -1, //z
      "././/static/textures/sBubble1.png", //url
      8,
      6 //scale
    );
    scene.add(sBubble.sprite);
    //4
    loadingManager.fileLoaded();
    loop.sprites.push(sBubble);
   // console.log(sBubble);

    // Set properties to configure:
    myText.fontSize = 0.75;
    myText.position.set(1.22, 16.4, 0.5);
    myText.color = "black";
    myText.font = "././/static/Pulang.ttf";
    scene.add(myText);
    //5
    loadingManager.fileLoaded();
    //myText.sync;
    loop.textUpdatables.push(myText);

    // this.debugCameraAndMe();
    loadingManager.checkLoadCompletion();
  }

  //Handy function for figuring out where to place models
  debugModel(model) {
    gui
      .add(model.position, "x")
      .min(-50)
      .max(50)
      .step(0.01)
      .name(model.name + " X");
    gui
      .add(model.position, "y")
      .min(-50)
      .max(50)
      .step(0.01)
      .name(model.name + " y");
    gui
      .add(model.position, "z")
      .min(-50)
      .max(50)
      .step(0.01)
      .name(model.name + " z");
  }

  debugCameraAndMe() {
    gui
      .add(myModel.model.position, "x")
      .min(-50)
      .max(50)
      .step(0.01)
      .name("me X");
    gui
      .add(myModel.model.position, "y")
      .min(-50)
      .max(50)
      .step(0.01)
      .name("me y");
    gui
      .add(myModel.model.position, "z")
      .min(-50)
      .max(50)
      .step(0.01)
      .name("me z");
    //camera
    gui
      .add(camera.position, "x")
      .min(-100)
      .max(100)
      .step(0.01)
      .name("Camera X");
    gui
      .add(camera.position, "y")
      .min(-100)
      .max(100)
      .step(0.01)
      .name("Camera Y");
    gui
      .add(camera.position, "z")
      .min(-100)
      .max(100)
      .step(0.01)
      .name("Camera Z");
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
