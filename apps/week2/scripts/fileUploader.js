const FileUploader = ({ uploadURL, onUploadStatusUpdate }) => {
  const dropZone = document.getElementById("drop-zone");

  const infoText = document.createElement("span");
  infoText.textContent = "파일을 끌어다 놓거나 클릭하여 선택하세요.";
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.setAttribute("multiple", "true");
  dropZone.append(infoText, fileInput);

  async function uploadFile(file, timestamp) {
    try {
      const fileSize = Math.round(file.size / 1024);
      if (fileSize > 5120) {
        onUploadStatusUpdate(file, timestamp, "실패: 파일 크기 5MB 초과");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(uploadURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        onUploadStatusUpdate(file, timestamp, "성공");
      } else {
        onUploadStatusUpdate(file, timestamp, "실패: 서버 오류");
      }
    } catch (error) {
      onUploadStatusUpdate(file, timestamp, `에러: ${error}`);
    }
  }

  function uploadFiles(files, timestamp) {
    for (const file of files) {
      onUploadStatusUpdate(file, timestamp, "시작");
      setTimeout(() => uploadFile(file, timestamp), 100);
    }
  }

  function filterFile(items) {
    return items.filter((item) => item.kind === "file");
  }

  function onAvailable() {
    dropZone.style.backgroundColor = "#c8e6c9";
  }

  function onUnavailable() {
    dropZone.style.backgroundColor = "#eeeeee";
  }

  window.addEventListener("dragover", (e) => {
    const fileItems = filterFile([...e.dataTransfer.items]);
    if (fileItems.length > 0) {
      e.preventDefault();
      if (!dropZone.contains(e.target)) {
        onUnavailable();
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
        onAvailable();
        e.dataTransfer.dropEffect = "copy";
      } else {
        onUnavailable();
        e.dataTransfer.dropEffect = "none";
      }
    }
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();

    onUnavailable();

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
