//Class to describe the different levels or stages
//Depending on where the user has scrolled/pressed buttons
const stageMap = {
  START: 0,
  IREALND: 1,
  AUSTRIA: 2,
  DEGREES: 3,
  HOBBIES: 4,
  COMPUTER: 5,
  END: 6,
};

//const to describe what goes in the speech bubble at each stage const dialogue
const dialogue = [
  [" \tHi! \n I'm Dilly!", "I'm a Developer \n:)"],
  ["I'm from  the \n north west of \n Ireland"],
  ["I'm currently living \n\there in \n \tlovely Vienna"],
  ["Hallways are nice"],
  ["This is me testing out some text", "And some more text"],
  ["I hope this works"],
  ["Gimme a job \nyou butt!", "I'll get you \nand \nyour little dog too"]
];

let currentStage = stageMap.START;
class Stage {
  getCurrentStage() {
    return currentStage;
  }

  nextStage() {
    if (currentStage != stageMap.END) currentStage == stageMap[currentStage++];
  }

  previousStage() {
    if (currentStage != stageMap.START)
      currentStage == stageMap[currentStage--];
  }

  currentDialogueCount() {
    return dialogue[currentStage].length-1;
  }
}

export { Stage, dialogue };
