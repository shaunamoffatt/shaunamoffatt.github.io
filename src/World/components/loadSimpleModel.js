
import {
  TextureLoader,
  NearestFilter,
  LinearMipMapLinearFilter,
  MeshToonMaterial,
  DoubleSide,
} from "three";

async function loadSimpleModel(data, loader) {
  let name = data.name;
  let url = data.urlModel;
  let texUrl = data.urlTexture;
  let scale = data.scale;
  let position = data.position;

  const threeTone = new TextureLoader().load(
    "././/static/textures/gradientMaps/twoTone.jpg"
  );
  threeTone.minFilter = NearestFilter;
  threeTone.magFilter = NearestFilter;

  const modelData = await loader.loadAsync(url, undefined, function (error) {
    console.error("ERROR LOADING " + name + "MODEL ", error);
  });

  console.log(modelData.texture);
  var texture;
  if (texUrl === null) {
    texture = new TextureLoader().load(modelData.texture);
  } else texture = new TextureLoader().load(texUrl);
  // immediately use the texture for material creation
  texture.flipY = false;

  const material = new MeshToonMaterial({ map: texture });

  const model = modelData.scene.children[0];

  model.name = name;
  model.scale.set(scale, scale, scale); // = new Vector3(100,100,100);#
  if (position == null) model.position.set(0, 0, 0);
  else model.position.set(position.x, position.y, position.z);

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
      // console.log(obj);
    }
  });
  return {
    model,
  };
}

export { loadSimpleModel };
