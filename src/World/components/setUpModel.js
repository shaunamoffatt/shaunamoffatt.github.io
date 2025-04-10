import { Box3, LoopOnce, AnimationMixer, LoopRepeat } from "three";
import { ANIMATIONS } from "../Constants";
import { currentStage } from "../systems/Stages";

var clips = {};
var test = 1;
var currentAnimation;

function setupModel(data) {
  const model = data.scene.children[0];
  console.log("THIS IS SETTING UP MODEL ");
  console.log(data);
  const animations = data.animations || [];
  const mixer = new AnimationMixer(model);
  // Assuming there's at least one morph target animation
  const morphAnimation = animations.find((anim) => anim.isMorphTargetAnimation);

  if (morphAnimation) {
  } else {
    console.error("No morph target animation found in the GLB file.");
  }

  var previousStage = 1;
  // Extract and store animation clips
  animations.forEach((clip) => {
    clips[clip.name] = mixer.clipAction(clip);
    //TODO get the clips that only play once and set them here
    if (clip.name === "turn_right") clips[clip.name].setLoop(LoopOnce);
    else clips[clip.name].setLoop(LoopRepeat);

    clips[clip.name].clampWhenFinished = true;
  });


  model.tick = (delta) => {
    if (previousStage !== currentStage) {
      //model.scale.set(scale, scale, scale);
      console.log("CHANGESTAGE IN setUPMODEL",  );
      previousStage = currentStage;
      //playAnimation("Key|wave|BaseLayer", mixer);
      playAnimation("wave");
    }
    //model.scale.set(1, 1, 1);
    mixer.update(delta);
  };
  return model;
}

function playAnimation(animationName) {
  //TODO: REMOVE THIS test and set proper chang logic
  test++;
  console.log(animationName);
  // Play the selected animation
  const selectedClip = clips[animationName];
  console.log("PLAY ANIMATION CLIP", selectedClip);
  console.log("TEST", test);
 //clips["wave"].reset();
 // clips["turn_right"].reset();
  if (selectedClip) {
    if (test % 2 == 0) {
      if (test !== 2) {
        clips["wave"].stop();
        // Example: Check if the animation is finished and play it backward
        reversePlayAnimation(clips["turn_right"]);

        clips["turn_right"].crossFadeTo(clips["wave"], 1, true);
        clips["wave"].play();
      }
      // Crossfade after 5 seconds
      else {
        //selectedClip.play();
        clips["wave"].play();
      }
    } else {
      // clips["wave"].crossFadeTo( clips["turn_right"], 1, true);
      // Example: Crossfade to the second animation after a certain time
      // Crossfade to the second animation over 1 second
      clips["wave"].crossFadeTo(clips["turn_right"], 2.5, true);
      // Play the second animation
      clips["turn_right"].play();
    }
  }
}

function reversePlayAnimation(animation) {
  // Example: Check if the animation is finished and play it backward
  if (animation.time === 0) {
    // Use action.time to check the current time
    animation.time = animation._clip.duration;
  }
  animation.setEffectiveTimeScale(-1).setEffectiveTimeScale(1);
  animation.paused = false;
  animation.setLoop(LoopOnce);
  animation.timeScale = -1;
  // Play the animation again (backward)
  animation.play();
}

export { setupModel };
