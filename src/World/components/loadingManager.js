import { loadAnimatedModel } from "./loadAnimatedModel.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
const progressBar = document.getElementById("progress-bar");
const progressBarContainer = document.querySelector(".progress-bar-container");

class LoadingManager {
  constructor(totalFiles) {
    this.totalFiles = totalFiles;
    this.loadFilesCount = 0;
    this.fbxLoader = new FBXLoader();
    this.gltfLoader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

    this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }

  async loadAnimatedModel(model) {
    var extension = model.urlModel
      .toString()
      .substring(model.urlModel.toString().lastIndexOf(".") + 1);
    console.log("EXTENSION");
    console.log(extension);
    var loader = extension === "fbx" ? this.fbxLoader : this.gltfLoader;
    var loadedmodel = await loadAnimatedModel(model, loader);
    this.fileLoaded();
    this.checkLoadCompletion();
    return await loadedmodel;
  }

  fileLoaded() {
    this.loadFilesCount++;
    progressBar.value = (this.loadFilesCount / this.totalFiles) * 100;
    console.log(progressBar.value);
    //TODO edit progress bar
  }

  checkLoadCompletion() {
    if (this.loadFilesCount === this.totalFiles) {
      console.log("LOADING COMPLETE");
      progressBar;
      //Set the progress bar container to none
      setTimeout(() => (progressBarContainer.style.display = "none"), 500);
    } else {
      console.log(
        `totalFiles expected = ${this.totalFiles} 
        \n loadFilesCount = ${this.loadFilesCount}`
      );
    }
  }
}

export { LoadingManager };
