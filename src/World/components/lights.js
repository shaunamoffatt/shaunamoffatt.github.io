import { DirectionalLight, HemisphereLight } from "three";

function createLights() {
  const ambientLight = new HemisphereLight("white", "darkslategrey", 4);

  const mainLight = new DirectionalLight("white", 0.95);
  mainLight.position.set(40, 30, 80);

  return { ambientLight, mainLight };
}

export { createLights };
