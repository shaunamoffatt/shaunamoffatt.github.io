import { DirectionalLight, HemisphereLight } from "three";
import * as dat from "dat.gui";
const gui = new dat.GUI();
const ambientLight = new HemisphereLight("white", "darkslategrey", 0.5);
const mainLight = new DirectionalLight("white", 3);

function createLights() {
  ambientLight.shadowBias = 0.0015;
  mainLight.position.set(23, 27, 3.64);
  //DEBUGGING
  //debugGui();
  return { ambientLight, mainLight };
}

function debugGui() {
  gui
    .add(mainLight.position, "x")
    .min(-100)
    .max(100)
    .step(0.01)
    .name("Light X");
  gui
    .add(mainLight.position, "y")
    .min(-100)
    .max(100)
    .step(0.01)
    .name("Light Y");
  gui
    .add(mainLight.position, "z")
    .min(-100)
    .max(100)
    .step(0.01)
    .name("Light Z");
}

export { createLights };
