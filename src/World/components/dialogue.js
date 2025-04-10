import { Text } from "troika-three-text";
import {
  // DIALOGUE,
  CAMERA_POSITIONS,
  SPEECH_BUBBLE_SPRITE,
  DIALOGUE_POSITIONS,
  BUBBLE_DIALOGUE_POSITIONS,
  BUBBLE_DIALOGUE_Scale,
} from "../Constants";
import { simpleSprite } from "./simpleSprite.js";

let dialogueText = new Text();
let dialogueCount = -1;
var dialogueSprite;
var currentStage = 0;

const DIALOGUE = [
  [" \tHi! \n I'm Shauna!", " I'm a Developer \n :)"],
  ["I'm from \n Ireland"],
  ["I've moved \n\t here to \n \tlovely Vienna"],
  ["Hallways are nice"],
  ["This is me testing out some text", "And some more text"],
  ["I hope this works"],
  ["Gimme a job \nyou butt!", "I'll get you \nand \nyour little dog too"],
];

let textChangeTime = 0;
let characterCount = 0;
let characters = [];
const textSpeed = 0.1;
var changeState = true;
const smallFont = 0.66;
const mediumFont = 0.8;
const largeFont = 2;

function initDefaultText(currentStage) {
  // Set properties to configure:
  dialogueText.fontSize = mediumFont;
  dialogueText.position.set(
    DIALOGUE_POSITIONS[0].x,
    DIALOGUE_POSITIONS[0].y,
    DIALOGUE_POSITIONS[0].z
  );
  dialogueText.color = "black";
  dialogueText.font = "././/static/Pulang.ttf";
  //Import speech bubble
  dialogueSprite = new simpleSprite(
    SPEECH_BUBBLE_SPRITE, //TODO MOVE TO APPROPIATE PLACE..ie need to rethink
    BUBBLE_DIALOGUE_POSITIONS[0].x, //x
    BUBBLE_DIALOGUE_POSITIONS[0].y, //y
    BUBBLE_DIALOGUE_POSITIONS[0].z, //z
    "././/static/textures/sBubble1.png", //url dont hard code
    BUBBLE_DIALOGUE_Scale[0].x,
    BUBBLE_DIALOGUE_Scale[0].y //scale
  );
  //Update the text
  dialogueText.update = (delta, stage) => update(delta, stage);
  return {
    dialogueText,
    dialogueSprite,
  };
}

function resetDialogue() {
  dialogueText.text = "";
  characterCount = 0;
}

function changePositionandScale(currentStage) {
  dialogueText.position.set(
    DIALOGUE_POSITIONS[currentStage].x,
    DIALOGUE_POSITIONS[currentStage].y,
    DIALOGUE_POSITIONS[currentStage].z
  );
  dialogueSprite.setPosition(BUBBLE_DIALOGUE_POSITIONS[currentStage]);
  dialogueSprite.setScale(BUBBLE_DIALOGUE_Scale[currentStage]);
  //Change Font size
  switch (currentStage) {
    case 2:
      dialogueText.fontSize = smallFont;
      break;
    default:
      dialogueText.fontSize = mediumFont;
  }
}

function updateText(delta, stage) {
  //dialogueText.text = "BLOOOP"
  textChangeTime += delta;
  //If the loop sends a different stage change the positions
  if (stage != currentStage) {
    resetDialogue();
    currentStage = stage;
    changePositionandScale(currentStage);
    changeState = true;
    //reset dialogue count(this will read the first sentence of the new stage)
    dialogueCount = -1;
  }

  //State change can mean either stage changin or sentence finishing
  if (changeState) {
    //if it isnt the last dialogue then move to the next one
    if (dialogueCount < DIALOGUE[currentStage].length - 1) {
      dialogueCount++; // move on the next sentence in current dialogue stage
    }
    changeState = false;
    resetDialogue();
    //get the characters of the new word
    characters = DIALOGUE[currentStage][dialogueCount].split("");
    dialogueText.text = characters[characterCount];
  }
  //Add a new letter(character) after a certain amount of time
  if (textChangeTime > textSpeed) {
    characterCount++;
    textChangeTime = 0;
    if (characterCount < characters.length) {
      dialogueText.text += characters[characterCount];
    }
  }
  //When the text has being fully written for 2 secs
  //And there is more dialogue in this section, Write the next one
  if (dialogueText.text == DIALOGUE[currentStage][dialogueCount]) {
    dialogueText.text += " ";
    //if it isnt the last dialogue then move to the next one
    if (dialogueCount < DIALOGUE[currentStage].length - 1)
      setTimeout(() => {
        changeState = true;
      }, 1000);
  }

  dialogueText.lookAt(CAMERA_POSITIONS[currentStage]);
  centerText();
  return {
    dialogueText,
  };
}

function centerText() {
  dialogueText.anchorX = "center";
  dialogueText.anchorY = "middle";
  dialogueText.textAlign = "center";
}
export { initDefaultText, updateText };
