import { CAMERA_STARTING_POSITION } from "../Constants";

const setSize = (container, camera, renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  //Check if portrait or landscape
  if (camera.aspect > 1) {
    camera.position.z = CAMERA_STARTING_POSITION.z / camera.aspect;
  } else {
    camera.position.z = CAMERA_STARTING_POSITION.z;
  }
};

class Resizer {
  constructor(container, camera, renderer) {
    // set initial size
    setSize(container, camera, renderer);

    window.addEventListener("resize", () => {
      // set the size again if a resize occurs
      setSize(container, camera, renderer);
      // perform any custom actions
      this.onResize();
    });
  }

  onResize() {}
}

export { Resizer };
