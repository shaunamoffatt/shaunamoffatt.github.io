import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  camera.position.set(-6, 12.6, 13.7);
  camera.position.set(2, 13, 13.7);

  return camera;
}

export { createCamera };
