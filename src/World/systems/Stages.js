//Class to describe the different levels or stages
import { STAGEMAP } from "../Constants";
let currentStage = STAGEMAP.START;

class Stage {
  getCurrentStage() {
    return currentStage;
  }

  nextStage() {
    if (currentStage != STAGEMAP.END) 
      currentStage == STAGEMAP[currentStage++];
  }

  currentStageName() {
    Object.keys(STAGEMAP).find((key) => STAGEMAP[key] === currentStage);
  }

  previousStage() {
    if (currentStage != STAGEMAP.START)
      currentStage == STAGEMAP[currentStage--];
  }
}

export { Stage, currentStage };
