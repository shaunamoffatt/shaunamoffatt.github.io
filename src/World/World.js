import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";
import { mouseMovement } from "./systems/Controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import * as dat from "dat.gui";
import { models, sprites } from "./objects/modelConstants.js";
import { initDefaultText } from "./components/dialogue.js";
import { LoadingManager } from "./components/loadingManager.js";

const gui = new dat.GUI();
let camera;
let renderer;
let scene;
let loop;
let controls;
let loadingManager;
let myText;
let myModel; //used for debug

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    controls = mouseMovement();
    //TODO used for debuming
    this.gizmo = new TransformControls(camera, renderer.domElement);
    //Number of things to load are all the models and sprite from the modelContstant class
    loadingManager = new LoadingManager(models.length);
    const { ambientLight, mainLight, ceilingLight, windowLight } = createLights();
    scene.add(ambientLight, mainLight, ceilingLight,ceilingLight.target,windowLight);

    this.gizmo.attach(ceilingLight);
    scene.add(this.gizmo);
    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    //Load in the models described in the modelsConstant file
    await models.forEach(async (model) => {
      var loadedmodel = await loadingManager.loadAnimatedModel(model);
      scene.add(loadedmodel.model);
      //Add the animating shaunaModel to the
      if (model.name === "shauna_Model") {
        loop.shaunaModel = loadedmodel;
        loop.animatedModels.push(loadedmodel.model);
      }
      if (model.debug === "true") {
        this.debugModel(loadedmodel.model);
         //loop.debugModel = mainLight;
        this.gizmo.attach(loadedmodel.model);
      }
    });
    

    //LOAD DIALOGUE
    myText = await initDefaultText();
    //myText.text =  "INITIAL TEXTER";
    //console.log(myText.dialogueText);
    scene.add(myText.dialogueText, myText.dialogueSprite.sprite)//,myText.textSprite, myText.sprite);
    loop.dialogueText = myText.dialogueText;
    loop.sprites.push(myText.dialogueSprite);
    //this.gizmo.attach(myText.dialogueSprite.sprite);
    console.log(myText.sprite);
    this.debugModel(myText.dialogueSprite.sprite);
  }

  //Handy function for figuring out where to place models
  debugModel(model) {
    gui
      .add(model.position, "x")
      .min(-50)
      .max(50)
      .step(0.01)
      .name(model.name + " X").listen();
    gui
      .add(model.position, "y")
      .min(-50)
      .max(50)
      .step(0.01)
      .name(model.name + " y").listen();
    gui
      .add(model.position, "z")
      .min(-50)
      .max(50)
      .step(0.01)
      .name(model.name + " z").listen();
  }

  debughText() {
    gui
      .add(myText.dialogueText.position, "x")
      .min(-50)
      .max(50)
      .step(0.01)
      .name("me X");
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
