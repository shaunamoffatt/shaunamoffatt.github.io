import { CAMERA_POSITIONS } from "../Constants";

const setSize = (container, camera, renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  //Check if portrait or landscape
  if (camera.aspect < 0.9) {
    camera.position.z = CAMERA_POSITIONS[0].z * (1 + camera.aspect);
  } else {
    camera.position.z = CAMERA_POSITIONS[0].z;
  }
  camera.rotation.x = -0.2;
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
