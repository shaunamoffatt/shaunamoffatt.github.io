import { Color, Scene } from "three";

function createScene() {
  const scene = new Scene();

  scene.background = new Color("#FDFB8B");

  return scene;
}

export { createScene };
