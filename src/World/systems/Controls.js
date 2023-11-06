import { Clock, Camera, Vector3 } from "three";
const cursor = {
  x: 0,
  y: 0,
};

function mouseMovement() {
  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5;
    cursor.y = event.clientY / window.innerHeight - 0.5;
  });
}

export { mouseMovement, cursor };
