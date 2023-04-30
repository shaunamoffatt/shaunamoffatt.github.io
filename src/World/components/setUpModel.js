import { AnimationMixer } from "three";

function setupModel(data) {
  const model = data.scene.children[0];
  const clips = data.animations;
  const mixer = new AnimationMixer(model);
  // Play all animations
  clips.forEach(function (clip) {
    mixer.clipAction(clip).play();
  });
  model.tick = (delta) => mixer.update(delta);
  return model;
}

export { setupModel };
