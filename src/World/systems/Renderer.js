import { WebGLRenderer } from "three";

function createRenderer() {
  const canvas = document.querySelector(".webgl"); //fetch from dom
  const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.physicallyCorrectLights = true;
  return renderer;
}

export { createRenderer };
