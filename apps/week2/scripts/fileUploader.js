const FileUploader = ({ uploadURL }) => {
  const dropZone = document.getElementById("drop-zone");
  const statusZone = document.getElementById("status-zone");

  const infoText = document.createElement("span");
  infoText.textContent = "파일을 끌어다 놓거나 클릭하여 선택하세요.";
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.setAttribute("multiple", "true");
  dropZone.append(infoText, fileInput);

  function UploadStatusItem(file, timestamp, callback) {
    const fileName = document.createElement("div");
    fileName.textContent = file.name;
    const fileSize = document.createElement("div");
    fileSize.textContent = `${Math.round(file.size / 1024)}KB`;
    const progressBar = document.createElement("div");
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

      callback(statusItem);
    };
    reader.readAsDataURL(file);
  }

  function updateStatus(dataFile, status) {
    const uploadStatus = document.querySelector(`.upload-status-item[data-file="${dataFile}"]`);
    const progressBar = uploadStatus.querySelector(".progress-bar");

    if (!progressBar) return;
    if (status === '성공') {
      uploadStatus.querySelector("img").style.display = "block";
      progressBar.classList.add("success");
    } else {
      console.error(status);
      progressBar.classList.add("fail");
      progressBar.textContent = status;
    }
  }

  async function uploadFile(file, timestamp) {
    try {
      const dataFile = `${file.name}${timestamp}`;
      const fileSize = Math.round(file.size / 1024);
      if (fileSize > 5120) {
        updateStatus(dataFile, "실패: 파일 크기 5MB 초과");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(uploadURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        updateStatus(dataFile, "성공");
      } else {
        updateStatus(dataFile, "실패: 서버 오류");
      }
    } catch (error) {
      updateStatus(dataFile, `에러: ${error}`);
    }
  }

  function uploadFiles(files, timestamp) {
    for (const file of files) {
      UploadStatusItem(file, timestamp, (statusItem) => {
        statusZone.append(statusItem);
      });
      setTimeout(() => uploadFile(file, timestamp), 100);
    }
  }

  function filterFile(items) {
    return items.filter((item) => item.kind === "file");
  }

  window.addEventListener("dragover", (e) => {
    const fileItems = filterFile([...e.dataTransfer.items]);
    if (fileItems.length > 0) {
      e.preventDefault();
      if (!dropZone.contains(e.target)) {
        dropZone.classList.remove("available");
        e.dataTransfer.dropEffect = "none";
      }
    }
  });

  window.addEventListener("drop", (e) => {
    if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
      e.preventDefault();
    }
  });

  dropZone.addEventListener("dragover", (e) => {
    const fileItems = filterFile([...e.dataTransfer.items]);
    if (fileItems.length > 0) {
      e.preventDefault();
      if (fileItems.some((item) => item.type.startsWith("image/"))) {
        dropZone.classList.add("available");
        e.dataTransfer.dropEffect = "copy";
      } else {
        dropZone.classList.remove("available");
        e.dataTransfer.dropEffect = "none";
      }
    }
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();

    dropZone.classList.remove("available");

    const files = filterFile([...e.dataTransfer.items])
      .map((item) => item.getAsFile())
      .filter((file) => file.type.startsWith("image/"));
    const timestamp = new Date().getTime();
    uploadFiles(files, timestamp);
  });

  fileInput.addEventListener("change", (e) => {
    const { files } = e.target;
    const timestamp = new Date().getTime();
    uploadFiles(files, timestamp);
  });
};

FileUploader({
  uploadURL: "http://localhost:3000/api/week2/upload",
});
