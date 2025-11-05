function StatusZone(containerID) {
  const statusZone = document.getElementById(containerID);
  if (!statusZone) {
    throw new Error("#status-zone 요소를 찾을 수 없습니다.");
  }

  function addStatus(file, timestamp) {
    const fileName = document.createElement("div");
    fileName.textContent = file.name;
    const fileSize = document.createElement("div");
    fileSize.textContent = `${Math.round(file.size / 1024)}KB`;
    const progressBar = document.createElement("span");
    progressBar.className = "progress-bar";
    const uploadStatus = document.createElement("div");
    uploadStatus.append(progressBar);

    const infoGroup = document.createElement("div");
    infoGroup.append(fileName, fileSize, uploadStatus);

    const preview = document.createElement("img");
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.alt = file.name;

      const statusItem = document.createElement("div");
      statusItem.className = "upload-status-item";
      statusItem.dataset.file = `${file.name}${timestamp}`;
      statusItem.append(infoGroup, preview);

      statusZone.append(statusItem);
    };
    reader.readAsDataURL(file);
  }

  function updateStatus(file, timestamp, status) {
    const dataFile = `${file.name}${timestamp}`;
    const uploadStatus = document.querySelector(
      `.upload-status-item[data-file="${dataFile}"]`
    );
    if (!uploadStatus) {
      addStatus(file, timestamp);
      return;
    }

    const progressBar = uploadStatus.querySelector(".progress-bar");
    if (!progressBar) return;

    if (status === "성공") {
      uploadStatus.querySelector("img").style.display = "block";
      progressBar.classList.add("success");
    } else {
      console.error(status);
      progressBar.classList.add("fail");
      progressBar.textContent = status;
    }
  }

  return {
    updateStatus,
  };
}

window.onload = () => {
  const statusZone = StatusZone("status-zone");

  FileUploader({
    uploadURL: "http://localhost:3000/api/week2/upload",
    onUploadStatusUpdate: (file, timestamp, status) => {
      statusZone.updateStatus(file, timestamp, status);
    },
  });
};
