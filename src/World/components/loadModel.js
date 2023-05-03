import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  NoBlending,
  MeshBasicMaterial,
  TextureLoader,
  Vector3,
  NearestFilter,
  LinearMipMapLinearFilter,
  MeshLambertMaterial,
  MeshToonMaterial,
  DoubleSide,
} from "three";

import { setupModel } from "./setUpModel.js";

async function loadModel(url, name, scale) {
  const threeTone = new TextureLoader().load(
    "././/static/textures/gradientMaps/twoTone.jpg"
  );
  threeTone.minFilter = NearestFilter;
  threeTone.magFilter = NearestFilter;

  const texture = new TextureLoader().load(
    "././/static/textures/lambert1_Base_color.png"
  );
  // immediately use the texture for material creation
  texture.flipY = false;

  const material = new MeshToonMaterial({ map: texture });

  const loader = new GLTFLoader();

  const modelData = await loader.loadAsync(url, undefined, function (error) {
    console.error("ERROR LOADING " + name + "MODEL ", error);
  });
  const model = setupModel(modelData);
  model.name = name;
  model.scale.set(scale, scale, scale); // = new Vector3(100,100,100);
  model.position.set(0, 0, 0);
  model.traverse(function (obj) {
    if (obj.isMesh) {
      //Sets the material to Opaque
      obj.material = material;
      obj.material.side = DoubleSide;
      //obj.material.blending = NoBlending;
      //obj.material.toneMapped = false;
      obj.frustumCulled = false;
      obj.material.map.magFilter = NearestFilter;
      obj.material.map.minFilter = LinearMipMapLinearFilter;
      obj.material.gradientMap = threeTone;
      console.log(obj);
    }
  });

  console.log("model loaded!", modelData);
  return {
    model,
  };
}

export { loadModel };
