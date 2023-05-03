import { DirectionalLight, HemisphereLight } from "three";
import * as dat from "dat.gui";
const gui = new dat.GUI();

function createLights() {
  const ambientLight = new HemisphereLight("white", "darkslategrey", 0.5);
  ambientLight.shadowBias = 0.0015;

  const mainLight = new DirectionalLight("white", 3);
  mainLight.position.set(23, 27, 3.64);
  //camera

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

  return { ambientLight, mainLight };
}

export { createLights };
