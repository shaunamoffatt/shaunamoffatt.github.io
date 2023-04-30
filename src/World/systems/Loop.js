import { Clock, Camera, Vector3 } from "three";
import gsap from "gsap";
import { cursor } from "./Controls.js";


const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();
      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    //console.log(`The last frame rendered in ${delta * 1000} milliseconds`,);
   // console.log("looping on object")
    //Update camera
    this.cameraPosition();
    for (const object of this.updatables) {
      //console.log(object.model)
      object.model.tick(delta);
      //this will be used for animated objects need an if here//object.tick(delta);
      if (object.model.name == "shaunaModel") {
        //object.model.rotation.y = elapsedTime;
       //this.camera.lookAt(object.position);// + new Vector3(0,0.2,0));
        
      }
    }
  }

  cameraPosition() {
    //this.camera.position.x = Math.sin(-cursor.x * Math.PI * 2);
    this.camera.position.x = -cursor.x*0.5;
    //this.camera.position.y = cursor.y;
    //this.camera.position.z = Math.cos(-cursor.x * Math.PI * 2) * 3;
    //this.camera.position.y = cursor.y;
  }
}

export { Loop };
