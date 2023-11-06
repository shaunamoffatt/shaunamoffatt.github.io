import { Clock, Vector3 } from "three";
import { cursor } from "./Controls.js";
import * as CONSTANTS from "../Constants.js";
import { Stage, dialogue } from "./Stages.js";

const clock = new Clock();
let dialogueText = "";
let changeState = true;
let dialogueCount = -1;
let textChangeTime = 0;
let characterCount = 0;
const textSpeed = 0.1;
let characters = [];
let stage = new Stage();
let transitioning = false;

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.textUpdatables = [];
    this.sprites = [];
  }

  start() {
    //init and handle event Listener for scrolling wheel
    this.scrollEvent();
    //TODO clicking
    window.addEventListener("click", () => {
      console.log("You knocked?");
    });

    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);

      //this.animate();
    });
  }

  scrollEvent() {
    window.addEventListener(
      "wheel",
      (e) => {
        //this.camera.position.x += e.deltaY / 100; // ? -e.deltaY : e.wheelDelta/40;

        console.log("Updating camera in loop.js ..deltay:" + e.deltaY);
        //Stage is used to keep track of where the user has scrolled
        if (transitioning == false) {
          if (e.deltaY < 0) stage.nextStage();
          else stage.previousStage();
          transitioning = true;
        }
        // console.log("NEW STAGE::" + stage.getCurrentStage);
      },
      { passive: true }
    );
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    setTimeout(this.animate, 20);
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    //In transision
    if (transitioning) {
      // Move the camera to next location
      this.lerpCamera(CONSTANTS.CAMERA_POSITIONS[stage.getCurrentStage()]);
      //Move the character to the next animation/location
    }
    //console.log(`The last frame rendered in ${delta * 1000} milliseconds`,);
    // console.log("looping on object")
    //Update camera
    // this.cameraPosition();
    for (const object of this.updatables) {
      //console.log(object.model)
      var animationSpeed = 3;

      //this will be used for animated objects need an if here//object.tick(delta);
      if (object.model.name == CONSTANTS.SHAUNA_MODEL) {
        //console.log(object.model.position);
        //object.model.rotation.z = elapsedTime;
        //if (object.model.position.x > -2) object.model.position.x -= 0.1;
        this.camera.lookAt(object.model.position.x, 10, -10);
        //console.log(object.model.position);
      }
      object.model.tick(delta * animationSpeed);
    }

    //updateText
    this.updateText(delta);
    //UpdateSprites
    this.updateSprites(delta);
  }

  updateSprites(delta) {
    for (const sprite of this.sprites) {
      //sprite.update(delta);
      var speed = 10;
      if (sprite.name == CONSTANTS.SPEECH_BUBBLE_SPRITE) {
        //sprite.move(0, 0, -1, delta, speed);
      }
    }
  }

  updateText(delta) {
    //Update Text
    textChangeTime += delta;

    for (const text of this.textUpdatables) {
    
      //console.log(text)
      if (changeState) {
        changeState = false;
        this.resetDialogue();
        console.log("Stage dialogue count" + stage.currentDialogueCount())
        if (dialogueCount >= stage.currentDialogueCount()) {
          dialogueCount = -1;
          console.log("RESET dialogue count");
        }
          dialogueCount++;
          //get the characters of the new word
          console.log("current stage: "+ stage.getCurrentStage());
          console.log("dialogue count: " + dialogueCount);
          console.log(dialogue[stage.getCurrentStage()][dialogueCount]);
          characters =
          dialogue[stage.getCurrentStage()][dialogueCount].split("");
          dialogueText = characters[characterCount];
      }

      if (textChangeTime > textSpeed) {
        characterCount++;
        textChangeTime = 0;
        if (characterCount < characters.length) {
          dialogueText += characters[characterCount];
        }
      }
      text.text = dialogueText;
      text.sync;

      if (dialogueText == dialogue[stage.getCurrentStage()][dialogueCount]) {
        dialogueText+= " ";
        //if it isnt the last dialogue then move to the next one
        if(dialogueCount < stage.currentDialogueCount())
          setTimeout(() => (changeState = true), 2000);
      }
    }
  }

  resetDialogue() {
    dialogueText = "";
    characterCount = 0;
  }

  lerpCamera(pos) {
    // camera will lerp closer to target on each frame
    this.camera.position.lerp(pos, 0.1);
    //if the distance is small between camera and target postion stop transitioning
    if (this.camera.position.distanceTo(pos) < 0.01) {
      transitioning = false;
      changeState = true;
      this.resetDialogue();
    }
  }

  cameraPosition() {
    // this.camera.lookAt(0, 10, -10); //set the camera to look at where my character is
    var destinationZ = 17;
    if (this.camera.position.z > destinationZ) {
      //this.camera.position.z -= 0.1;
    }
    //this.camera.position.x = Math.sin(-cursor.x * Math.PI * 2);
    //this.camera.position.x = -cursor.x * 0.5;
    //this.camera.position.y = cursor.y;
    //this.camera.position.z = Math.cos(-cursor.x * Math.PI * 2) * 3;
    //this.camera.position.y = cursor.y;
  }
}

export { Loop };
