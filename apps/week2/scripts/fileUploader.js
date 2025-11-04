const FileUploader = ({ uploadURL }) => {
  function DropZone() {
    const infoText = document.createElement("p");
    infoText.textContent = "파일을 끌어다 놓거나 클릭하여 선택하세요.";
    const fileInput = document.createElement("input");
    fileInput.id = "file-input";
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.setAttribute("multiple", "true");

    const dropZone = document.createElement("div");
    dropZone.id = "drop-zone";
    dropZone.append(infoText, fileInput);

    return {
      dropZone,
      fileInput,
    };
  }

  function StatusZone() {
    const statusZone = document.createElement("p");
    statusZone.id = "status-zone";
    return statusZone;
  }

  function UploadStatusItem(file, timestamp, callback) {
    const fileName = document.createElement("div");
    fileName.textContent = file.name;
    const fileSize = document.createElement("div");
    fileSize.textContent = `${Math.round(file.size / 1024)}KB`;
    const uploadStatus = document.createElement("div");
    uploadStatus.className = "upload-status";
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    uploadStatus.append(progressBar);

    const infoGroup = document.createElement("div");
    infoGroup.className = "info-group";
    infoGroup.append(fileName, fileSize, uploadStatus);

    const preview = document.createElement("img");
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.alt = file.name;

      const fileItem = document.createElement("div");
      fileItem.className = "file-item";
      fileItem.dataset.file = `${file.name}${timestamp}`;
      fileItem.append(infoGroup, preview);

      callback(fileItem);
    };
    reader.readAsDataURL(file);
  }

  const fileUploader = document.getElementById("file-uploader");
  const { dropZone, fileInput } = DropZone();
  const statusZone = StatusZone();
  fileUploader.append(dropZone, statusZone);

  function updateStatus(dataFile, status) {
    const fileItemStatus = document.querySelector(
      `.file-item[data-file="${dataFile}"] .progress-bar`
    );
    if (!fileItemStatus) return;
    if (status === '성공') {
      fileItemStatus.classList.add("success");
    } else {
      console.error(status);
      fileItemStatus.classList.add("fail");
      fileItemStatus.textContent = status;
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
      UploadStatusItem(file, timestamp, (fileItem) => statusZone.append(fileItem));
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

FileUploader({ uploadURL: "http://localhost:3000/api/week2/upload" });
