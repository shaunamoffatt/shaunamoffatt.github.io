import { PerspectiveCamera } from "three";
import { CAMERA_STARTING_POSITION } from "../Constants";

function createCamera() {
  const camera = new PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  var pos = CAMERA_STARTING_POSITION;
  camera.position.set(pos.x, pos.y, pos.z);

  return camera;
}

export { createCamera };
