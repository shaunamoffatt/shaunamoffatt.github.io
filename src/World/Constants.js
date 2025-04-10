import { Vector3 } from "three";
export const SHAUNA_MODEL = "shauna_model";
export const SPEECH_BUBBLE_SPRITE = "bubble_sprite";

export const CAMERA_POSITIONS = [
  new Vector3(0, 14.1, 21.5), //Hi Im s
  new Vector3(-11.8, 14.1, 8.5),
  new Vector3(8.2, 13.53,13.53),
  new Vector3(15, 13.75, 22),
  new Vector3(20, 13.75, 22),
  new Vector3(0, 13.75, 22),
  new Vector3(10, 13.75, 22),
];

export const CAMERA_LOOKAT_POSITIONS = [
  new Vector3(0, 12, 0), //Look at ME
  new Vector3(-1, 13.23, -8),//Look at ireland frame
  new Vector3(1, 13.23, -8),//Look at austrian frame
  new Vector3(15, 13.75, 0),
  new Vector3(20, 13.75, 0),
  new Vector3(0, 13.75, 0),
  new Vector3(10, 13.75, 0),
];

export const ANIMATIONS = {
  wave: "wave",
  turnRight: "turn_right",
  blink: "blink",
  sit: "sit",
  walk: "walk",
  type: "type",
  bigSmile: "smile"
}
//Depending on where the user has scrolled/pressed buttons
export const STAGEMAP = {
  START: 0,
  IRELAND: 1,
  AUSTRIA: 2,
  DEGREES: 3,
  HOBBIES: 4,
  COMPUTER: 5,
  END: 6,
};

export const DIALOGUE_POSITIONS = [
  new Vector3(5, 15, -0.6), //Look at ME
  new Vector3(-2.33, 15.58, -3.15),//Look at ireland frame
  new Vector3(3.9, 10.17, -1.19),//Look at austrian frame
  new Vector3(4.5, 10.6, -0.6),
  new Vector3(5, 15, -0.6),
  new Vector3(5, 15, -0.6),
  new Vector3(5, 15, -0.6),
];

export const BUBBLE_DIALOGUE_POSITIONS = [
  new Vector3(5.39, 15, -1.3), //Look at ME
  new Vector3(-2.11, 15.58, -3.45),//Look at ireland frame
  new Vector3(3.52, 10.17, -1.67),//Look at austrian frame
  new Vector3(5, 15, -0.6),
  new Vector3(5, 15, -0.6),
  new Vector3(5, 15, -0.6),
  new Vector3(5, 15, -0.6),
];

export const BUBBLE_DIALOGUE_Scale = [
  new Vector3(7.5, 5, 1), //Look at ME
  new Vector3(-7, 5, 1),//Look at ireland frame
  new Vector3(6, -5, 1),//Look at austrian frame
  new Vector3(7.5, 5, 1),
  new Vector3(7.5, 5, 1),
  new Vector3(7.5, 5, 1),
  new Vector3(7.5, 5, 1),
];