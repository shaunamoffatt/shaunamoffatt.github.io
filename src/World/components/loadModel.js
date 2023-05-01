import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { NoBlending, Vector3 } from "three";

import { setupModel } from "./setUpModel.js";

async function loadModel(url, name, scale) {
  const loader = new GLTFLoader();

  const modelData = await loader.loadAsync(url, undefined, function (error) {
    console.error("ERROR LOADING " + name + "MODEL ", error);
  });
  const model = setupModel(modelData);
  model.name = name;
  model.scale.set(scale,scale,scale);// = new Vector3(100,100,100);
  model.position.set(0, 0, 0);
  model.traverse(function (obj) {
    if (obj.isMesh) {
      //Sets the material to Opaque
      obj.material.blending = NoBlending;
      obj.frustumCulled = false;
    }
  });

  console.log("model loaded!", modelData);
  return {
    model,
  };
}

export { loadModel };
