import {
  NoBlending,
  TextureLoader,
  NearestFilter,
  LinearMipMapLinearFilter,
  MeshToonMaterial,
  DoubleSide,
  AnimationMixer,
  AnimationUtils,
  AnimationClip,
  KeyframeTrack,
  MeshStandardMaterial,
  LoopOnce,
  LoopRepeat,
} from "three";
import { setupModel } from "./setUpModel.js";
import { v4 as uuidv4 } from "uuid";

function extractSubclip(clip, startTime, endTime, newName) {
  const tracks = clip.tracks.map((track) => {
    const times = track.times.filter((t) => t >= startTime && t <= endTime);
    const values = track.values.slice(0, times.length * track.getValueSize());
    return new KeyframeTrack(
      track.name,
      times,
      values,
      track.InterpolationType
    );
  });
  return new AnimationClip(newName, endTime - startTime, tracks);
}

async function loadAnimatedModel(data, loader) {
  let name = data.name;
  let url = data.urlModel;
  let texUrl = data.urlTexture;
  let scale = data.scale;
  let position = data.position;
  var extension = url.toString().substring(url.toString().lastIndexOf(".") + 1);
  var model;
  let mixer;
  let clips = {}; // animation clips
  let morphs = {}; //store morphs
  const fps = 30;

  const threeTone = new TextureLoader().load(
    "././/static/textures/gradientMaps/twoTone.jpg",
    (texture) => {}
  );
  threeTone.minFilter = NearestFilter;
  threeTone.magFilter = NearestFilter;
  const texture = new TextureLoader().load(texUrl);

  const modelData = await loader.loadAsync(url, undefined, function (error) {
    console.error("ERROR LOADING " + name + "MODEL ", error);
    model = gltf.scene;
  });
  //Set up the animation of the model
  if (extension === "fbx") {
    model = modelData.children[0];
  } else {
    // immediately use the texture for material creation for glb
    texture.flipY = false;
    //TODO MOVE TO DIFFERENT CLASS
    if (name === "shauna_Model") {
      mixer = new AnimationMixer(modelData.scene.children[0]);
      console.log("Mixer created:", mixer);
      const animations = modelData.animations;

      if (animations.length > 0) {
        const fullClip = animations.find(
          (clip) => clip.name === "Take 001" || clip.name === "Animation"
        );
        console.log(fullClip); //This is working
        if (fullClip) {
          console.log(`Full Clip Duration: ${fullClip.duration} seconds`);
          // Extract the "turn" animation (0-3 seconds)
          let turnClip = AnimationUtils.subclip(fullClip, "turn", 60, 217);
          let waveClip = AnimationUtils.subclip(fullClip, "wave", 0, 60);

          clips[turnClip.name] = mixer.clipAction(turnClip);
          clips[waveClip.name] = mixer.clipAction(waveClip);

          clips["wave"].setLoop(LoopRepeat); // Play only once
          clips["wave"].play();
        } else {
          console.warn("No valid animation clip found.");
        }
      }
      //model = setupModel(modelData);
      model = modelData.scene;
    } else {
      model = modelData.scene.children[0];
    }
  }

  console.log("MODEL", model.name);
  const material = new MeshToonMaterial({ map: texture });
  model.name = name;
  model.scale.set(scale, scale, scale); // = new Vector3(100,100,100);#
  if (position == null) model.position.set(0, 0, 0);
  else model.position.set(position.x, position.y, position.z);

  model.traverse(function (obj) {
    if (obj.isMesh) {
      //Sets the material to Opaque
      //obj.material = new MeshStandardMaterial({ color: 0x00ff00 });
      //obj.material = new MeshStandardMaterial({ map: texture });
      obj.material = material;
      if ((model.name = "shauna_Model")) obj.material.side = DoubleSide;
      obj.material.blending = NoBlending;
      //obj.material.toneMapped = true;
      //obj.material.vertexColors = false;
      //obj.frustumCulled = false;
      obj.material.map.magFilter = NearestFilter;
      obj.material.map.minFilter = LinearMipMapLinearFilter;
     obj.material.gradientMap = threeTone;

      //Trying to get morphs
      if (obj.morphTargetInfluences) {
        console.log("Found morph targets on:", obj.name);
        console.log(obj.morphTargetInfluences[0]);
        morphs = obj.morphTargetInfluences;
        obj.morphTargetInfluences[0] = 1; // Apply influence to the first blendshape
      } else {
        console.log("No morph targets found on:", obj.name);
      }
    }
  });

  //TODO seperate
  if (model.name == "shauna_Model")
    model.tick = (delta) => {
      //playAnimation(walkAction);
      clips["turn"].play();

      mixer.update(delta);
      if (morphs[0] >= 0.8) {
        morphs[0] = 0;
        morphs[4] = 0;
      } else {
        morphs[0] += 0.051;
        morphs[4] += 0.051;
      }
    };

  console.log("model loaded!", modelData);
  return {
    model,
  };
}

function playAnimation(actionToPlay) {
  mixer.stopAllAction(); // Stop all animations
  actionToPlay.reset().play(); // Play the selected one
}

export { loadAnimatedModel };
