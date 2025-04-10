function initAnimations(data) {
const clock = new THREE.Clock();
  const model = data.scene.children[0];
  const animations = data.animations || [];
  const mixer = new THREE.AnimationMixer(model);
  const clips = {};

  // Extract and store animation clips
  animations.forEach((clip) => {
    clips[clip.name] = this.mixer.clipAction(clip);
  });
}

function playAnimation(animationName) {
  // Stop any currently playing animation
  mixer.stopAllAction();

  // Play the selected animation
  const selectedClip = this.clips[animationName];
  if (selectedClip) {
    selectedClip.reset().play();
  }
}

function update(deltaTime) {
  // Update the animation mixer
  mixer.update(deltaTime);
}

export {  };
