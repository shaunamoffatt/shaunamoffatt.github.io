import * as THREE from "three";
import CameraControls from "camera-controls";
import { cursor } from "./Controls.js";
import * as CONSTANTS from "../Constants.js";
import { Stage } from "./Stages.js";
import { updateText } from "../components/dialogue.js";
import * as dat from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module.js"; // Only if using modules

// Install camera-controls with THREE instance
CameraControls.install({ THREE: THREE });
const clock = new THREE.Clock();
let stage = new Stage();
let transitioning = false;
var animationSpeed = 0.5;

// Create FPS monitor
const stats = new Stats();


//TODO Make this a component
const gui = new dat.GUI();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.dialogueText = null;
    this.sprites = [];
    this.irelandFrame = null;
    this.debugObject = null;
    //this.shaunaModel = null;
    this.animatedModels = [];
    this.controls = new CameraControls(camera, renderer.domElement);
    // Disable zoom (dolly)
    this.controls.dollyToCursor = true;
    this.controls.dollySpeed = 0; // Zoom speed
    this.controls.enabled = false;
  }

  initCameraLookAtQuaternions() {
    //Getting the target Quaternions
    //this.camera.lookAt(this.irelandFrame.position)
    //targetLookAtIreland = new THREE.Quaternion(this.camera.quaternion);
    //this.camera.lookAt(this.shaunaModel.model.position.x, 10,-10)
    //targetLookAtShauna = new THREE.Quaternion(this.camera.quaternion);
  }

  start() {
    this.debugCamera();
    //init and handle event Listener for scrolling wheel
    this.scrollEvent();
    //init camera targets
    this.initCameraLookAtQuaternions();
    document.body.appendChild(stats.dom);

    //TODO clicking
    window.addEventListener("click", () => {
      console.log("You knocked?");
    });
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();
      // render a frame

      this.renderer.render(this.scene, this.camera);
    });
  }

  scrollEvent() {
    window.addEventListener(
      "wheel",
      (e) => {
        //Stage is used to keep track of where the user has scrolled
        if (transitioning === false) {
          if (e.deltaY < 0) {
            stage.nextStage();
          } else {
            stage.previousStage();
          }
          transitioning = true;
          console.log(stage.getCurrentStage());
        }
      },
      { passive: true }
    );
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    stats.update();  // Update FPS counter
    gui.updateDisplay();
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
   
    //In transision
    if (transitioning) {
      // Move the camera to next location
      var pos = CONSTANTS.CAMERA_POSITIONS[stage.getCurrentStage()];
      this.controls.setPosition(pos.x, pos.y, pos.z, true);

      //if the distance is small between camera and target postion stop transitioning
      if (this.camera.position.distanceTo(pos) < 0.01) {
        transitioning = false;
       
        gui.updateDisplay();
      }
      //Move the character to the next animation/location
    }
    //Update what the camera is looking at
    //console.log("CURRENT STAGE", stage.getCurrentStage());
    //console.log(CONSTANTS.CAMERA_POSITIONS[stage.getCurrentStage()]);
    var lookatPos = CONSTANTS.CAMERA_LOOKAT_POSITIONS[stage.getCurrentStage()];
    this.controls.setTarget(lookatPos.x, lookatPos.y, lookatPos.z, true);
    //updateText
    this.updateText(delta);
    //update controls
    this.controls.update(delta);
    //update shauna model animation
    if (this.animatedModels.length !== 0) {
      this.animatedModels.forEach((model) => {
        model.tick(delta * animationSpeed);
      });
    }
    //UpdateSprites
    this.updateSprites(delta);
  }

  updateSprites(delta) {
    for (const sprite of this.sprites) {
      //sprite.update(delta);
      var speed = 10;
      if (sprite.name === CONSTANTS.SPEECH_BUBBLE_SPRITE) {
        //TODO FIX
        //console.log("SPIRTE:", sprite)
        //console.log("SPRIIIIITE",sprite.name)
        //sprite.sprite.lookAt(this.camera.position);
      }
    }
  }

  updateText(delta) {
    //Update Text
    this.dialogueText = updateText(delta, stage.getCurrentStage());
    this.dialogueText.dialogueText.lookAt(this.camera.position);
   
  }

  lerpCamera(positionTarget) {}

  debugCamera() {
    // Add a control to the GUI for a property with an associated function
    // Define an object with properties you want to control
    const controlParams = {
      distance: this.controls.distance,
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
    };
    // Add controls to the GUI
    gui
      .add(controlParams, "distance", 1, 200)
      .name("Distance")
      .onChange(() => {
        this.controls.dollyTo(controlParams.distance, true);
      })
      .listen();
    //camera
    gui
      .add(controlParams, "x", -100, 100)
      .min(-50)
      .max(50)
      .step(0.001)
      .name("Camera X")
      .onChange(() => {
        this.controls.setPosition(
          controlParams.x,
          this.camera.position.y,
          this.camera.position.z,
          true
        );
      })
      .listen();
    gui
      .add(controlParams, "y")
      .min(-50)
      .max(50)
      .step(0.001)
      .name("Camera Y")
      .onChange(() => {
        this.controls.setPosition(
          this.camera.position.x,
          controlParams.y,
          this.camera.position.z,
          true
        );
      })
      .listen();
    gui
      .add(controlParams, "z")
      .min(-50)
      .max(50)
      .step(0.001)
      .name("Camera Z")
      .onChange(() => {
        this.controls.setPosition(
          this.camera.position.x,
          this.camera.position.y,
          controlParams.z,
          true
        );
      })
      .listen();
  }


}

export { Loop };
