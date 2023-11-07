let loadFilesCount = 0;
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');
class LoadingManager {
  constructor(totalFiles) {
    this.totalFiles = totalFiles;
  }

  fileLoaded() {
    loadFilesCount++;
    progressBar.value = (loadFilesCount/this.totalFiles)*100;
    console.log(progressBar.value);
    //TODO edit progress bar
  }

  checkLoadCompletion() {
      if (loadFilesCount == this.totalFiles) {
        console.log("LOADING COMPLETE");
        progressBar
        //Set the progress bar container to none
        setTimeout(() => (progressBarContainer.style.display = 'none'), 500);
      } else if (loadFilesCount > totalFiles) {
        console.error(`More Files are being loaded than totalFiles recorded\n loadFilesCount = ${loadFilesCount} \n totalFiles expected = ${totalFiles}`);
      }
      else{
        console.log(`totalFiles expected = ${totalFiles} \n loadFilesCount = ${loadFilesCount}`)
      }
  }
}

export { LoadingManager };
