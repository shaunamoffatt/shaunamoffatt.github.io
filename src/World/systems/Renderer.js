import { WebGLRenderer } from "three";

function createRenderer() {
  const canvas = document.querySelector(".webgl"); //fetch from dom
  const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: false,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.physicallyCorrectLights = false;
 // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  console.log(renderer.info);
  return renderer;
}

export { createRenderer };
