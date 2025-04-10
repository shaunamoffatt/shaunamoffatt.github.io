import {
  DirectionalLight,
  HemisphereLight,
  PointLight,
  LightHelper,
  SpotLight,
  AmbientLight,
} from "three";
import * as dat from "dat.gui";
const gui = new dat.GUI();
const ambientLight = new HemisphereLight("rosybrown", "peachpuff",0.3);
const mainLight = new DirectionalLight("white",0.8);
const ceilingLight = new SpotLight("white", 0.2);
//const windowLight = new SpotLight("white",0.1);
function createLights() {
  //ambientLight.shadowBias = 1;
  mainLight.position.set(-78, 67, 38); //(23, 27, 3.64);
  mainLight.shadow.mapSize.set(256, 256); // Reduce resolution
  //windowLight.position.set(-17.5,16.4, 0);
  ceilingLight.position.set(6.44, 25, -2.77);//6.4, -6.10, -3.33
  ceilingLight.target.position.set(6.44, 0, -2.77);//needs to be added to scene also
  ceilingLight.castShadow = true;
  ceilingLight.distance = 25;
  ceilingLight.penumbra = 0.2;
  ceilingLight.angle =0.785;//about 45degrees
  ceilingLight.intensity = 0.1;

  //DEBUGGING
  debugLightGui(ambientLight);
  return { ambientLight,  ceilingLight, mainLight };
}

function debugLightGui(light) {
  gui
    .add(light.position, "x")
    .min(-100)
    .max(100)
    .step(0.01)
    .name("Light X")
    .listen();
  gui
    .add(light.position, "y")
    .min(-100)
    .max(100)
    .step(0.01)
    .name("Light Y")
    .listen();
  gui
    .add(light.position, "z")
    .min(-100)
    .max(100)
    .step(0.01)
    .name("Light Z").listen();;
  gui.add(light, "intensity").min(-1).max(20).step(0.01).name("Intensity"); 
  // gui
  // .add(light, "penumbra")
  // .min(0)
  // .max(1)
  // .step(0.0001)
  // .name("penumbra");
  // gui
  // .add(light, "distance")
  // .min(0)
  // .max(100)
  // .step(0.01)
  // .name("distance");
  // gui
  // .add(light, "angle")
  // .min(0)
  // .max(1.04)
  // .step(0.0001)
  // .name("angle");
}

export { createLights };
