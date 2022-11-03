import { MeshPhongMaterial, BoxGeometry, Mesh, Color } from "three";
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
   

   // container.append(renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    scene.add(ambientLight, mainLight);

    console.log('im in the world js file')

    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshPhongMaterial({ color: 'grey' });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    //mesh.position.y = 2.5;

    console.log("Making a box")
    loop.updatables.push(mesh);

    // move the target to the center of the front bird
    //ontrols.target.copy(parrot.position);

    //loop.updatables.push(parrot, flamingo, stork);
    //scene.add(parrot, flamingo, stork);
  }

  render() {
    renderer.render(scene, camera);
    console.log('im in the render function')
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
